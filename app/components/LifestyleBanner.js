"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { api, fetcher } from "../lib/api";
import { ChevronRight, ArrowRight } from "lucide-react";

const LifestyleBanner = ({
    brandName = "Morshed Mart",
    tagline = "Because comfort and confidence go hand in hand.",
    description = "We focus on carefully selecting the best clothing that is comfortable, looks great, and makes you confident. Apart from the fabric, design and fit, we go through strict quality control parameters to give you what you truly deserve.",
    ctaLink = "/new-arrivals",
    bannerIndex = 2,
}) => {
    const { data: banners, isLoading } = useSWR(
        api.getBanners(),
        fetcher
    );

    const banner = banners?.banners?.[bannerIndex];

    if (isLoading) {
        return (
            <section className="py-10 md:py-14">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="h-[300px] md:h-[350px] bg-gray-100 animate-pulse rounded-2xl" />
                </div>
            </section>
        );
    }

    if (!banner) {
        return null;
    }

    return (
        <section className="py-10 md:py-14">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Card Container with subtle styling */}
                <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Content */}
                        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
                            {/* Brand Name Badge */}
                            <Link
                                href={ctaLink}
                                className="inline-flex items-center gap-1 text-xl md:text-2xl font-bold text-gray-900 hover:text-[#0f766e] transition-colors mb-4 group"
                            >
                                {brandName}
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Decorative line */}
                            <div className="w-16 h-1 bg-[#0f766e] rounded-full mb-6" />

                            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-4 leading-relaxed">
                                {tagline}
                            </h2>

                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                                {description}
                            </p>

                            {/* CTA Button */}
                            <Link
                                href={ctaLink}
                                className="inline-flex items-center gap-2 text-[#0f766e] font-medium hover:gap-3 transition-all group"
                            >
                                Explore Collection
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Right Image */}
                        <div className="flex-1 order-1 md:order-2 relative min-h-[250px] md:min-h-[350px]">
                            <Image
                                src={banner.image_path}
                                alt={brandName}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LifestyleBanner;
