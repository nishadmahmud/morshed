'use client'
import React, {  useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaRegHeart, FaRegUser } from 'react-icons/fa6';
import companyLogo from '/public/logo.png';
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
import logo from '../../public/logo.png'
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
          
          <div className={`w-full z-50 text-white  transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] fixed mt-0`}>
          {/* <TopHeader></TopHeader> */}
            {/* desktop menu */}
           <div className='flex gap-16 justify-between items-center bg-[#ffffff] text-[#000000] p-3 py-2'>

           <div className="lg:hidden block ml-4" onClick={toggleSidebar}>
          <Menu className="text-[#000000] text-right text-xl" />
        </div>

            <div
        className={`fixed top-0 left-0 w-3/5 max-w-xs bg-[#ffffff] text-black p-5 z-50 transform transition-transform duration-300 overflow-y-scroll h-full ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-2 border-b-2 border-[#c03b2c]">
          <div>
            <Image width={130} src={logo} alt='logo'></Image>
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

           {/* logo large device */}
           <Link href={'/'}><Image src={companyLogo} alt='company-logo' height={180} width={200} className='w-auto mr-10 h-auto'/></Link>

          {/* ==========category + search========== */}
            <div className='hidden relative md:flex lg:flex lg:justify-center px-5 py-1.5'>

                <div className='lg:flex hidden'>

                <input  onFocus={() => {setfocused(true),setShowBar(true)}} onChange={(e) => setKeyword(e.target.value)} value={keyword} onBlur={() => setfocused(false)}  type="text" placeholder='Search for Products...' className='p-3 rounded-sm border-t border-b border-l  outline-none text-black bg-white text-xs pr-24'/>

                <div className='border bg-white p-3 pr-2.5 rounded-r-sm px-0'>
                <div 
    ref={categoryRef} 
    onMouseEnter={() => setShowCategory(true)} 
    onMouseLeave={() => setShowCategory(false)} 
    className="hidden bg-white lg:flex gap-3 items-center relative pl-4 cursor-pointer"
  >
    <p className="text-xs cursor-pointer text-nowrap text-[#555555] font-semibold">All Categories</p>
    <FaChevronDown className="text-xs text-[#555555] cursor-pointer" />

    {showCategory && (
      <div className="bg-white absolute -left-3.5 rounded-sm transition ease-out py-3 top-[1rem] z-50 h-80 overflow-y-auto">
        {data?.data && data?.data.length > 0 &&
          data.data.map((item) => (
            <Link 
              onClick={() => setShowCategory(false)} 
              href={`/category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(item?.name)}&total=${encodeURIComponent(item?.product_count)}`} 
              key={item?.category_id} 
              className="text-[#555555] hover:bg-[#c03b2c] hover:text-white transition-all ease-in-out py-2 rounded-sm text-start text-sm pl-5 w-32 flex flex-col"
            >
              {item?.name}
            </Link>
          ))
        }
      </div>
    )}
  </div>
                </div>

               
               
            
                <button className='bg-[#c03b2c] text-white p-3 w-2/6 rounded-r-sm text-xs'> <IoSearchSharp size={20}></IoSearchSharp></button>
                
                
                </div>
                
                
            </div>
           


            
            <div className='flex items-center gap-5 text-black relative'>
             <div className='lg:hidden block'>
             <SearchIcon onClick={() => setSearchBar(true)} className='block lg:hidden cursor-pointer -ml-5 text-white' size={25}/>
             </div>
             
           
           {/* offer */}
            <div className='items-center gap-3 hidden lg:flex'>
            
                <Link href='/offer'>
            <div  className='flex items-center group'>
                <div className="relative p-1 rounded-full hover:text-blue-500">
                    <Gift size={27} className='group-hover:text-[#c03b2c] text-black cursor-pointer'/>
                </div>
                    <p className='group-hover:text-[#c03b2c] text-black text-sm font-semibold'>Offers</p>
                   
             </div>
                </Link>

             <div onClick={() => setOpenCart(!openCart)} className='flex group items-center cursor-pointer'>
                <div className="relative p-1 rounded-full" >
                    <LiaShoppingCartSolid size={35} className='cursor-pointer group-hover:text-[#c03b2c] text-black' />
                    <p className='bg-[#c03b2c] h-fit  text-[#ffffff] w-fit px-1 rounded-full text-[8px] absolute top-1 right-1'>{total}</p>
                    </div>
                    <div>
                    <p className='group-hover:text-[#c03b2c] text-black hidden md:block text-sm font-semibold '>Cart</p> 
                    
                </div> 
            </div>    
            </div>       

            <div>
            {
  !user ? 
  <div onClick={() => { setIsLoginModal(true) }} className='lg:flex items-center lg:mr-2.5 pr-3 cursor-pointer hidden group'>
      <div className='p-1 rounded-full hidden lg:block'>
          <LogIn  size={25} className='group-hover:text-[#c03b2c] text-black'/>
      </div>
      <div>
      <p className='group-hover:text-[#c03b2c] text-black hidden lg:block text-sm font-semibold '>Login</p> 
      
   </div> 
  </div> :
  <Link href='/profileDashboard'  className='items-center hidden lg:flex gap-2 px-2 p-1.5 lg:pr-2.5 lg:mr-4 cursor-pointer'>
    <div className='rounded-full hidden lg:block'>
     <Image alt='navLogo' src={navLogo} className='w-8 rounded-full border-2 border-[#c03b2c] p-0.5'></Image>
    </div> 
    
  </Link>
}  
             
            </div>
               
            </div>
           </div>
           <div className='md:hidden'>
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