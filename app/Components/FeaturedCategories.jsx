'use client';

import Heading from "../CustomHooks/heading";
import Image from "next/image";
import Link from "next/link";
import noImg from "/public/no-image.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const FeaturedCategories = ({ categories }) => {
  const categoryList = categories?.data ?? [];
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="lg:mt-16 md:mt-10 mt-0 bg-black ">
      <div className="md:w-11/12 mx-auto min-h-[50vh] text-white px-4 sm:px-6 md:px-8 py-12 pb-14 relative ">
        <h2 className="md:text-3xl text-xl font-bold mb-1">Categories that inspire</h2>
        <p className="md:text-xl text-lg text-white/70 mb-6">Featured categories</p>

        {/* Custom Navigation Buttons */}
        <div className="absolute top-16 right-10 flex items-center space-x-5 z-10">
          <button ref={prevRef} className="text-white">
            <MdArrowBackIos size={25}></MdArrowBackIos>
          </button>
          <button ref={nextRef} className="text-white">
            <MdArrowForwardIos size={25}></MdArrowForwardIos>
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={5}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="pb-10"
        >
          {categoryList.map((category, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`category/${encodeURIComponent(
                  category?.category_id
                )}?category=${encodeURIComponent(
                  category?.name
                )}&total=${encodeURIComponent(category?.product_count)}`}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 relative block lg:w-60"
              >
                <div className="relative h-56 md:h-60">
                  <Image
                    unoptimized
                    src={category.image_url || noImg}
                    alt={category.name || "category"}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
                  <h3 className="font-bold text-sm">{category.name}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedCategories;
