import React, { Suspense } from 'react'
import ProductDetailsUi from './ProductDetailsUi';
import BrandedSpinner from '@/app/Components/BrandedSpinner';
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

  const productDataPromise = productPromise.then(res => res.ok ? res.json() : null);
  const relatedDataPromise = relatedProductPromise.then(res => res.ok ? res.json() : []);

  /* 
     Streaming Implementation:
     We pass the promises directly to the client component.
     The client component will use `React.use()` to unwrap them, suspending rendering until data is available.
  */
  return (
    <Suspense fallback={<BrandedSpinner />}>
      <ProductDetailsUi
        productPromise={productDataPromise}
        id={id}
        relatedProductPromise={relatedDataPromise}
      />
    </Suspense>
  )
}
