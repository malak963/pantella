"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import PageLoader from "@/components/ui/PageLoader";

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
};

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug;

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        fetch(`https://dummyjson.com/products/category/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [slug]);


    useEffect(() => {
        if (searchQuery) {
            setFilteredProducts(
                products.filter((p) => p.title.toLowerCase().includes(searchQuery))
            );
        } else {
            setFilteredProducts(products);
        }
    }, [searchQuery, products]);


    if (loading) return <PageLoader />;
    if (filteredProducts.length === 0)
        return <p className="text-center mt-6">No products found!</p>;

    return (
        <section className="p-6">
            <h1 className="text-3xl font-semibold text-center mb-6 capitalize">{slug}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <div className="border p-4 rounded-xl flex flex-col items-center hover:bg-amber-100 transition-colors">
                            <Image src={product.thumbnail} alt={product.title} width={150} height={150} />
                            <h3 className="mt-2 font-medium">{product.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
