'use client';

import { Card } from '../../components/ui/card';
import { CartSummary } from '../../components/CartSummary';
import { CartItem } from '../../components/CartItem';
import { useCartStore } from '../../store/cartStore';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function CartPage() {
    const items = useCartStore(state => state.items);
    const clearCart = useCartStore(state => state.clearCart);

    const { isSignedIn } = useUser();
    const router = useRouter();
    if (!isSignedIn) {
        clearCart();
        toast.error("Please sign in to view your cart");
        router.push("/");
        return null;
    }


    if (!items.length) {
        return (
            <div className='flex items-center justify-center '>
                <div className="w-200 mt-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-100 text-center">

                    <h3 className="font-semibold text-3xl text-center m-5 italic text-amber-800">
                        Your cart is empty <span className="text-7xl">🛒</span>
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Looks like you haven’t added anything yet
                    </p>

                    <div className="mt-5">
                        <Link href="/products">
                            <Button className="m-5 cursor-pointer hover:bg-pink-950 transition-colors duration-150">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
            <h1 className="font-semibold text-3xl text-center m-5 italic text-amber-800">Your Cart</h1>
            <Card className="p-4 space-y-4">
                {items.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </Card>
            <CartSummary />
        </div>
    );
}