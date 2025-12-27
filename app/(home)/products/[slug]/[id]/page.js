import React, { Suspense } from 'react'
import ProductDetailsUi from './ProductDetailsUi';
import { userId } from '@/app/(home)/page';

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  console.log("API URL:", process.env.NEXT_PUBLIC_API);
  console.log("Product ID:", id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}`, { cache: 'no-cache' });

  if (!res.ok) {
    console.error(`Product API Error: ${res.status} ${res.statusText}`);
    const text = await res.text();
    console.error("Response:", text.substring(0, 200));
    // Return null or handle error appropriately so use(data) doesn't crash
    // For now, we return a promise that resolves to null to avoid crashing this component code block immediately,
    // but the UI component likely expects data.
  }
  const data = res.ok ? res.json() : Promise.resolve(null);

  const relatedProductRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/get-related-products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: id,
      user_id: userId,
    }),
    cache: "no-store",
  });

  if (!relatedProductRes.ok) {
    console.error(`Related Products API Error: ${relatedProductRes.status} ${relatedProductRes.statusText}`);
  }
  const relatedProducts = relatedProductRes.ok ? relatedProductRes.json() : Promise.resolve([]);


  return (
    <Suspense>
      <ProductDetailsUi data={data} id={id} relatedProductsData={relatedProducts} />
    </Suspense>
  )
}
