import { Discord, GitHub, Google } from 'arctic'
import { Lucia, User, Session, TimeSpan } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { cookies } from 'next/headers'
import { env } from '@/env.mjs'

import db from '@/lib/db'

const adapter = new PrismaAdapter(db.session, db.user)

interface DatabaseAttributes {
  displayName: string
  email: string
  id: string
  imageUrl: string
  username: string
  role: string
}

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, 'w'),
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      displayName: attributes.displayName,
      email: attributes.email,
      username: attributes.username,
      imageUrl: attributes.imageUrl,
      role: attributes.role,
    }
  },
})

export const validateRequest = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) {
    return {
      user: null,
      session: null,
    }
  }

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch {}
  return result
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseAttributes
    UserId: string
  }
}

export const github = new GitHub(
  env.GITHUB_CLIENT_ID!,
  env.GITHUB_CLIENT_SECRET!,
  {
    redirectURI: `${env.APP_NAME}/api/login/github`,
  }
)

export const googleAuth = new Google(
  env.GOOGLE_CLIENT_ID!,
  env.GOOGLE_CLIENT_SECRET!,
  `${env.APP_NAME}/api/login/google`
)

export const discord = new Discord(
  env.DISCORD_CLIENT_ID!,
  env.DISCORD_CLIENT_SECRET!,
  `${env.APP_NAME}/api/login/discord`
)
