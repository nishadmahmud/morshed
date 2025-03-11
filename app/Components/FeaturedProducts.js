'use client';

import Heading from '../CustomHooks/heading';
import noImg from '/public/no-image.jpg';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import useStore from '../CustomHooks/useStore';
import Link from 'next/link';
import { Camera, Cpu, Battery, MemoryStick } from 'lucide-react';

const FeaturedProducts = ({ banner }) => {
  const { data: bestDeals, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/best-deals/${userId}`,
    fetcher
  );
  const { handleBuy, handleCart } = useStore();


  // Handle recent view when product card is clicked
    const updateRecentViews = (product) => {
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

   const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters
  };

  return (
    <div className='lg:mt-24 mt-16 poppins '>
      <Heading title={'Flash Sale'} />
      <div className='w-11/12 mx-auto'>

      <div className='flex mt-5'>
          <div className='w-full h-[50vh] object-cover'>
            <Image
              width={400}
              height={600}
              src={banner.data[2].image_path || noImg}
              alt='Newest Collection'
              className='rounded-xl object-cover w-full h-full'
            />
          </div>
        </div>

      <div className='mt-8 lg:mt-10 flex flex-col lg:flex-row gap-6'>
        
        {/* Product Grid */}
        <div className='flex-1'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6'>
            {isLoading
              ? Array.from({ length: 10 }).map((_, idx) => <CardSkeleton key={idx} />)
              : bestDeals?.data?.length > 0
              ? bestDeals.data.slice(0, 10).map((product) => {
                  const specs = product?.specifications || [];
                  const battery = specs.find((s) => s.name.toLowerCase().includes("battery info"))?.description || "N/A";
                  const batteryCapacity = battery.match(/\d+\s*mAh/)?.[0] || "N/A";
                  const chipset = specs.find((s) => s.name.toLowerCase().includes("chipset"))?.description?.split(" ")[0] || "N/A";
                  const storage = specs.find((s) => s.name.toLowerCase().includes("storage"))?.description || "N/A";
                  const camera = specs.find((s) => s.name.toLowerCase().includes("camera"))?.description ?? "N/A";
                      const getFirstTwoWords = (text) => text.split(' ').slice(0, 2).join('').replace(',', '');
                      
                      const cameraShort = camera !== "N/A" ? getFirstTwoWords(camera) : "N/A";
                      
                      console.log(cameraShort);

                  return (
                    <div key={product.id} className='bg-white border border-gray-300 rounded-xl flex flex-col shadow-sm hover:scale-105 transition py-2'>
                      <Link onClick={() => updateRecentViews(product)} href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`} className='flex flex-col'>
                        <div className='relative mx-auto'>
                          <Image
                            src={product.image_path || noImg}
                            width={500}
                            height={200}
                            alt={product.name}
                            className='object-cover h-36 w-40'
                            quality={100}
                          />
                          {product.discount ? (
                            <p className='absolute top-4 lg:top-2 left-2 bg-[#c03b2c] text-white text-xs font-bold py-1 px-2 rounded-md'>
                              SAVE {product.discount}%
                            </p>
                          ) : ""}
                        </div>
                        <div className='mt-6 px-4 my-2'>
                          <h3 className='text-sm font-semibold text-black line-clamp-1 text-start'>{product.name}</h3>
                          <div>
                            {product.discount ? (
                              <div className='flex gap-2 items-start justify-start'>
                                <span className='text-sm md:text-xl font-bold text-[#c03b2c]'>
                                  <span className="font-bangla text-sm md:text-xl">৳</span>{(product.retails_price - (product.retails_price * product.discount) / 100).toFixed(0)}
                                </span>
                                <span className='text-xs md:text-sm font-bold text-gray-500 line-through'>
                                  <span className="font-bangla text-xs md:text-xl">৳</span>{product.retails_price}
                                </span>
                              </div>
                            ) : (
                              <span className='text-sm md:text-xl font-bold text-[#c03b2c]'>
                                <span className="font-bangla text-sm">৳</span>{product.retails_price}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>

                      <div className="text-gray-600 px-5 grid grid-cols-2 gap-1 mb-3">
                        <div className="flex items-start gap-1 text-xs"><Battery size={15} /> {batteryCapacity}</div>
                        <div className="hidden md:flex items-start gap-1 text-xs"><Cpu size={15} /> {chipset}</div>
                        <div className="flex items-start gap-1 text-xs"><Camera size={15} /> {cameraShort}</div>
                        <div className="hidden md:flex items-start gap-1 text-xs"><MemoryStick size={15} /> {storage}</div>
                      </div>

                      <div className='flex flex-col gap-2 px-4 pb-3'>
                        <button
                          onClick={() => handleBuy(product, 1)}
                          className='border border-[#c03b2c] text-[#c03b2c] text-xs font-semibold py-1.5 rounded-md w-full'
                        >
                          Buy Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCart(product, 1);
                          }}
                          className='bg-[#c03b2c] text-white text-xs font-semibold py-1.5 rounded-md w-full'
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })
              : (
                <p className='text-black text-center'>No products found</p>
              )}
          </div>
        </div>
 

      </div>
    </div>
    </div>
  );
};

export default FeaturedProducts;
