'use client'
import React, {  useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaRegHeart, FaRegUser } from 'react-icons/fa6';
import companyLogo from '/public/PerfectGadgetBD-logo (1) 1.png';
import { HiMiniShoppingCart } from "react-icons/hi2";
import Navbar from './Navbar';
import Image from 'next/image';
import useStore from '../CustomHooks/useStore';
import CartItems from './CartItems';
import Link from 'next/link';
import Search from './Search';
import LoginForm from './LoginForm';
import Modal from './Modal';
import RegisterForm from './RegisterForm';
import 'animate.css';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { userId } from '../(home)/page';
import { CircleUser, Headset, SearchIcon } from 'lucide-react';
import { LiaShoppingCartSolid } from "react-icons/lia";
import { IoCloseSharp, IoSearchSharp } from 'react-icons/io5';
import { RiMenu4Fill } from 'react-icons/ri';
import { Menu } from 'lucide-react';
import logo from '../../public/PerfectGadgetBD-logo (1) 1.png'
import { Gift } from 'lucide-react';
import TopHeader from './TopHeader';
import navLogo from '/public/user.png'
import { LogIn } from 'lucide-react';

const Header = ({data}) => {
    const {getCartItems,refetch,setRefetch,setOpenCart,openCart,getWishList,isLoginModal,setIsLoginModal,setToken,setHasToken} = useStore();
    const [keyword,setKeyword] = useState('');
    const [searchedItem,setSearchedItem] = useState([]);
    const [isRegistered,setIsRegistered] = useState(false);
    const [showUserInfo,setShowUserInfo] = useState(false);
    const [searchBar,setSearchBar] = useState(false);
    const [showBar,setShowBar] = useState(false);
    const [focused,setfocused] = useState(false);
    const [email,setEmail] = useState(null);

    const [reload,setReload] = useState(false);
    const pathname = useSearchParams();
    const searchBarRef = useRef(null);
 
 const categoryRef = useRef(null);
     const [showCategory,setShowCategory] = useState(false);

const user = localStorage.getItem('user')
console.log("userrrrrr",user);

    useEffect(() => {
        getCartItems();
        if(refetch){
            getCartItems();
            setRefetch(false);
        }
    },[refetch,getCartItems,setRefetch])

    useEffect(() => {
        getWishList();
        if(refetch){
            setRefetch(false)
            getWishList()
        }
    },[refetch,getWishList,setRefetch])

    useEffect(() => {
        if(pathname.get('login') == 'false'){
            setIsLoginModal(true)
        }
    },[pathname, setIsLoginModal])
   
   const items =  getCartItems();
   const total = items?.reduce((acc,curr) => acc += curr.quantity,0) || 0;

   
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const searchedItems = () => {
    if(keyword){
        setShowBar(true);
        setTimeout(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API}/public/search-product`,{keyword,user_id : userId})
        .then(res => {
        setSearchedItem(res.data.data.data) 
        })
        .catch(err => console.log(err))
        },600)
    }
   }

   const handleClose = useCallback(() => {
    if(!keyword){
        if(showBar) {
            setShowBar(false);
          }else if(searchBar){
            setSearchBar(false)
          }
       }
       else if(!focused && searchBarRef.current && showBar || searchBar){
          if(showBar) {
            setShowBar(false);
          }else if(searchBar){
            setSearchBar(false)
          }

       }
   },[keyword,searchBarRef,showBar,focused,searchBar]) 

   useEffect(() => {
    searchedItems()
   },[keyword,searchedItems])

   const handleModalClose = () => setIsLoginModal(false);

   useEffect(() => {
    document.addEventListener('click',handleClose);
    return () => document.removeEventListener('click',handleClose)
},[handleClose])

   const handleUserInfo = () => {
    setShowUserInfo(true);
   }

   const handleLogout = () => {
    setShowUserInfo(false)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setHasToken(false)
    setEmail(null);
   }

   
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const toggleSidebar = () => {
     setIsSidebarOpen((prev) => !prev);
   };


    return (
        <div>
          
          <div className={`w-full z-50 text-white  transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-lg mt-0`}>
          <TopHeader></TopHeader>
            {/* desktop menu */}
           <div className='flex gap-16 justify-between items-center bg-[#0e0e0e] text-[#ffffff] p-3 py-2'>

           <div className="lg:hidden block ml-4" onClick={toggleSidebar}>
          <Menu className="text-[#ffffff] text-right text-xl" />
        </div>

            <div
        className={`fixed top-0 left-0 w-3/5 max-w-xs bg-[#ffffff] text-black p-5  shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto h-full ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-2 border-b-2 border-[#F16724]">
          <div>
            <Image width={100} src={logo} alt='logo'></Image>
          </div>
          <IoCloseSharp
            size={24}
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="mt-4 space-y-4 px-3">
        {
          data?.data.map((item,idx) => {
              return <Link key={idx}  onClick={() => setIsOpen(false)}  href={`/category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(item?.name)}&total=${encodeURIComponent(item?.product_count)}`} className={`text-black text-sm text-nowrap hover:text-[FF8800] transition ease-in-out hover:font-semibold flex items-center gap-1`}> 
              {item.name}
              </Link>
          })
          }
        </ul>
      </div>

      {/* Overlay for Sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleSidebar}
            />
          )}

           <Link href={'/'}><Image src={companyLogo} alt='company-logo' height={55} width={65} className='w-auto h-auto md:ml-32 lg:ml-6'/></Link>
            <div className='hidden relative md:flex lg:flex lg:flex-1 lg:justify-center'>

                <div className='hidden lg:grid grid-cols-5'>
                <div className='rounded-l-md mr-1.5 bg-white p-3 border border-[#F16724]'>
                <div 
    ref={categoryRef} 
    onMouseEnter={() => setShowCategory(true)} 
    onMouseLeave={() => setShowCategory(false)} 
    className="hidden bg-white lg:flex gap-3 items-center relative pl-4 cursor-pointer"
  >
    <p className="text-sm cursor-pointer text-nowrap text-[#555555] font-semibold">All Categories</p>
    <FaChevronDown className="text-xs text-[#555555] cursor-pointer" />

    {showCategory && (
      <div className="bg-white absolute -left-3.5 rounded-sm transition ease-out py-3 top-[1rem] z-50 h-80 overflow-y-auto shadow-lg">
        {data?.data && data?.data.length > 0 &&
          data.data.map((item) => (
            <Link 
              onClick={() => setShowCategory(false)} 
              href={`category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(item?.name)}&total=${encodeURIComponent(item?.product_count)}`} 
              key={item?.category_id} 
              className="text-[#555555] hover:bg-[#F16724] hover:text-white transition-all ease-in-out py-2 rounded-sm text-start text-sm pl-5 w-40 flex flex-col"
            >
              {item?.name}
            </Link>
          ))
        }
      </div>
    )}
  </div>
                </div>



                {/* <hr className='absolute left-36 top-6 border border-gray-300  w-5 rotate-90 '/> */}

                <input  onFocus={() => {setfocused(true),setShowBar(true)}} onChange={(e) => setKeyword(e.target.value)} value={keyword} onBlur={() => setfocused(false)}  type="text" placeholder='Search for Products...' className='p-3 border border-[#F16724] outline-none text-black bg-white text-sm  col-span-3'/>
               
            
                <button className='ml-1.5 border border-[#F16724] bg-[#ffffff] p-3 right-2 w-2/6 text-[#070707] rounded-r-md text-sm'> <IoSearchSharp size={24}></IoSearchSharp></button>
                
                
                </div>
                
                
            </div>
            
            <div className='flex items-center gap-3 text-black relative'>
             <div className='lg:hidden block'>
             <SearchIcon onClick={() => setSearchBar(true)} className='block lg:hidden cursor-pointer -ml-5 text-white' size={25}/>
             </div>
             
           
            <div className='items-center gap-3 hidden lg:flex'>
            
                <Link className=' bg-[#ffffff] md:border border-[#F16724] pr-3 p-2 rounded-full' href='/offer'>
            <div  className='flex items-center'>
                <div className="relative p-1 rounded-full hover:text-blue-500">
                    <Gift size={17} className='text-[#F16724] cursor-pointer'/>
                </div>
                    <p className='text-[#F16724] text-xs font-semibold'>Offers</p>
                   
             </div>
                </Link>

             <div onClick={() => setOpenCart(!openCart)} className='flex  items-center md:border border-[#F16724] bg-[#ffffff] px-2 p-1 pr-3 rounded-full cursor-pointer'>
                <div className="relative p-1 rounded-full" >
                    <LiaShoppingCartSolid size={25} className='cursor-pointer text-[#bababa]'/>
                    <p className='bg-[#F16724] h-fit  text-[#ffffff] w-fit px-1 rounded-full text-[8px] absolute top-1 right-1'>{total}</p>
                    </div>
                    <div>
                    <p className='text-[#F16724] hidden md:block  text-xs font-semibold '>Cart</p> 
                    
                </div> 
            </div>    
            </div>       

            <div>
            {
  !user ? 
  <div onClick={() => { setIsLoginModal(true) }} className='lg:flex items-center lg:border bg-[#ffffff] border-[#F16724] px-2 p-2 rounded-full lg:mr-2.5 pr-3 cursor-pointer hidden'>
      <div className='p-1 rounded-full hidden lg:block'>
          <LogIn  size={18} className='text-[#F16724]'/>
      </div>
      <div>
      <p className='text-[#F16724] hidden lg:block text-xs font-semibold '>Login</p> 
      
   </div> 
  </div> :
  <Link href='/profileDashboard'  className='items-center lg:border hidden lg:flex gap-1 bg-white px-2 p-1.5 rounded-full lg:pr-2.5 lg:mr-2.5 cursor-pointer'>
    <div className='rounded-full hidden lg:block'>
     <Image alt='navLogo' src={navLogo} className='w-5 rounded-full'></Image>
    </div> 
    <div>
      <p className='text-[#F16724] hidden lg:block text-sm font-semibold '>Account</p> 
    </div> 
  </Link>
}  
             
            </div>
               
            </div>
           </div>
           <div className=''>
            <Navbar setIsLoginModal={setIsLoginModal} openCart={openCart} setOpenCart={setOpenCart} data={data}/>
           </div>
           {
            openCart && <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
                <CartItems />
            </div> 
           }

           {/* searchedItems */}
           {
            showBar && keyword && !searchBar ? 
                <Search 
                searchBarRef={searchBarRef}
                searchedItem={searchedItem}
                setKeyword={setKeyword}
                setSearchedItem={setSearchedItem}
                /> 
                : null
           }

{
  isLoginModal && (
    <Modal 
      content={isRegistered ? 
        <LoginForm  
          isLoginModal={isLoginModal} 
          onClose={handleModalClose}
          setIsRegistered={setIsRegistered} 
          setReload={setReload}
          isRegistered={isRegistered} 
        /> 
        : 
        <RegisterForm 
          setIsRegistered={setIsRegistered} 
          isLoginModal={isLoginModal} 
          isRegistered={isRegistered} 
        />
      } 
      onClose={handleModalClose}
      setReload={setReload}
      title={isRegistered ? "Sign In" : "Sign Up"}
    />
  )
}

            {
                searchBar ? 
                <div className=" modal-overlay fixed lg:hidden inset-0 bg-black bg-opacity-50 flex justify-center z-[99] items-start px-4">
                <dialog open
                className=" mt-20 p-5 rounded-2xl flex flex-col justify-center bg-white  text-black w-[90%] md:w-[450px]" >
                    <input  onFocus={() => setSearchBar(true)} autoFocus={searchBar}  type="text" onChange={(e) => setKeyword(e.target.value)} placeholder='Search' className='focus:outline-none bg-white' value={keyword}/>
                </dialog> 
                </div>
                : null
            }

            {
                searchBar && keyword ? 
                <Search 
                searchBarRef={searchBarRef}
                searchedItem={searchedItem}
                setKeyword={setKeyword}
                setSearchedItem={setSearchedItem}
                /> : null
            }
           
           <Toaster 
            toastOptions={{
                className: '',
                style: {
                background : '#161616',
                padding: '10px 16px 10px 16px',
                color: '#C7C6D3',
                },
            }}
            containerStyle={{
                top: 20,
                left: 50,
                bottom: 20,
                // right: 20,
            }}
            />
        </div>
        </div>
    );
};

export default Header; 