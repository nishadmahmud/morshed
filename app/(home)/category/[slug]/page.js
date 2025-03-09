"use client";

import React, { useEffect, useState } from "react";
import "react-range-slider-input/dist/style.css";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import Loader from "@/app/Components/Loader";
import FilterProduct from "@/app/Components/FIlterProduct";
import Pagination from "@/app/Components/pagination";
import ProductCard from "@/app/Components/ProductCard";
import { FiFilter } from "react-icons/fi";
import { CircleX } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const searchedCategory = searchParams.get("category");
  const searchedTotal = searchParams.get("total");
  const limit = 20;
  const totalPage = Math.ceil(parseInt(searchedTotal) / limit);
  const { slug: id } = params;

  // Get current page from sessionStorage (if exists)
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(sessionStorage.getItem(`currentPage-${id}`)) || 1;
    }
    return 1;
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const { data: products, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${id}?tab=${currentPage}&limit=${limit}`,
    fetcher
  );

  useEffect(() => {
    if (products) {
      setFilteredItems(products.data);
    }
  }, [products]);

  // Save currentPage in sessionStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`currentPage-${id}`, currentPage);
    }
  }, [currentPage, id]);

  // Sorting logic
  useEffect(() => {
    if (!filteredItems.length) return;

    let sortedItems = [...filteredItems];

    switch (sortBy) {
      case "low-to-high":
        sortedItems.sort((a, b) => a.retails_price - b.retails_price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.retails_price - a.retails_price);
        break;
      case "a-z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedItems = products?.data || [];
    }

    setFilteredItems(sortedItems);
  }, [sortBy, products]);

  return (
    <div className="md:px-12 p-5 relative">
      {/* Filter Toggle Button for Mobile */}
      <button
        className="md:hidden fixed bottom-24 left-7 bg-[#c03b2c] text-white p-2 rounded-lg z-50"
        onClick={() => setIsFilterOpen(true)}
      >
        <FiFilter size={24} />
      </button>

      {/* Sidebar Filter for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsFilterOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-5 overflow-y-auto transform transition-transform ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-2 right-2 text-red-500 font-bold text-lg"
          onClick={() => setIsFilterOpen(false)}
        >
          <CircleX />
        </button>
        <FilterProduct products={products?.data} setFilteredItems={setFilteredItems} />
      </div>

      <div className="grid md:grid-cols-4 lg:grid-cols-5 lg:pt-6 mt-1 gap-5">
        {/* Hide Filter Section for Mobile & Tablet */}
        <div className="hidden md:block">
          <FilterProduct products={products?.data} setFilteredItems={setFilteredItems} />
        </div>

        {/* Product Section */}
        <div className="md:col-span-3 lg:col-span-4">
          <div className="flex flex-1 justify-between bg-white p-2 rounded-lg items-center mb-5">
            <h1 className="font-semibold text-black md:text-xl text-sm px-3">{searchedCategory}</h1>
            <div className="flex md:text-lg text-sm gap-2 items-center pr-3">
              <p className="font-semibold text-black">Sort By:</p>
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="outline-none p-1 px-2 rounded-sm bg-[#F2F3F7] text-black overflow-y-auto md:text-sm text-xs"
              >
                <option value="">Default</option>
                <option value="low-to-high">Price low to high</option>
                <option value="high-to-low">Price high to low</option>
                <option value="a-z">Alphabetically A-Z</option>
                <option value="z-a">Alphabetically Z-A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {isLoading ? (
              <Loader />
            ) : filteredItems.length > 0 ? (
              filteredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-black text-center">No products found</p>
            )}
          </div>

          {/* Pagination */}
          {totalPage > 1 && (
            <div className="flex flex-col lg:flex-row justify-between text-black items-center mt-10 pagination gap-3 bg-[#f1f5f6] rounded-md p-2">
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
              <div className="lg:text-md text-xs text-center">
                <p>
                  Showing page {currentPage} of {totalPage}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
