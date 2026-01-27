import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from './cartStore'

export type Order = {
  id: string
  createdAt: string
  items: CartItem[]
  total: number
  paymentMethod: string
}

type OrderStore = {
  orders: Order[]
  addOrder: (order: Order) => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
    }),
    {
      name: 'orders-storage',
    }
  )
)
