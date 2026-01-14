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
    <div className="pt-[3.5rem] w-full aspect-video h-[40vh] md:h-[70vh] lg:h-[85vh] relative bg-gray-100">
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        speed={800}
        modules={[Autoplay, EffectFade]}
        className="h-full"
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
                <Link href={productLink} className="block w-full h-full">
                  <Image
                    src={img}
                    priority={idx === 0}
                    alt={product?.name || "slider-image"}
                    fill
                    quality={90}
                    className="object-cover"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* Navigation Buttons - Clean Design */}
      <button
        onClick={() => swiperRef.current?.swiper?.slideNext()}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white cursor-pointer rounded-full p-3 z-10 transition-colors duration-200 shadow-sm"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-gray-800 text-sm lg:text-base" />
      </button>

      <button
        onClick={() => swiperRef.current?.swiper?.slidePrev()}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white cursor-pointer rounded-full p-3 z-10 transition-colors duration-200 shadow-sm"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-gray-800 text-sm lg:text-base" />
      </button>
    </div>
  );
};

export default SliderUi;
