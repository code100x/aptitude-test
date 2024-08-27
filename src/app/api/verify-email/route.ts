import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import db from '@/lib/db'
import { lucia } from '@/auth'
import { env } from '@/env.mjs'

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)

    const searchParams = url.searchParams

    const token = searchParams.get('token')

    if (!token) {
      return Response.json(
        {
          error: 'Token is not existed',
        },
        {
          status: 400,
        }
      )
    }

    const decoded = jwt.verify(token, env.JWT_SECRET!) as {
      email: string
      code: string
      userId: string
    }

    const emailVerificationQueryResult = await db.verificationEmail.findFirst({
      where: {
        userId: decoded.userId,
        code: decoded.code,
      },
    })

    if (!emailVerificationQueryResult) {
      return Response.json(
        {
          error: 'Invalid token',
        },
        {
          status: 400,
        }
      )
    }

    await db.verificationEmail.delete({
      where: {
        id: emailVerificationQueryResult.id,
      },
    })

    await db.user.update({
      where: {
        email: decoded.email,
      },
      data: {
        emailVerified: true,
      },
    })
    const session = await lucia.createSession(decoded.userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return Response.redirect(new URL(env.APP_NAME!), 302)
  } catch (e: any) {
    return Response.json(
      {
        error: e.message,
      },
      {
        status: 400,
      }
    )
  }
}
