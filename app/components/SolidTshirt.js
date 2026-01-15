
import React, { Suspense } from 'react';
import SolidShirtUi from './SolidShirtUi';
import CardSkeleton from './CardSkeleton';

const SolidTshirt = async () => {

  const solidTshirtCategoryId = 6750;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${solidTshirtCategoryId}&limit=12`);
  const data = res.json();

  return (
    <div>
      <Suspense fallback={<CardSkeleton />}>
        <SolidShirtUi data={data}/>
      </Suspense>
    </div>
  );
};

export default SolidTshirt;