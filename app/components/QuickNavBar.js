"use client";

import Link from "next/link";
import useSWR from "swr";
import { api, fetcher } from "../lib/api";

const QuickNavBar = () => {
    const { data: categoriesData } = useSWR(api.getCategories(), fetcher);

    // Get first 5 main categories (6 total with SHOP NOW)
    const mainCategories = categoriesData?.data?.slice(0, 5) || [];

    const navItems = [
        { label: "SHOP NOW", href: "/new-arrivals", highlight: true },
        ...mainCategories.map(cat => ({
            label: cat.name?.toUpperCase() || "CATEGORY",
            href: `/category/${cat.category_id}?category=${encodeURIComponent(cat.name || '')}`
        }))
    ];

    return (
        <div className="bg-gray-50 border-b border-gray-200 mt-4">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-center gap-8 md:gap-14 py-4 overflow-x-auto scrollbar-hide">
                    {navItems.slice(0, 6).map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`text-xs md:text-sm font-semibold whitespace-nowrap transition-colors ${item.highlight
                                    ? 'text-[#0f766e] hover:text-[#0a5c54]'
                                    : 'text-gray-700 hover:text-[#0f766e]'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuickNavBar;
