"use client";
import React from "react";
import Heading from "../CustomHooks/heading";
import Image from "next/image";
import Link from "next/link";
import useStore from "../CustomHooks/useStore";
import useSWR from "swr";
import { fetcher, userId } from "../(home)/page";
import CardSkeleton from "./CardSkeleton";
import noImg from "/public/no-image.jpg";
import { Camera, MemoryStick, Cpu, Battery } from "lucide-react";

const ReadyForOrder = () => {
  const { data: products, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/products/${userId}?page=1&limit=6`,
    fetcher
  );

  console.log(products);

  const { handleBuy, handleCart } = useStore();

  // Handle recent view when product card is clicked
  const updateRecentViews = (product) => {
    if (!product?.id) return;

    let recentViews = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );

    // Remove existing entry if present
    recentViews = recentViews.filter((p) => p.id !== product.id);

    // Add new entry to beginning
    recentViews.unshift({
      id: product.id,
      name: product.name,
      image: product.image_path || product.images?.[0] || noImg.src,
      price: product.retails_price,
      discount: product.discount || 0,
    });

    // Keep only last 5 items
    if (recentViews.length > 6) recentViews.pop();

    localStorage.setItem("recentlyViewed", JSON.stringify(recentViews));
  };

  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters
  };

  console.log(products);
  return (
    <div className="lg:mt-20 mt-10">
      <Heading title={"New Arraivals"} />
      <div>
        <div className="mt-6">
          {isLoading ? (
            <div>
              <div className="grid grid-cols-2 p-5 md:hidden lg:hidden gap-5">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
              <div className="hidden md:grid md:grid-cols-6 lg:hidden gap-5 w-11/12 mx-auto">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
              <div className="lg:grid w-11/12 mx-auto lg:grid-cols-6 hidden gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 lg:p-2 rounded-3xl w-11/12 mx-auto">
              {products?.data && products?.data.length > 0 ? (
                products.data.slice(0, 5).map((product) => {
                  // const specs = product?.specifications || [];
                  // console.log(specs);
                  // const battery = specs.find((s) => s.name.toLowerCase().includes("battery info"))?.description || "N/A";
                  // const batteryCapacity = battery.match(/\d+\s*mAh/)?.[0] || "N/A";
                  // console.log(batteryCapacity);

                  // const chipset = specs.find((s) => s.name.toLowerCase().includes("chipset"))?.description?.split(" ")[0] || "N/A";
                  // const storage = specs.find((s) => s.name.toLowerCase().includes("storage"))?.description || "N/A";
                  // const camera = specs.find((s) => s.name.toLowerCase().includes("camera"))?.description ?? "N/A";
                  // const getFirstTwoWords = (text) => text.split(' ').slice(0, 2).join('').replace(',', '');

                  // const cameraShort = camera !== "N/A" ? getFirstTwoWords(camera) : "N/A";

                  // console.log(cameraShort);

                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-300 hover:scale-105 shadow-sm transition rounded-xl overflow-hidden flex flex-col"
                    >
                      <Link
                        onClick={() => updateRecentViews(product)}
                        href={`/products/${sanitizeSlug(
                          product?.brand_name || product?.name
                        )}/${product?.id}`}
                      >
                        <div className="h-32 w-40 mx-auto">
                          <Image
                            src={
                              product?.image_path ||
                              product?.images?.[0] ||
                              noImg
                            }
                            height={500}
                            unoptimized
                            width={300}
                            alt={product?.name}
                            quality={100}
                          />
                          {product?.discount ? (
                            <p className="absolute top-2 left-2 bg-[#c03b2c] text-white text-xs font-bold py-1 px-2 rounded-md">
                              SAVE {product?.discount || 0}%
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="mt-10 flex flex-col flex-grow justify-center items-center px-4">
                          <h3 className="text-sm font-semibold text-black  line-clamp-1 text-ellipsis mt-2">
                            {product?.name}
                          </h3>
                          <div className="mt-auto">
                            {product?.discount ? (
                              <div className="flex justify-center items-center gap-2">
                                <span className="text-sm lg:text-lg font-bold text-[#c03b2c] line-through">
                                  <span className="font-bangla text-sm lg:text-sm">
                                    ৳
                                  </span>
                                  {product?.retails_price}
                                </span>
                                <span className="text-sm lg:text-lg font-bold text-[#c03b2c]">
                                  <span className="font-bangla text-sm lg:text-sm">
                                    ৳
                                  </span>{" "}
                                  {(
                                    product?.retails_price -
                                    (product?.retails_price *
                                      product?.discount) /
                                      100
                                  ).toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm lg:text-lg font-bold text-[#c03b2c]">
                                <span className="font-bangla text-sm lg:text-sm">
                                  ৳
                                </span>{" "}
                                {product?.retails_price}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>

                      <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center mt-2 mb-5 mx-3 gap-3 bottom-2 ">
                        <button
                          onClick={() => handleBuy(product, 1)}
                          className=" bg-[#c03b2c32] border text-xs text-[#c03b2c] hover:bg-[#c03b2c] w-full py-1.5 hover:text-white rounded-md font-medium transition-colors px-3"
                        >
                          Buy Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCart(product, 1);
                          }}
                          className="hover:bg-[#383838] bg-[#b4b4b474] border border-transparent text-xs text-black w-full px-2 py-1.5 rounded-md font-medium transition-colors hover:text-white"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-black text-center col-span-full">
                  No products found
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadyForOrder;
