import Razorpay from 'razorpay'
import { NextRequest, NextResponse } from 'next/server'

import { validateRequest } from '@/auth'
import { z } from 'zod'

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID || '',
  key_secret: process.env.RAZORPAY_SECRET || '',
})

const payloadSchema = z.object({
  amount: z.string(),
  currency: z.string(),
})

export async function POST(request: NextRequest) {
  const session = await validateRequest()
  const user = session?.user
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json()
  const { amount, currency } = payloadSchema.parse(payload)

  const options = {
    amount,
    currency,
    receipt: 'rcp1',
  }

  try {
    const order = await razorpayInstance.orders.create(options)
    return NextResponse.json(
      {
        id: order.id,
        currency: order.currency,
        amount: order.amount,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
