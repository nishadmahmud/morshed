"use client";
import React, { useEffect, useRef, useState } from "react";
import "react-range-slider-input/dist/style.css";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { IoFilter } from "react-icons/io5"; // Import filter icon
import { IoClose } from "react-icons/io5"; // Import close icon
import Loader from "@/app/Components/Loader";
import FilterProduct from "@/app/Components/FIlterProduct";
import Pagination from "@/app/Components/pagination";
import ProductCard from "@/app/Components/ProductCard";

const fetcher = (url) => fetch(url).then(res => res.json());

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const searchedCategory = searchParams.get('category');
  const searchedTotal = searchParams.get('total');

  const limit = 20;
  const totalPage = Math.ceil(parseInt(searchedTotal) / limit);
  const { slug: id } = params;
  console.log(id);

  const [filteredItems, setFilteredItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const contentRef = useRef(null);

  const pages = [];
  for (let i = 0; i < totalPage; i++) {
    pages.push(i + 1);
  }

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(sessionStorage.getItem(`currentPage-${id}`)) || 1;
    }
    return 1;
  });

  const { data: products, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${id}?page=${currentPage}&limit=${limit}`,
    fetcher
  );

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (products) {
      setFilteredItems(products.data);
    }
  }, [products]);

  useEffect(() => {
    if (products) {
      setFilteredItems(products.data);
    }
  }, [products]);

  useEffect(() => {
    if (sortBy === "low-to-high" && sortBy) {
      const lowToHigh = [...filteredItems].sort((a, b) => a.retails_price - b.retails_price);
      setFilteredItems(lowToHigh);
    } else if (sortBy === "high-to-low" && sortBy) {
      const highToLow = [...filteredItems].sort((a, b) => b.retails_price - a.retails_price);
      setFilteredItems(highToLow);
    } else if (sortBy === "a-z") {
      const letterSort = [...filteredItems.sort((a, b) => a.name.localeCompare(b.name))];
      setFilteredItems(letterSort);
    } else if (sortBy === "z-a") {
      const letterSort = [...filteredItems.sort((a, b) => b.name.localeCompare(a.name))];
      setFilteredItems(letterSort);
    } else {
      setFilteredItems(products?.data);
    }
  }, [sortBy, products]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`currentPage-${id}`, currentPage);
    }
  }, [currentPage, id]);

  return (
    <div className="xl:pt-32 lg:pt-28 md:pt-24 pt-16  relative">
      
      {/* Mobile Filter Button */}
      <button
  className="md:hidden fixed bottom-24 left-7 bg-[#115e59] text-white p-2 rounded-lg z-50"
  onClick={() => setIsSidebarOpen(true)} 
>
  <IoFilter size={24} />
</button>


      {/* Filter Sidebar (Mobile Only) */}
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg z-50 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between flex-row-reverse p-4 border-b">
          <h2 className="text-lg font-semibold text-black">Filters</h2>
          <button className="text-red-800" onClick={() => setIsSidebarOpen(false)}>
            <IoClose size={24} />
          </button>
        </div>
        <div className="p-4">
          <FilterProduct products={products?.data} setFilteredItems={setFilteredItems} />
        </div>
      </div>

      {/* Overlay to close sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="grid md:grid-cols-4 lg:grid-cols-5 lg:pt-5 mt-2 gap-5">
        
        {/* Desktop Filter (Hidden on Mobile) */}
        <div className="hidden md:block">
          <FilterProduct products={products?.data} setFilteredItems={setFilteredItems} />
        </div>

        {/* Products */}
        <div className="md:col-span-3 lg:col-span-4">
          <div className="flex flex-1 justify-between bg-white p-2 rounded-lg items-center mb-5">
            <h1 className="font-semibold text-black md:text-lg text-sm pl-3">{searchedCategory}</h1>
            <div className="flex gap-2 items-center pr-3">
              <p className="font-semibold text-black">Sort By:</p>
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="outline-none p-1 px-2 rounded-sm bg-[#F2F3F7] text-black overflow-y-auto md:text-lg text-sm"
              >
                <option value="">Default</option>
                <option value="low-to-high">Price low to high</option>
                <option value="high-to-low">Price high to low</option>
                <option value="a-z">Alphabetically A-Z</option>
                <option value="z-a">Alphabetically Z-A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-3 gap-3">
            {isLoading ? (
              <Loader />
            ) : filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((product) => <ProductCard product={product} key={product.id} />)
            ) : (
              <p className="text-black text-center">No products found</p>
            )}
          </div>

          {pages.length > 0 && (
            <div className="flex flex-col lg:flex-row justify-between text-black items-center mt-10 pagination gap-3 bg-[#f1f5f6] rounded-md p-2">
              <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(page) => setCurrentPage(page)} />
              <div className="lg:text-md text-xs text-center">
                <p>Showing {currentPage} page of ({totalPage} pages)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
