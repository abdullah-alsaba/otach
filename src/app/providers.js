"use client";

import { useRouter } from "next/navigation";
import { RouterProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export function Providers({ children }) {
  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>

      {/* Single notification host for the whole app (styles themed in globals.css). */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        draggable
        limit={3}
        theme="light"
        className="otach-toast-container"
      />
    </RouterProvider>
  );
}
