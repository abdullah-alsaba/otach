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
  CART_STORAGE_KEY,
  MAX_QUANTITY_PER_ITEM,
  addItemToCart,
  computeCartTotals,
  getCartItemQuantity,
  normalizeCartItems,
  removeItemFromCart,
  setItemQuantity,
} from "@/lib/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  /* Restore the persisted cart after mount so server and client markup match.
     Reading persisted storage can only happen on the client, so this one-time
     state sync intentionally lives in an effect. */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage; the server render must stay empty
      if (stored) setItems(normalizeCartItems(JSON.parse(stored)));
    } catch {
      setItems([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  /* Persist on every change, but never overwrite stored data before hydration. */
  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Storage can be blocked or full — the in-memory cart still works. */
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (product, quantity = 1) => {
      const result = addItemToCart(items, product, quantity);
      if (result.items !== items) setItems(result.items);
      return result;
    },
    [items]
  );

  const updateQuantity = useCallback(
    (id, quantity) => {
      setItems((prev) => setItemQuantity(prev, id, quantity));
    },
    []
  );

  const increaseQuantity = useCallback((id) => {
    setItems((prev) => {
      const current = getCartItemQuantity(prev, id);
      return setItemQuantity(prev, id, current + 1);
    });
  }, []);

  const decreaseQuantity = useCallback((id) => {
    setItems((prev) => {
      const current = getCartItemQuantity(prev, id);
      return setItemQuantity(prev, id, current - 1);
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => removeItemFromCart(prev, id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
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
