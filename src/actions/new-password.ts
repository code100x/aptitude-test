'use server'

import db from '@/lib/db'
import { newPasswordSchema, newPasswordValues } from '@/schemas'
import { hash } from '@node-rs/argon2'
import jwt from 'jsonwebtoken'
import { env } from '@/env.mjs'

export const NewPassword = async (
  values: newPasswordValues,
  token: string | null
) => {
  try {
    if (!token) {
      return { error: 'Missing token!' }
    }

    const decoded = jwt.verify(token, env.JWT_SECRET!) as {
      email: string
      userId: string
    }

    const validatedFields = newPasswordSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: 'Invalid password' }
    }

    const { password } = validatedFields.data

    const existingToken = await db.passwordResetToken.findFirst({
      where: {
        token,
        userId: decoded.userId,
        expiresAt: { gt: new Date() },
      },
    })

    if (!existingToken) {
      return { error: 'Invalid or expired token' }
    }

    const existingUser = await db.user.findUnique({
      where: { id: existingToken.userId },
    })

    if (!existingUser) {
      return { error: 'User does not exist!' }
    }

    const passwordHash = await hash(password)

    await db.user.update({
      where: { id: existingUser.id },
      data: { hashedPassword: passwordHash },
    })

    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    })

    return { success: 'Password reset successfully' }
  } catch (e: any) {
    console.error('Password reset error:', e)
    return {
      error:
        'An error occurred while resetting your password. Please try again.',
    }
  }
}
