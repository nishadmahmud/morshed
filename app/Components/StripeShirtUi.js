'use client'
import React, { use } from 'react'
import ProductCard from './ProductCard'
import Heading from '../hooks/heading'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


export default function StripeShirtUi({data}) {

    const collections = use(data);

    return (
        <div className="mt-12 w-11/12 md:w-10/12 mx-auto">
            <Heading title={'Stripe Pattern Shirts'} />

            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                slidesPerGroup={4}
                loop={true}
                speed={800}
                autoplay={{
                    delay: 5000,
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
                { collections?.data?.length > 0
                        ?
                        collections.data.slice(0, 12).map((product, index) => (
                            <SwiperSlide key={product.id || index}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))
                        : (
                            <div className="w-full text-center col-span-6">
                                <p className="text-black">No products found</p>
                            </div>
                        )}
            </Swiper>
        </div>
    )
}
