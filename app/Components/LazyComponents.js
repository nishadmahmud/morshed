"use client";
import dynamic from 'next/dynamic';

// Lazy load below-the-fold components
export const VideoSection = dynamic(() => import('./VideoSection'), {
    ssr: false,
    loading: () => <div className="min-h-[400px]" />
});

export const BenefitsSection = dynamic(() => import('./BenefitsSection'), {
    ssr: false,
    loading: () => <div className="min-h-[300px]" />
});

export const PromotionModal = dynamic(() => import('./PromotionModal'), {
    ssr: false
});

export const AvatarChat = dynamic(() => import('./AvatarChat'), {
    ssr: false
});
