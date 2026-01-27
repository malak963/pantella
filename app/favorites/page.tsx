"use client"

import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { getFavoriteStore } from "@/store/favoriteStore"

export default function FavoritesPage() {
    const { isSignedIn, user } = useUser()

    if (!isSignedIn || !user) {
        return (
            <p className="text-center mt-20 text-gray-500">
                Please sign in to see your favorites
            </p>
        )
    }

    const favoriteStore = getFavoriteStore(user.id)
    const favorites = favoriteStore(s => s.favorites)

    if (!favorites.length) {
        return (
            <p className="text-center mt-20 text-gray-500">
                No favorite products yet
            </p>
        )
    }

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">Favorite Products</h1>

            {favorites.map(item => (
                <div
                    key={item.id}
                    className="flex items-center gap-6 bg-white p-5 rounded-2xl shadow"
                >
                    <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded-xl object-cover"
                    />

                    <div className="flex-1">
                        <p className="text-lg font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">
                            Added on {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
