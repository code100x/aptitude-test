import { googleAuth, lucia } from '@/auth'
import db from '@/lib/db'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/env.mjs'

interface GoogleUser {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  picture: string
  locale: string
}

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

    const codeVerifier = cookies().get('codeVerifier')?.value
    const savedState = cookies().get('state')?.value

    console.log({ codeVerifier, savedState, state })

    if (!codeVerifier || !savedState) {
      return Response.json(
        { error: 'Code verifier or saved state is not exists' },
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

    const { accessToken, idToken, accessTokenExpiresAt, refreshToken } =
      await googleAuth.validateAuthorizationCode(code, codeVerifier)

    const googleRes = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
      }
    )
    console.log({ accessToken, idToken, accessTokenExpiresAt, refreshToken })

    const googleData = (await googleRes.json()) as GoogleUser

    console.log('google data', googleData)

    await db.$transaction(async (trx) => {
      const user = await trx.user.findFirst({
        where: {
          id: googleData.id.toString(),
        },
      })
      let session = null

      if (!user) {
        const createdUser = await trx.user.create({
          data: {
            id: googleData.id.toString(),
            email: googleData.email,
            displayName: googleData.name,
            imageUrl: googleData.picture,
            username: googleData.given_name,
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
            provider: 'GOOGLE',
            providerUserId: googleData.id,
            userId: googleData.id,
            refreshToken,
            expiresAt: accessTokenExpiresAt,
          },
        })
        if (!createAccount) {
          throw new Error('Failed to create OAuthAccount')
        }
      } else {
        const updatedOAuthAccount = await trx.oAuthAccount.updateMany({
          where: {
            userId: googleData.id.toString(),
          },
          data: {
            accessToken,
            refreshToken,
            expiresAt: accessTokenExpiresAt,
          },
        })
        if (!updatedOAuthAccount) {
          throw new Error('Failed to update OAuthAccount')
        }
      }
      return NextResponse.redirect(new URL('/', env.APP_NAME), {
        status: 302,
      })
    })

    const session = await lucia.createSession(googleData.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    cookies().set('state', '', {
      expires: new Date(0),
    })
    cookies().set('codeVerifier', '', {
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
