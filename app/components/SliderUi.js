"use client";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
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
    <div className="w-full h-[50vh] md:h-[calc(100vh-80px)] relative bg-gray-50 group">
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        modules={[Autoplay, EffectFade]}
        className="h-full w-full"
      >
        {slider.status === 200 &&
          slider?.data.length > 0 &&
          slider?.data[0]?.image_path?.map((img, idx) => {
            const product = slider?.data[0]?.products?.[0];
            if (!product) return null;

            const slug = sanitizeSlug(product?.brand_name || product?.name);
            const productId = product?.id;
            const productLink = `/products/${slug}/${productId}`;

            return (
              <SwiperSlide key={idx} className="relative w-full h-full">
                <Link href={productLink} className="block w-full h-full relative">
                  <Image
                    src={img}
                    priority={idx === 0}
                    alt={product?.name || "slider-image"}
                    fill
                    quality={95}
                    className="object-cover"
                  />
                  {/* Subtle Gradient Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* Navigation Buttons - Glassmorphism, Visible on Hover */}
      <button
        onClick={() => swiperRef.current?.swiper?.slideNext()}
        className="
          absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 
          bg-white/10 hover:bg-white text-white hover:text-black 
          backdrop-blur-md border border-white/20
          cursor-pointer rounded-full p-4 z-10 
          transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0
          shadow-lg
        "
        aria-label="Next slide"
      >
        <FaChevronRight className="text-lg" />
      </button>

      <button
        onClick={() => swiperRef.current?.swiper?.slidePrev()}
        className="
          absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 
          bg-white/10 hover:bg-white text-white hover:text-black 
          backdrop-blur-md border border-white/20
          cursor-pointer rounded-full p-4 z-10 
          transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0
          shadow-lg
        "
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-lg" />
      </button>
    </div>
  );
};

export default SliderUi;
