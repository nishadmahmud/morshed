import HeroSlider from "../Components/HeroSlider";
import FeaturedCategories from '../Components/FeaturedCategories';
import { PromotionModal, BenefitsSection } from '../Components/LazyComponents';
import BrandMarquee from "../Components/BrandMarquee";
import NewArrivalSection from "../Components/NewArrivalSection";
import BestDealsSection from "../Components/BestDealsSection";
import LifestyleBanner from "../Components/LifestyleBanner";
import ShopByStyle from "../Components/ShopByStyle";
import { userId, fetcher } from "../constants";

// Re-export for backwards compatibility with other files that might import from here
export { userId, fetcher };

export default async function Home() {
  // Fetch all data in parallel
  const [promotionRes, sliderRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`, { next: { revalidate: 60 } }),
    fetch(`${process.env.NEXT_PUBLIC_API}/get-sliders/${userId}`, { next: { revalidate: 60 } })
  ]);

  const promotion = promotionRes.ok ? await promotionRes.json() : null;
  const slider = sliderRes.ok ? await sliderRes.json() : [];

  return (
    <>
      <PromotionModal offers={promotion} />

      {/* Hero Slider */}
      <HeroSlider slider={slider} />

      {/* Brand Logos Bar */}
      <BrandMarquee />

      <main className="bg-white">
        {/* Shop by Category Grid */}
        <FeaturedCategories />

        {/* New Arrivals Section */}
        <NewArrivalSection />

        {/* Lifestyle Banner */}
        <LifestyleBanner
          title="Elevate Your Style"
          subtitle="Premium collection for the modern man"
          ctaText="Explore Collection"
          ctaLink="/category/6749?category=Stripe%20Pattern%20Shirt"
          bannerIndex={2}
        />

        {/* Best Deals Section */}
        <BestDealsSection />

        {/* Shop by Style Section */}
        <ShopByStyle />

        {/* Benefits Section */}
        <BenefitsSection />
      </main>
    </>
  );
}
