"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useStore from "@/app/CustomHooks/useStore";
import {  FaWhatsapp } from "react-icons/fa6";
import { Landmark } from "lucide-react";
import Link from "next/link";
import CustomImageMagnifier from "@/app/CustomHooks/CustomImageMagnifier";
import useSWR from "swr";
import { fetcher } from "../../page";
import noImg from '/public/no-image.jpg'


const Page = ({ params }) => {
  const { handleCart,getCartItems,refetch,setRefetch,handleBuy } = useStore();
  const [scroll,setScroll] = useState(0);
  // const [product,setProduct] = useState({});
  const [recentItems,setRecentItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity,setQuantity] = useState(1);
  const [activeTab,setActiveTab] = useState('Specification');
  const [imageIndex,setImageIndex] = useState(0); 
  
  useEffect(() => {
    setCartItems(getCartItems());
    if (refetch) {
      setCartItems(getCartItems());
      setRefetch(false);
    }
  }, [refetch,setRefetch,getCartItems]);

  const {data : product} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/products-detail/${params.slug}`,fetcher);


  // const getProductDetails =  useCallback(()  => {
  //   axios.get(`${process.env.NEXT_PUBLIC_API}/public/products-detail/${params.slug}`,)
  //   .then(res => {
  //     setProduct(res.data.data)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // },[params.slug])

  // useEffect(() => {
  //   getProductDetails();
  // },[getProductDetails])

  


  

  // const matchWithCart = cartItems.filter(item => item.title === product.title);
  // console.log(matchWithCart);

  const [selectedColor, setSelectedColor] = useState('Space Black')
  const [selectedStorage, setSelectedStorage] = useState('');

  const [storages,setStorages] = useState(''); 

  const colors = ['Space Black', 'Gold', 'Pink', 'Blue', 'White']

  

  const isCartItem  = cartItems.find(item => item?.id === product?.data.id || undefined); 

  useEffect(() => {
    if(storages && storages.length > 0) setSelectedStorage(storages[0])
  },[storages])

  useMemo(() => {
    if(product && product?.data.imeis && product?.data.imeis.length > 0){
     const uniqueStorage =  [...new Set(product.data.imeis.map((item) => item.storage))];
     setStorages(uniqueStorage)
    }
  },[product])

  useEffect(() => {
    const handleScroll = () => {
        setScroll(window.scrollY);
    }
    window.addEventListener('scroll',handleScroll);
    return () => window.removeEventListener('scroll',handleScroll)  
   },[])


   const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentProducts(storedProducts);
  }, []);

  //  const handleMobileSlider = (idx) => {
      
  //     const updatedImages = [...images.slice(idx), ...images.slice(0, idx)];
  //     setImages(updatedImages);
  //     setImageIndex(0);
  //   }

  //  console.log(product);
  
  // isLoading && <p>Loading....</p>

  // const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  // useEffect(() => {
  //   // Retrieve the list of recently viewed product slugs from localStorage
  //   const recentViews = JSON.parse(localStorage.getItem('recentlyViewed') || []);
  //   if (recentViews.length > 0) {
  //     // Fetch product details for each recently viewed slug
  //     fetchProductsBySlugs(recentViews);
  //   }
  // }, []);

  // const fetchProductsBySlugs = async (slugs) => {
  //   try {
  //     const fetchedProducts = await Promise.all(
  //       slugs.map((slug) => 
  //         axios.get(`${process.env.NEXT_PUBLIC_API}/public/products-detail/${slug}`)
  //           .then(res => res.data.data)
  //       )
  //     );
  //     setRecentlyViewedProducts(fetchedProducts);
  //   } catch (error) {
  //     console.log("Error fetching products", error);
  //   }
  // };

  // console.log(recentlyViewedProducts);
  
  
  return (
    <div className="bg-white px-5 lg:p-8 mx-auto text-black max-w-7xl overflow-hidden sans">
      
      <div className="container mx-auto px-4 pb-8">
      {/* <div className="flex items-center text-sm mb-4">
        <Link href="/" className="text-orange-500 hover:underline">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/phones" className="text-orange-500 hover:underline">Phones & Tablets</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-500">iPhone 16</span>
      </div> */}

      <div className="flex flex-col md:flex-row flex-1 gap-8">
        <div className="relative">
          {/* desktop */}
          <div id="magnify" className="hidden  mb-4 col-span-1 border lg:flex justify-center rounded-2xl p-2 cursor-zoom-in fluid__image-container">
            { 
            product?.data.images?.length > 0 ? 
            <div >
              <CustomImageMagnifier
                smallImageSrc={product?.data.images[0]}
                largeImageSrc={product?.data.images[0]}
                altText={product?.data.name}
              />
            </div> :
            <div>
              <CustomImageMagnifier
                smallImageSrc={product?.data.image_path}
                largeImageSrc={product?.data.image_path}
                altText={product?.data.name}
              />

            </div>
            }
          </div>

            {/* mobile */}
          <div className="flex justify-center lg:hidden ">
            {
               product?.data.images?.length > 0 ? 
               ( <Image 
                    height={200} 
                    width={200} 
                    alt="product" 
                    src={product?.data.images[imageIndex]} 
                />
            ) : product?.data.image_path ? (
                <Image 
                    height={200} 
                    width={200} 
                    alt="product" 
                    src={product?.data.image_path} 
                />
            ) : (
              <Image
              src={noImg}
              height={200} 
              width={200} 
              alt="mobile-phone"
              quality={75}
            />
            )
            }
          </div>
            {/* discount ribon */}
          {
              product?.data.discount ?
              <p className="text-white bg-[#F16724] rounded-md  absolute py-1 
              px-[6px] text-sm -top-5 lg:top-3 left-12">SAVE {product.discount}%</p> : ''
          }
          <div className="flex justify-center space-x-2 mb-4 ">
                {
                  product?.data.images &&  product?.data.images.length > 0 ?
                  product.data.images.map((image,idx) => {
                    return <div key={idx} className={`relative p-2  ${imageIndex === idx ? 'border-2 border-[#0F98BA]': ''} }   overflow-hidden `}>
                    <Image
                      onClick={() => setImageIndex(idx)}
                      src={image}
                      alt={product?.data.name}
                      height={71}
                      width={71}
                      quality={100}
                      className="cursor-pointer"
                    />
                  </div>
                  }) : 
                  ''
                }  
          </div>
        </div>

        <div>
          <h1 className="text-base sans lg:text-2xl font-semibold mb-2 lg:text-nowrap">{product?.data.name}</h1>
          
          <div className="mb-4 flex items-center ">
            {
              product?.data.discount ? <div className="text-nowrap flex gap-2 items-center">
                <span className="text-sm lg:text-2xl font-bold text-[#4e4b49] line-through">{product?.data.retails_price} ৳</span>
                <span className=" sans lg:text-3xl font-bold text-[#F16724]">{product?.data.retails_price - ((product?.data.retails_price * product?.data.discount) / 100).toFixed(0)} ৳</span>
              </div> :
              <span className=" sans lg:text-3xl font-bold text-[#F16724]">{product?.data.retails_price} ৳</span>
            }
            
            <h6 className="text-sm text-nowrap text-gray-800 font-semibold ml-2 px-4 py-2 bg-gray-200 ">Status: <span className="font-normal text-xs">{product?.data.status}</span> </h6>
          </div>
          <div className="mb-4 flex items-center flex-wrap lg:flex-nowrap gap-3">
            <p className="text-gray-800 text-sm  p-2 bg-gray-200 flex items-center text-nowrap gap-2"><Landmark size={16}/> EMI Available <Link target="_blank" href={'/Convenient Global EMI (for QR) (Updated- 05-01-22)(0)(0)(0).pdf'} className="text-blue-500 font-semibold">View Plans</Link></p>
            <p className="text-gray-800 text-sm text-nowrap bg-gray-200 p-2 "> Exchange <Link href={'/plans'} className="text-blue-500 font-semibold">View Plans</Link></p>
          </div>
          <Link
            href="https://wa.me/+8801711157290" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center w-fit space-x-3 text-sm px-4 py-1 text-white font-semibold rounded-md bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 hover:text-white transition-colors duration-200 mb-3"
          >
            <FaWhatsapp className="text-2xl" />
            <span>Message <br /> on WhatsApp</span>
          </Link>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Color: {selectedColor}</h3>
            <div className="flex space-x-2">
              {/* {
              product?.data?.color.length > 0 &&
              product?.data?.color.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                />
              ))} */}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Storage: {selectedStorage ? `${selectedStorage}` : 'N/A'}</h3>
            <div className="flex space-x-2">
              { storages && storages.length > 0 &&
              storages.map((storage) => (
                storage ?
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-4 py-2 rounded ${
                    selectedStorage === storage
                      ? 'bg-[#F16724] text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {storage} 
                </button>
                : ''
              ))}
            </div>
          </div>
          {/* <div className="flex space-x-4 mb-4 flex-wrap justify-start">
            <div className="flex items-center border border-[#0F98BA] rounded-md overflow-hidden  ">
              <button
                onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}
                className="px-4 py-2 text-[#0F98BA] font-semibold "
              >
                -
              </button>
              <div className="px-4 py-2 border-[#0F98BA] border-x text-[#0F98BA] font-semibold">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-[#0F98BA] font-semibold "
              >
                +
              </button>
            </div>
            <div className="flex gap-4 mt-5 md:mt-5 lg:mt-0">
              <button onClick={() => handleBuy(product?.data,quantity)} className="px-4 border border-transparent py-1 bg-[#F16724] text-white rounded-sm hover:bg-white hover:border-[#F16724]  hover:text-[#F16724]">Buy Now</button>

              <button disabled={isCartItem !== undefined} variant="outline" className={`border px-4 py-1 border-[#F16724] text-[#F16724] hover:bg-[#F16724] hover:text-white  ${
              isCartItem !== undefined ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`} onClick={() => handleCart(product?.data,quantity)}>{isCartItem !== undefined ? 'Added' : 'Add to Cart'}</button>
            </div>
           
          </div> */}

          <div className="flex flex-wrap items-center gap-4 justify-start mb-4">
            {/* Quantity Controls */}
            <div className="flex items-center border border-[#0F98BA] rounded-md overflow-hidden">
              <button
                onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}
                className="px-4 py-2 text-[#0F98BA] font-semibold"
              >
                -
              </button>
              <div className="px-4 py-2 border-x border-[#0F98BA] text-[#0F98BA] font-semibold">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-[#0F98BA] font-semibold"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
            <button
                onClick={() => handleBuy(product?.data, quantity)}
                className="px-5 py-1 bg-[#F16724] text-white hover:bg-white hover:text-[#F16724] hover:border-[#F16724] rounded-md border border-transparent"
              >
                Buy Now
              </button>

              <button
                disabled={isCartItem !== undefined}
                className={`border border-[#F16724] px-4 py-1 bg-transparent text-black hover:bg-[#F16724] hover:text-white rounded-md ${
                  isCartItem !== undefined
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : ''
                }`}
                onClick={() => handleCart(product?.data, quantity)}
              >
                {isCartItem !== undefined ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* <p className="text-sm text-gray-500">Apple Store 1 Year Warranty Support</p> */}
        </div>
      </div>

      {/* related products */}
      {/* <div className="my-12">
        <Heading title={'Related Products'}/>
        <Swiper
            slidesPerView={2}
            spaceBetween={20}
            navigation= {true}
            loop={true}
            modules={[Navigation]}
            breakpoints={{
              // Responsive breakpoints
              640: {
                slidesPerView: 2, // Show 2 slides for devices with width >= 640px
                spaceBetween: 10, // Adjust space for mobile
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5, // Show 4 slides for devices with width >= 1024px
                spaceBetween: 20, // Default space for larger screens
              },
            }}
            className="trending-swiper"
            >
              {
                relatedProducts.length > 0 ? (
                  relatedProducts.slice(0,10).map((product, idx) => {
                    return (
                      <SwiperSlide key={idx} className="flex select-none justify-center">
                        <div className="max-w-sm bg-white text-center border-gray-200 grid grid-rows-[auto,1fr,auto] gap-4 p-4 border rounded-lg ">
                        <Link
                          href={`/products/${product?.name}`}>
                            <div className="flex items-center justify-center">
                            <Image
                              src={product?.image[0]}
                              height="200"
                              width="200"
                              alt="mobile-phone"
                              quality={75}
                            />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium mb-2 text-black">
                                {product?.name}
                              </h3>
        
                              <p className="text-sm text-gray-800 font-bold mb-4">
                                {product?.retails_price} ৳
                              </p>
                            </div>
                        </Link>
                        <div className='flex gap-2 flex-col md:flex-col lg:flex-row items-center'>
                          <button onClick={(e) => {e.preventDefault(),handleBuy(product,quantity)}} className="border-[#ff8800] border text-xs text-[#ff8800] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">Buy Now</button>
                          <button
                              onClick={(e) => {e.preventDefault(),handleCart(product,1)}}
                              className="bg-[#ff8800] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold  transition-colors"
                              >
                              Add to Cart
                              </button>
                        </div>
                        </div> 
                      </SwiperSlide>
                      
                    );
                  })
                ) : (
                  <p>No products found</p>
                )
              }
              
        </Swiper>
      </div> */}

    </div>
      
    <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-8">
      <div className="col-span-2">
        <div className="flex space-x-2 lg:space-x-4 bg-gray-100 w-fit mb-5 p-2 rounded-lg">
          {['Specification', 'Description', 'Warranty'].map((tab) => (
            <Link
            key={tab}
            href={`#${tab}`} // Use lowercase IDs for section navigation
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-sm font-semibold rounded-lg ${
              activeTab === tab ? 'text-black bg-white shadow' : 'text-gray-500'
            }`}
          >
            {tab}
          </Link>
          ))}
        </div>
        <div className="border p-4 rounded-lg">
        <h2 className="text-[#4D5959] text-xl mb-2 font-semibold">Specification</h2>


        <div className="w-[7.5rem] h-[2px] bg-[#F16724] mt-1 mb-4"></div>
        <table id="Specification" className="table-auto w-full text-sm text-left">
         <tbody>
         {
          product?.data.specifications && product?.data.specifications.length > 0 ?
          product?.data.specifications.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 font-semibold border pl-3 ">{item.name}</td>
              <td className="py-2 pl-3 border">{item.description}</td>
            </tr>
        ))
          :
          [
            { label: "Brand", value: "N/A" },
            { label: "Model", value: "N/A" },
            { label: "Network", value: "N/A" },
            { label: "Dimensions", value: "N/A" },
            { label: "Weight", value: "N/A" },
            { label: "SIM", value: "N/A" },
            { label: "Display Type", value: "N/A" },
            { label: "Display Size", value: "N/A" },
            { label: "Display Resolution", value: "N/A" },
            { label: "OS", value: "N/A" },
            { label: "Chipset", value: "N/A" },
            { label: "CPU", value: "N/A" },
            { label: "Memory", value: "N/A" },
            { label: "Main Camera", value: "N/A" },
            { label: "Selfie Camera", value: "N/A" },
            { label: "Sound", value: "N/A" },
            { label: "Battery Info", value: "N/A" },
            { label: "Sensors", value: "N/A" },
  ].map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 font-semibold border pl-3 ">{item.label}</td>
              <td className="py-2 pl-3 border">{item.value}</td>
            </tr>
        ))
        
        }
          </tbody> 
        
        </table>
        </div>
        {/* extra descriptions */}
        <div  id="Description" className="mt-5 p-3 text-sm border rounded-lg">
        <h2 className="text-xl font-bold text-gray-900">Description</h2>
        <div className="w-[6.5rem] h-[2px] bg-[#F16724] mt-1 mb-4"></div>
        {
          product?.data.description ?
              <p className="text-gray-600 mb-4">
                {product?.data.description}
              </p>
        
          : <p>Description is not Available</p>
        }
          
        </div>
        {/* warranty */}
        <div id="Warranty" className="bg-white text-sm border rounded-lg p-6 mt-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Warranty</h2>
            <div className="w-24 h-[2px] bg-[#F16724] mt-1 mb-4"></div>
            <p className="text-gray-700">
              Explore our{' '}
              <a href="/warranty-policy" className="text-[#F16724] font-semibold hover:underline">
                Warranty Policy
              </a>{' '}
              page for detailed information about our warranty coverage.
            </p>
        </div>
      </div>

      {/* recent viewed items */}

      <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Recently Viewed</h2>
      {recentProducts.length > 0 ? (
        <div className="grid gap-3 grid-cols-2">
          {recentProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="border p-2 rounded-md hover:shadow-md">
              <div className="relative w-full h-[150px] flex justify-center items-center">
                <Image
                  src={product.image || noImg}
                  alt={product.name}
                  width={120}
                  height={80}
                  className="object-cover"
                />
              </div>
              <div className="text-center mt-2">
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <p className="text-xs text-gray-500 font-semibold">{product.price} ৳</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recently viewed products.</p>
      )}
    </div>

          

       
      
    </div>
        
      {/* bottom cart */}
      {/* desktop */}
      <div className={`hidden md:flex  ${scroll > 700 ? "fixed left-0 bottom-0" : 'ease-out hidden fade'} transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full  bg-white text-black  justify-between items-center py-4 px-6 border-t`}>
      {/* Product Information */}
      <div className="text-lg font-light">
        <span className="font-medium">
          {product?.name}
        </span>
      </div>

      {/* Quantity and Buttons */}
      <div className="flex items-center space-x-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded">
          <input
            type="number"
            value={quantity}
            min={quantity}
            max={2}
            className="w-12 h-10 text-center border-none focus:outline-none no-arrows bg-white "
          />
          <div className="flex flex-col justify-between">
            <button onClick={() =>  setQuantity(quantity + 1)} className="px-2 border-b border-l border-gray-300">▲</button>
            <button onClick={() => quantity > 1  ?  setQuantity(quantity - 1) : null} className="px-2 border-l border-gray-300">▼</button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button disabled={isCartItem !== undefined} onClick={() => handleCart(product?.data,quantity)} className={`border px-4 rounded-md py-1 border-[#F16724] text-[#F16724] hover:bg-[#F16724] hover:text-white  ${isCartItem !== undefined ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`}>
          {isCartItem !== undefined ? 'Added' : 'ADD TO CART'}
        </button>

        {/* Buy It Now Button */}
        <button onClick={() => handleBuy(product?.data,quantity)}  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-300">
          BUY IT NOW
        </button>
      </div>
    </div>

    {/* mobile */}
      <div className={`${scroll > 700 ? "fixed left-0 bottom-0" : 'ease-out hidden fade'} transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full  bg-white text-black flex flex-col justify-between gap-y-5 items-center md:hidden py-4 px-6 border-t`}>
      {/* Product Information */}
      <div className="flex items-center justify-between w-full">
        <div className="text-lg font-light">
          <span className="font-medium">
            {product?.name}
          </span>
        </div>

        <div className="flex items-center border border-gray-300 rounded">
            <input
              type="number"
              value={quantity}
              min={quantity}
              max={2}
              className="w-12 h-10 text-center bg-white dark:bg-white border-none focus:outline-none no-arrows"
            />
            <div className="flex flex-col justify-between">
              <button onClick={() =>  setQuantity(quantity + 1)} className="px-2 border-b border-l border-gray-300">▲</button>
              <button onClick={() => quantity > 0  ?  setQuantity(quantity - 1) : null} className="px-2 border-l border-gray-300">▼</button>
            </div>
          </div>
      </div>

      {/* Quantity and Buttons */}
      <div className="  flex  items-center justify-between w-full">
        {/* Quantity Selector */}
       
        {/* Add to Cart Button */}
        <button disabled={isCartItem !== undefined} onClick={() => handleCart(product?.data,quantity)} className={`border px-4 py-1 border-[#F16724] text-[#F16724] hover:bg-[#F16724] hover:text-white  ${isCartItem !== undefined ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`}>
          {isCartItem !== undefined ? 'Added' : 'ADD TO CART'}
        </button>

        {/* Buy It Now Button */}
        <button onClick={() => handleBuy(product?.data,quantity)}  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-300">
          BUY IT NOW
        </button>
      </div>
    </div>

</div>

  );
};

export default Page;
