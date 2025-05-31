import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const BannerSection = ({ banner }) => {
  return (
    <section className="w-[90%] text-black mx-auto flex flex-col lg:flex-row items-center justify-between py-20 gap-10 lg:gap-20">
      {/* Left side - Images */}
    
<div className="relative flex-1 flex justify-center items-center">

   {/* Foreground Image with white background */}
  <div className="rounded-md z-0">
    <div className="relative w-[27rem] h-[70vh] rounded overflow-hidden">
      {banner?.data && banner?.data[4] ? (
        <Image
          src={banner.data[4].image_path}
          alt="Sub Model"
          fill
          className="object-cover rounded"
          loading="lazy"

        />
      ) : (
        <div className="bg-gray-200 w-full h-full" />
      )}
    </div>
  </div>


  {/* Background Image */}
  <div className="relative right-28 -bottom-40 w-72 h-80 rounded-sm overflow-hidden z-30  border-[10px] border-white">
    {banner?.data && banner?.data[3] ? (
      <Image
        src={banner.data[3].image_path}
        alt="Main Model"
        fill
        className="object-cover"
        unoptimized
      />
    ) : (
      <div className="bg-gray-300 w-full h-full" />
    )}
  </div>

 
</div>


      {/* Right side - Text */}
      <div className="flex-1 max-w-xl">
        <p className="text-base font-semibold uppercase tracking-widest">New Collections</p>
        <h2 className="text-5xl font-semibold mt-2 mb-5 leading-tight">
          Best Solid Pattern T-shirt <br className="hidden md:block" /> For Everyone!
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
         Experience comfort and style with our premium solid pattern T-shirt, designed to suit all body types and every occasion. Made from soft, breathable fabric, it’s perfect for everyday wear.


        </p>
        <Link href="/category/6785?category=New%20Eid%20Collection&total=2">
          <div className="inline-flex items-center gap-2 border border-black px-5 py-2 font-medium hover:bg-black hover:text-white transition-all">
            Shop Now <FaArrowRight />
          </div>
        </Link>

        {/* Divider */}
        {/* <hr className="my-8" /> */}

        {/* Rating Section */}
        {/* <div>
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
            <span className="text-gray-600 ml-2">4.5 (10,000+) Rating</span>
          </div>
          <p className="text-gray-600">
           Experience ultimate comfort and effortless style. Made for everyday wear, this T-shirt blends simplicity with quality to keep you looking and feeling great.
          </p>
          <p className="mt-2 font-semibold">– Happy Customer</p>
        </div> */}
      </div>
    </section>
  );
};

export default BannerSection;
