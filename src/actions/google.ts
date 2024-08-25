'use server'

import { googleAuth } from '@/auth'
import { generateCodeVerifier, generateState } from 'arctic'
import { cookies } from 'next/headers'

export const createGoogleAuthorizationURL = async () => {
  try {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()

    cookies().set('codeVerifier', codeVerifier, {
      httpOnly: true,
    })

    cookies().set('state', state, {
      httpOnly: true,
    })

    const authorizationURL = await googleAuth.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ['email', 'profile'],
      }
    )

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
