
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


export const userId = 165;
export const fetcher = (url) => fetch(url).then(res => res.json());



export default async function Home() {

  

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
      <PromotionModal/>
      <HeroSlider slider={slider} banner={banner}/>
      <div>
        <FeaturedCategories categories={categories}/>
        <OurFeatures />
        <ReadyForOrder />  
        <BannerSection banner={banner}/>
        <FeaturedProducts banner={banner}/>
        <NewArrival banner={banner}/> 
        <TopBrandProducts brands={brands}/> 
        <Brands brands={brands}/>    
      </div>
        
    </>
  );
}

