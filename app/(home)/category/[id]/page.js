import React, { Suspense } from 'react'
import CategoryWiseProductUi from './CategoryWiseProductUi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import BrandedSpinner from '@/app/components/BrandedSpinner';

export default async function CategoryProducts({ params }) {

  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['category-products', id, 1, 20],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${id}?page=1&limit=20`, {
        next: { revalidate: 60 }
      });
      if (!res.ok) return { data: [], pagination: null };
      return res.json();
    },
  });

  return (
    <Suspense fallback={<BrandedSpinner />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryWiseProductUi id={id} />
      </HydrationBoundary>
    </Suspense>
  )
}
