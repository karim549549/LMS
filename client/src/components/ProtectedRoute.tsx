"use client";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  useProtectedRoute();
  return <>{children}</>;
} 