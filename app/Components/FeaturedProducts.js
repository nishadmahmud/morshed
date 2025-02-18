'use client';

import Heading from '../CustomHooks/heading';
import noImg from '/public/no-image.jpg';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import useStore from '../CustomHooks/useStore';
import Link from 'next/link';
import bannerImage from '/public/side-banner-1.png';
import { Camera } from 'lucide-react';
import { Cpu } from 'lucide-react';
import { Battery } from 'lucide-react';
import { MemoryStick } from 'lucide-react';

const FeaturedProducts = ({ banner }) => {
  const { data: bestDeals, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/best-deals/${userId}`,
    fetcher
  );
  const { handleBuy, handleCart } = useStore();

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

  return (
    <div className='lg:mt-24 mt-16 poppins'>
      <Heading title={'Flash Sale'} />
      <div className='mt-8 lg:mt-10'>

      <div className='relative lg:hidden block w-11/12 mx-auto'>
            <Image
              src={bannerImage || noImg}
              alt='Newest Collection'
              layout='responsive'
              className='rounded-xl'
            />
          </div>

          <div className='flex w-11/12 justify-between  mx-auto'>
               {/* Product Grid */}
        <div>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-7 mt-4 lg:mt-0'>
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))
            : bestDeals?.data?.length > 0
            ? bestDeals.data.slice(0, 6).map((product) => (
              <div
              key={product.id}
              className='bg-gray-50 rounded-xl flex flex-col hover:shadow-md hover:scale-105 transition'
            >
              <Link onClick={updateRecentViews} href={`products/${product.id}`} className='flex flex-col items-center flex-grow '>
                <div className='relative w-full'>
                  <Image
                    src={product.image_path || noImg}
                    width={500}
                    height={200}
                    alt={product.name}
                    className='object-cover'
                    quality={100}
                  />
                  {product.discount && (
                    <p className='absolute top-2 left-2 bg-[#F16724] text-white text-xs font-bold py-1 px-2 rounded-md'>
                      SAVE {product.discount}%
                    </p>
                  )}
                </div>
                <div className='my-2 p-4'>
                  <h3 className='text-sm font-semibold text-black line-clamp-1 text-ellipsis mt-1'>{product.name}</h3>
                  <div>
                    {product.discount ? (
                      <div className='flex gap-2 mb-1'>
                        <span className='text-xl font-bold text-[#F16724]'>
                        <span className="font-bangla text-xl">৳</span>{(product.retails_price - (product.retails_price * product.discount) / 100).toFixed(0)}
                        </span>

                        <span className='text-sm font-bold text-gray-500 line-through'><span className="font-bangla text-xl">৳</span>{product.retails_price}</span>
                        
                      </div>
                    ) : (
                      <span className='text-xl font-bold text-[#F16724]'><span className="font-bangla text-sm">৳</span>{product.retails_price}</span>
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

              <div className='flex flex-col gap-2 mt-auto px-4 pb-3'>
                <button
                  onClick={() => handleBuy(product, 1)}
                  className='border border-[#F16724] text-[#F16724] text-xs font-semibold lg:px-3 py-1.5 rounded-md w-full'
                >
                  Buy Now
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCart(product, 1);
                  }}
                  className='bg-[#F16724] text-white text-xs font-semibold px-3 py-1.5 rounded-md w-full'
                >
                  Add to Cart
                </button>
              </div>
            </div>
            
              ))
            : (
              <p className='text-black text-center'>No products found</p>
            )}
        </div>
        </div>

        {/* Banner Section */}
        <div className='w-4/5 hidden lg:block col-span-1'>
          <div className='relative '>
            <Image
              src={bannerImage}
              alt='Newest Collection'
              layout='responsive'
              className='rounded-xl'
            />
          </div>
        </div>
          </div>
       
      </div>
    </div>
  );
};

export default FeaturedProducts;
