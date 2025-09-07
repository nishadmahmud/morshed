import React, { Suspense } from 'react'
import ProductDetailsUi from './ProductDetailsUi';
import { userId } from '@/app/(home)/page';

export default async function ProductDetailsPage({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}`, { next: { revalidate: 18000 } });
  const data =  res.json();

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

  const relatedProducts = relatedProductRes.json();


  return (
    <Suspense>
      <ProductDetailsUi data={data} id={id} relatedProductsData={relatedProducts}/>
    </Suspense>
  )
}
