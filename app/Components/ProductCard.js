import Image from "next/image"
import Link from "next/link"
import useStore from "../CustomHooks/useStore"
import { useEffect } from "react"
import noImg from '/public/no-image.jpg'
import { Battery } from "lucide-react"
import { Cpu } from "lucide-react"
import { Camera } from "lucide-react"
import { MemoryStick } from "lucide-react"

const ProductCard = ({ product }) => {
  const { handleCart, handleBuy } = useStore()


 // Handle recent view when product card is clicked
 const updateRecentViews = () => {
  if (!product?.id) return

  let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
  
  // Remove existing entry if present
  recentViews = recentViews.filter(p => p.id !== product.id)
  
  // Add new entry to beginning
  recentViews.unshift({
    id: product.id,
    name: product.name,
    image: product.image_path || (product.images?.[0] || noImg.src),
    price: product.retails_price,
    discount: product.discount || 0
  })

  // Keep only last 5 items
  if (recentViews.length > 6) recentViews.pop()
  
  localStorage.setItem("recentlyViewed", JSON.stringify(recentViews))
}
  


  const discountedPrice = product?.discount
    ? (product.retails_price - (product.retails_price * product.discount) / 100).toFixed(0)
    : null

  // Calculate dynamic aspect ratio
  const aspectRatio = product?.image_width && product?.image_height 
    ? product.image_width / product.image_height 
    : 158 / 140;

    const validImage =
  product?.image_path ||
  (Array.isArray(product?.images) && product.images[0]) ||
  noImg;

  const specs = product?.specifications || [];
  console.log(specs);
  const battery = specs.find((s) => s.name.toLowerCase().includes("battery info"))?.description || "N/A";
  const batteryCapacity = battery.match(/\d+\s*mAh/)?.[0] || "N/A";
  console.log(batteryCapacity); 
  
  const chipset = specs.find((s) => s.name.toLowerCase().includes("chipset"))?.description?.split(" ")[0] || "N/A";
  const storage = specs.find((s) => s.name.toLowerCase().includes("storage"))?.description || "N/A";
  const camera = specs.find((s) => s.name.toLowerCase().includes("camera"))?.description || "N/A";

  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters
  };
  

  return (
    <div className="bg-white pb-2 border-gray-300 shadow-sm border transition ease-in-out  border-opacity-60 rounded-lg flex flex-col poppins hover:scale-105"> 
      <Link onClick={updateRecentViews}  href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}>
       
          <div className="relative h-36 w-40 mx-auto">
            <Image
              src={
                validImage
              }
              alt={product?.name}
              width={800}
              height={200}
              className='object-cover '
              quality={100}
            />
          </div>

          {product?.discount && (
            <p className="relative  md:-top-32 -top-36 w-20 text-center left-2 bg-[#F16724] text-white text-xs font-bold py-1 px-1 rounded-md">
              SAVE {product?.discount}%
            </p>
          )}
        

        <div className="lg:pb-2 pb-1 flex flex-col flex-grow px-4">
          <h3 className="text-sm font-semibold text-black line-clamp-1 text-ellipsis mt-3">
            {product?.name}
          </h3>
          <div className="mt-auto">
            {product?.discount ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#F16724]">
                <span className="font-bangla text-xl">৳</span> {discountedPrice}
                </span>
                
                <span className="text-sm font-bold text-[#504f4d] line-through">
                <span className="font-bangla text-sm">৳</span>{product?.retails_price} 
                </span>
                
              </div>
            ) : (
              <span className="text-xl font-bold text-[#F16724]">
                <span className="font-bangla text-xl">৳</span> {product?.retails_price} 
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="text-gray-600 px-5 grid mb-3 justify-items-start grid-cols-2 gap-1">
      
      <div className="flex items-start gap-1 text-xs">
        <Battery size={15}></Battery>
        {batteryCapacity}
      </div>
      <div className="hidden md:flex items-start gap-1 text-xs">
        <Cpu size={15}></Cpu>
        {chipset}
      </div>
      <div className="flex items-start gap-1 text-xs">
        <Camera size={15}></Camera>
        {camera}
      </div>
      <div className="hidden md:flex items-start gap-1 text-xs">
        <MemoryStick size={15}></MemoryStick>
        {storage}
      </div>

    </div>
      
      <div className='flex flex-col gap-2 items-center mt-0 mx-3 mb-3'>
          <button onClick={() => {handleBuy(product,1)}} className="border-[#F16724] text-nowrap border text-xs text-[#F16724] w-full px-[2px] py-1.5 rounded-md font-semibold  transition-colors">Buy Now</button>
          <button
              onClick={(e) => {e.preventDefault(),handleCart(product,1)}}
              className="bg-[#F16724] border border-transparent text-xs text-nowrap text-white w-full px-[2px] py-1.5 rounded-md font-semibold  transition-colors"
              >
              Add to Cart
          </button>
      </div>
    </div>
  )
}

export default ProductCard
