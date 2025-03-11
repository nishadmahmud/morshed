
import HeroSlider from "../Components/HeroSlider";
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import OurFeatures from '../Components/OurFeatures';
import Brands from '../Components/Brands';
import ReadyForOrder from "../Components/ReadyForOrder";
import FeaturedProducts from "../Components/FeaturedProducts";
import NewArrival from "../Components/NewArrival";
import TopBrandProducts from "../Components/TopBrandProducts";
import PromotionModal from "../Components/PromotionModal";


export const userId = 181;
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
      <HeroSlider data={data} slider={slider} banner={banner}/>
      <div>
        <FeaturedCategories categories={categories}/>
        <OurFeatures />
        <ReadyForOrder />  
        <FeaturedProducts banner={banner}/>
        <BannerSection banner={banner}/>
        <NewArrival banner={banner}/> 
        <TopBrandProducts brands={brands}/> 
        <Brands brands={brands}/>    
      </div>
        
    </>
  );
}

