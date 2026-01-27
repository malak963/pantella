"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserAvatarMenu() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary"
      >
        <Image
          src={user.imageUrl}
          alt={user.fullName ?? "User"}
          width={36}
          height={36}
          className="object-cover"
        />
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white shadow-xl z-50">
          <button
            onClick={() => {
              setOpen(false);
              router.push("/profile");
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 rounded-t-xl"
          >
            My Profile
          </button>

          <SignOutButton>
            <button className="w-full px-4 py-3 text-left text-red-600 hover:bg-gray-100 rounded-b-xl">
              Logout
            </button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
}
