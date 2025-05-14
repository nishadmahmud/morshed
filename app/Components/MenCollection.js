'use client'
import React from 'react';
import Heading from '../CustomHooks/heading';
import useStore from '../CustomHooks/useStore';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';


const MenCollection = () => {
    const {data : menCollection,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/best-sellers/${userId}`,fetcher);
  console.log('latest phone', menCollection?.data);

    return (
        <div className="mt-12 w-11/12 mx-auto">
          <Heading title={'Men Collections'}/>
            <div>
                
                {/* products */}
                <div className="grid grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-6 md:col-span-3 gap-2 lg:grid-cols-4 xl:grid-cols-6 mt-7">
                {
                    isLoading ?
                    <div className='col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2'>
                      {
                        Array.from({length : 12}).map((_,idx) => {
                          return  <CardSkeleton key={idx} />
                      })
                      }
                      </div>  
                      :
                   menCollection?.data.length > 0 ? 
  Array.from({ length: 12 }).map((_, index) => {
    const product = menCollection.data[index % menCollection.data.length];
    return (
      <ProductCard product={product} key={index} />
    );
  })
: <p className='text-black text-center'>No products found</p>


                }
                </div>
            </div>
        </div>
    );
};

export default MenCollection;