
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

  const promotionRes = await fetch(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`);
  const promotion = await promotionRes.json();

  const bannerRes = await fetch(`${process.env.NEXT_PUBLIC_API}/get-banners/${userId}`,{
    next : {revalidate : 360}
  })
  const banner = await bannerRes.json();

  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{
    next : {revalidate : 360}
  });
  const categories = await categoriesRes.json();

 


  return (
    <>
    {/* <SelectRegionModal></SelectRegionModal> */}
      <PromotionModal offers={promotion}/>
      <HeroSlider />
      <BrandMarquee />
      <div>
        <FeaturedCategories />
        <MensBanner banner={banner}></MensBanner>
        <StripeShirt></StripeShirt>
        <SmallBanner banner={banner}/>
        <SolidTshirt></SolidTshirt>
        <VideoSection></VideoSection>
        <BannerSection categories={categories} banner={banner}/>
        <HalfSelveePolo></HalfSelveePolo>
        <OfferPage categories={categories}></OfferPage>
        <BenefitsSection></BenefitsSection>
      </div>
        
    </>
  );
}




