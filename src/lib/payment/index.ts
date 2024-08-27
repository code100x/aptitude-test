import Razorpay from 'razorpay'
import { toast } from 'sonner'
import { User } from 'lucia'

export const razorpayInstance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID || '',
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
})

export const createOrderId = async (amount: number) => {
  try {
    const response = await fetch('/api/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
      }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data.orderId
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error)
  }
}

export const processPayment = async ({
  amount,
  cancelCallback,
  successCallback,
  user,
}: {
  e?: React.FormEvent<HTMLFormElement>
  amount: number
  cancelCallback: () => void
  successCallback: () => void
  user: User
}) => {
  const formattedAmount = amount * 100
  try {
    const orderId: string = await createOrderId(formattedAmount)

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      amount: formattedAmount,
      currency: 'INR',
      image: user?.imageUrl,
      name: user?.displayName,
      description: 'description',
      order_id: orderId,
      callback_url: 'https://your-server/callback_url',
      handler: async function (response: any) {
        const data = {
          orderCreationId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        }

        const result = await fetch('/api/order/verify', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        })
        const res = await result.json()

        if (res.isOk) {
          toast.success('Payment Successful! Thanks for joining.')
          successCallback && successCallback()
        } else {
          toast.error(`Payment Failed! ${res.message}`)
        }
      },
      prefill: {
        name: user?.username,
        email: user?.email,
      },
      theme: {
        color: '#070e22',
      },
      modal: {
        ondismiss: function () {
          cancelCallback()
        },
      },
    }
    const paymentObject = new (window as any).Razorpay(options)
    paymentObject.on('payment.failed', function (response: any) {
      toast.error(response.error.description)
    })
    paymentObject.open()
  } catch (error) {
    console.log({ error })
  }
}
