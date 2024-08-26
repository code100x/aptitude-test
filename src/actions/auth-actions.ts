'use server'

import { lucia, validateRequest } from '@/auth'
import db from '@/lib/db'
import {
  loginSchema,
  loginValues,
  signUpSchema,
  signUpValues,
  updateUserDetailsSchema,
  UpdateUserDetailsValues,
} from '@/schemas'
import { hash, verify } from '@node-rs/argon2'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from '@/actions/email'
import { ARGON2_OPTIONS } from '@/config'
import { env } from '@/env.mjs'

export const signUp = async (values: signUpValues) => {
  try {
    const data = signUpSchema.safeParse(values)
    if (!data.success) {
      return { error: data.error.errors[0].message }
    }

    const { username, password, email, displayName } = data.data
    const passwordHash = await hash(password, ARGON2_OPTIONS)

    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { username: { equals: username, mode: 'insensitive' } },
          { email: { equals: email, mode: 'insensitive' } },
        ],
      },
    })

    if (existingUser) {
      return {
        error:
          existingUser.username?.toLowerCase() === username.toLowerCase()
            ? 'Username is already taken'
            : 'Email is already taken',
      }
    }

    const user = await db.user.create({
      data: { username, email, hashedPassword: passwordHash, displayName },
    })

    const customExam = await db.exam.create({
      data: {
        title: 'Custom Test',
        description: 'This is a custom Test from your own Question Bank',
        duration: 120,
        price: 0,
        published: false,
      },
    })

    await db.questionBank.create({
      data: { userId: user.id, examId: customExam.id },
    })

    const code = generateVerificationCode()

    await db.verificationEmail.create({
      data: { code, userId: user.id },
    })

    const token = jwt.sign({ email, userId: user.id, code }, env.JWT_SECRET!, {
      expiresIn: '5m',
    })

    const verificationUrl = `${env.APP_NAME}/api/verify-email?token=${token}`
    await sendVerificationEmail(email, verificationUrl)

    return {
      success: true,
      message:
        'User created successfully. Please check your email for verification.',
    }
  } catch (error) {
    console.error('Sign up error:', error)
    return { error: 'An unexpected error occurred during sign up.' }
  }
}

export const login = async (values: loginValues) => {
  try {
    const data = loginSchema.safeParse(values)
    if (!data.success) {
      return { error: data.error.errors[0].message }
    }

    const { email, password } = data.data

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user || !user.hashedPassword) {
      return { error: 'Invalid email or password' }
    }

    const validPassword = await verify(
      user.hashedPassword,
      password,
      ARGON2_OPTIONS
    )
    if (!validPassword) {
      return { error: 'Invalid email or password' }
    }

    if (!user.emailVerified) {
      return {
        error:
          'Email is not verified. Please check your email for the verification link.',
      }
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return { success: true, redirectTo: '/' }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'An unexpected error occurred during login.' }
  }
}

export async function logout() {
  try {
    const { session } = await validateRequest()
    if (!session) {
      return { error: 'No active session found.' }
    }

    await lucia.invalidateSession(session.id)
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return { success: true, redirectTo: '/login' }
  } catch (error) {
    console.error('Logout error:', error)
    return { error: 'An unexpected error occurred during logout.' }
  }
}

export async function updateUserDetails(values: UpdateUserDetailsValues) {
  try {
    const { user } = await validateRequest()
    if (!user) {
      return { error: 'Unauthorized' }
    }

    const validatedData = updateUserDetailsSchema.safeParse(values)
    if (!validatedData.success) {
      return { error: validatedData.error.errors[0].message }
    }

    const { username, displayName } = validatedData.data

    const existingUser = await db.user.findFirst({
      where: {
        username: { equals: username, mode: 'insensitive' },
        NOT: { id: user.id },
      },
    })

    if (existingUser) {
      return { error: 'Username is already taken' }
    }

    await db.user.update({
      where: { id: user.id },
      data: { username, displayName },
    })

    return { success: true, message: 'User details updated successfully.' }
  } catch (error) {
    console.error('Error updating user details:', error)
    return {
      error: 'An unexpected error occurred while updating user details.',
    }
  }
}

function generateVerificationCode(): string {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0')
}
