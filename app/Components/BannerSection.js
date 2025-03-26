import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Heading from "../CustomHooks/heading";

const BannerSection = ({ banner }) => {
  return (
    <div className="lg:mt-12 mt-10 lg:mb-10 relative w-[90%] mx-auto">
      
      <div className="grid grid-cols-1 lg:gap-5 md:grid-cols-1 gap-4 lg:grid-cols-2 rounded-xl mt-5 lg:m-0">
       
        <div className="relative lg:h-[40vh] xl:h-[50vh] h-[30vh]">
          {banner?.data && banner?.data[3] ? (
            <Image
              src={
                banner?.data && banner?.data[3] && banner?.data[3]?.image_path
              }
              alt="banner"
              unoptimized
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill={true}
              style={{ objectFit: "cover" }}
              quality={100}
              className="cursor-pointer shadow-md rounded-lg h-full w-full"
            />
          ) : (
            <div className="bg-gradient-to-b from-darkBlue to-lightBlue text-white p-8 rounded-lg flex flex-col-reverse  items-center gap-5 md:flex-row md:justify-between md:items-center">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-xl font-medium mb-5">
                  Discounts 50% <br /> On All Watches
                </h2>
                <div className="flex items-center gap-3 ">
                  <Link
                    className="flex  items-center border-b text-white font-medium text-lg p-0"
                    href={"/category/Smart Watch"}
                  >
                    Shop Now
                  </Link>
                  <span className="text-white">
                    <FaArrowRight />
                  </span>
                </div>
              </div>
              <Image
                src={
                  "https://www.jvssmartzone.com/wp-content/uploads/2024/04/slide1-watches.png"
                }
                height={"256"}
                width={"256"}
                alt="Watches"
                unoptimized
              />
            </div>
          )}
        </div>

        <div className="relative w-full lg:h-[40vh] xl:h-[50vh] h-[30vh]">
          {banner?.data && banner?.data[4] ? (
            <Image
              src={
                banner?.data && banner?.data[4] && banner?.data[4]?.image_path
              }
              alt="banner"
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill={true}
              style={{ objectFit: "cover" }}
              className="cursor-pointer rounded-md h-full w-full"
              quality={100}
              unoptimized
            />
          ) : (
            <div className="bg-gradient-to-br from-[#1B054E] to-[#6C157E] text-white p-8 rounded-lg flex flex-col-reverse gap-5 items-center md:flex-row md:justify-between md:items-center">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-xl font-medium mb-5">
                  Mega Discounts <br /> 50% Off{" "}
                  <span className="text-orange-400 italic">This Week</span>
                </h2>
                <div className="flex items-center gap-3 ">
                  <Link
                    className="flex  items-center border-b text-white font-medium text-lg p-0"
                    href={"/category/Smart Buds"}
                  >
                    Shop Now
                  </Link>

                  <span className="text-white">
                    <FaArrowRight />
                  </span>
                </div>
              </div>
              <Image
                src={
                  "https://i.ibb.co.com/jvxzJxP/MTJV3-1-removebg-preview.png"
                }
                height={"200"}
                width={"200"}
                alt="Watches"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
