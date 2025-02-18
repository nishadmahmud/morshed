'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { ShoppingCart } from 'lucide-react';
import { House } from 'lucide-react';
import Image from 'next/image';
import { MapPinned } from 'lucide-react';
import { NotebookPen } from 'lucide-react';
import { Gift } from 'lucide-react';
import noImg from '/public/no-image.jpg'



const Navbar = ({data, openCart, setOpenCart, setIsLoginModal }) => {
    const [isOpen,setIsOpen] = useState(false);
    const [isHovered,setIsHovered] =useState(false);
    const categoryRef = useRef(null);
     const [showCategory,setShowCategory] = useState(false);

     const handleCategoryClose = (event) => {
            if(categoryRef.current && !categoryRef.current.contains(event.target)){
                setShowCategory(false);
            }
        }
     
        useEffect(() => {
         document.addEventListener('click',handleCategoryClose);
         return () => document.removeEventListener('click',handleCategoryClose)
        },[])

    const handleMobileCategory = () => {
        setIsHovered(!isHovered)
    }

    
    return (
        <div className='relative'>
            
        {/* desktop menu */}
            <div className='w-full bg-white text-black z-40 py-2.5 hidden items-center text-center md:hidden lg:flex justify-center'>
                
                <div className=' flex justify-center items-center '>
                <div onMouseEnter={() => setIsHovered(true)}  className='flex mr-2 items-center justify-center gap-3'>
                    <Link href={'/'} className='font-semibold text-[14px]'>Home</Link>
                </div>

                <hr className='border border-gray-300 w-5 rotate-90 '/>
             
                <div className='flex items-center justify-center'>
                    <div className='flex items-center gap-5  '>
                     
                 
                    {
                        data?.data.slice(0,6).map((item,idx) => {
                            return <Link key={idx}  href={`/category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(item?.name)}&total=${encodeURIComponent(item?.product_count)}`} className={`text-[#555555] text-sm text-nowrap font-semibold flex items-center gap-1 hover:text-[#F16724] transition-all ease-in-out  ${idx === 0 ? 'pl-1' : ''}`}>
                            <Image width={22} height={22} src={item?.image_url || noImg} alt='category'></Image>
                            {item.name}
                            </Link>
                        })
                    }
                    {/* <Link href={'/'} className='flex items-center'>
                    <span className='text-[13px] text-black font-semibold bg-clip-text'>
                        Online Exclusive
                    </span> */}
                    {/* </Link> */}
                    </div>

                </div>
                </div>
                   {/* <div className='flex gap-3 items-center ml-3 justify-end'>
                     
                     <Link className='bg-[#000000] rounded-md p-2 px-5' href='/blogs'> 
                    <div className='flex items-center text-sm gap-2 font-semibold rounded-md cursor-pointer text-[#FF8800]'>
                            <NotebookPen size={20}/>
                    
                    Blog</div>
                    </Link>

                    <Link className='bg-[#000000] rounded-md p-2 px-5' href='orderTracking'> 
                    <div className='flex justify-center items-center text-sm gap-2 font-semibold rounded-md cursor-pointer text-[#FF8800]  text-center w-36'>
                            <MapPinned size={20}/>
                   
                    Order Tracking</div>
                    </Link>
                   </div> */}
            </div>

            {/* mobile & tablet menu */}
            <div className='relative'>
            

            <div className="fixed -bottom-1 left-0 right-0 bg-[#171717] pt-1 z-50 shadow-lg lg:hidden">
            <div className="flex justify-around items-center py-2">
                <Link href="/" className="flex flex-col items-center text-sm hover:text-white text-[#F16724]">
                    <House className="text-2xl" />
                    <span className='text-white'>Home</span>
                </Link>
                
                <Link href='/offer' className="flex flex-col items-center text-sm hover:text-white text-[#F16724]">
                    <Gift className="text-2xl" />
                    <span className='text-white'>Offers</span>
                </Link>

                <div onClick={() => setOpenCart(!openCart)} className="flex flex-col items-center text-sm hover:text-white text-[#F16724]">
                    <ShoppingCart className="text-2xl" />
                    <span className='text-white'>Cart</span>
                </div>
                <div onClick={() => {setIsLoginModal(true)}} className="flex flex-col items-center text-sm hover:text-white text-[#F16724]">
                    <CgProfile className="text-2xl" />
                    <span className='text-white'>Account</span>
                </div>
               
            </div>
            </div>
                {
                    isOpen && <div className='bg-white flex flex-col space-y-3 text-white p-5 transition ease-in-out'>
                     {
                        data?.data.slice(0,7).map((item,idx) => {
                            return <Link key={idx}  onClick={() => setIsOpen(false)}  href={`/category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(item?.name)}&total=${encodeURIComponent(item?.product_count)}`} className={`text-black text-sm text-nowrap font-semibold flex items-center gap-1 `}> 
                            {item.name}
                            </Link>
                        })
                    }
                    </div>
                }
            </div>

            {/*all categories */}
            {/* {isHovered && <CategoryPopup isHovered={isHovered} setIsHovered={setIsHovered}/>} */}
            {/* {isHovered && <CategoryPopup isHovered={isHovered} setIsHovered={setIsHovered}/>} */}
            
        </div>
    );
};



export default Navbar;