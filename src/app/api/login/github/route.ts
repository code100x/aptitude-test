import { github, lucia } from '@/auth'
import db from '@/lib/db'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/env.mjs'

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)
    const searchParams = url.searchParams

    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      return Response.json(
        { error: 'Invalid request' },
        {
          status: 400,
        }
      )
    }

    const savedState = cookies().get('state')?.value

    if (!savedState) {
      return Response.json(
        { error: 'saved state is not exists' },
        {
          status: 400,
        }
      )
    }

    if (savedState !== state) {
      return Response.json(
        {
          error: 'State does not match',
        },
        {
          status: 400,
        }
      )
    }

    const { accessToken } = await github.validateAuthorizationCode(code)

    const githubRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    })

    const githubData = (await githubRes.json()) as any

    console.log('githubData', githubData)

    await db.$transaction(async (trx) => {
      const user = await trx.user.findFirst({
        where: {
          id: githubData.id.toString(),
        },
      })

      if (!user) {
        const createdUser = await trx.user.create({
          data: {
            id: githubData.id.toString(),
            displayName: githubData.name,
            imageUrl: githubData.avatar_url,
            username: githubData.login,
            email: githubData.email,
            emailVerified: true,
          },
          select: {
            id: true,
          },
        })

        if (!createdUser) {
          throw new Error('Failed to create user')
        }

        const createdOAuthAccount = await trx.oAuthAccount.create({
          data: {
            accessToken,
            provider: 'GITHUB',
            providerUserId: githubData.id.toString(),
            userId: githubData.id.toString(),
          },
        })

        if (!createdOAuthAccount) {
          throw new Error('Failed to create OAuthAccount')
        }
      } else {
        const updatedOAuthAccount = await trx.oAuthAccount.updateMany({
          where: {
            userId: githubData.id.toString(),
          },
          data: {
            accessToken,
          },
        })

        if (updatedOAuthAccount.count === 0) {
          throw new Error('Failed to update OAuthAccount')
        }
      }

      return NextResponse.redirect(new URL('/', env.APP_NAME), {
        status: 302,
      })
    })

    const session = await lucia.createSession(githubData.id.toString(), {})
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
    return Response.json(
      { error: error.message },
      {
        status: 500,
      }
    )
  }
}
