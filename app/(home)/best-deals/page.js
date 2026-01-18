"use client";

import useSWR from "swr";
import { api, fetcher } from "../../lib/api";
import ProductCard from "../../components/ProductCard";
import { ProductCardSkeleton } from "../../components/ProductCardSkeleton";
import Link from "next/link";

export default function BestDealsPage() {
    const { data: bestDeals, isLoading } = useSWR(
        api.getBestDeals(),
        fetcher
    );

    const products = Array.isArray(bestDeals?.data)
        ? bestDeals.data
        : [];

    return (
        <div className="min-h-screen bg-white pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-[#0f766e] transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Best Deals</span>
                </nav>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Best Deals</h1>
                    <p className="mt-2 text-gray-500">
                        {products.length > 0 ? `${products.length} amazing deals for you` : "Discover our best offers"}
                    </p>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {Array.from({ length: 10 }).map((_, idx) => (
                            <ProductCardSkeleton key={idx} />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No deals available at the moment</p>
                        <Link
                            href="/"
                            className="inline-block mt-4 px-6 py-2 bg-[#0f766e] text-white rounded-lg hover:bg-[#0a5c54] transition-colors"
                        >
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
