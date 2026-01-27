"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { getFavoriteStore } from "@/store/favoriteStore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useMemo } from "react";
import Loading from "../loading";

export default function ProductsGrid({ products }) {
    const addToCart = useCartStore((s) => s.addToCart);
    const { isSignedIn, user } = useUser();
    const router = useRouter();

    const userId = user?.id || "guest";

    const favoriteStore = useMemo(() => getFavoriteStore(userId), [userId]);

    const toggleFavorite = favoriteStore((s) => s.toggleFavorite);
    const favorites = favoriteStore((s) => s.favorites);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => {
                const isFav = isSignedIn && favorites.some((f) => f.id === product.id);

                return (
                    <div
                        key={product.id}
                        className="border p-4 rounded-xl hover:bg-amber-100 transition flex flex-col items-center gap-3"
                    >
                        <Link
                            href={`/products/${product.id}`}
                            className="flex flex-col items-center gap-2"
                        >
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                width={120}
                                height={120}
                                className="rounded-lg object-cover"
                            />
                            <h3 className="text-xl text-center hover:underline">
                                {product.title}
                            </h3>
                        </Link>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => {
                                    if (!isSignedIn) {
                                        router.push("/sign-in");
                                        return;
                                    }

                                    toggleFavorite({
                                        id: product.id,
                                        title: product.title,
                                        thumbnail: product.thumbnail,
                                    });
                                }}
                                className={`p-2 rounded-full border transition ${
                                    isFav
                                        ? "bg-red-500 text-white"
                                        : "bg-white hover:bg-gray-100"
                                }`}
                            >
                                <Heart size={18} fill={isFav ? "white" : "none"} />
                            </button>

                            <Button
                                className="cursor-pointer hover:bg-pink-950 transition-colors duration-150"
                                onClick={() => {
                                    if (!isSignedIn) {
                                        router.push("/sign-in");
                                        return;
                                    }

                                    addToCart({
                                        id: product.id,
                                        title: product.title,
                                        price: product.price,
                                        thumbnail: product.thumbnail,
                                        quantity: 1,
                                    });
                                }}
                            >
                                Add To Cart
                            </Button>


                        </div>
                    </div>
                );
            })}
        </div>
    );
}
