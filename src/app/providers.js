"use client";

import { useRouter } from "next/navigation";
import { RouterProvider, ToastProvider } from "@heroui/react";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }) {
  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>
      <ToastProvider placement="top-right" />
      <AuthProvider>{children}</AuthProvider>
    </RouterProvider>
  );
}

