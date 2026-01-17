"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { LogIn, ShoppingCart, House, Heart } from "lucide-react";
import useStore from "../hooks/useStore";
import Image from "next/image";
const loginLogo = "/user.png";

const Navbar = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryRef = useRef(null);
  const [showCategory, setShowCategory] = useState(false);
  const [user, setUser] = useState(null);

  const { getCartItems, refetch, setRefetch, wishlist } = useStore();

  const handleCategoryClose = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setShowCategory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCategoryClose);
    return () => document.removeEventListener("click", handleCategoryClose);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
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
      {/* Mobile & tablet bottom navigation */}
      <div className="relative">
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
          <div className="flex justify-around items-center py-2 px-2">
            {/* Home */}
            <Link
              href="/"
              className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <House size={22} />
              <span className="text-[10px] font-medium">Home</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition-colors relative"
            >
              <div className="relative">
                <Heart size={22} />
                {wishlist?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[9px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                {total > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[9px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                    {total}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">Cart</span>
            </Link>

            {/* Account/Login */}
            {user ? (
              <Link
                href="/profile-dashboard"
                className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Image
                  className="border border-gray-300 rounded-full"
                  src={loginLogo}
                  alt="navLogo"
                  width={24}
                  height={24}
                />
                <span className="text-[10px] font-medium">Account</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogIn size={22} />
                <span className="text-[10px] font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Category dropdown - if needed */}
        {isOpen && (
          <div className="bg-white flex flex-col space-y-3 text-white p-5 transition ease-in-out">
            {data?.data?.slice(0, 7).map((item, idx) => (
              <Link
                key={idx}
                onClick={() => setIsOpen(false)}
                href={`/category/${encodeURIComponent(
                  item?.category_id
                )}?category=${encodeURIComponent(
                  item?.name
                )}&page=1&limit=${20}&total=${encodeURIComponent(item?.products_count)}`}
                className="text-black text-sm text-nowrap font-semibold flex items-center gap-1"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
