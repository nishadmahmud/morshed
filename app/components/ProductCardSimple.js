"use client";

import Image from "next/image";
import Link from "next/link";
import useStore from "../hooks/useStore";

const ProductCardSimple = ({ product }) => {
    const { country, prices } = useStore();

    const productSlug = product?.product_slug || product?.name?.toLowerCase().replace(/\s+/g, '-');
    const productLink = `/products/${productSlug}/${product?.id}`;
    const imageUrl = product?.image_path || product?.thumbnail_image || "/no-image.jpg";
    const productName = product?.name || "Product";

    // Get category name or brand name for the badge
    const badgeText = product?.brands?.name || product?.category?.name || "New";

    // Price logic
    const countrySign = country?.value === "BD" ? "৳" : "$";
    const productPrice = prices?.[product?.id];

    const currentPrice = country?.value === "BD"
        ? (productPrice?.basePrice ?? product?.retails_price ?? 0)
        : (productPrice?.wholesalePrice ?? product?.wholesale_price ?? 0);

    const originalPrice = product?.regular_price > currentPrice ? product?.regular_price : null;

    return (
        <Link href={productLink} className="block group">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                    {/* Badge */}
                    <div className="absolute top-2 left-2 z-10">
                        <span className="inline-block bg-[#0f766e] text-white text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">
                            {badgeText.length > 15 ? badgeText.substring(0, 15) + '...' : badgeText}
                        </span>
                    </div>

                    {/* Product Image */}
                    <Image
                        src={imageUrl}
                        alt={productName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 16vw"
                        unoptimized
                    />
                </div>

                {/* Price Section */}
                <div className="p-3 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-sm md:text-base font-bold text-[#0f766e]">
                                {countrySign} {currentPrice.toLocaleString()}
                            </span>
                            {originalPrice && (
                                <span className="text-[10px] md:text-xs text-gray-400 line-through">
                                    {countrySign} {originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#0f766e] flex items-center justify-center text-white hover:bg-[#0a5c54] transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCardSimple;
