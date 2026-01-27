"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartDropdown() {
    const items = useCartStore((s) => s.items);

    if (!items.length) {
        return (
            <div className="w-80 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border text-center">
                <div className="text-4xl mb-3">🛒</div>

                <h3 className="text-lg font-semibold text-gray-900">
                    Your cart is empty
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    Start adding products
                </p>

                <Link
                    href="/products"
                    className="block mt-5 rounded-full bg-amber-800 text-white py-2 text-sm hover:bg-amber-900 transition"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="w-80 bg-white shadow-2xl rounded-2xl p-4 space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                    <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="rounded-lg"
                    />
                </div>
            ))}

            <Link
                href="/cart"
                className="block text-center bg-amber-800 hover:bg-amber-900 text-white py-2 rounded-lg text-sm"
            >
                Go to Cart
            </Link>
        </div>
    );
}
