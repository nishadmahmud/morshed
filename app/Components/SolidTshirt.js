"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Loader from "@/app/Components/Loader";
import ProductCard from "@/app/Components/ProductCard";
import CardSkeleton from "./CardSkeleton";
import Heading from "../CustomHooks/heading";
import { fetcher } from "../(home)/page";

const SolidTshirt = () => {
  const solidTshirtCategoryId = 6750;

  const {
    data: bestDeals,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${solidTshirtCategoryId}&limit=12`,
    fetcher
  );

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (bestDeals && bestDeals.data && bestDeals.data.length > 0) {
      const limited = bestDeals.data.slice(0, 12); 
      setFilteredItems(limited);
    }
  }, [bestDeals]);

  return (
    <div className="lg:mt-20 mt-10 w-11/12 mx-auto">
      <Heading title={"Solid Pattern T-shirt"} />
      <div className="grid grid-cols-2 mt-5 md:grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 gap-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))
        ) : error ? (
          <p className="text-red-500 text-center col-span-full">
            Failed to load products
          </p>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((product) => (
            <ProductCard product={product} key={product.id || product._id} />
          ))
        ) : (
          <p className="text-black text-center col-span-full">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default SolidTshirt;
