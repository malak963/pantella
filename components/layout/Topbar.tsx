"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import logo from "../../public/images/logo2.png";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import CartDropdown from "../CartDropdown";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import {
    SignedIn,
    SignedOut,
    useUser,
} from "@clerk/nextjs";
import toast from "react-hot-toast";
import UserAvatarMenu from "../UserAvatarMenu";

export default function TopBar() {
    
    const items = useCartStore((s) => s.items);
    const clearCart = useCartStore((s) => s.clearCart);
    const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
    const [searchInput, setSearchInput] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { isSignedIn } = useUser();

    if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/complete-profile")
  ) {
    return null;
  }

    const handleCartClick = () => {
        if (!isSignedIn) {
            clearCart();
            toast.error("You must sign in to access your cart");
            return;
        }
        router.push("/cart");
    };

    const handleSearch = () => {
        if (!searchInput.trim()) return;

        if (pathname.startsWith("/categories/")) {
            router.push(`${pathname}?search=${encodeURIComponent(searchInput)}`);
            return;
        }

        if (pathname.startsWith("/products")) {
            router.push(`/products?search=${encodeURIComponent(searchInput)}`);
        }
        setSearchInput("");
    };


    const showSearch = pathname.startsWith("/products")|| pathname.startsWith("/categories");

    return (
        <div>
            <main className="flex items-center justify-between gap-4 p-4 bg-black">
                {/* Logo */}
                <Link href={"/"}>
                    <Image src={logo} alt="logo" width={120} height={100} />
                </Link>

                {/* Search */}
                {showSearch && (
                    <div className="md:flex flex-1 max-w-xl border rounded-full">
                        <div className="relative w-full">
                            <input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                type="text"
                                placeholder="Search ......"
                                className="w-full rounded-full px-4 py-2 text-white"
                            />
                            <Search
                                onClick={handleSearch}
                                className="absolute right-3 top-2.5 h-5 w-5 text-white cursor-pointer"
                            />
                        </div>
                    </div>
                )}


                {/* Icons */}
                <div className="flex items-center gap-4 cursor-pointer text-primary font-semibold">
                    <SignedOut>
                        <Link href="/sign-in" className="flex items-center gap-1.5">
                            <span>Account</span>
                            <User size={20} />
                        </Link>
                    </SignedOut>

                    <SignedIn>
                        <UserAvatarMenu />
                    </SignedIn>

                    {/* Cart */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    >
                        <button
                            onClick={handleCartClick}
                            className="cursor-pointer flex items-center gap-1.5"
                        >
                            <span>Cart {isSignedIn ? totalQty : 0}</span>
                            <ShoppingCart size={20} />
                        </button>

                        {open && isSignedIn && (

                            <div className="absolute top-full mt-3 right-0 translate-x-[-20%] z-50">
                                <CartDropdown />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
