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
    image: product.image_path || (product.images?.[0] || noImg),
    price: product.retails_price,
    discount: product.discount || 0
  })

  // Keep only last 5 items
  if (recentViews.length > 6) recentViews.pop()
  
  localStorage.setItem("recentlyViewed", JSON.stringify(recentViews))
}

  
  useEffect(() => {
    const recentViews = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    if (!recentViews.includes(product.id)) {
      recentViews.push(product.id);
      if (recentViews.length > 5) {
        recentViews.shift();
      }
      localStorage.setItem('recentlyViewed', JSON.stringify(recentViews));
    }
  }, [product]);

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


  return (
    <div className="bg-gray-50 hover:shadow-md transition ease-in-out  border-opacity-60 rounded-lg flex flex-col poppins hover:scale-105"> 
      <Link onClick={updateRecentViews} href={`/products/${product?.id}`} className="flex flex-col flex-grow">
        <div>
          <div className="relative w-full mx-auto" style={{ aspectRatio }}>
            <Image
              src={
                validImage
              }
              alt={product?.name}
              width={500}
              height={250}
              style={{
                objectFit: 'cover',
              }}
              quality={100}
            />
          </div>

          {product?.discount && (
            <p className="relative lg:bottom-72 -top-40 w-20 text-center left-2 bg-[#F16724] text-white text-xs font-bold py-1 px-1 rounded-md">
              SAVE {product?.discount}%
            </p>
          )}
        </div>

        <div className="pb-4 flex flex-col flex-grow px-4">
          <h3 className="text-sm font-semibold text-black mb-2 line-clamp-1 text-ellipsis">
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

      <div className="text-gray-600 px-5 grid mb-3 justify-items-start lg:grid-cols-2 gap-1">

        <div className="flex items-start gap-1 text-xs">
          <Battery size={15}></Battery>
          6000 mah
        </div>
        <div className="flex items-start gap-1 text-xs">
          <Cpu size={15}></Cpu>
          Octa-core AI
        </div>
        <div className="flex items-start gap-1 text-xs">
          <Camera size={15}></Camera>
          108 mp
        </div>
        <div className="flex items-start gap-1 text-xs">
          <MemoryStick size={15}></MemoryStick>
          16 GB
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
