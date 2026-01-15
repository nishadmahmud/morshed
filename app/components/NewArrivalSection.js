"use client";

import useSWR from "swr";
import { api, fetcher } from "../lib/api";
import ProductCard from "./ProductCard";
import CardSkeleton from "./CardSkeleton";
import Link from "next/link";

const NewArrivalSection = () => {
    const { data: newArrivals, isLoading } = useSWR(
        api.getNewArrivals(),
        fetcher
    );

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            New Arrivals
                        </h2>
                        <p className="mt-1 text-gray-500">Fresh styles just dropped</p>
                    </div>
                    <Link
                        href="/new-arrivals"
                        className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-teal-700 transition-colors"
                    >
                        View All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <CardSkeleton key={idx} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {(Array.isArray(newArrivals?.data?.data) ? newArrivals.data.data : []).slice(0, 10).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Mobile View All Link */}
                <div className="md:hidden text-center mt-6">
                    <Link
                        href="/new-arrivals"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-teal-700 transition-colors"
                    >
                        View All New Arrivals
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NewArrivalSection;
