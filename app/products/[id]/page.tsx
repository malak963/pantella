"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { Heart } from "lucide-react";
import { getFavoriteStore } from "@/store/favoriteStore";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useMemo, useState } from "react";
import PageLoader from "@/components/ui/PageLoader";

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
    category: string;
};

export default function ProductPage() {
    const params = useParams();
    const id = params?.id;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const { isSignedIn, user } = useUser();
    const router = useRouter();

    const addToCart = useCartStore((s) => s.addToCart);

    const userId = user?.id || "guest";

    const favoriteStore = useMemo(() => getFavoriteStore(userId), [userId]);

    const toggleFavorite = favoriteStore(s => s.toggleFavorite);
    const favorites = favoriteStore(s => s.favorites);

    useEffect(() => {
        if (!id) return;

        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => {
                setProduct(null);
                setLoading(false);
            });
    }, [id]);


    if (loading) return <PageLoader />;
    if (!product) return <p className="text-center mt-10">Product not found!</p>;

    const isFav =
        isSignedIn && favorites.some((f) => f.id === product.id);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 flex flex-col items-center">
            <Image
                src={product.thumbnail}
                alt={product.title}
                width={300}
                height={300}
                className="rounded-2xl object-cover"
            />

            <h1 className="text-3xl font-bold text-center">{product.title}</h1>
            <p className="text-xl text-amber-800">${product.price}</p>
            <p className="text-lg text-gray-600 capitalize">{product.category}</p>
            <p className="text-center text-gray-700">{product.description}</p>

            <div className="flex gap-1">
                {Array(Math.floor(product.rating))
                    .fill(0)
                    .map((_, i) => (
                        <span key={i}>⭐</span>
                    ))}
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    type="button"
                    onClick={() => {
                        if (!isSignedIn || !user) {
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
                    <Heart size={20} fill={isFav ? "white" : "none"} />
                </button>

                <Button
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
                    className="cursor-pointer hover:bg-pink-950 transition-colors duration-150"
                >
                    Add To Cart
                </Button>
            </div>
        </div>
    );
}
