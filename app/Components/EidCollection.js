'use client';
import React from 'react';
import Heading from '../CustomHooks/heading';
import useSWR from 'swr';
import { fetcher } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';

const EidCollection = () => {
  const eidCategoryId = 6785;

  const { data: menCollection, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${eidCategoryId}&limit=12`,
    fetcher
  );

  return (
    <div className="mt-12 w-11/12 md:w-10/12 mx-auto">
      <Heading title={'Eid Collections'} />
      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-6 md:col-span-3 gap-6 lg:grid-cols-4 xl:grid-cols-5 mt-7">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))
        ) : menCollection?.data?.length > 0 ? (
          menCollection.data.slice(0, 12).map((product, index) => (
            <ProductCard product={product} key={product.id || index} />
          ))
        ) : (
          <p className="text-black text-center col-span-6">No products found</p>
        )}
      </div>
    </div>
  );
};

export default EidCollection;
