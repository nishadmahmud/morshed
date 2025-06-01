"use client";
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
const countries = [
  { label: "United States", value: "USD", symbol: "$" },
  { label: "United Kingdom", value: "GBP", symbol: "£" },
  { label: "India", value: "INR", symbol: "₹" },
  { label: "Europe", value: "EUR", symbol: "€" },
  { label: "Bangladesh", value: "BDT", symbol: "৳" },
  { label: "Japan", value: "JPY", symbol: "¥" },
  { label: "Canada", value: "CAD", symbol: "C$" },
  { label: "Australia", value: "AUD", symbol: "A$" },
]


export const storeContext = createContext(null);
const StoreProvider = ({children}) => {
    const [refetch,setRefetch] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [openCart,setOpenCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [isLoginModal,setIsLoginModal] = useState(false); 
    const [token,setToken] = useState(null);
    const [hasToken,setHasToken] = useState(false);
    const [loading,setLoading] = useState(true);
    const [isOpenPromoBanner,setIsOpenPromoBanner] = useState(false);
    const [isSelectRegion,setIsSelectRegion] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [convertedPrice, setConvertedPrice] = useState(null)

    useEffect(() => {
        setIsMounted(true);
    },[])

 
    const router = useRouter(); 
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if(storedToken){
            setLoading(false);
            setToken(storedToken);
            setHasToken(true);
        }else{
            setToken(null);
            // setLoading(false);
        }
    },[])

   const handleCart = (item, quantity) => {
    if (!isMounted) return;

    setRefetch(true);
    const newItem = { ...item, retails_price: item.price ?? item.retails_price };
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cartItems.find(product => product.id === item.id);

    // Check stock
    const isInStock = (newItem.status && newItem.status.toLowerCase() !== "stock out") || newItem.current_stock > 0;
    if (!isInStock) {
        toast.error('Out of stock!');
        return;
    }

    // Prevent duplicates
    if (existingProduct) {
        toast.error('Item already in cart');
        return;
    }

    const itemWithQty = { ...newItem, quantity };
    cartItems.push(itemWithQty);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    toast.success('Item added to cart successfully');
};


    const getCartItems = () => {
        if(!isMounted) return [];
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        return cartItems;
    }

    const handleCartUpdate = () => {
        setRefetch(true);
        const updatedItems = getCartItems();
        setCartItems(updatedItems);
    }
    
    const handleIncQuantity = (id,qty) => {
        const items = getCartItems();
        const updatedItems = items.map(item => {
            if(item.id === id){
              return {...item,quantity : qty + 1}
            }
            return item
        })       
        localStorage.removeItem('cart');
        localStorage.setItem('cart',JSON.stringify(updatedItems));
        handleCartUpdate();
    }

    const handleDncQuantity = (id,qty) => {
        const items = getCartItems();
        const updatedItems = items.map(item => {
            if(item.id === id){
              return {...item,quantity : qty - 1}
            }
            return item;
        })  
        localStorage.removeItem('cart');
        localStorage.setItem('cart',JSON.stringify(updatedItems));
        handleCartUpdate();
    }

    const handleCartItemDelete = (id) => {
        setRefetch(true);
        const items = getCartItems();
        const restItems = items.filter(item => item.id !== id);
        localStorage.removeItem('cart');
        localStorage.setItem('cart',JSON.stringify(restItems));
    }

    const handleWishlist = (product) => {
        setRefetch(true);
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isExist = wishlist.find(item => item.title === product.title);
        if(!isExist){
            wishlist.push(product);
            localStorage.setItem('wishlist',JSON.stringify(wishlist));
        }else{
            alert('already in wishlist')
        }
    }

    const getWishList = () => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem('wishlist')) || [];
          }
          return [];
    }

    const handleWishlistDelete = (title) => {
        setRefetch(true);
        const items = getWishList();
        const remainingItems = items.filter(item => item.title !== title);
        localStorage.removeItem('wishlist');
        localStorage.setItem('wishlist',JSON.stringify(remainingItems));
    }

    const handleBuy = (item,quantity) => {
        handleCart(item,quantity);
        if(item.status.toLowerCase() !== "stock out" || item.current_stock > 0){
            router.push('/checkout');
        }
    }

    const reload = (boolean) => {
        setRefetch(boolean)
    }

    const handlePromoBanner = () => {
        setIsOpenPromoBanner(true)
    }

    const handleClosePromo = () => {
        setIsOpenPromoBanner(false);
    }

    const handleSelectRegion = () => {
        setIsSelectRegion(true)
    }

    const handleCloseRegion = () => {
        setIsSelectRegion(false);
    }


    const {data : blogs} = useSWR(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-blog-list/${userId}`,fetcher)
    
    const values = {handleCart, setIsSelectRegion, isSelectRegion, handleSelectRegion, handleCloseRegion, getCartItems,refetch,openCart,setOpenCart,reload,handleIncQuantity,handleDncQuantity,cartItems,setRefetch,handleCartItemDelete,handleWishlist,getWishList,handleBuy,handleWishlistDelete,isLoginModal,setIsLoginModal,token,setToken,hasToken,setHasToken,loading,setLoading,isOpenPromoBanner,handleClosePromo,handlePromoBanner,setIsOpenPromoBanner,blogs, setSelectedCountry, selectedCountry, countries, convertedPrice, setConvertedPrice}
    
    return (
        <storeContext.Provider value={values}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreProvider;