'use server'

import { discord } from '@/auth'
import { generateCodeVerifier, generateState } from 'arctic'
import { cookies } from 'next/headers'

export const createDiscordAuthorizationURL = async () => {
  try {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()
    cookies().set('state', state, {
      httpOnly: true,
    })
    const authorizationURL = await discord.createAuthorizationURL(state, {
      scopes: ['identify', 'email', 'guilds', 'guilds.join', 'connections'],
    })

    return {
      success: true,
      data: authorizationURL,
    }
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}
