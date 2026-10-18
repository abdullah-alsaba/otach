import { Suspense } from "react";
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

/* `params` is URL data, so it may only be read inside a <Suspense> boundary.
   Reading it here (instead of at the top of the page) keeps the route's static
   shell URL-independent, so the shell can be shared by every product link. */
async function ProductDetailRoute({ params }) {
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

export default function ProductDetailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="container-otach min-h-[60vh] flex items-center justify-center py-20">
          <p className="text-sm text-[var(--text-muted)]">Loading timepiece…</p>
        </div>
      }
    >
      <ProductDetailRoute params={params} />
    </Suspense>
  );
}
