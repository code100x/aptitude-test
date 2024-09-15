import { NextRequest, NextResponse } from 'next/server'
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils'
import { z } from 'zod'

import db from '@/lib/db'

const payloadSchema = z.object({
  payment: z.object({
    entity: z.object({
      amount: z.number(),
      id: z.string(),
      notes: z.object({
        userId: z.string(),
        examId: z.string(),
      }),
      order_id: z.string(),
      status: z.string(),
    }),
  }),
})

export async function POST(req: NextRequest) {
  const jsonBody = await req.json()
  const razorpay_signature: string | null = req.headers.get(
    'X-Razorpay-Signature'
  )

  if (!razorpay_signature)
    return NextResponse.json({ error: 'Signature not found' }, { status: 404 })

  const isPaymentValid: boolean = validateWebhookSignature(
    JSON.stringify(jsonBody),
    razorpay_signature,
    process.env.RAZORPAY_WEBHOOK_SECRET!
  )

  if (!isPaymentValid) {
    return NextResponse.json(
      { error: 'Payment not verified. Payment signature invalid' },
      { status: 404 }
    )
  }
  const {
    payment: {
      entity: {
        amount,
        id: paymentId,
        notes: { userId, examId },
        order_id,
        status,
      },
    },
  } = payloadSchema.parse(jsonBody.payload)

  if (status !== 'authorized' && status !== 'captured') {
    return NextResponse.json(
      { error: 'Payment not authorized' },
      { status: 404 }
    )
  }

  try {
    await db.payment.create({
      data: {
        amount,
        examId,
        id: paymentId,
        orderId: order_id,
        status,
        userId,
      },
    })

    return NextResponse.json(
      { message: 'Purchase Successful' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 409 })
  }
}
