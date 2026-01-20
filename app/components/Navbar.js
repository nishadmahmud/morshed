"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { LogIn, ShoppingCart, House, Heart, User } from "lucide-react";
import useStore from "../hooks/useStore";
import { usePathname } from "next/navigation";

const Navbar = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryRef = useRef(null);
  const [showCategory, setShowCategory] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  const { getCartItems, refetch, setRefetch, wishlist } = useStore();

  // State for client-side only values (to avoid hydration mismatch)
  const [cartTotal, setCartTotal] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

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

  // Update cart count after mount (client-side only)
  useEffect(() => {
    const items = getCartItems();
    const total = items?.reduce((acc, curr) => (acc += curr.quantity), 0) || 0;
    setCartTotal(total);
  }, [refetch, getCartItems]);

  // Update wishlist count after mount (client-side only)
  useEffect(() => {
    setWishlistCount(wishlist?.length || 0);
  }, [wishlist]);

  // Check if current path matches nav item
  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const navItems = [
    { href: "/", icon: House, label: "Home" },
    { href: "/wishlist", icon: Heart, label: "Wishlist", badge: wishlistCount },
    { href: "/cart", icon: ShoppingCart, label: "Cart", badge: cartTotal },
  ];

  return (
    <div className="relative">
      {/* Mobile & tablet bottom navigation */}
      <div className="relative">
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex justify-around items-center py-2 px-4 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 ${active
                    ? "text-[#0f766e]"
                    : "text-gray-500 hover:text-gray-700 active:scale-95"
                    }`}
                >
                  <div className="relative">
                    <div className={`p-1.5 rounded-full transition-colors duration-200 ${active ? "bg-[#0f766e]/10" : ""
                      }`}>
                      <item.icon size={22} strokeWidth={active ? 2.5 : 2} />
                    </div>
                    {item.badge > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-[#0f766e] text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Account/Login */}
            {user ? (
              <Link
                href="/profile-dashboard"
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 ${isActive("/profile-dashboard")
                  ? "text-[#0f766e]"
                  : "text-gray-500 hover:text-gray-700 active:scale-95"
                  }`}
              >
                <div className={`p-1.5 rounded-full transition-colors duration-200 ${isActive("/profile-dashboard") ? "bg-[#0f766e]/10" : ""
                  }`}>
                  <User size={22} strokeWidth={isActive("/profile-dashboard") ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-medium ${isActive("/profile-dashboard") ? "font-semibold" : ""}`}>
                  Account
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 ${isActive("/login")
                  ? "text-[#0f766e]"
                  : "text-gray-500 hover:text-gray-700 active:scale-95"
                  }`}
              >
                <div className={`p-1.5 rounded-full transition-colors duration-200 ${isActive("/login") ? "bg-[#0f766e]/10" : ""
                  }`}>
                  <LogIn size={22} strokeWidth={isActive("/login") ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-medium ${isActive("/login") ? "font-semibold" : ""}`}>
                  Login
                </span>
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
