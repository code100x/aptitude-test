import { NextRequest, NextResponse } from 'next/server'

import { razorpayInstance } from '@/lib/payment'

export async function POST(request: NextRequest) {
  const { amount, currency } = (await request.json()) as {
    amount: string
    currency: string
  }

  var options = {
    amount: amount,
    currency: currency,
    receipt: 'rcp1',
  }
  const order = await razorpayInstance.orders.create(options)
  return NextResponse.json({ orderId: order.id }, { status: 200 })
}
