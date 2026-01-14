"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, userId } from "../constants";
import ProductCard from "./ProductCard";
import CardSkeleton from "./CardSkeleton";

const noImg = "/no-image.jpg";

// Sub-component for individual category section
const CategorySection = ({ category }) => {
    // Fetch products for this specific category
    const { data: productsData, isLoading } = useSWR(
        category
            ? `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${category.category_id}?page=1&limit=6`
            : null,
        fetcher
    );

    const products = productsData?.data?.data || productsData?.data || [];
    const categoryImage = category?.image_url || category?.banner || noImg;
    const categoryLink = `/category/${category?.category_id}?category=${encodeURIComponent(category?.name || '')}&total=${category?.products_count || 0}`;

    // Grid Configuration:
    // Left Banner: 1 col
    // Right Grid: 3 cols
    // Top Row: 3 products
    // Bottom Row: 2 products + 1 View More
    // Total Products to show: 5
    const displayProducts = products.slice(0, 5);
    const viewMoreBgImage = products[5]?.image_path || products[5]?.images?.[0] || noImg;

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
                <div className="aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 last:mb-0">
            {/* Left: Category Banner */}
            <Link
                href={categoryLink}
                className="relative w-full h-full min-h-[300px] lg:min-h-0 overflow-hidden rounded-lg group bg-white border border-gray-100 shadow-sm"
            >
                <Image
                    src={categoryImage}
                    alt={category.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    unoptimized
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                {/* Category Name */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-0 text-center lg:text-left">
                    <h3 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2 drop-shadow-md">
                        {category.name}
                    </h3>
                    <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1 text-white text-sm font-medium">
                        {category.products_count} Products
                    </span>
                </div>
            </Link>

            {/* Right: Product Grid (3 columns) */}
            <div className="lg:col-span-1 grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 h-full">
                {displayProducts.map((product) => (
                    <div key={product.id} className="h-full">
                        <ProductCard product={product} compact={true} />
                    </div>
                ))}

                {/* Fill empty slots if less than 5 products */}
                {displayProducts.length < 5 && Array.from({ length: 5 - displayProducts.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="hidden md:block bg-gray-50 rounded-lg h-full" />
                ))}

                {/* View More Card (Always in the 6th slot position visually) */}
                <Link
                    href={categoryLink}
                    className="relative aspect-auto bg-white rounded-lg overflow-hidden group flex items-center justify-center col-span-1 border border-gray-100 h-full shadow-sm hover:shadow-md transition-shadow"
                >
                    {/* Background image */}
                    <div className="absolute inset-0 bg-gray-100">
                        <Image
                            src={viewMoreBgImage}
                            alt="View More"
                            fill
                            className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
                            unoptimized
                        />
                    </div>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/50 transition-colors duration-300" />

                    {/* Text content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-white p-4">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 border border-white/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                        <p className="text-xl font-bold tracking-widest uppercase">View</p>
                        <p className="text-xl font-bold tracking-widest uppercase">More</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

const CategoryShowcase = () => {
    // Fetch categories
    const { data: categoriesData, isLoading: categoriesLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,
        fetcher
    );

    // Filter categories: products_count >= 7 AND has image_url or banner
    const validCategories = categoriesData?.data?.filter(
        (cat) => cat.products_count >= 7 && (cat.image_url || cat.banner)
    ) || [];

    if (categoriesLoading) {
        return (
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
                        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <CardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (validCategories.length === 0) {
        return null;
    }

    return (
        <section className="py-12 md:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {validCategories.map((category) => (
                    <CategorySection key={category.category_id} category={category} />
                ))}
            </div>
        </section>
    );
};

export default CategoryShowcase;
