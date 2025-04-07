'use client'
import React from 'react';
import Heading from '../CustomHooks/heading';
import useStore from '../CustomHooks/useStore';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';


const BestDeals = () => {
    const {data : newPhones,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/latest-phones/${userId}}`,fetcher);
  console.log('best saller', newPhones?.data);

    return (
        <div className="mt-12 w-11/12 mx-auto">
          <Heading title={'Brand New Phone'}/>
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
                    newPhones?.data && newPhones?.data.length > 0 ? 
                    newPhones?.data.slice(0, 12).map((product) => {
                      return (
                       <ProductCard product={product} key={product.id}/>
                     );
                 })
                    : <p className='text-black text-center'>No products found</p>
                }
                </div>
            </div>
        </div>
    );
};

export default BestDeals;