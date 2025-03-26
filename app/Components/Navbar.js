"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { LogIn, NotebookPen, ShoppingCart } from "lucide-react";
import { House } from "lucide-react";
import { Gift } from "lucide-react";
import useStore from "../CustomHooks/useStore";
import Image from "next/image";
import loginLogo from "/public/user.png";
import { IoNewspaperOutline } from "react-icons/io5";

const Navbar = ({ data, openCart, setOpenCart, setIsLoginModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const categoryRef = useRef(null);
  const [showCategory, setShowCategory] = useState(false);
  //   const loggedInUser = JSON.parse(localStorage.getItem('user'))
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { getCartItems, refetch, setRefetch } = useStore();
  const handleCategoryClose = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setShowCategory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCategoryClose);
    return () => document.removeEventListener("click", handleCategoryClose);
  }, []);

  // const handleMobileCategory = () => {
  //     setIsHovered(!isHovered)
  // }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setLoggedInUser(user);
      }
    }
  }, []);

  useEffect(() => {
    getCartItems();
    if (refetch) {
      getCartItems();
      setRefetch(false);
    }
  }, [refetch, getCartItems, setRefetch]);

  const items = getCartItems();
  const total = items?.reduce((acc, curr) => (acc += curr.quantity), 0) || 0;

  return (
    <div className="relative">
      {/* desktop menu */}
      <div className="w-full bg-[#000000] text-white z-40 py-2.5 px-5 hidden items-center text-center gap-16 roboto text-sm xl:flex justify-center">
        <div className="px-16 flex justify-between items-center ">
          {/* <div onMouseEnter={() => setIsHovered(true)}  className='flex mr-2 items-center justify-center gap-3'>
                    <Link href={'/'} className='font-semibold text-[14px]'>Home</Link>
                </div> */}

          {/* <hr className='border border-gray-300 w-5 rotate-90 '/> */}

          <div className="flex items-center justify-center">
            <div className="flex items-center gap-5">
              {/* <Link className='ml-2' href='/'>
                 <House color='gray' size={16}></House>
                 </Link> */}
              {data?.data.length &&
                data?.data.slice(0, 10).map((item, idx) => {
                  return (
                    <Link
                      key={idx}
                      href={`/category/${encodeURIComponent(
                        item?.category_id
                      )}?category=${encodeURIComponent(
                        item?.name
                      )}&total=${encodeURIComponent(item?.product_count)}`}
                      className={`text-[#ffffff] text-md text-nowrap font-medium flex items-center gap-2 hover:text-[#c03b2c] transition-all ease-in-out`}
                    >
                      <div className="flex gap-1">
                        {/* <Image
                          src={item.image_url}
                          height={20}
                          width={20}
                          alt={item.name}
                          className="rounded-sm"
                        /> */}
                        <p>{item.name}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>

        {/* <div className="text-gray-100 font-semibold flex justify-end items-center gap-5">
  <Link
    href="/"
    className="text-transparent bg-clip-text bg-gradient-to-r from-[#d50233] to-[#c03b2c] hover:scale-105 hover:font-bold animate-pulse drop-shadow-lg flex items-center gap-1"
  >
    <IoNewspaperOutline size={20} color='#c03b2c'></IoNewspaperOutline>
    Tech News
  </Link>
  <Link
    href="/blogs"
    className="text-transparent bg-clip-text bg-gradient-to-r from-[#c03b2c] to-red-700 hover:scale-105 hover:font-bold animate-pulse drop-shadow-lg flex items-center gap-1"
  >
    <NotebookPen size={19} color='#c03b2c'></NotebookPen>
    Blog
  </Link>
</div> */}
      </div>

      {/* mobile & tablet menu */}
      <div className="relative">
        <div className="fixed -bottom-1 left-0 right-0 bg-[#171717] pt-1 z-50 shadow-lg lg:hidden">
          <div className="flex justify-around items-center py-2">
            <Link
              href="/"
              className="flex flex-col items-center text-sm hover:text-white text-[#c03b2c]"
            >
              <House className="text-2xl" />
              <span className="text-white">Home</span>
            </Link>

            <Link
              href="/offer"
              className="flex flex-col items-center text-sm hover:text-white text-[#c03b2c]"
            >
              <Gift className="text-2xl" />
              <span className="text-white">Offers</span>
            </Link>

            <div
              onClick={() => setOpenCart(!openCart)}
              className="flex flex-col items-center text-sm hover:text-white text-[#c03b2c]"
            >
              <div>
                <ShoppingCart className="text-2xl" />
                <p className="bg-[#ffffff] z-[900] h-fit text-[#c03b2c] w-fit px-1 text-xs rounded-full absolute top-2 md:right-96 lg:right-80 right-[8rem]">
                  {total}
                </p>
              </div>
              <span className="text-white">Cart</span>
            </div>
            {loggedInUser ? (
              <Link
                href="/profileDashboard"
                className="flex flex-col items-center text-sm text-[#c03b2c] hover:text-white"
              >
                <Image
                  unoptimized
                  className="border-2 p-0.5 border-[#c03b2c] rounded-full"
                  src={loginLogo}
                  alt="navLogo"
                  width={28}
                  height={28}
                />
                <span className="text-white">Account</span>
              </Link>
            ) : (
              <div
                onClick={() => setIsLoginModal(true)}
                className="flex flex-col items-center text-sm text-[#c03b2c] hover:text-white cursor-pointer"
              >
                <LogIn className="text-2xl" />
                <span className="text-white">Login</span>
              </div>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="bg-white flex flex-col space-y-3 text-white p-5 transition ease-in-out">
            {data?.data.slice(0, 7).map((item, idx) => {
              return (
                <Link
                  key={idx}
                  onClick={() => setIsOpen(false)}
                  href={`/category/${encodeURIComponent(
                    item?.category_id
                  )}?category=${encodeURIComponent(
                    item?.name
                  )}&total=${encodeURIComponent(item?.product_count)}`}
                  className={`text-black text-sm text-nowrap font-semibold flex items-center gap-1 `}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/*all categories */}
      {/* {isHovered && <CategoryPopup isHovered={isHovered} setIsHovered={setIsHovered}/>} */}
      {/* {isHovered && <CategoryPopup isHovered={isHovered} setIsHovered={setIsHovered}/>} */}
    </div>
  );
};

export default Navbar;
