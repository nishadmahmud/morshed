
import HeroSlider from "../Components/HeroSlider";
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import FeaturedProducts from "../Components/FeaturedProducts";
import NewArrival from "../Components/NewArrival";
import PromotionModal from "../Components/PromotionModal";
import SmallBanner from "../Components/SmallBanner";
import MensBanner from "../Components/MensBanner";
import MenCollection from "../Components/MenCollection";
import WomenCollection from "../Components/WomenCollection";


export const userId = 203;
export const fetcher = (url) => fetch(url).then(res => res.json());



export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{cache : 'no-cache'});
  const data = await response.json();

  console.log(data);


  const promotionRes = await fetch(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`);
  const promotion = await promotionRes.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get-sliders/${userId}`,{cache : 'no-cache'});
  const slider = await res.json();

  const bannerRes = await fetch(`${process.env.NEXT_PUBLIC_API}/get-banners/${userId}`,{
    cache : 'no-cache'
  })
  const banner = await bannerRes.json();

  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{
    cache : 'no-cache'
  });
  const categories = await categoriesRes.json();

  const brandsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/brands/${userId}`,{
    cache : "no-cache"
  });
  const brands = await brandsRes.json();


  return (
    <>
      <PromotionModal promotionBanner={promotion?.data}/>
      <HeroSlider slider={slider} banner={banner} data={categories}/>
        {/* <OurFeatures /> */}
      <div>
        <FeaturedCategories categories={categories}/>
        <NewArrival banner={banner}/> 
        {/* <ReadyForOrder />   */}
        <MensBanner banner={banner}></MensBanner>
        <MenCollection></MenCollection>
        <SmallBanner banner={banner}/>
        <WomenCollection></WomenCollection>
        {/* <Fitness></Fitness> */}
        <BannerSection banner={banner}/>
        <FeaturedProducts banner={banner}/>
        {/* <Brands brands={brands}/>     */}
        {/* <TopBrandProducts brands={brands}/>  */}
        {/* <Paragraph></Paragraph> */}
      </div>
        
    </>
  );
}

