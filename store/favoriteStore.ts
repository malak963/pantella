import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

export type FavoriteItem = {
    id: number
    title: string
    thumbnail: string
    createdAt: string
}

type FavoriteStore = {
    favorites: FavoriteItem[]
    toggleFavorite: (item: Omit<FavoriteItem, 'createdAt'>) => void
}

export const getFavoriteStore = (userId: string) =>
    create<FavoriteStore>()(
        persist(
            (set, get) => ({
                favorites: [],

                toggleFavorite: (item) => {
                    const exists = get().favorites.find(f => f.id === item.id)

                    if (exists) {
                        set({
                            favorites: get().favorites.filter(f => f.id !== item.id),
                        })
                        toast('Removed from favorites')
                    } else {
                        set({
                            favorites: [
                                {
                                    ...item,
                                    createdAt: new Date().toISOString(),
                                },
                                ...get().favorites,
                            ],
                        })
                        toast.success('Added to favorites')
                    }
                },
            }),
            {
                name: `favorites-${userId}`,
            }
        )
    )
