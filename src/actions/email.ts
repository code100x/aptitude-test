'use server'

import db from '@/lib/db'
import { sendEmail } from '@/lib/email'
import jwt from 'jsonwebtoken'
import { generateId } from 'lucia'
import { env } from '@/env.mjs'

const companyName = 'DSA & DEV'
const primaryColor = '#3498db'
const secondaryColor = '#2ecc71'
const accentColor = '#e74c3c'
const backgroundColor = '#ecf0f1'
const textColor = '#34495e'

const baseStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
  
  body {
    font-family: 'Roboto', Arial, sans-serif;
    line-height: 1.6;
    color: ${textColor};
    background-color: ${backgroundColor};
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 20px auto;
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  .header {
    background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
    color: #ffffff;
    padding: 40px 20px;
    text-align: center;
  }
  .logo {
    width: 120px;
    height: auto;
    margin-bottom: 20px;
  }
  .content {
    padding: 40px 30px;
  }
  h1 {
    color: ${primaryColor};
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 700;
  }
  p {
    margin-bottom: 15px;
    font-size: 16px;
  }
  .btn {
    display: inline-block;
    background: linear-gradient(135deg, ${secondaryColor}, ${primaryColor});
    color: #ffffff;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 18px;
    margin-top: 20px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  .footer {
    background-color: #34495e;
    color: #ecf0f1;
    padding: 30px 20px;
    text-align: center;
    font-size: 14px;
  }
  .social-icons {
    margin-top: 20px;
  }
  .social-icon {
    display: inline-block;
    margin: 0 10px;
    width: 30px;
    height: 30px;
  }
`

export async function sendVerificationEmail(
  email: string,
  verificationUrl: string
) {
  try {
    await sendEmail({
      to: email,
      subject: '🚀 Verify Your Email and Join the Future of Development!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
          <style>${baseStyle}</style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://via.placeholder.com/120x120" alt="${companyName} Logo" class="logo">
              <h1>Welcome to the Future of Development!</h1>
            </div>
            <div class="content">
              <p>Dear Developer,</p>
              <p>You're on the brink of unlocking a world of cutting-edge tools and resources. Verify your email now to join our community of innovators!</p>
              <a href="${verificationUrl}" class="btn">Activate My Account</a>
              <p>This link will expire in 24 hours. If you didn't create an account with us, please disregard this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
              <div class="social-icons">
                <a href="#"><img src="https://via.placeholder.com/30x30" alt="Facebook" class="social-icon"></a>
                <a href="#"><img src="https://via.placeholder.com/30x30" alt="Twitter" class="social-icon"></a>
                <a href="#"><img src="https://via.placeholder.com/30x30" alt="LinkedIn" class="social-icon"></a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    console.log('Verification email sent successfully')
  } catch (error) {
    console.error('Error sending verification email:', error)
  }
}

export const resendVerificationEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({ where: { email } })

    if (!user) {
      return { error: 'User not found' }
    }

    if (user.emailVerified === true) {
      return { error: 'Email already verified' }
    }

    const existedCode = await db.verificationEmail.findFirst({
      where: { userId: user.id },
    })

    if (!existedCode) {
      return { error: 'Code not found' }
    }

    const createdAt = new Date(existedCode.createdAt)
    const timeDiff = new Date().getTime() - createdAt.getTime()
    const cooldownPeriod = 120000 // 2 minutes in milliseconds

    if (timeDiff < cooldownPeriod) {
      const remainingTime = Math.ceil((cooldownPeriod - timeDiff) / 1000)
      return {
        error: `Please wait ${remainingTime} seconds before requesting a new verification email.`,
      }
    }

    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')

    await db.verificationEmail.update({
      where: { id: existedCode.id, userId: user.id },
      data: { code, createdAt: new Date() },
    })

    const token = jwt.sign(
      { email: email, userId: user.id, code },
      env.JWT_SECRET!,
      { expiresIn: '5m' }
    )

    const verificationUrl = `${env.APP_NAME}/api/verify-email?token=${token}`

    await sendVerificationEmail(email, verificationUrl)

    return { success: 'Verification email resent successfully' }
  } catch (error: any) {
    console.error('Error resending verification email:', error)
    return { error: 'An unexpected error occurred. Please try again later.' }
  }
}
