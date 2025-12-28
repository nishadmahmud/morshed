import React, { Suspense } from 'react'
import ProductDetailsUi from './ProductDetailsUi';
import { userId } from '@/app/(home)/page';

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  console.log("API URL:", process.env.NEXT_PUBLIC_API);
  console.log("Product ID:", id);

  const productPromise = fetch(`${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}`, { next: { revalidate: 60 } });

  const relatedProductPromise = fetch(`${process.env.NEXT_PUBLIC_API}/public/get-related-products`, {
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

  const [res, relatedProductRes] = await Promise.all([productPromise, relatedProductPromise]);

  if (!res.ok) {
    console.error(`Product API Error: ${res.status} ${res.statusText}`);
  }

  if (!relatedProductRes.ok) {
    console.error(`Related Products API Error: ${relatedProductRes.status} ${relatedProductRes.statusText}`);
  }

  const data = res.ok ? res.json() : Promise.resolve(null);
  const relatedProducts = relatedProductRes.ok ? relatedProductRes.json() : Promise.resolve([]);


  return (
    <Suspense>
      <ProductDetailsUi data={data} id={id} relatedProductsData={relatedProducts} />
    </Suspense>
  )
}
