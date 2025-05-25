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
     const { data: newArrival, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/products/${userId}?page=1&limit=6`,
    fetcher
  );
    // console.log('best saller', newArrival);

    return (
        <div className="my-12 md:w-10/12 w-11/12 mx-auto">
          <h1 className='md:text-2xl text-lg text-center py-2 text-black font-semibold'>New Arrival</h1>
          <p className='text-center w-7/12 mx-auto text-gray-800'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </p>
            <div>
                
                {/* products */}
                <div className="grid grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-10 md:col-span-3 gap-6 lg:grid-cols-3 xl:grid-cols-5 mt-7">
                {
                    isLoading ?
                    <div className='col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                      {
                        Array.from({length : 8}).map((_,idx) => {
                          return  <CardSkeleton key={idx} />
                      })
                      }
                      </div>  
                      :
                    newArrival?.data.length > 0 ? 
                    newArrival?.data.slice(0, 8).map((product) => {
                      return (
                      <>
                       <ProductCard product={product} key={product.id}/>
                      
                      </>
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