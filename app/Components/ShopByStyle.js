"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, userId } from "../constants";

const ShopByStyle = ({ startBannerIndex = 0 }) => {
    const { data: banners, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API}/public/banners/${userId}`,
        fetcher
    );

    // Define the style metadata (titles and links for each banner)
    // We rotate these based on index to ensure we have content if we go beyond the initial 2
    const baseStylesMeta = [
        {
            title: "Casual Comfort",
            description: "Everyday essentials",
            link: "/category/6751?category=Solid%20Color%20Polo"
        },
        {
            title: "Street Classics",
            description: "Bold urban looks",
            link: "/category/6749?category=Stripe%20Pattern%20Shirt"
        }
    ];

    const stylesMeta = baseStylesMeta;

    // Get 2 banners starting from startBannerIndex
    // If we run out of banners, we might want to wrap around, but for now simple slice
    const bannerImages = banners?.banners?.slice(startBannerIndex, startBannerIndex + 2) || [];

    // Safety check: if we have fewer than 2 banners in this slice, maybe cycle back?
    // User response shows 5 banners (indices 0-4). 
    // If startBannerIndex is 4, we get index 4 only. We need 2.
    // Let's implement wrap around logic
    if (banners?.banners && bannerImages.length < 2) {
        const remainingNeeded = 2 - bannerImages.length;
        const wrappedBanners = banners.banners.slice(0, remainingNeeded);
        bannerImages.push(...wrappedBanners);
    }

    if (isLoading) {
        return (
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Shop By Style
                        </h2>
                        <p className="mt-2 text-gray-500">Find your perfect look</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="aspect-[4/3] md:aspect-[3/2] bg-gray-200 animate-pulse rounded-lg" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Shop By Style
                    </h2>
                    <p className="mt-2 text-gray-500">Find your perfect look</p>
                </div>

                {/* Two Column Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {stylesMeta.map((style, index) => {
                        const banner = bannerImages[index];
                        if (!banner) return null;

                        return (
                            <Link
                                key={banner.id || index}
                                href={style.link}
                                className="group relative block overflow-hidden aspect-[4/3] md:aspect-[3/2] bg-gray-100 rounded-lg"
                            >
                                {/* Image */}
                                <Image
                                    src={banner.image_path}
                                    alt={style.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                    unoptimized
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />

                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                                        {style.title}
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base">
                                        {style.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ShopByStyle;
