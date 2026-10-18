/**
 * Otach — member-created catalogue items.
 *
 * Ownership lives in a single field, `userId`, holding the Firebase Auth uid of
 * the member who created the document. Create, list and delete all read that
 * same field, and `firestore.rules` enforces it server-side, so a member can
 * only ever touch their own documents.
 *
 * Documents written without that field are never claimed by anybody: the owner
 * query filters on `userId`, so an unowned document stays untouched in Firestore
 * and simply does not appear in anyone's catalogue.
 */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const ITEMS_COLLECTION = "items";
export const DEFAULT_ITEM_IMAGE = "/images/watch-classic.jpg";

const ALLOWED_CATEGORIES = new Set(["analog", "smartwatch", "sport"]);

export function mapItemDocument(snapshot) {
  const data = snapshot.data() || {};
  const price = Number(data.price);
  const imageUrl = typeof data.imageUrl === "string" ? data.imageUrl.trim() : "";

  return {
    id: snapshot.id,
    title: data.title || "",
    name: data.title || "Untitled timepiece",
    shortDescription: data.shortDescription || "",
    tagline: data.shortDescription || "",
    description: data.description || "",
    price: Number.isFinite(price) ? price : 0,
    category: data.category || "analog",
    imageUrl,
    image: imageUrl || DEFAULT_ITEM_IMAGE,
    images: [imageUrl || DEFAULT_ITEM_IMAGE],
    userId: data.userId || "",
    createdAt: data.createdAt || null,
    inStock: true,
  };
}

export async function createItem({ userId, title, shortDescription, description, price, category, imageUrl }) {
  if (!userId) {
    throw new Error("You must be signed in to add a timepiece.");
  }

  const normalizedCategory = ALLOWED_CATEGORIES.has(category) ? category : "analog";
  const numericPrice = Number(price);
  const trimmedImageUrl = imageUrl?.trim() || "";

  const docRef = await addDoc(collection(db, ITEMS_COLLECTION), {
    title: title.trim(),
    shortDescription: shortDescription.trim(),
    description: description.trim(),
    price: numericPrice,
    category: normalizedCategory,
    imageUrl: trimmedImageUrl,
    userId,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Lists the documents owned by `userId`. The `where` constraint is what makes
 * the query legal under the security rules — a list request must carry the same
 * ownership filter the rules check, otherwise Firestore rejects the whole query.
 */
export async function getOwnedItems(userId) {
  if (!userId) return [];

  const itemsQuery = query(
    collection(db, ITEMS_COLLECTION),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(itemsQuery);
  const items = snapshot.docs.map(mapItemDocument);

  return items.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() || 0;
    const bTime = b.createdAt?.toMillis?.() || 0;
    return bTime - aTime;
  });
}

export async function getOwnedItem(itemId, userId) {
  if (!itemId || !userId) return null;

  const snapshot = await getDoc(doc(db, ITEMS_COLLECTION, itemId));
  if (!snapshot.exists()) return null;

  const item = mapItemDocument(snapshot);
  if (item.userId !== userId) return null;

  return item;
}

export async function deleteOwnedItem(itemId, userId) {
  if (!itemId || !userId) {
    throw new Error("You must be signed in to delete a timepiece.");
  }

  const itemRef = doc(db, ITEMS_COLLECTION, itemId);
  const snapshot = await getDoc(itemRef);

  if (!snapshot.exists()) {
    throw new Error("This timepiece could not be found.");
  }

  if (snapshot.data()?.userId !== userId) {
    throw new Error("You can only delete timepieces that you own.");
  }

  await deleteDoc(itemRef);
}
