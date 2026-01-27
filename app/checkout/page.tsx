'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CreditCard, Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCartStore } from '@/store/cartStore'
import { useOrderStore } from '@/store/orderStore'

const paymentMethods = [
  { id: 'visa', name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
  { id: 'mastercard', name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { id: 'paypal', name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
  { id: 'apple', name: 'Apple Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }
]

export default function CheckoutPage() {
  const addOrder = useOrderStore((s) => s.addOrder)
  const { items, clearCart } = useCartStore()
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const handlePay = async () => {
  if (!items.length) return toast.error('Cart is empty')
  if (!selected) return toast.error('Select payment method')

  setLoading(true)
  toast.loading('Processing payment...', { id: 'pay' })

  await new Promise(r => setTimeout(r, 2000))

  const newOrder = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    items: items,
    paymentMethod: selected,
    total,
  }

  addOrder(newOrder)

  toast.success(`Payment successful via ${selected}`, { id: 'pay' })
  toast.success(`Charged $${total.toFixed(2)}`)

  clearCart() 
  setLoading(false)
}


  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <ShieldCheck /> Secure Checkout
      </h1>

      <p>Total: <strong>${total.toFixed(2)}</strong></p>

      <div className="space-y-3">
        {paymentMethods.map(m => (
          <Card
            key={m.id}
            onClick={() => setSelected(m.name)}
            className={`p-4 flex items-center gap-4 cursor-pointer border transition ${
              selected === m.name ? 'border-black ring-2 ring-black/10' : 'border-gray-200'
            }`}
          >
            <img src={m.logo} className="h-6" />
            <span>{m.name}</span>
          </Card>
        ))}
      </div>

      <Button onClick={handlePay} disabled={!selected ||loading} className={"w-full flex gap-2 transition cursor-pointer hover:bg-pink-950 transition-colors duration-150" }>
        {loading ? <Loader2 className="animate-spin" /> : <CreditCard />}
        {loading ? 'Processing...' : 'Pay Securely'}
      </Button>

      <p className="text-center text-xs text-gray-500">
        Simulated secure payment
      </p>
    </div>
  )
}
