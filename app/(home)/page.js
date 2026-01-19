import HeroSlider from "../components/HeroSlider";
import FeaturedCategories from '../components/FeaturedCategories';
import { PromotionModal, BenefitsSection } from '../components/LazyComponents';
import BrandMarquee from "../components/BrandMarquee";
import NewArrivalSection from "../components/NewArrivalSection";
import BestDealsSection from "../components/BestDealsSection";
import LifestyleBanner from "../components/LifestyleBanner";
import ShopByStyle from "../components/ShopByStyle";
import CategoryShowcase from "../components/CategoryShowcase";
import ValuePropositionBar from "../components/ValuePropositionBar";
import QuickNavBar from "../components/QuickNavBar";
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

      {/* Quick Navigation Bar */}
      <QuickNavBar />

      {/* New Arrivals Section */}
      <NewArrivalSection />

      <ShopByStyle />

      {/* Value Proposition Bar */}
      {/* <ValuePropositionBar /> */}

      <main className="bg-white">
        {/* Shop by Category Grid */}
        <FeaturedCategories />

        {/* Lifestyle Banner */}
        <LifestyleBanner
          brandName="Morshed Mart"
          tagline="Because comfort and confidence go hand in hand."
          description="We focus on carefully selecting the best clothing that is comfortable, looks great, and makes you confident. Apart from the fabric, design and fit, we go through strict quality control parameters to give you what you truly deserve."
          ctaLink="/new-arrivals"
          bannerIndex={2}
        />


        {/* Shop by Style Section */}


        {/* Category Showcase Section - First 2 categories */}
        <CategoryShowcase startIndex={0} count={2} />

        {/* Second Lifestyle Banner (Full Width) - Banner Index 3 */}
        <LifestyleBanner
          brandName="Morshed Mart"
          tagline="Urban Elegance"
          description="Discover the city look"
          ctaLink="/category/6749?category=Stripe%20Pattern%20Shirt"
          bannerIndex={3}
        />

        {/* Category Showcase Section - Next 2 categories */}
        <CategoryShowcase startIndex={2} count={2} />

        {/* Best Deals Section */}
        <BestDealsSection />

        {/* Brand Logos Bar - Trusted Brands */}
        <BrandMarquee />

        {/* Benefits Section */}
        <BenefitsSection />
      </main>
    </>
  );
}
