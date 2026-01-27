"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";




export default function AuthGuardPage() {
  const { user} = useUser();
  const router = useRouter();

  useEffect(() => {
  

    // مسجل دخول لكن لم يكتب اسمه
    if (!user.firstName || !user.lastName) {
      router.replace("/complete-profile");
      return;
    }

    // كل شيء مكتمل
    router.replace("/");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Checking your account...
    </div>
  );
}
