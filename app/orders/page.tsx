'use client'

import { useOrderStore } from '@/store/orderStore'
import Image from 'next/image'

export default function OrdersPage() {
  const orders = useOrderStore((s) => s.orders)

  if (!orders.length) {
    return (
      <p className="text-center mt-20 text-gray-500">
        No orders yet
      </p>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-2xl p-6 shadow space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>{new Date(order.createdAt).toLocaleString()}</span>
            <span>{order.paymentMethod}</span>
          </div>

          {order.items.map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={50}
                height={50}
                className="rounded-lg"
              />

              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="text-right font-bold">
            Total: ${order.total.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}
