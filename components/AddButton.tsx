"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export default function AddButton({ product }: any) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <Button className="m-5 cursor-pointer hover:bg-pink-950 transition-colors duration-150"
      onClick={() =>
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        })
      }
    >
      Add to Cart
    </Button>
  );
}
