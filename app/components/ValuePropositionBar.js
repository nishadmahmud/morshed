"use client";

import { Truck, RefreshCw, ShieldCheck, Banknote } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "100% Authentic",
        subtitle: "Genuine Products",
    },
    {
        icon: RefreshCw,
        title: "Easy Returns",
        subtitle: "Within 3 Days",
    },
    {
        icon: Banknote,
        title: "Cash on Delivery",
        subtitle: "Pay When You Receive",
    },
    {
        icon: Truck,
        title: "Nationwide Delivery",
        subtitle: "All Over Bangladesh",
    },
];

export default function ValuePropositionBar() {
    return (
        <section className="bg-[#0f766e] py-3 md:py-4 mt-6 md:mt-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-around md:justify-between flex-wrap gap-y-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 md:gap-3 px-2 md:px-4"
                        >
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-xs md:text-sm font-semibold text-white">{feature.title}</p>
                                <p className="text-[10px] md:text-xs text-white/70 hidden sm:block">{feature.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
