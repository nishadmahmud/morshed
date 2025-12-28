
import HeroSlider from "../Components/HeroSlider";
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import PromotionModal from "../Components/PromotionModal";
import SmallBanner from "../Components/SmallBanner";
import MensBanner from "../Components/MensBanner";
import SolidTshirt from "../Components/SolidTshirt";
import OfferPage from "../Components/OfferPage";
import HalfSelveePolo from "../Components/HalfSelveePolo";
import BenefitsSection from "../Components/BenefitsSection";
import VideoSection from "../Components/VideoSection";
import BrandMarquee from "../Components/BrandMarquee";
import StripeShirt from "../Components/StripeShirt";


export const userId = 203;
export const fetcher = (url) => fetch(url).then(res => res.json());



export default async function Home() {

  const promotionPromise = fetch(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`, { next: { revalidate: 60 } });

  const bannerPromise = fetch(`${process.env.NEXT_PUBLIC_API}/get-banners/${userId}`, {
    next: { revalidate: 60 }
  })

  const categoriesPromise = fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`, {
    next: { revalidate: 60 }
  });

  const sliderPromise = fetch(`${process.env.NEXT_PUBLIC_API}/get-sliders/${userId}`, {
    next: { revalidate: 60 }
  });

  const [promotionRes, bannerRes, categoriesRes, sliderRes] = await Promise.all([
    promotionPromise,
    bannerPromise,
    categoriesPromise,
    sliderPromise
  ]);

  const promotion = promotionRes.ok ? await promotionRes.json() : null;
  const banner = bannerRes.ok ? await bannerRes.json() : null;
  const categories = categoriesRes.ok ? await categoriesRes.json() : [];
  const slider = sliderRes.ok ? await sliderRes.json() : [];




  return (
    <>
      {/* <SelectRegionModal></SelectRegionModal> */}
      <PromotionModal offers={promotion} />
      <HeroSlider slider={slider} />
      <BrandMarquee />
      <div>
        <FeaturedCategories />
        <MensBanner banner={banner}></MensBanner>
        <StripeShirt></StripeShirt>
        <SmallBanner banner={banner} />
        <SolidTshirt></SolidTshirt>
        <VideoSection></VideoSection>
        <BannerSection categories={categories} banner={banner} />
        <HalfSelveePolo></HalfSelveePolo>
        <OfferPage categories={categories}></OfferPage>
        <BenefitsSection></BenefitsSection>
      </div>

    </>
  );
}




