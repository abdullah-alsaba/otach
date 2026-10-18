import { notFound } from "next/navigation";
import { products, getProductById } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import OwnedItemDetail from "@/components/OwnedItemDetail";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Timepiece Not Found — Otach" };

  return {
    title: `${product.name} — Otach Timepieces`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Otach Timepieces`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return <OwnedItemDetail id={id} />;
  }

  // Related products: same category prioritized, excluding current product
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 3);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
