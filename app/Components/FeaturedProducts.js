"use client";

import Heading from "../CustomHooks/heading";
import noImg from "/public/no-image.jpg";
import Image from "next/image";
import useSWR from "swr";
import { fetcher, userId } from "../(home)/page";
import CardSkeleton from "./CardSkeleton";
import useStore from "../CustomHooks/useStore";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const FeaturedProducts = ({ banner }) => {
  const { data: bestDeals, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/best-deals/${userId}`,
    fetcher
  );
  const { handleBuy, handleCart } = useStore();
  console.log("bessssst", bestDeals);
console.log(banner);
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

  return (
    <div className="lg:mt-24 mt-16 poppins">
      <Heading title={"Flash Sale"} />

      <div className="lg:w-11/12 w-full mx-auto md:gap-5 gap-2 grid md:grid-cols-5  md:justify-between justify-center items-center">
        <div className="flex mt-5 lg:col-span-3">
          <div className="w-full md:h-[65vh] h-[25vh] object-cover">
            <Image
            unoptimized
              width={400}
              height={600}
              src={banner.data[2].image_path || noImg}
              alt="Newest Collection"
              className="rounded-md object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="bg-[#cf4a3ccc] rounded-xl mt-5 p-5 md:col-span-2 lg:h-[65vh] h-[35vh] text-black overflow-y-auto">
          <h3 className="text-white text-base md:text-xl font-medium">🔥Hot Deal of The Day</h3>
          <div>
            {
              bestDeals? bestDeals.data.slice(0, 6).map((product, index) => (

                <div key={index} className="bg-white p-3 rounded-xl mt-5 flex justify-between items-center gap-3">
                 <div className="flex items-center gap-2">
                 <div>
                    <Image unoptimized className="w-9 md:w-20" alt={product.name} width={80} height={80} src={product.image_path || noImg}></Image>
                  </div>

                  <div> 
                    <Link onClick={updateRecentViews} href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`} 
                    className="font-semibold md:text-sm text-xs text-ellipsis line-clamp-2 hover:text-gray-700">{product.name}</Link>
                    <div className="flex items-center gap-5">
                      
                    {product?.discount ? (
              <div className="flex items-center gap-2">
                <span className="md:text-base text-xs font-bold text-[#c03b2c]">
                  <span className="font-bangla text-xs md:text-base">৳</span> {discountedPrice}
                </span>
                <span className="text-xs font-bold text-[#504f4d] line-through">
                  <span className="font-bangla md:text-base text-xs">৳</span>{product?.retails_price}
                </span>
              </div>
            ) : (
              <span className="md:text-base text-xs font-bold text-[#c03b2c]">
                <span className="font-bangla text-xs lg:text-base">৳</span> {product?.retails_price}
              </span>
            )}

            
                    </div>
                  </div>
                 </div>

                 <div onClick={handleCart} className="mr-5 cursor-pointer">
              <ShoppingCart></ShoppingCart>
            </div>

                </div>

              )): [1,2,3].map((_, i) => <CardSkeleton key={i} />)
            }
           
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default FeaturedProducts;
