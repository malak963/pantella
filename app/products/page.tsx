"use client";

import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { useSearchParams } from "next/navigation";
import PageLoader from "../../components/ui/PageLoader";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const searchValue = searchParams.get("search") || "";

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            });
    }, []);


    if (loading) return <PageLoader />;

    const filteredProducts = searchValue
        ? products.filter((product) =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        : products;

    return (
        <section className="my-10 px-6">
            <h1 className="font-semibold text-3xl text-center m-5 italic text-amber-800">
                Our Products
            </h1>

            <ProductsGrid products={filteredProducts} />
        </section>
    );
}
