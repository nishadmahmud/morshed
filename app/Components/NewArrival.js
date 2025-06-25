'use client'
import React from 'react';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const NewArrival = () => {
  const { data: newArrival, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/products/${userId}?page=1`,
    fetcher
  );

  return (
    <div className="my-12 md:w-10/12 w-11/12 mx-auto">
      <h1 className='md:text-2xl text-lg text-center py-2 text-black font-semibold'>New Arrival</h1>
      <p className='text-center md:w-7/12 mx-auto text-gray-800'>
       Elevate your wardrobe with our New Arrivals—a curated collection designed to inspire confidence, comfort, and effortless style.
      </p>

      <div className="mt-7">
        <Swiper
          className='w-full'
          spaceBetween={10}
          slidesPerView={4}
          slidesPerGroup={4}
          loop={true}
          speed={1500}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }}
        >
          {isLoading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <SwiperSlide key={`loading-${idx}`}>
                <div className="flex justify-center">
                  <CardSkeleton />
                </div>
              </SwiperSlide>
            ))
          ) : newArrival?.data?.length > 0 ? (
            newArrival.data.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex justify-center">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className='w-full text-center'>
              <p className='text-black'>No products found</p>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default NewArrival;
