"use client";

import Heading from "../CustomHooks/heading";
import noImg from "/public/no-image.jpg";
import Image from "next/image";
import useSWR from "swr";
import { fetcher, userId } from "../(home)/page";
import CardSkeleton from "./CardSkeleton";
import useStore from "../CustomHooks/useStore";
import Link from "next/link";
import { Camera, Cpu, Battery, MemoryStick } from "lucide-react";

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

      <div className="w-11/12 mx-auto gap-5 grid grid-cols-5 justify-between">
        <div className="flex mt-5 col-span-3">
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

        <div className="bg-[#8c3228df] rounded-xl mt-5 p-5 col-span-2 md:h-[65vh] h-[25vh] text-black">
          <h3>🔥Hot Deal of The Day</h3>
        </div>

        
      </div>
    </div>
  );
};

export default FeaturedProducts;
