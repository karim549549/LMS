"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";

export function UserRestoreProvider({ children }: { children: React.ReactNode }) {
  const { user, registerUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      registerUser().finally(() => setLoading(false));
    }
  }, [user, registerUser]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
} 