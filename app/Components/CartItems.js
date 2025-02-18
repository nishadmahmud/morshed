
"use client";
import React, { useEffect, useState } from "react";
import useStore from "../CustomHooks/useStore";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import noImg from '/public/no-image.jpg'
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";

const CartItems = () => {
  const {
    getCartItems,
    setOpenCart,
    openCart,
    refetch,
    handleIncQuantity,
    handleDncQuantity,
    setRefetch,
    handleCartItemDelete,
  } = useStore();
  const [items, setItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setItems(getCartItems());
    if (refetch) {
      setItems(getCartItems());
      setRefetch(false);
    }
  }, [refetch, getCartItems, setRefetch]);

  const handleRedirect = () => {
    isChecked
      ? (router.push("/checkout"), setOpenCart(!openCart))
      : alert("Please Accept Terms & Conditions First");
  };



  return (
    <motion.div 
    initial={{ x: "100%" }} 
      animate={{ x: 0 }} 
      exit={{ x: "100%" }} 
      transition={{ duration: 0.3, ease: "easeInOut" }} 

      className="fixed top-0 right-0 lg:w-96 w-64  h-full bg-white shadow-lg z-50 p-4"

    >
      {
        items.length > 0 ? <>
        <div
        className={`overlay z-[70] ${openCart ? "active " : ""}`}
        onClick={() => setOpenCart(!openCart)}
      ></div>

      <div className=" fixed bg-white text-black lg:max-w-96 max-w-64 top-0 right-0 flex flex-col h-screen overflow-y-scroll z-[9999]">
        <div className="bg-[#F16724] text-white flex p-3 items-center">
          <IoClose
            onClick={() => setOpenCart(!openCart)}
            className="text-white bg-red-600 rounded-md p-0.5 text-xl cursor-pointer"

          />
          <p className="text-center flex-1 font-bold">Mini Cart</p>
        </div>
        <div className="p-2 border-b-2 pb-28 pt-10 overflow-y-auto ">
          {
            items?.map((item, idx) => {
              return (

                <div key={idx} className="flex lg:h-full h-20 gap-2 items-center mt-5">

                  {
                    item?.image_path ? 
                    <Image
                    src={item.image_path}
                    alt="cart-products"
                    height={90}
                    width={90}
                  />
                    :  
                    item?.images.length > 0 ? 
                    <Image
                    src={item.images[0]}
                    alt="cart-products"
                    height={90}
                    width={90}
                  /> :
                    <Image
                    src={noImg}
                    height={90}
                    width={90}
                    alt="mobile-phone"
                    quality={75}
                  />
                  }
                  
                  <div className="space-y-1 font-semibold">

                    <p className="lg:text-md text-xs mt-4">{item?.name}</p>

                    <p>{item?.discount ? item?.retails_price - ((item?.retails_price * item.discount) / 100).toFixed(0) : item?.retails_price} ৳</p>
                    
                    <div className="flex items-center border border-gray-300 h-10 rounded w-fit">
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}

                        className="lg:w-12 lg:h-10 h-4 w-6 text-center bg-white dark:bg-white border-none focus:outline-none no-arrows"

                      />
                      <div className="flex flex-col justify-between ">
                        <button
                          onClick={() =>
                            handleIncQuantity(item?.id, item.quantity)
                          }

                          className="pt-2 px-2 border-b border-l border-gray-300"
                        >
                          <FaArrowUp className="text-xs"></FaArrowUp>

                        </button>
                        <button
                          onClick={() =>
                            item.quantity> 0 &&  handleDncQuantity(item?.id, item.quantity)
                          }

                          className="pb-2 px-2  border-l border-gray-300"
                        >
                          <FaArrowDown className="text-xs"></FaArrowDown> 

                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleCartItemDelete(item?.id)}
                    className="flex-1 flex justify-end cursor-pointer"
                  >
                    <IoClose className="text-xl" />
                  </div>
                </div>
              );
            })
           }
        </div>
        <div className="p-5">
          <p className="flex items-center gap-1 mb-2"> <GiNotebook size={25}></GiNotebook> Special instructions for seller</p>
          <textarea rows={3} className="border outline-none bg-white p-2 rounded-sm dark:bg-white w-full"></textarea>

          <h5 className="flex justify-between items-center text-black font-bold lg:text-lg">
            Subtotal :{" "}
            <span className="text-[#4EB0BE] font-normal">
              {" "}
              {(items.reduce(
              (prev, curr) => prev + ((curr?.discount ?  (curr?.retails_price - ((curr?.retails_price * curr.discount) / 100).toFixed(0)) * curr.quantity  : curr?.retails_price * curr.quantity)),
              0
            )).toFixed(2)}

              ৳
            </span>
          </h5>
          <Link href={"/cart"}>

          
            <button
              onClick={() => setOpenCart(!openCart)}
              className="lg:py-2 py-1 w-full bg-[#4d5959] text-white lg:mt-3 felx rounded-md items-center"
            >

              View Cart
            </button>
          </Link>
          <div className="flex gap-2 lg:mt-3 mt-2">
            <input
              onChange={(e) => setIsChecked(e.target.checked)}
              type="checkbox"
              className="cursor-pointer bg-white dark:bg-white"
            />
            <label className="text-sm lg:text-md">I agree with the terms and conditions.</label>
          </div>
          <button
            onClick={() => {
              handleRedirect();
            }}

            className="lg:py-2 py-1 w-full bg-[#4eb0be] text-white lg:mt-3 mt-2 rounded-md"

          >
            Check Out
          </button>
          <Image
            src={
              noImg
            }
            height={100}
            width={500}
            className="mt-3"
            alt="ssl-commerce"
          />
        </div>
      </div>
      </> 
      : <>
        <div
        className={`overlay z-20 ${openCart ? "active" : ""}`}
        onClick={() => setOpenCart(!openCart)}
      ></div>
      <div className="fixed bg-white text-black w-96  top-0 right-0 flex flex-col h-screen overflow-y-scroll z-50">
      <div className="bg-[#FF8800] text-white flex p-5 items-center justify-between">
         
          <div className="flex items-center gap-1">
            <ShoppingCart size={20}></ShoppingCart>
          <p className="text-center flex-1  font-semibold font-sans">Mini Cart</p>
          </div>

          <IoClose
          size={22}
            onClick={() => setOpenCart(!openCart)}

            className="text-white text-xl cursor-pointer bg-red-600 rounded-md p-0.5"

          />
        </div>
        <div className="flex flex-col justify-center items-center h-[80vh]">

            <div className="bg-[#F16724] p-4 rounded-full text-white">
              <ShoppingBag></ShoppingBag>
            </div>
        <p className="text-xl font-sans font-bold text-center mt-2 text-gray-900">Your cart is empty</p>

        <p className="text-sm text-center text-gray-500 w-72">No items added in your cart. Please add product to your cart list.</p>

        </div>
      </div>
      </> 
      }
      
    </motion.div>
  );
};

export default CartItems;
