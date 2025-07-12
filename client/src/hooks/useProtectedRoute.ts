import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export function useProtectedRoute() {
  const { user, registerUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      registerUser().then((success) => {
        if (!success) {
          router.replace("/auth/login");
        }
      });
    }
  }, [user, registerUser, router]);
} 