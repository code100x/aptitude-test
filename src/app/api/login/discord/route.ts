import { discord, lucia } from '@/auth'
import db from '@/lib/db'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/env.mjs'

interface DiscordUser {
  id: string
  username: string
  email: string
  global_name: string
}

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)
    const searchParams = url.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      return Response.json({ error: 'Invalid request' }, { status: 400 })
    }
    const savedState = cookies().get('state')?.value

    if (!savedState) {
      return Response.json(
        { error: 'saved state is not exists' },
        { status: 400 }
      )
    }
    if (savedState !== state) {
      return Response.json({ error: 'State does not match' }, { status: 400 })
    }
    const { accessToken, refreshToken, accessTokenExpiresAt } =
      await discord.validateAuthorizationCode(code)

    const discordRes = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    })

    const discordData = (await discordRes.json()) as DiscordUser
    console.log('discordData', discordData)

    await db.$transaction(async (trx) => {
      const user = await trx.user.findFirst({
        where: {
          id: discordData.id,
        },
      })
      if (!user) {
        const createdUser = await trx.user.create({
          data: {
            id: discordData.id.toString(),
            username: discordData.username,
            email: discordData.email,
            displayName: discordData.global_name,
            emailVerified: true,
          },
          select: {
            id: true,
          },
        })
        if (!createdUser) {
          throw new Error('Failed to create user')
        }
        const createAccount = await trx.oAuthAccount.create({
          data: {
            accessToken,
            refreshToken,
            expiresAt: accessTokenExpiresAt,
            provider: 'DISCORD',
            userId: discordData.id.toString(),
            providerUserId: discordData.id.toString(),
          },
        })
        if (!createAccount) {
          throw new Error('Failed to create account')
        }
      } else {
        const updateOAuthAccount = await trx.oAuthAccount.updateMany({
          data: {
            accessToken,
            refreshToken,
            expiresAt: accessTokenExpiresAt,
          },
          where: {
            userId: discordData.id.toString(),
          },
        })
        if (!updateOAuthAccount) {
          throw new Error('Failed to update OAuthAccount')
        }
      }
      return NextResponse.redirect(new URL('/', env.APP_NAME), {
        status: 302,
      })
    })

    const session = await lucia.createSession(discordData.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    cookies().set('state', '', {
      expires: new Date(0),
    })

    return NextResponse.redirect(new URL('/', env.APP_NAME), {
      status: 302,
    })
  } catch (error: any) {
    return Response.json({ error: error?.message }, { status: 500 })
  }
}
