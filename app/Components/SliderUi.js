"use client";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "../globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {  useRef } from "react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import Link from "next/link";

const sanitizeSlug = (str) => {
  return str
    ?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const SliderUi = ({ slider }) => {
  const swiperRef = useRef(null);

  return (
    <div className="pt-[3.5rem] w-full aspect-video h-[30vh] md:h-auto relative">
      <Swiper
        pagination={{ clickable: true }}
        ref={swiperRef}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        speed={500}
        modules={[Autoplay, Pagination]}
        className="relative"
      >
        {slider.status === 200 &&
          slider?.data.length > 0 &&
          slider?.data[0]?.image_path?.map((img, idx) => {
            const product = slider?.data[0]?.products?.[0]; // only one product
            if (!product) return null;

            const slug = sanitizeSlug(product?.brand_name || product?.name);
            const productId = product?.id;
            const productLink = `/products/${slug}/${productId}`;

            return (
              <SwiperSlide
                key={idx}
                className="relative w-full aspect-video"
              >
                <Link href={productLink}>
                  <Image
                    src={img}
                    priority={idx === 0}
                    alt={product?.name || "slider-image"}
                    fill
                    quality={100}
                    className="cursor-pointer object-cover transition-transform duration-300"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* Navigation Buttons */}
      <div
        onClick={() => swiperRef.current.swiper.slideNext()}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white opacity-80 cursor-pointer rounded-full lg:p-3 p-2 z-10"
      >
        <FaChevronRight className="text-black lg:text-xl text-sm" />
      </div>

      <div
        onClick={() => swiperRef.current.swiper.slidePrev()}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white opacity-80 cursor-pointer rounded-full lg:p-3 p-2 z-10"
      >
        <FaChevronLeft className="text-black lg:text-xl text-sm" />
      </div>
    </div>
  );
};

export default SliderUi;
