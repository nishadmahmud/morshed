'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { ShoppingCart, House, MapPinned, NotebookPen, Gift } from 'lucide-react';
import Image from 'next/image';
import noImg from '/public/no-image.jpg';
import useStore from '../CustomHooks/useStore';

const Navbar = ({ data, openCart, setOpenCart, setIsLoginModal }) => {
    
    const [isHovered, setIsHovered] = useState(false);
    const categoryRef = useRef(null);
    const [showCategory, setShowCategory] = useState(false);
    const [email, setEmail] = useState(null);
    const {getCartItems,refetch,setRefetch} = useStore();
    useEffect(() => {
        const handleCategoryClose = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setShowCategory(false);
            }
        };
        document.addEventListener('click', handleCategoryClose);
        return () => document.removeEventListener('click', handleCategoryClose);
    }, []);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo) {
            setEmail(userInfo?.email);
        }
    }, []);
useEffect(() => {
        getCartItems();
        if(refetch){
            getCartItems();
            setRefetch(false);
        }
    },[refetch,getCartItems, setRefetch])

    const items =  getCartItems();
    const total = items?.reduce((acc,curr) => acc += curr.quantity,0) || 0;

    console.log(total);

    return (
        <div className='relative'>
            {/* Desktop Menu */}
            <div className='w-full bg-white text-black z-40 py-2.5 hidden md:hidden lg:flex justify-center'>
                <div className='flex justify-center items-center'>
                    <Link href={'/'} className='font-semibold text-[14px] mr-2'>Home</Link>
                    <hr className='border border-gray-300 w-5 rotate-90' />
                    <div className='flex items-center gap-5'>
                        {data?.data.slice(0, 6).map((item, idx) => (
                            <Link key={idx} href={`/category/${encodeURIComponent(item.category_id)}?category=${encodeURIComponent(item.name)}&total=${encodeURIComponent(item.product_count)}`} 
                                  className='text-[#555555] text-sm font-semibold flex items-center gap-1 hover:text-[#F16724] transition-all ease-in-out'>
                                <Image width={22} height={22} src={item.image_url || noImg} alt='category' />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Mobile & Tablet Menu */}
            <div className='fixed -bottom-1 left-0 right-0 bg-[#171717] pt-1 z-50 shadow-lg lg:hidden'>
                <div className='flex justify-around items-center py-2'>
                    <Link href='/' className='flex flex-col items-center text-sm text-[#F16724] hover:text-white'>
                        <House className='text-2xl' />
                        <span className='text-white'>Home</span>
                    </Link>
                    
                    <Link href='/offer' className='flex flex-col items-center text-sm text-[#F16724] hover:text-white'>
                        <Gift className='text-2xl' />
                        <span className='text-white'>Offers</span>
                    </Link>
                    
                    <div onClick={() => setOpenCart(!openCart)} className='flex flex-col items-center text-sm text-[#F16724] hover:text-white cursor-pointer'>
                        <ShoppingCart className='text-2xl' />
                        <p className='bg-[#ffffff] z-[900] h-fit text-[#F16724] w-fit px-1 text-xs rounded-full absolute top-2 right-[9.2rem]'>{total}</p>
                        <span className='text-white'>Cart</span>
                    </div>

                    {email ? (
                        <Link href='/profileDashboard' className='flex flex-col items-center text-sm text-[#F16724] hover:text-white'>
                            <CgProfile className='text-2xl' />
                            <span className='text-white'>Account</span>
                        </Link>
                    ) : (
                        <div onClick={() => setIsLoginModal(true)} className='flex flex-col items-center text-sm text-[#F16724] hover:text-white cursor-pointer'>
                            <CgProfile className='text-2xl' />
                            <span className='text-white'>Account</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
