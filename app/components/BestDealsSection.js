"use client";

import useSWR from "swr";
import { api, fetcher } from "../lib/api";
import ProductCard from "./ProductCard";
import CardSkeleton from "./CardSkeleton";
import Link from "next/link";

const BestDealsSection = () => {
    const { data: bestDeals, isLoading } = useSWR(
        api.getBestDeals(),
        fetcher
    );

    return (
        <section className="py-12 md:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Best Deals
                        </h2>
                        <p className="mt-1 text-gray-500">Limited time offers</p>
                    </div>
                    <Link
                        href="/best-deals"
                        className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-[#0f766e] transition-colors"
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
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <CardSkeleton key={idx} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {(Array.isArray(bestDeals?.data) ? bestDeals.data : []).slice(0, 8).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Mobile View All Link */}
                <div className="md:hidden text-center mt-6">
                    <Link
                        href="/best-deals"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-[#0f766e] transition-colors"
                    >
                        View All Deals
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BestDealsSection;

