"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmNamePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/sign-in");
      return;
    }

    if (!user?.firstName || !user?.lastName) {
      router.replace("/complete-profile");
      return;
    }

     
    router.replace("/");
  }, [isLoaded, isSignedIn, user, router]);

  return null;
}