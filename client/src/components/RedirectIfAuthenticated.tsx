"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if(user) {
        router.replace('/')
    }
  }, [user, router]);
  if (user) return null;
  return <>{children}</>;
} 