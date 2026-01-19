"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        // Simulate API call (you can replace with actual newsletter API)
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubscribed(true);
        setIsSubmitting(false);
        setEmail("");

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubscribed(false), 5000);
    };

    return (
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left side - Content */}
                        <div className="flex-1 p-8 lg:p-12">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-[#0f766e]/10 rounded-full flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-[#0f766e]" />
                                </div>
                                <span className="text-sm font-medium text-[#0f766e] uppercase tracking-wider">Newsletter</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                Stay in the Loop
                            </h2>
                            <p className="text-gray-600 mb-6 max-w-md">
                                Subscribe for exclusive deals, new arrivals, and style tips delivered to your inbox.
                            </p>

                            {/* Form */}
                            {isSubscribed ? (
                                <div className="flex items-center gap-2 text-[#0f766e] bg-[#0f766e]/10 py-3 px-5 rounded-lg inline-flex">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Thanks for subscribing!</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="flex-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 bg-[#0f766e] text-white font-medium rounded-lg hover:bg-[#0a5c54] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            "Subscribing..."
                                        ) : (
                                            <>
                                                Subscribe
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}

                            <p className="text-gray-400 text-xs mt-4">
                                We respect your privacy. Unsubscribe anytime.
                            </p>
                        </div>

                        {/* Right side - Visual */}
                        <div className="hidden lg:flex lg:w-72 bg-gradient-to-br from-[#0f766e] to-[#0a5c54] items-center justify-center relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10 text-center p-8">
                                <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-4" />
                                <p className="text-white font-medium text-lg">Get 10% Off</p>
                                <p className="text-white/70 text-sm">on your first order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
