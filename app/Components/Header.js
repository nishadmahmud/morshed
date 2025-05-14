"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaRegHeart, FaRegUser, FaUsers } from "react-icons/fa6";
import companyLogo from "/public/morshed-mart-logo-removebg-preview.png";
import logoSmallDevice from "/public/logoPhone.png";
import { HiMiniShoppingCart } from "react-icons/hi2";
import Navbar from "./Navbar";
import Image from "next/image";
import useStore from "../CustomHooks/useStore";
import CartItems from "./CartItems";
import Link from "next/link";
import Search from "./Search";
import LoginForm from "./LoginForm";
import Modal from "./Modal";
import RegisterForm from "./RegisterForm";
import "animate.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { userId } from "../(home)/page";
import { CircleUser, Headset, SearchIcon, ShoppingBag, User } from "lucide-react";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { IoCloseSharp, IoSearch, IoSearchSharp } from "react-icons/io5";
import { RiMenu4Fill } from "react-icons/ri";
import { Menu } from "lucide-react";
import sidebarLogo from "../../public/sidebarLogo.png";
import { Gift } from "lucide-react";
import TopHeader from "./TopHeader";
import navLogo from "/public/user.png";
import { LogIn } from "lucide-react";
import { NotebookPen } from "lucide-react";
import logo2 from "/public/favicon.png";

const Header = ({ data }) => {
  const {
    getCartItems,
    refetch,
    setRefetch,
    setOpenCart,
    openCart,
    getWishList,
    isLoginModal,
    setIsLoginModal,
    setToken,
    setHasToken,
  } = useStore();
  const [keyword, setKeyword] = useState("");
  const [searchedItem, setSearchedItem] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [focused, setfocused] = useState(false);
  const [email, setEmail] = useState(null);
  const [reload, setReload] = useState(false);
  const pathname = useSearchParams();
  const searchBarRef = useRef(null);
  const categoryRef = useRef(null);
  const [showCategory, setShowCategory] = useState(false);
  const debounceRef = useRef();
  const user = localStorage.getItem("user");

  useEffect(() => {
    getCartItems();
    if (refetch) {
      getCartItems();
      setRefetch(false);
    }
  }, [refetch, getCartItems, setRefetch]);

  useEffect(() => {
    getWishList();
    if (refetch) {
      setRefetch(false);
      getWishList();
    }
  }, [refetch, getWishList, setRefetch]);

  useEffect(() => {
    if (pathname.get("login") == "false") {
      setIsLoginModal(true);
    }
  }, [pathname, setIsLoginModal]);

  const items = getCartItems();
  const total = items?.reduce((acc, curr) => (acc += curr.quantity), 0) || 0;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchedItems = async(keyword) => {
      setShowBar(true);
      try {
       const response = await axios
        .post(`${process.env.NEXT_PUBLIC_API}/public/search-product`, {
          keyword,
          user_id: userId,
        });
        const result = await response.data;
        setSearchedItem(result.data.data)
      } catch (error) {
        console.log(error);
      }
  }

  const handleClose = useCallback(() => {
    if (!keyword) {
      if (showBar) {
        setShowBar(false);
      } else if (searchBar) {
        setSearchBar(false);
      }
    } else if ((!focused && searchBarRef.current && showBar) || searchBar) {
      if (showBar) {
        setShowBar(false);
      } else if (searchBar) {
        setSearchBar(false);
      }
    }
  }, [keyword, searchBarRef, showBar, focused, searchBar]);



  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if(debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchedItems(value);
    },700)
  }

  const handleModalClose = () => setIsLoginModal(false);

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, [handleClose]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };



  return (
    <div>
      <div
        className={`w-full z-50 text-white  transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] fixed mt-0`}
      >
        {/* <TopHeader></TopHeader> */}
        {/* desktop menu */}
        <div className="flex justify-between items-center bg-teal-800/90 backdrop-blur-md text-white p-3 py-0.5 lg:px-16">
          <div
            className="xl:hidden flex items-center lg:gap-3 gap-1"
            onClick={toggleSidebar}
          >
            <Menu className="text-[#ffffff] text-right text-lg" />

            <div className="flex items-center gap-1">
              <Link href={"/"}>
                <Image
                  src={logoSmallDevice}
                  unoptimized
                  alt="company-logo"
                  height={300}
                  width={300}
                  className="w-6 h-auto"
                />
              </Link>

             
            </div>
          </div>

          {/* mobile sidebar */}
          <div
            className={`fixed top-0 left-0 w-3/5 max-w-xs bg-[#ffffff] text-black px-5 pt-5 pb-[4.5rem] z-50 transform transition-transform overflow-y-auto duration-300 h-full ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-2  border-b-2 border-teal-800">
              <Link href={'/'} onClick={toggleSidebar}>
                <Image unoptimized width={140} src={sidebarLogo} alt="logo"></Image>
              </Link>
              <IoCloseSharp
                size={24}
                className="cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
            <ul className="mt-4 space-y-4 px-3 ">
              {data?.data.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    onClick={toggleSidebar}
                    href={`/category/${encodeURIComponent(
                      item?.category_id
                    )}?category=${encodeURIComponent(
                      item?.name
                    )}&total=${encodeURIComponent(item?.product_count)}`}
                    className={`text-black text-sm text-nowrap hover:text-[FF8800] transition ease-in-out hover:font-semibold flex items-center gap-1`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 font-medium text-teal-800">
                <Link onClick={toggleSidebar} className="flex items-center gap-1" href="/offer">
                  {" "}
                  <Gift size={15}></Gift> Latest Offer
                </Link>
                <Link onClick={toggleSidebar} className="flex items-center gap-1" href="/blogs">
                  <NotebookPen size={15}></NotebookPen> Blog
                </Link>
                <Link onClick={toggleSidebar} className="flex items-center gap-1" href="/about-us">
                  {" "}
                  <FaUsers size={16}></FaUsers> About Us
                </Link>
              </div>
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
          <Link href={"/"}>
            <Image
              src={companyLogo}
              unoptimized
              alt="company-logo"
              height={500}
              width={500}
              className="hidden xl:block md:w-10 h-auto"
            />
          </Link>

         {/* ==========category display only========== */}
<div className="hidden relative md:flex lg:flex lg:justify-center py-1.5">
  <div className="xl:flex hidden h-10 text-white px-4 rounded-sm items-center gap-6">
    {data?.data?.slice(0, 3).map((item) => (
      <Link
        key={item?.category_id}
        href={`/category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(item?.name)}&total=${encodeURIComponent(item?.product_count)}`}
        className="hover:text-gray-300 transition-all text-sm hover:tracking-wide"
      >
        {item?.name}
      </Link>
    ))}
  </div>
</div>


          <div className="grid grid-cols-3 justify-center items-center text-white relative gap-8">
            <div className="lg:hidden block">
              <input
                onFocus={() => {
                  setfocused(true), setShowBar(true);
                }}
                onChange={handleChange}
                value={keyword}
                onBlur={() => setfocused(false)}
                type="text"
                placeholder="Search Products.."
                className="p-1 px-2 rounded-sm border-t border-b border-l  outline-none text-black bg-white text-xs"
              />
              <SearchIcon
                size={14}
                className="absolute top-1.5 right-2 text-gray-400"
              />
            </div>

              <Link
                href="/"
                className="flex transition ease-in-out rounded-md font-normal items-center text-white gap-1 text-sm"
              >
                <IoSearch size={25}></IoSearch> 
               
              </Link>

             

              <div
                onClick={() => setOpenCart(!openCart)}
                className="flex group items-center cursor-pointer  rounded-md text-sm"
              >
                <div className="relative rounded-full">
                  <ShoppingBag
                    size={25}
                    className="cursor-pointer group-hover:text-[#ffffff] text-white"
                  />
                  {/* <p className="bg-white h-4 text-teal-800 w-fit px-1 rounded-full text-[10px] absolute -top-1 right-1">
                    <span className="relative bottom-[2px] font-semibold">{total}</span>
                  </p> */}
                </div>
               
              </div>
           

            <div>
              {!user ? (
                <div
                  onClick={() => setIsLoginModal(true)}
                  className="lg:flex items-center cursor-pointer hidden group rounded-md text-sm"
                >
                  <div className=" rounded-full hidden lg:block">
                    <User
                      size={25}
                      className="group-hover:text-[#ffffff] text-white"
                    />
                  </div>
                 
                </div>
              ) : (
                <Link
                  href="/profileDashboard"
                  className="items-center hidden lg:flex gap-2 cursor-pointer"
                >
                  <div className="rounded-full hidden lg:block">
                    <Image
                      unoptimized
                      alt="navLogo"
                      src={navLogo}
                      className="w-8 rounded-full border-2 border-white p-0.5"
                    ></Image>
                  </div>
                </Link>
              )}
            </div>
          </div>
          
        </div>
        {/* <div className="">
          <Navbar
            setIsLoginModal={setIsLoginModal}
            openCart={openCart}
            setOpenCart={setOpenCart}
            data={data}
          />
        </div> */}
        {openCart && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
            <CartItems />
          </div>
        )}

        {/* searchedItems */}
        {showBar && keyword && !searchBar ? (
          <Search
            searchBarRef={searchBarRef}
            searchedItem={searchedItem}
            setKeyword={setKeyword}
            setSearchedItem={setSearchedItem}
          />
        ) : null}

        {isLoginModal && (
          <Modal
            content={
              isRegistered ? (
                <LoginForm
                  isLoginModal={isLoginModal}
                  onClose={handleModalClose}
                  setIsRegistered={setIsRegistered}
                  setReload={setReload}
                  isRegistered={isRegistered}
                />
              ) : (
                <RegisterForm
                  setIsRegistered={setIsRegistered}
                  isLoginModal={isLoginModal}
                  isRegistered={isRegistered}
                />
              )
            }
            onClose={handleModalClose}
            setReload={setReload}
            title={isRegistered ? "Sign In" : "Sign Up"}
          />
        )}

        {searchBar ? (
          <div className=" modal-overlay fixed lg:hidden inset-0 bg-black bg-opacity-50 flex justify-center z-[99] items-start px-4">
            <dialog
              open
              className=" mt-20 p-5 rounded-2xl flex flex-col justify-center bg-white  text-black w-[90%] md:w-[450px]"
            >
              <input
                onFocus={() => setSearchBar(true)}
                autoFocus={searchBar}
                type="text"
                onChange={handleChange}
                placeholder="Search"
                className="focus:outline-none bg-white"
                value={keyword}
              />
            </dialog>
          </div>
        ) : null}

        {searchBar && keyword ? (
          <Search
            searchBarRef={searchBarRef}
            searchedItem={searchedItem}
            setKeyword={setKeyword}
            setSearchedItem={setSearchedItem}
          />
        ) : null}

        <Toaster
          toastOptions={{
            className: "",
            style: {
              background: "#161616",
              padding: "10px 16px 10px 16px",
              color: "#C7C6D3",
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
