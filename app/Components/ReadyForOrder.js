"use client";
import React from "react";
import Heading from "../CustomHooks/heading";
import Image from "next/image";
import Link from "next/link";
import useStore from "../CustomHooks/useStore";
import useSWR from "swr";
import { fetcher } from "../(home)/page";
import CardSkeleton from "./CardSkeleton";
import noImg from "/public/no-image.jpg";
import { Camera, MemoryStick, Cpu, Battery } from "lucide-react";

const ReadyForOrder = () => {
  const { data: products, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/products/165?page=1&limit=6`,
    fetcher
  );

  const { handleBuy, handleCart } = useStore();

 // Handle recent view when product card is clicked
  const updateRecentViews = () => {
   if (!product?.id) return
 
   let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
   
   // Remove existing entry if present
   recentViews = recentViews.filter(p => p.id !== product.id)
   
   // Add new entry to beginning
   recentViews.unshift({
     id: product.id,
     name: product.name,
     image: product.image_path || (product.images?.[0] || noImg.src),
     price: product.retails_price,
     discount: product.discount || 0
   })
 
   // Keep only last 5 items
   if (recentViews.length > 6) recentViews.pop()
   
   localStorage.setItem("recentlyViewed", JSON.stringify(recentViews))
 }

  return (
    <div className="lg:mt-20 mt-10">
      <Heading title={"Ready for Order"} />
      <div>
        <div className="mt-6">
          {isLoading ? (
            <div>
              <div className="grid grid-cols-2 p-5 md:hidden lg:hidden gap-5">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
              <div className="hidden md:grid md:grid-cols-5 lg:hidden gap-5 w-11/12 mx-auto">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
              <div className="lg:grid w-11/12 mx-auto lg:grid-cols-5 hidden gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:p-2 rounded-3xl w-11/12 mx-auto">
              {products?.data && products?.data.length > 0 ? (
                products.data.slice(0, 5).map((product) => {
                  const specs = product?.specifications || [];
                  console.log(specs);
                  const battery = specs.find((s) => s.name.toLowerCase().includes("battery info"))?.description || "N/A";
                  const batteryCapacity = battery.match(/\d+\s*mAh/)?.[0] || "N/A";
                  console.log(batteryCapacity); 
                  
                  const chipset = specs.find((s) => s.name.toLowerCase().includes("chipset"))?.description?.split(" ")[0] || "N/A";
                  const storage = specs.find((s) => s.name.toLowerCase().includes("storage"))?.description || "N/A";
                  const camera = specs.find((s) => s.name.toLowerCase().includes("camera"))?.description || "N/A";

                  return (
                    <div
                      key={product.id}
                      className="bg-gray-50 border border-gray-100 hover:scale-105 hover:shadow-md transition rounded-xl overflow-hidden flex flex-col"
                    >
                      <Link
                        onClick={() => updateRecentViews(product)}
                        href={`products/${product?.id}`}
                      >
                        <div className="mx-auto">
                          <Image
                            src={product?.image_path || product?.images?.[0] || noImg}
                            height={500}
                            width={300}
                            alt={product?.name}
                            quality={100}
                          />
                          {product?.discount && (
                            <p className="absolute top-2 left-2 bg-[#F16724] text-white text-xs font-bold py-1 px-2 rounded-md">
                              SAVE {product?.discount || 0}%
                            </p>
                          )}
                        </div>
                        <div className="p-3 flex flex-col flex-grow px-4">
                          <h3 className="text-sm font-semibold text-black mb-2 line-clamp-1 text-ellipsis">
                            {product?.name}
                          </h3>
                          <div className="mt-auto">
                            {product?.discount ? (
                              <div className="flex justify-center items-center gap-2">
                                <span className="text-xl font-bold text-[#F16724] line-through">
                                  <span className="font-bangla text-xl">৳</span>
                                  {product?.retails_price}
                                </span>
                                <span className="text-xl font-bold text-[#F16724]">
                                  <span className="font-bangla text-xl">৳</span>{" "}
                                  {(
                                    product?.retails_price -
                                    (product?.retails_price * product?.discount) / 100
                                  ).toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xl font-bold text-[#F16724]">
                                <span className="font-bangla text-xl">৳</span>{" "}
                                {product?.retails_price}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>

                      {/* Product specifications */}
                      <div className="text-gray-600 px-5 grid mb-3 justify-items-start lg:grid-cols-2 gap-1">
                        <div className="flex items-start gap-1 text-xs">
                          <Battery size={15} /> {batteryCapacity}
                        </div>
                        <div className="flex items-start gap-1 text-xs">
                          <Cpu size={15} /> {chipset}
                        </div>
                        <div className="flex items-start gap-1 text-xs">
                          <Camera size={15} /> {camera}
                        </div>
                        <div className="flex items-start gap-1 text-xs">
                          <MemoryStick size={15} /> {storage}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 justify-center items-center mb-5 mx-5 gap-2 bottom-2 pb-2">
                        <button
                          onClick={() => handleBuy(product, 1)}
                          className="border-[#F16724] border text-xs text-[#F16724] w-full py-1 rounded-md font-semibold transition-colors px-3"
                        >
                          Buy Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCart(product, 1);
                          }}
                          className="bg-[#F16724] border border-transparent text-xs text-white w-full px-2 py-1 rounded-md font-semibold transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-black text-center col-span-full">No products found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadyForOrder;
