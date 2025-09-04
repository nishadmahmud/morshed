'use client';
import React, { use } from 'react';
import ProductCard from '@/app/Components/ProductCard';
import Heading from '../CustomHooks/heading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


const SolidShirtUi = ({data}) => {

  const items = use(data);

  return (
    <div className="lg:my-16 my-10 md:w-10/12 w-11/12 mx-auto">
      <Heading title={'Solid Pattern T-shirt'} />

      {
      items?.data?.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4}
          loop={true}
          speed={800}
          autoplay={{
            delay: 2000,
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
          className="mt-7"
        >
          {items.data.map((product) => (
            <SwiperSlide key={product.id || product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-black text-center mt-5 col-span-full">
          No products found
        </p>
      )}
    </div>
  );
};

export default SolidShirtUi;
