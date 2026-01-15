import HeroSlider from "../components/HeroSlider";
import FeaturedCategories from '../components/FeaturedCategories';
import { PromotionModal, BenefitsSection } from '../components/LazyComponents';
import BrandMarquee from "../components/BrandMarquee";
import NewArrivalSection from "../components/NewArrivalSection";
import BestDealsSection from "../components/BestDealsSection";
import LifestyleBanner from "../components/LifestyleBanner";
import ShopByStyle from "../components/ShopByStyle";
import CategoryShowcase from "../components/CategoryShowcase";
import { api, fetcher, userId } from "../lib/api";

// Re-export for backwards compatibility with other files that might import from here
export { userId, fetcher };

export default async function Home() {
  // Fetch all data in parallel
  const [promotionRes, sliderRes] = await Promise.all([
    fetch(api.getLatestOffers(), { next: { revalidate: 60 } }),
    fetch(api.getSliders(), { next: { revalidate: 60 } })
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

        {/* Category Showcase Section */}
        <CategoryShowcase />

        {/* Second Lifestyle Banner (Full Width) - Banner Index 3 */}
        <LifestyleBanner
          title="Urban Elegance"
          subtitle="Discover the city look"
          ctaText="Shop Now"
          ctaLink="/category/6749?category=Stripe%20Pattern%20Shirt"
          bannerIndex={3}
        />

        {/* Second Shop by Style Section (Two Banners) - Starting from Banner Index 4 */}
        <ShopByStyle startBannerIndex={4} />

        {/* Benefits Section */}
        <BenefitsSection />
      </main>
    </>
  );
}
