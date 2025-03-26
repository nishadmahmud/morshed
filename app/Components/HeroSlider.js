"use client";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "../globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Compare from "./Compare";
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import Link from "next/link";

const HeroSlider = ({ slider, banner, data }) => {
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
    <div className="lg:max-w-[100%] lg:mr-2 xl:pt-32 lg:pt-16 pt-10 md:pt-20 max-w-[100%] w-full mx-auto flex lg:flex-row   items-center">
      {/* Grid Layout */}
      <div className="flex gap-4">
        
        {/* category section */}
        {/* <div className="w-[40%] pt-5 pb-2 px-3 text-black bg-gray-100 h-[77vh] overflow-y-auto hidden lg:block">
          <div className="flex items-center gap-1 rounded-sm bg-[#c03b2c] text-white p-3">
            <Menu></Menu>
            Categories
          </div>

          <div className="text-black flex flex-col gap-5 mt-3">
            {data?.data?.map((item, idx) => (
              <Link
                key={idx}
                href={`/category/${encodeURIComponent(
                  item.category_id
                )}?category=${encodeURIComponent(
                  item.name
                )}&total=${encodeURIComponent(item.product_count)}`}
                className="text-[#555555] text-sm font-semibold flex items-center gap-1 hover:text-[#c03b2c] transition-all ease-in-out"
              >
                <Image
                unoptimized
                  width={22}
                  height={22}
                  src={item.image_url || noImg}
                  alt="category"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </div> */}
            
       
        <div className="grid">

         
          {/* Slider Section */}     
        <div className="md:w-[88%] mx-auto w-full flex flex-col md:rounded-xl h-[32vh] justify-center overflow-hidden relative lg:h-[70vh] md:h-[60vh] lg:mb-4">
          
          <Swiper
          pagination={true}
            ref={swiperRef}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            speed={500}
            modules={[Autoplay, Pagination]}
          >
            {slider.status === 200 &&
              slider?.data.length > 0 &&
              slider.data[0].image_path.map((img, idx) => (
                <SwiperSlide key={idx} className="relative w-full ">
                <Link href={idx === 0 ? '/brands/1761?brand=Apple%20Inc.' : idx === 1 ? '/brands/1760?brand=Samsung' : '/brands/1759?brand=Pixel'}>
                  <Image
                  unoptimized
                    src={img}
                    priority={idx === 0}
                    alt="slider-image"
                    width={1000}
                    height={200}
                    quality={100}
                    className="md::rounded-xl cursor-pointer"
                  />
                </Link>
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

        <div className="text-[#c03b2c] mx-auto md:w-[88%] mb-3 md:mt-0 mt-3">
        <Marquee className="text-xl font-medium">
        🎊 Eid-ul-Fitr Exclusive Offer on Phones & Gadgets! 🎊 | 📅 Limited Time Only! Celebrate Eid with the latest tech at unbeatable discounts!
    </Marquee>
        </div>

        
            {/* Banner Section */}
            {/* <div className="col-span-1 hidden md:block">
          <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-1 lg:gap-4 mt-2 gap-2 lg:mt-0 gap-y-3">
            {banner?.data?.[0] && (
              <div className="w-full h-32 lg:h-[37vh] md:h-[35vh] relative">
                <Image
                unoptimized
                  src={banner.data[0].image_path}
                  fill
                  style={{ objectFit: "cover" }}
                  className="cursor-pointer rounded-md "
                  alt="banner"
                  priority={true}
                />
              </div>
            )}

            {banner?.data?.[1] && (
              <div className="w-full h-32 lg:h-[37.5vh] md:h-[25vh] relative">
                <Image
                unoptimized
                  src={banner.data[1].image_path || "No Img"}
                  fill
                  style={{ objectFit: "cover" }}
                  className="cursor-pointer rounded-md"
                  alt="banner"
                  priority={true}
                />
              </div>
            )}
          </div>

        </div> */}

        
        </div>
        
          
      </div>

      {/* Compare Section */}
      <div className="mt-8">
        <Compare />
      </div>
    </div>
  );
};

export default HeroSlider;
