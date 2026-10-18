/**
 * Otach — cart helpers
 * Pure, framework-agnostic cart operations shared by the cart context and the UI.
 */

export const CART_STORAGE_KEY = "otach.cart.v1";
export const MAX_QUANTITY_PER_ITEM = 20;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function normalizePrice(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
}

export function clampQuantity(value) {
  const numeric = Math.trunc(Number(value));
  if (!Number.isFinite(numeric)) return 1;
  return Math.min(Math.max(numeric, 1), MAX_QUANTITY_PER_ITEM);
}

export function formatPrice(value) {
  return `$${normalizePrice(value).toFixed(2)}`;
}

/** Convert any stored value (e.g. parsed localStorage JSON) into a valid cart array. */
export function normalizeCartItems(value) {
  if (!Array.isArray(value)) return [];

  const byId = new Map();

  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;

    const id = isNonEmptyString(entry.id) ? entry.id.trim() : "";
    if (!id) continue;

    const quantity = clampQuantity(entry.quantity);
    const existing = byId.get(id);

    if (existing) {
      // Never keep duplicate lines for the same product.
      existing.quantity = Math.min(existing.quantity + quantity, MAX_QUANTITY_PER_ITEM);
      continue;
    }

    byId.set(id, {
      id,
      title: isNonEmptyString(entry.title) ? entry.title.trim() : "Timepiece",
      price: normalizePrice(entry.price),
      image: typeof entry.image === "string" ? entry.image : "",
      category: typeof entry.category === "string" ? entry.category : "",
      quantity,
    });
  }

  return Array.from(byId.values());
}

/** Build a persistable cart line from a catalogue product record. */
export function toCartLine(product, quantity) {
  return {
    id: product.id.trim(),
    title: isNonEmptyString(product.name) ? product.name.trim() : isNonEmptyString(product.title) ? product.title.trim() : "Timepiece",
    price: normalizePrice(product.price),
    image: typeof product.image === "string" ? product.image : "",
    category: typeof product.category === "string" ? product.category : "",
    quantity: clampQuantity(quantity),
  };
}

/**
 * Add a product to the cart, merging into an existing line when present.
 * Returns the next items plus a status the UI can turn into feedback.
 * status: "added" | "merged" | "limit" | "out-of-stock" | "invalid"
 */
export function addItemToCart(items, product, quantity = 1) {
  const id = isNonEmptyString(product?.id) ? product.id.trim() : "";
  if (!id) return { items, status: "invalid", quantity: 0, totalQuantity: 0, capped: false };

  if (product.inStock === false) {
    return { items, status: "out-of-stock", quantity: 0, totalQuantity: 0, capped: false };
  }

  const requested = clampQuantity(quantity);
  const existing = items.find((item) => item.id === id);
  const currentQuantity = existing?.quantity ?? 0;
  const remaining = MAX_QUANTITY_PER_ITEM - currentQuantity;

  if (remaining <= 0) {
    return { items, status: "limit", quantity: 0, totalQuantity: currentQuantity, capped: true };
  }

  const applied = Math.min(requested, remaining);
  const nextItems = existing
    ? items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + applied } : item))
    : [...items, toCartLine(product, applied)];

  return {
    items: nextItems,
    status: existing ? "merged" : "added",
    quantity: applied,
    totalQuantity: currentQuantity + applied,
    capped: applied < requested,
  };
}

/** Set an exact quantity; a value below 1 removes the line. */
export function setItemQuantity(items, id, quantity) {
  const numeric = Math.trunc(Number(quantity));
  if (!Number.isFinite(numeric) || numeric < 1) return removeItemFromCart(items, id);

  return items.map((item) =>
    item.id === id ? { ...item, quantity: clampQuantity(numeric) } : item
  );
}

export function removeItemFromCart(items, id) {
  return items.filter((item) => item.id !== id);
}

export function computeCartTotals(items) {
  let itemCount = 0;
  let subtotal = 0;

  for (const item of items) {
    itemCount += item.quantity;
    subtotal += normalizePrice(item.price) * item.quantity;
  }

  return { itemCount, subtotal: Math.round(subtotal * 100) / 100 };
}

export function getCartItemQuantity(items, id) {
  return items.find((item) => item.id === id)?.quantity ?? 0;
}
