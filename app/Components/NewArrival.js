'use client'
import React from 'react';
import Heading from '../CustomHooks/heading';
import useStore from '../CustomHooks/useStore';
import Link from 'next/link';
import SubHeading from '../CustomHooks/subHeading';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';


const NewArrival = () => {
    const {handleCart,handleBuy} = useStore();
    const {data : bestSellers,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/best-sellers/${userId}`,fetcher);
  console.log('best saller', bestSellers);

    return (
        <div className="mt-12">
          <Heading title={'Most Selling Products'}/>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 w-11/12 mx-auto">
                
                {/* products */}
                <div className="col-span-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 md:gap-5 lg:gap-6 md:col-span-3 gap-2 lg:col-span-5 mt-7">
                {
                    isLoading ?
                    <div className='col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                      {
                        Array.from({length : 12}).map((_,idx) => {
                          return  <CardSkeleton key={idx} />
                      })
                      }
                      </div>  
                      :
                    bestSellers?.data.length > 0 ? 
                    bestSellers?.data.slice(0, 12).map((product) => {
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

export default NewArrival;