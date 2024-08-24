'use server'

import { z } from 'zod'
import { cookies } from 'next/headers'
import { resetPasswordSchema } from '@/schemas'
import { lucia, validateRequest } from '@/auth'
import db from '@/lib/db'
import { hash, verify } from '@node-rs/argon2'
import { ARGON2_OPTIONS } from '@/config'

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
): Promise<{ success: boolean; message: string }> => {
  try {
    const validatedData = resetPasswordSchema.parse(values)

    const { user } = await validateRequest()
    if (!user) {
      return {
        success: false,
        message: 'Unauthorized access',
      }
    }

    const existingUser = await db.user.findUnique({
      where: { id: user.id },
      select: { id: true, hashedPassword: true },
    })

    if (!existingUser || !existingUser.hashedPassword) {
      return {
        success: false,
        message: 'User not found or password not set',
      }
    }

    const isValidPassword = await verify(
      existingUser.hashedPassword,
      validatedData.password,
      ARGON2_OPTIONS
    )

    if (!isValidPassword) {
      return {
        success: false,
        message: 'Current password is incorrect',
      }
    }

    const newPasswordHash = await hash(
      validatedData.newPassword,
      ARGON2_OPTIONS
    )

    await db.$transaction([
      db.user.update({
        where: { id: user.id },
        data: { hashedPassword: newPasswordHash },
      }),
      db.session.deleteMany({
        where: { userId: user.id },
      }),
    ])

    const newSession = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(newSession.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return {
      success: true,
      message: 'Password updated successfully',
    }
  } catch (error) {
    console.error('Password reset error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      }
    }
    return {
      success: false,
      message: 'An unexpected error occurred',
    }
  }
}
