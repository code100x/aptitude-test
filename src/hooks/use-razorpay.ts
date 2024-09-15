import { User } from 'lucia'
import { toast } from 'sonner'

const intializeRazorpay = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      reject(false)
    }
    document.body.appendChild(script)
  })
}

export const useRazorpay = () => {
  const processPayment = async ({
    amount,
    examId,
    successCallback,
    user,
  }: {
    amount: number
    examId: string
    successCallback: () => void
    user: User
  }) => {
    const razorpay = await intializeRazorpay()
    if (!razorpay) {
      toast.error('Failed to initialize Razorpay')
      return
    }
    const order = await fetch('/api/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: (amount * 100).toString(),
        currency: 'INR',
      }),
    })
    const orderDetails = await order.json()
    if (!orderDetails.id) {
      toast.error('Failed to create order')
      return
    }
    const options = {
      key: process.env.RAZORPAY_ID,
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      name: user.displayName,
      description: '100xDevs',
      order_id: orderDetails.id,
      prefill: {
        name: user?.username,
        email: user?.email,
      },
      notes: {
        userId: user.id,
        examId,
      },
      modal: {
        ondismiss: () => {
          toast.error('Payment cancelled!')
        },
      },
      handler: () => {
        toast.success('Payment Successful! Thanks for joining.')
        successCallback && successCallback()
      },
    }

    const paymentObject = new (window as any).Razorpay(options)
    paymentObject.on('payment.failed', (response: any) => {
      toast.error(response.error.description)
    })
    paymentObject.open()
  }
  return processPayment
}
