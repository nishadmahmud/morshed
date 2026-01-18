"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

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
        <section className="bg-[#0f766e] py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-7 h-7 text-white" />
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Stay in the Loop
                    </h2>
                    <p className="text-white/80 mb-8">
                        Subscribe for exclusive deals, new arrivals, and style tips delivered to your inbox.
                    </p>

                    {/* Form */}
                    {isSubscribed ? (
                        <div className="flex items-center justify-center gap-2 text-white bg-white/10 py-4 px-6 rounded-lg">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Thanks for subscribing!</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-white text-[#0f766e] font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
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

                    {/* Privacy Note */}
                    <p className="text-white/60 text-xs mt-4">
                        We respect your privacy. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
