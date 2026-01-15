import React, { Suspense } from 'react'
import HalfSleevePoloUi from './HalfSleevePoloUi';
import CardSkeleton from './CardSkeleton';

export default async function HalfSelveePolo() {
   const halfSelveePoloCategoryId = 6797;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${halfSelveePoloCategoryId}&limit=12`);
  const data = res.json();

  return (
    <div>
      <Suspense fallback={<CardSkeleton />}>
        <HalfSleevePoloUi data={data}/>
      </Suspense>
    </div>
  )
}
