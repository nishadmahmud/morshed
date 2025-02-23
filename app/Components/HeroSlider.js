"use client";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "../globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Compare from "./Compare";

const HeroSlider = ({ slider, banner }) => {
  const swiperRef = useRef(null);

  const [height, setHeight] = useState("185%");

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 1024) {
        setHeight("130%");
      } else if (window.innerWidth >= 768) {
        setHeight("150%");
      } else {
        setHeight("185%");
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);


  return (
    <div className="lg:max-w-[98%] lg:mr-2 lg:pt-0 pt-3 max-w-[94%] w-full mx-auto flex lg:flex-row flex-col  items-center gap-x-3">
      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 items-center">
        {/* Slider Section */}
        <div className="lg:col-span-5 w-full flex flex-col h-[25vh] justify-center overflow-hidden relative rounded-md lg:h-[76vh] mb-0.5">
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            speed={500}
            modules={[Autoplay]}
           
          >
            {slider.status === 200 &&
              slider?.data.length > 0 &&
              slider.data[0].image_path.map((img, idx) => (
                <SwiperSlide key={idx} className="relative w-full">
                  <Image
                    src={img}
                    priority={idx === 0}
                    alt="slider-image"
                    width={1000}
                    height={200}
                    quality={100}
                   
                  />
                </SwiperSlide>
              ))}
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


      </div>
       {/* Banner Section */}
      <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-1 gap-2 mt-2 lg:mt-0 gap-y-3">
        {banner?.data?.[0] && (
          <div className="w-full h-28 lg:h-[37vh] relative">
            <Image
              src={banner.data[0].image_path}
              fill
              style={{ objectFit: "cover" }}
              className="cursor-pointer rounded-md shadow-md"
              alt="banner"
              priority={true}
            />
          </div>
        )}

        {banner?.data?.[1] && (
          <div className="w-full h-28 lg:h-[37vh] relative">
            <Image
              src={banner.data[1].image_path || "No Img"}
              fill
              style={{ objectFit: "cover" }}
              className="cursor-pointer rounded-md shadow-md"
              alt="banner"
              priority={true}
            />
          </div>
        )}
      </div>

      {/* Compare Section */}
      <div className="mt-8">
        <Compare />
      </div>
    </div>
  );
};

export default HeroSlider;
