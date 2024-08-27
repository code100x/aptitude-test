'use server'

import { github } from '@/auth'
import { generateState } from 'arctic'
import { cookies } from 'next/headers'

export const createGithubAuthorizationURL = async () => {
  try {
    const state = generateState() // generate a random string 6 characters long

    cookies().set('state', state, {
      httpOnly: true,
    })

    const authorizationURL = await github.createAuthorizationURL(state, {
      scopes: ['user:email'],
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
