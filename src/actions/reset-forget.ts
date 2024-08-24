'use server'

import * as z from 'zod'
import { ResetSchema } from '@/schemas'
import db from '@/lib/db'
import jwt from 'jsonwebtoken'
import { sendEmail } from '@/lib/email'
import { env } from '@/env.mjs'

const RESET_TOKEN_EXPIRY = 15 * 60 * 1000 // 15 minutes in milliseconds

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }

  const { email } = validatedFields.data

  const existingUser = await db.user.findUnique({ where: { email } })

  if (!existingUser || !existingUser.email) {
    // Don't reveal if the email exists or not for security reasons
    return {
      success:
        'If an account with that email exists, a reset link has been sent.',
    }
  }

  const existingToken = await db.passwordResetToken.findUnique({
    where: { userId: existingUser.id },
  })

  if (existingToken) {
    const timeSinceLastRequest = Date.now() - existingToken.createdAt.getTime()
    if (timeSinceLastRequest < 60000) {
      // 1 minute cooldown
      return {
        error: `Please wait ${Math.ceil(
          (60000 - timeSinceLastRequest) / 1000
        )} seconds before requesting another reset.`,
      }
    }
    // Delete the existing token if it's older than 1 minute
    await db.passwordResetToken.delete({ where: { id: existingToken.id } })
  }

  const passwordResetToken = await generatePasswordResetToken(
    email,
    existingUser.id
  )
  await sendPasswordResetEmail(existingUser.email, passwordResetToken.token)

  return {
    success:
      'If an account with that email exists, a reset link has been sent.',
  }
}

export const generatePasswordResetToken = async (
  email: string,
  userId: string
) => {
  const token = jwt.sign({ email, userId }, env.JWT_SECRET!, {
    expiresIn: '15m',
  })
  const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY)

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      userId,
      token,
      expiresAt,
      createdAt: new Date(),
    },
  })

  return passwordResetToken
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${env.APP_NAME}/forget-password?token=${token}`

  await sendEmail({
    to: email,
    subject: 'Reset your password',
    text: `
Reset your password by clicking this link: ${resetUrl}
This link will expire in 15 minutes.
If you didn't request this, please ignore this email.
    `,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        /* Styles remain the same */
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>Hello,</p>
        <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <a href="${resetUrl}" class="btn">Reset Your Password</a>
        <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
        <p>${resetUrl}</p>
        <p>This link will expire in 15 minutes for security reasons.</p>
        <p>If you need any assistance, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>Your App Team</p>
    </div>
    <div class="footer">
        <p>This email was sent by Your App Name. Please do not reply to this email.</p>
    </div>
</body>
</html>
    `,
  })
}
