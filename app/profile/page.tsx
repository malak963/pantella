"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Heart, MapPin, ShoppingBag } from "lucide-react";
import { useOrderStore } from "../../store/orderStore";
import Link from "next/link";
import { getFavoriteStore } from "../../store/favoriteStore";

export default function ProfilePage() {
    const { user, isLoaded, isSignedIn } = useUser();

    const orders = useOrderStore((s) => s.orders);
    const lastTwoOrders = orders.slice(0, 2);

    const favoriteStore = user ? getFavoriteStore(user.id) : null;
    const favorites = favoriteStore?.(s => s.favorites) || [];
    const lastTwoFavorites = favorites.slice(0, 2);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading profile...
            </div>
        );
    }

    if (!isSignedIn || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Please sign in to view your profile
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 flex items-center justify-center bg-linear-to-br from-[#8e2344] via-[#d15c7c] to-[#d9a441] p-6">
            <div className="relative w-full max-w-6xl rounded-[70px] bg-[#fde6e1] px-16 py-20 shadow-2xl overflow-hidden">

                {/* decorative shapes */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#8e2344] rounded-br-full opacity-20" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#d9a441] rounded-tl-full opacity-20" />

                {/* avatar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                        <Image
                            src={user.imageUrl}
                            alt={user.fullName || "User"}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* name */}
                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-semibold text-[#5c2a2a]">
                        {user.fullName}
                    </h2>
                </div>

                <div className="grid grid-cols-12 gap-12 mt-16">

                    {/* LEFT */}
                    <div className="col-span-8 space-y-10">

                        {/* Favorites */}
                        <section>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#5c2a2a] mb-4">
                                ❤️ Favorite Products
                            </h3>

                            {lastTwoFavorites.length === 0 ? (
                                <p className="text-gray-600">No favorite products yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {lastTwoFavorites.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 bg-white/70 p-4 rounded-xl"
                                        >
                                            <img
                                                src={item.thumbnail}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />

                                            <div>
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Address */}
                        <section>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#5c2a2a] mb-4">
                                <MapPin size={18} /> Shipping Address
                            </h3>
                            <p className="text-gray-700">Aleppo, Syria</p>
                        </section>

                        {/* Recent Orders */}
                        <section>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#5c2a2a] mb-4">
                                <ShoppingBag size={18} /> Recent Orders
                            </h3>

                            {lastTwoOrders.length === 0 ? (
                                <p className="text-gray-600">No orders yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {lastTwoOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="bg-white/70 rounded-xl p-4"
                                        >
                                            <p className="text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>

                                            <p className="font-medium text-gray-800">
                                                {order.items.length} items – ${order.total.toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="col-span-4 bg-[#f6cfc7] rounded-[30px] p-8 space-y-4">

                        <Link href="/orders">
                            <SidebarItem
                                icon={<ShoppingBag size={18} />}
                                label="My Orders"
                            />
                        </Link>

                        <Link href="/favorites">
                            <SidebarItem
                                icon={<Heart size={18} />}
                                label="Favorite Products"
                            />
                        </Link>

                    </aside>

                </div>
            </div>
        </div>
    );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({ icon, label }) {
    return (
        <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[#5c2a2a] hover:bg-white/60 cursor-pointer">
            {icon}
            {label}
        </div>
    );
}
