"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { api, fetcher } from "../lib/api";

const LifestyleBanner = ({
    title = "Elevate Your Style",
    subtitle = "Premium collection for the modern man",
    ctaText = "Explore Collection",
    ctaLink = "/category/6749?category=Stripe%20Pattern%20Shirt",
    bannerIndex = 2, // Which banner from API to use (0-indexed)
    overlayPosition = "right" // "left", "center", or "right"
}) => {
    const { data: banners, isLoading } = useSWR(
        api.getBanners(),
        fetcher
    );

    const positionClasses = {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right"
    };

    const banner = banners?.banners?.[bannerIndex];

    if (isLoading) {
        return (
            <section className="relative w-full h-[50vh] md:h-[70vh] bg-gray-200 animate-pulse" />
        );
    }

    if (!banner) {
        return null;
    }

    return (
        <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
            {/* Background Image */}
            <Image
                src={banner.image_path}
                alt={title}
                fill
                className="object-cover"
                priority={false}
                unoptimized
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className={`absolute inset-0 flex flex-col justify-center ${positionClasses[overlayPosition]} px-8 md:px-16 lg:px-24`}>
                <div className="max-w-lg">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {title}
                    </h2>
                    <p className="text-white/90 text-base md:text-lg mb-6">
                        {subtitle}
                    </p>
                    <Link
                        href={ctaLink}
                        className="inline-block bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition-colors duration-200"
                    >
                        {ctaText}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LifestyleBanner;
