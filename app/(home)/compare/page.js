"use client";

import Image from "next/image";
import React, { useState } from "react";
import { userId } from "../page";
import axios from "axios";
import noImg from '/public/no-image.jpg'

const Page = () => {
  const [keyword1, setKeyword1] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [selectedProduct2, setSelectedProduct2] = useState(null);
  const [showResults1, setShowResults1] = useState(false);
  const [showResults2, setShowResults2] = useState(false);

  const handleSearch = (keyword, setProducts, setShowResults) => {
    if (keyword) {
      setShowResults(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/public/search-product`, { keyword, user_id: userId })
        .then((res) => {
          const fetchedProducts = res.data.data?.data || [];
          setProducts(fetchedProducts);
        })
        .catch(() => setProducts([]));
    } else {
      setProducts([]);
      setShowResults(false);
    }
  };

  const handleSelectProduct = (product, setSelectedProduct, setKeyword, setProducts, setShowResults) => {
    setSelectedProduct(product);
    setKeyword("");
    setProducts([]);
    setShowResults(false);
  };

  const handleRemoveProduct = (setSelectedProduct, setShowResults) => {
    setSelectedProduct(null);
    setShowResults(false);
  };

  return (
    <div className="p-6 lg:pt-4 pt-2 w-11/12 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <div className="mb-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Product Comparison
          </h1>
          <p className="text-gray-600">
            Find and select products to see the differences and similarities between them
          </p>
        </div>

        <div>
          {/* Search Field 1 */}
          <div>
            <input
              type="text"
              value={keyword1}
              onChange={(e) => {
                setKeyword1(e.target.value);
                handleSearch(e.target.value, setProducts1, setShowResults1);
              }}
              onFocus={() => setShowResults1(true)}
              onBlur={() => setTimeout(() => setShowResults1(false), 200)}
              placeholder="Search for Product 1"
              className="w-full p-2 border border-gray-200 focus:ring-1 text-black focus:ring-slate-200 bg-slate-50 rounded"
            />
            {showResults1 && products1.length > 0 && (
              <div className="mt-4 w-10/12 md:w-[25rem] text-black h-56 overflow-y-scroll absolute bg-white shadow-md border rounded">
                {products1.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-2 border-b cursor-pointer"
                    onClick={() => handleSelectProduct(product, setSelectedProduct1, setKeyword1, setProducts1, setShowResults1)}
                  >
                    <Image
                      src={product?.images?.[0] || product?.image_path || noImg}
                      height={50}
                      width={50}
                      alt="product"
                      quality={75}
                    />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-3 border">
            {selectedProduct1 ? (
              <div className="flex flex-col items-center">
                <Image
                  src={selectedProduct1?.images?.[0] || selectedProduct1?.image_path || noImg}
                  height={100}
                  width={100}
                  alt={selectedProduct1.name}
                  className="rounded"
                />
                <h3 className="mt-4 font-semibold text-black text-sm">{selectedProduct1.name}</h3>
                <button
                  className="mt-1 px-3 py-1.5 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveProduct(setSelectedProduct1, setShowResults1)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">No product selected</div>
            )}
          </div>
        </div>

        <div>
          {/* Search Field 2 */}
          <div>
            <input
              type="text"
              value={keyword2}
              onChange={(e) => {
                setKeyword2(e.target.value);
                handleSearch(e.target.value, setProducts2, setShowResults2);
              }}
              onFocus={() => setShowResults2(true)}
              onBlur={() => setTimeout(() => setShowResults2(false), 200)}
              placeholder="Search for Product 2"
              className="w-full p-2 border border-gray-200 focus:ring-1 text-black focus:ring-slate-200 bg-slate-50 rounded"
            />
            {showResults2 && products2.length > 0 && (
              <div className="mt-4 w-10/12 md:w-[25rem] text-black h-56 overflow-y-scroll absolute bg-white shadow-md border rounded">
                {products2.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-2 border-b cursor-pointer"
                    onClick={() => handleSelectProduct(product, setSelectedProduct2, setKeyword2, setProducts2, setShowResults2)}
                  >
                    <Image
                      src={product?.images?.[0] || product?.image_path || noImg}
                      height={50}
                      width={50}
                      alt="product"
                      quality={75}
                    />
                    <span className="text-black">{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-3 border">
            {selectedProduct2 ? (
              <div className="flex flex-col items-center">
                <Image
                  src={selectedProduct2?.images?.[0] || selectedProduct2?.image_path || noImg}
                  height={100}
                  width={100}
                  alt={selectedProduct2.name}
                  className="rounded"
                />
                <h3 className="mt-2 font-semibold text-black text-sm">{selectedProduct2.name}</h3>
                <button
                  className="mt-1 px-3 py-1.5 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveProduct(setSelectedProduct2, setShowResults2)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">No product selected</div>
            )}
          </div>
        </div>

      </div>

      {/* Product Comparison Table */}
      <div className="mt-8 text-black">
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Feature</th>
                <th className="border border-gray-300 p-2">Product 1</th>
                <th className="border border-gray-300 p-2">Product 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Name</td>
                <td className="border border-gray-300 p-2">
                  {selectedProduct1?.name || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {selectedProduct2?.name || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Processor</td>
                <td className="border border-gray-300 p-2">
                  {selectedProduct1?.processor || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {selectedProduct2?.processor || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Display</td>
                <td className="border border-gray-300 p-2">
                  {selectedProduct1?.display || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {selectedProduct2?.display || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
