"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  MAX_QUANTITY_PER_ITEM,
  addItemToCart,
  computeCartTotals,
  getCartItemQuantity,
  getCartStorageKey,
  normalizeCartItems,
  removeItemFromCart,
  setItemQuantity,
} from "@/lib/cart";
import { useAuth } from "@/context/AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  /* A bag belongs to the signed-in account: it is read from and written to a
     key derived from that account's uid, and it is dropped as soon as the
     account changes or signs out. Two shoppers sharing a browser therefore
     never see each other's bag. */
  const storageKey = getCartStorageKey(user?.uid);

  const [cart, setCart] = useState({ items: [], storageKey: null, hydrated: false });

  /* Restore the account's bag after the initial auth check, so the server
     render and the first client render both start empty. */
  useEffect(() => {
    if (authLoading) return;

    let restored = [];

    if (storageKey) {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) restored = normalizeCartItems(JSON.parse(stored));
      } catch {
        restored = [];
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore of the signed-in account's bag; the server render must stay empty
    setCart({ items: restored, storageKey, hydrated: true });
  }, [authLoading, storageKey]);

  /* Persist under the key the current lines belong to. While a new account is
     still being restored this writes the previous account's bag back to its own
     key, so one shopper's cart can never be copied into another's. */
  useEffect(() => {
    if (!cart.hydrated || !cart.storageKey) return;

    try {
      window.localStorage.setItem(cart.storageKey, JSON.stringify(cart.items));
    } catch {
      /* Storage can be blocked or full — the in-memory bag still works. */
    }
  }, [cart]);

  const { items, hydrated } = cart;

  const addItem = useCallback(
    (product, quantity = 1) => {
      const result = addItemToCart(items, product, quantity);
      if (result.items !== items) {
        setCart((prev) => (prev.items === items ? { ...prev, items: result.items } : prev));
      }
      return result;
    },
    [items]
  );

  const updateQuantity = useCallback((id, quantity) => {
    setCart((prev) => ({ ...prev, items: setItemQuantity(prev.items, id, quantity) }));
  }, []);

  const increaseQuantity = useCallback((id) => {
    setCart((prev) => ({
      ...prev,
      items: setItemQuantity(prev.items, id, getCartItemQuantity(prev.items, id) + 1),
    }));
  }, []);

  const decreaseQuantity = useCallback((id) => {
    setCart((prev) => ({
      ...prev,
      items: setItemQuantity(prev.items, id, getCartItemQuantity(prev.items, id) - 1),
    }));
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => ({ ...prev, items: removeItemFromCart(prev.items, id) }));
  }, []);

  const clearCart = useCallback(() => {
    setCart((prev) => ({ ...prev, items: [] }));
  }, []);

  const { itemCount, subtotal } = useMemo(() => computeCartTotals(items), [items]);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      itemCount,
      subtotal,
      maxQuantityPerItem: MAX_QUANTITY_PER_ITEM,
      addItem,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,
      getQuantity: (id) => getCartItemQuantity(items, id),
      isInCart: (id) => getCartItemQuantity(items, id) > 0,
    }),
    [
      items,
      hydrated,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider.");
  }

  return context;
}
