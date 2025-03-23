'use client'
import React, {  useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaRegHeart, FaRegUser } from 'react-icons/fa6';
import companyLogo from '/public/logo.png';
import logoSmallDevice from '/public/logoPhone.png';
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
import { NotebookPen } from 'lucide-react';

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
           <div className='flex px-20 justify-between items-center bg-[#191a20] text-[#ffffff] p-3 py-2'>

           <div className="lg:hidden flex items-center ml-2 gap-3" onClick={toggleSidebar}>
          <Menu className="text-[#ffffff] text-right text-2xl" />

         <div className='flex items-center gap-1'>

         <Link href={'/'}><Image src={logoSmallDevice} unoptimized alt='company-logo' height={300} width={300} className='w-9 h-auto'/></Link>

<h5 className='text-xs font-semibold font-logo'>Apple Newton Bd</h5>

         </div>
        </div>

            <div
        className={`fixed top-0 left-0 w-3/5 max-w-xs bg-[#ffffff] text-black p-5 z-50 transform transition-transform overflow-y-auto duration-300 h-full ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-2  border-b-2 border-[#c03b2c]">
          <div>
            <Image unoptimized width={140} src={logo} alt='logo'></Image>
          </div>
          <IoCloseSharp
            size={24}
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="mt-4 space-y-4 px-3 ">
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
              className="fixed inset-0 bg-white bg-opacity-50 z-40"
              onClick={toggleSidebar}
            />
          )}

           {/* logo large device */}
           <Link href={'/'}><Image src={companyLogo} unoptimized alt='company-logo' height={500} width={500} className='hidden md:block md:w-56 w-52 h-auto'/></Link>

          {/* ==========category + search========== */}
            <div className='hidden relative md:flex lg:flex lg:justify-center px-5 py-1.5'>

                <div className='lg:flex hidden h-10'>

                <input  onFocus={() => {setfocused(true),setShowBar(true)}} onChange={(e) => setKeyword(e.target.value)} value={keyword} onBlur={() => setfocused(false)}  type="text" placeholder='Search for Products...' className='px-5 py-1 rounded-l-sm border-t border-b border-l outline-none text-black bg-white text-sm pr-56'/>

                <div className='border bg-white p-3 pr-2 pb-4 px-0'>
                <div 
    ref={categoryRef} 
    onMouseEnter={() => setShowCategory(true)} 
    onMouseLeave={() => setShowCategory(false)} 
    className="hidden bg-white lg:flex gap-3 items-center relative pl-5 pr-2 cursor-pointer"
  >
    <p className="text-sm cursor-pointer text-nowrap text-[#555555] font-semibold relative bottom-1">All Categories</p>
    <FaChevronDown className="text-xs text-[#555555] cursor-pointer relative bottom-1" />

    {showCategory && (
      <div className="bg-white absolute -left-3.5 rounded-sm transition ease-out py-1 top-[1rem] z-50 h-60 overflow-y-auto">
        {data?.data && data?.data.length > 0 &&
          data.data.map((item) => (
            <Link 
              onClick={() => setShowCategory(false)} 
              href={`/category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(item?.name)}&total=${encodeURIComponent(item?.product_count)}`} 
              key={item?.category_id} 
              className="text-[#555555] hover:bg-[#c03b2c] hover:text-white transition-all ease-in-out py-1 rounded-sm text-start text-sm pl-5 w-36 flex flex-col"
            >
              {item?.name}
            </Link>
          ))
        }
      </div>
    )}
  </div>
                </div>

               
               
            
                <button className='bg-[#c03b2c] text-white px-2.5 py-2 w-2/6 rounded-r-sm text-xs'> <IoSearchSharp size={25}></IoSearchSharp></button>
               
                </div>
        
            </div>

           
            
            <div className='flex items-end text-white relative'>
             <div className='lg:hidden block'>
             <input  onFocus={() => {setfocused(true),setShowBar(true)}} onChange={(e) => setKeyword(e.target.value)} value={keyword} onBlur={() => setfocused(false)}  type="text" placeholder='Search for Products...' className='p-1 px-2 rounded-sm border-t border-b border-l  outline-none text-black bg-white text-xs'/>
             <SearchIcon size={14} className='absolute top-1.5 right-2 text-gray-400'/>
             </div>
             
           
      {/* offer + blog */}
      <div className='items-center gap-3 hidden lg:flex'>       
          <Link href='/blogs' className="flex transition ease-in-out bg-[#302e31] p-2 px-4 rounded-md font-normal items-center text-white gap-1 text-sm  hover:bg-[#c03b2c]"> 
          <NotebookPen size={20}></NotebookPen>
          Blog</Link>
            
                <Link href='/offer'>
            <div  className='flex text-white items-center group gap-1 bg-[#302e31] p-2 px-3 rounded-md text-sm hover:bg-[#c03b2c]'>
                <div className="relative rounded-full text-white">
                    <Gift size={20} className='group-hover:text-[#ffffff] text-white cursor-pointer'/>
                </div>
                    <p className='group-hover:text-[#ffffff] text-white font-normal'>Offers</p>
                   
             </div>
                </Link>

             <div onClick={() => setOpenCart(!openCart)} className='flex group items-center cursor-pointer bg-[#302e31] px-3 rounded-md text-sm mr-3 hover:bg-[#c03b2c]'>
                <div className="relative p-1 rounded-full" >
                    <LiaShoppingCartSolid size={28} className='cursor-pointer group-hover:text-[#ffffff] text-white' />
                    <p className='bg-[#c03b2c] h-fit  text-[#ffffff] w-fit px-0.5 rounded-full text-[10px] absolute top-1 right-1'>{total}</p>
                    </div>
                    <div>
                    <p className='group-hover:text-[#ffffff] text-white hidden md:block font-normal '>Cart</p> 
                    
                </div> 
            </div>    
            </div>       

            <div>
            {
  !user ? 
  <Link href='/login'  className='lg:flex items-center lg:mr-2.5 pr-3 cursor-pointer hidden group bg-[#302e31] p-1 px-3 rounded-md text-sm hover:bg-[#c03b2c]'>
      <div className='p-1 rounded-full hidden lg:block'>
          <LogIn  size={20} className='group-hover:text-[#ffffff] text-white'/>
      </div>
      <div>
      <p className='group-hover:text-[#ffffff] text-white hidden lg:block font-normal '>Login</p> 
      
   </div> 
  </Link> :
  <Link href='/profileDashboard'  className='items-center hidden lg:flex gap-2 px-2 p-1.5 lg:pr-2.5 lg:mr-4 cursor-pointer'>
    <div className='rounded-full hidden lg:block'>
     <Image unoptimized alt='navLogo' src={navLogo} className='w-8 rounded-full border-2 border-[#c03b2c] p-0.5'></Image>
    </div> 
    
  </Link>
}  
             
            </div>
               
            </div>
           </div>
           <div className=''>
           <Navbar
          setIsLoginModal={setIsLoginModal}
          openCart={openCart}
          setOpenCart={setOpenCart}
          data={data}
        />
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