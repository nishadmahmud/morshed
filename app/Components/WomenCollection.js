"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Loader from "@/app/Components/Loader";
import ProductCard from "@/app/Components/ProductCard";
import CardSkeleton from "./CardSkeleton";
import Heading from "../CustomHooks/heading";
import { fetcher, userId } from "../(home)/page";

const WomenCollection = () => {
  const limit = 20;

  const {
    data: bestDeals,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API}/public/best-sellers/${userId}`, fetcher);

  console.log("best seller", bestDeals);

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
  if (bestDeals && bestDeals.data && bestDeals.data.length > 0) {
    const repeatCount = Math.ceil(12 / bestDeals.data.length);
    const repeated = Array.from({ length: repeatCount })
      .flatMap(() => bestDeals.data)
      .slice(0, 12); // Ensure exactly 12 items
    setFilteredItems(repeated);
  }
}, [bestDeals]);


  return (
    <div className="lg:mt-20 mt-10 w-11/12 mx-auto">
      <Heading title={"Women collection"} />

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
            <ProductCard product={product} key={product.id} />
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

export default WomenCollection;
