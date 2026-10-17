"use client";

import { useRouter } from "next/navigation";
import { RouterProvider, ToastProvider } from "@heroui/react";

export function Providers({ children }) {
  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>
      <ToastProvider placement="top-right" />
      {children}
    </RouterProvider>
  );
}

