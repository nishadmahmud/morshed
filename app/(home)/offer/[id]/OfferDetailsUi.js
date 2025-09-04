"use client";

import ProductCard from "@/app/Components/ProductCard";
import { use, useState } from "react";
import Image from "next/image";

const OfferDetailsUi = ({ data, productsData, id }) => {

    const offerData = use(data);
    const products = use(productsData);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    
    const filteredOffer = offerData?.data.find((offerItem) => offerItem.brand_id == id) || null;

    return (
        <div className="lg:pt-20 pt-16 py-5 w-11/12 mx-auto text-black">
            <div className="w-full bg-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                    <Image
                        width={1500}
                        height={800}
                        src={filteredOffer?.image}
                        sizes="55vh"
                        alt="banner-img"
                        className="w-full object-cover rounded-lg h-[40vh]"
                    />
                </div>
                <div className="p-4 bg-gray-100 flex justify-between items-center">
                    <span className="text-lg font-semibold">{filteredOffer?.title}</span>
                    {/* <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">Sort By:</span>
                        <select
                            className="border bg-white border-gray-300 rounded px-2 py-1"
                            value={sortOrder}
                            onChange={handleSortChange}
                        >
                            <option value="default">Default</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div> */}
                </div>
            </div>


            <>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {products?.data?.length > 0 ? (
                        products.data.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    ) : (
                        <p className="text-center col-span-4 text-gray-500">No products found.</p>
                    )}
                </div>

                <div className="flex justify-between gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </>

        </div>
    );
};

export default OfferDetailsUi;
