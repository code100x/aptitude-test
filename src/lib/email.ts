import nodemailer from 'nodemailer'
import { env } from '@/env.mjs'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_PASSWORD,
  },
})

export async function sendEmail({
  to,
  subject,
  html,
  headers,
  text,
}: {
  to: string
  subject: string
  html: string
  headers?: Record<string, string>
  text?: string
}) {
  await transporter.sendMail({
    from: `${env.GMAIL_USER}`, 
    to,
    subject, 
    html,
    text, 
    headers,
  })
}
