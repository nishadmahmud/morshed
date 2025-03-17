"use client";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "../globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Compare from "./Compare";
import { Headset, House, Map, MapPin, Menu, NotebookPen } from "lucide-react";
import Link from "next/link";
import noImg from "/public/no-image.jpg";

const HeroSlider = ({ slider, banner, data }) => {
  const swiperRef = useRef(null);
  console.log(data);
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
    <div className="lg:max-w-[98%] lg:mr-2 lg:pt-24 pt-[5rem] md:pt-20 max-w-[94%] w-full mx-auto flex lg:flex-row flex-col  items-center gap-x-3">
      {/* Grid Layout */}
      <div className="flex gap-4">
        
        {/* category section */}
        <div className="w-[45%] pt-8 pb-2 px-3 text-black bg-gray-100 h-[81vh] overflow-y-auto hidden lg:block">
          <div className="flex items-center gap-1 rounded-sm bg-[#c03b2c] text-white p-3">
            <Menu></Menu>
            Browse Categories
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
                  width={22}
                  height={22}
                  src={item.image_url || noImg}
                  alt="category"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
            
       
        <div className="grid lg:grid-cols-3 col-span-5 lg:gap-4">

           {/* category section */}
         <div className="col-span-3 justify-end text-black flex items-center gap-6">
          <Link href='/' className="flex items-center gap-1 font-medium hover:text-[#c03b2c]"> <House size={20}></House> Home</Link>
          <Link href='/blogs' className="flex items-center gap-1 font-medium hover:text-[#c03b2c]"> <NotebookPen size={20}></NotebookPen> Blog</Link>
          <Link href='/orderTracking' className="flex items-center gap-0.5 font-medium hover:text-[#c03b2c]"> <MapPin size={20}></MapPin> Order Tracking</Link>
        </div>
          {/* Slider Section */}     
        <div className="lg:col-span-2 w-full flex flex-col h-[39vh] justify-center overflow-hidden relative rounded-md lg:h-[75vh] md:h-[55vh] lg:mb-4">
          
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
                  unoptimized
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

        
            {/* Banner Section */}
            <div className="col-span-1">
          <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-1 lg:gap-4 mt-2 gap-2 lg:mt-0 gap-y-3">
            {banner?.data?.[0] && (
              <div className="w-full h-32 lg:h-[35.5vh] md:h-[35vh] relative">
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

        </div>

        
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
