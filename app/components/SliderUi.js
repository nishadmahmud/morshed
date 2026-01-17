"use client";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
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

  // Custom Navigation function
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="w-full h-[30vh] md:h-[calc(100vh-100px)] relative group overflow-hidden">
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        className="h-full w-full custom-swiper-pagination"
      >
        {slider.status === 200 &&
          slider?.data.length > 0 &&
          slider?.data[0]?.image_path?.map((img, idx) => {
            const product = slider?.data[0]?.products?.[0];
            // Safe check for product to avoid errors if data structure mismatch
            if (!product) {
              // Fallback if just displaying image without product link
              return (
                <SwiperSlide key={idx} className="relative w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      priority={idx === 0}
                      alt={`slider-image-${idx}`}
                      fill
                      quality={100}
                      className="object-cover object-center"
                    />
                  </div>
                </SwiperSlide>
              )
            }

            const slug = sanitizeSlug(product?.brand_name || product?.name);
            const productId = product?.id;
            const productLink = `/products/${slug}/${productId}`;

            return (
              <SwiperSlide key={idx} className="relative w-full h-full">
                <Link href={productLink} className="block w-full h-full relative cursor-pointer">
                  <Image
                    src={img}
                    priority={idx === 0}
                    alt={product?.name || "slider-image"}
                    fill
                    quality={100}
                    className="object-cover object-center"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* Custom Navigation Buttons - Minimalist & Elegant */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4 md:pl-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrev}
          className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 transform hover:scale-110 border border-white/20 active:scale-95"
          aria-label="Previous Slide"
        >
          <FaArrowLeft className="text-sm md:text-lg" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-4 md:pr-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleNext}
          className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 transform hover:scale-110 border border-white/20 active:scale-95"
          aria-label="Next Slide"
        >
          <FaArrowRight className="text-sm md:text-lg" />
        </button>
      </div>

      {/* Pagination Styling override */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default SliderUi;
