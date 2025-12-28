import React, { Suspense } from 'react'
import ProductDetailsUi from './ProductDetailsUi';
import BrandedSpinner from '@/app/Components/BrandedSpinner';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product-details', id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}`, {
        next: { revalidate: 60 }
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    }
  });

  return (
    <Suspense fallback={<BrandedSpinner />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailsUi id={id} userId={userId} />
      </HydrationBoundary>
    </Suspense>
  )
}
