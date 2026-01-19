"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import {
  Gift,
  Heart,
  NotebookPen,
  ShoppingBag,
  ShoppingBagIcon,
  User,
} from "lucide-react";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import axios from "axios";
const noImg = "/no-image.jpg";
import Search from "./Search";
import useStore from "../hooks/useStore";
import CartItems from "./CartItems";
import { useSearchParams } from "next/navigation";
import Navbar from "./Navbar";
import { api, userId } from "../lib/api";
import GlobeModalButton from "./GlobeModalButton";

const HeaderUi = ({ data }) => {
  const {
    setOpenCart,
    openCart,
    isLoginModal,
    setIsLoginModal,
    setIsRegistered,
    isRegistered,
    setReload,
    getCartItems,
    userInfo,
    country,
    wishlist,
    prices,
    isCategorySidebarOpen,
    setIsCategorySidebarOpen,
  } = useStore();
  const [keyword, setKeyword] = useState("");
  const [searchedItem, setSearchedItem] = useState([]);
  const [user, setUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);
  const debounceRef = useRef(null);
  const searchBarRef = useRef(null);

  // Mock user and cart data
  const items = getCartItems();
  const total = items?.reduce((acc, curr) => (acc += curr.quantity), 0) || 0;
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    // Also reset store state when closing
    if (isSidebarOpen) {
      setIsCategorySidebarOpen(false);
    }
  };

  // Sync store's isCategorySidebarOpen with local state
  useEffect(() => {
    if (isCategorySidebarOpen) {
      setIsSidebarOpen(true);
    }
  }, [isCategorySidebarOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const info = localStorage.getItem("user");
      setUser(info);
    }
  }, [])

  const handleChange = (e) => {
    setKeyword(e.target.value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleSearch(e.target.value)
    }, 600);
  };

  const handleSearch = async (value) => {
    setIsSearching(true);
    try {
      const res = await axios
        .post(api.searchProducts(), {
          keyword: value,
          user_id: userId,
        });
      const data = res.data;
      setSearchedItem(data?.data?.data);
      setIsSearching(false);
    } catch (error) {
      console.log(error);
      setSearchedItem([]);
      setIsSearching(false);
    }
  };

  const toggleSearchSidebar = () => {
    setIsSearchSidebarOpen(!isSearchSidebarOpen);
    setKeyword("");
    setSearchedItem([]);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest('[data-sidebar="mobile"]') &&
        !event.target.closest('[data-sidebar-trigger="mobile"]')
      ) {
        setIsSidebarOpen(false);
      }

      if (
        isSearchSidebarOpen &&
        !event.target.closest('[data-sidebar="search"]') &&
        !event.target.closest('[data-sidebar-trigger="search"]') &&
        !event.target.closest("[data-search-results]")
      ) {
        setIsSearchSidebarOpen(false);
      }

      // Close desktop search dropdown when clicking outside
      if (
        keyword &&
        !event.target.closest('[data-desktop-search]')
      ) {
        setKeyword("");
        setSearchedItem([]);
      }
    },
    [isSidebarOpen, isSearchSidebarOpen, keyword]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const pathname = useSearchParams();
  useEffect(() => {
    if (pathname.get("login") == "false") {
      setIsLoginModal(true);
    }
  }, [pathname, setIsLoginModal]);

  const handleModalClose = () => setIsLoginModal(false);


  const countrySign = country?.value === "BD" ? "৳" : "$";


  // utils/pricing.js (or right above your component)
  const getPriceByCountry = (item, prices, country) => {
    const productPrice = prices?.[item?.id];

    if (country?.value === "BD") {
      // Base → retail → 0
      return productPrice?.basePrice ?? item?.retails_price ?? 0;
    }

    // Wholesale → item wholesale → 1 000 (fallback)
    return productPrice?.wholesalePrice ?? item?.wholesale_price ?? 1_000;
  };

  return (
    <div>
      <style jsx global>{`
        .burger-menu span {
          transform-origin: center;
          transition: all 0.3s ease;
        }

        .burger-menu.open span:first-child {
          transform: translateY(0.25rem) rotate(45deg);
        }

        .burger-menu.open span:nth-child(2) {
          opacity: 0;
        }

        .burger-menu.open span:last-child {
          transform: translateY(-0.25rem) rotate(-45deg);
        }
      `}</style>
      <div className="w-full z-50 text-black transition-all duration-300 fixed mt-0">
        {/* Main header */}
        <div className="flex justify-between items-center bg-white border-b border-gray-100 text-black px-4 py-3 lg:px-16">
          {/* Mobile menu button */}
          <div className="flex items-center lg:gap-3 gap-1">
            <button
              onClick={toggleSidebar}
              aria-label="Toggle menu"
              data-sidebar-trigger="mobile"
              className="relative z-50 w-8 h-8 flex items-center justify-center"
            >
              <div
                className={`burger-menu text-white bg-white ${isSidebarOpen ? "open" : ""
                  }`}
              >
                <span
                  className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isSidebarOpen ? "rotate-45 translate-y-1" : ""
                    }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-black my-1 transition-all duration-300 ${isSidebarOpen ? "opacity-0" : ""
                    }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-1" : ""
                    }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Centered logo for all screen sizes */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center">
            <Link href={"/"}>
              <h4 className="logoFont text-lg md:text-xl font-bold tracking-wider text-gray-900 hover:text-gray-700 transition-colors">
                MORSHED MART
              </h4>
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center justify-end gap-1 md:gap-3">
            {/* Inline Search Bar - Desktop */}
            <div className="hidden lg:flex items-center relative" data-desktop-search>
              <div className="relative">
                <input
                  type="text"
                  value={keyword}
                  onChange={handleChange}
                  placeholder="Search products..."
                  className="w-48 xl:w-64 pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-all"
                />
                <IoSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Desktop Search Results Dropdown */}
              {keyword && (
                <div className="absolute top-full left-0 mt-2 min-w-[320px] w-[400px] bg-white border border-gray-200 rounded-xl shadow-2xl max-h-[420px] overflow-y-auto z-50">
                  {isSearching ? (
                    <div className="p-6 text-center text-gray-500">
                      <div className="animate-spin w-6 h-6 border-2 border-[#0f766e] border-t-transparent rounded-full mx-auto mb-2"></div>
                      Searching...
                    </div>
                  ) : searchedItem?.length > 0 ? (
                    <div className="p-2">
                      {searchedItem.slice(0, 6).map((item) => {
                        const imageUrl = item.image_path || item.thumbnail_image || item.image || "/no-image.jpg";
                        return (
                          <Link
                            key={item.id}
                            href={`/products/${item?.product_slug || item?.name}/${item.id}`}
                            onClick={() => setKeyword("")}
                            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                          >
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <Image
                                src={imageUrl}
                                alt={item.name}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                              <p className="text-sm text-[#0f766e] font-bold mt-1">
                                {countrySign}{getPriceByCountry(item, prices, country)}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-500">No products found</div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search icon */}
            <button
              onClick={toggleSearchSidebar}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-black"
              aria-label="Search"
              data-sidebar-trigger="search"
            >
              <IoSearch size={22} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors relative group"
              aria-label="Wishlist"
            >
              <Heart size={21} className="text-gray-700 group-hover:text-[#0f766e] transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#0f766e] text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {wishlist.length > 99 ? "99+" : wishlist.length}
                </span>
              )}
              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Wishlist
              </span>
            </Link>

            {/* Cart icon */}
            <Link
              href="/cart"
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors relative group"
              aria-label="Cart"
            >
              <ShoppingBag size={21} className="text-gray-700 group-hover:text-[#0f766e] transition-colors" />
              {total > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#0f766e] text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {total > 99 ? "99+" : total}
                </span>
              )}
              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Cart
              </span>
            </Link>

            {/* User account */}
            {!user ? (
              <Link
                href="/login"
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors relative group"
                aria-label="Login"
              >
                <User size={21} className="text-gray-700 group-hover:text-[#0f766e] transition-colors" />
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Login
                </span>
              </Link>
            ) : (
              <Link
                href="/profile-dashboard"
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors relative group"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#0f766e] transition-colors">
                  <Image
                    src="/userLogin.png"
                    alt="User"
                    width={32}
                    height={32}
                  />
                </div>
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Account
                </span>
              </Link>
            )}

            <div className="hidden text-black relative">
              <GlobeModalButton />

              {country?.value && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[7px] font-medium rounded-full px-1 py-1">
                  {country.value}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        <div
          data-sidebar="mobile"
          className={`fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white text-gray-800 z-50 transform transition-transform duration-300 ease-in-out shadow-lg ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <Link
              href="/"
              onClick={toggleSidebar}
              className="text-lg text-center font-semibold logoFont"
            >
              Morshed Mart
            </Link>
            <button onClick={toggleSidebar} aria-label="Close sidebar">
              <IoCloseSharp
                size={24}
                className="text-gray-600 hover:text-red-500 transition"
              />
            </button>
          </div>

          {/* Categories */}
          <div className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4 mt-2">
              Categories
            </h3>

            <ul className="space-y-2">
              {data?.data?.map((item, idx) => (
                <li key={idx}>
                  <Link
                    onClick={toggleSidebar}
                    href={`/category/${encodeURIComponent(
                      item?.category_id || ""
                    )}?category=${encodeURIComponent(
                      item?.name || ""
                    )}&page=1&limit=30&total=${encodeURIComponent(item?.products_count || 0)}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">
                      {item?.name || `Category ${idx + 1}`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <hr className="my-5 border-t" />

            {/* Navigation */}
            <div className="space-y-4">
              <Link
                onClick={toggleSidebar}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                href="/offer"
              >
                <Gift size={18} className="text-gray-600" />
                <span className="text-sm font-medium">Latest Offer</span>
              </Link>
              <Link
                onClick={toggleSidebar}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                href="/blogs"
              >
                <NotebookPen size={18} className="text-gray-600" />
                <span className="text-sm font-medium">Blog</span>
              </Link>
              <Link
                onClick={toggleSidebar}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                href="/about-us"
              >
                <FaUsers size={18} className="text-gray-600" />
                <span className="text-sm font-medium">About Us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search sidebar - slides from top */}
        <div
          data-sidebar="search"
          className={`fixed inset-0 top-0 bg-white text-black z-50 transform transition-transform duration-500 ease-in-out shadow-lg ${isSearchSidebarOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-teal-700">
                🔍 Search Products
              </h2>
              <button onClick={toggleSearchSidebar} aria-label="Close search">
                <IoCloseSharp
                  size={28}
                  className="text-teal-800 hover:text-red-600 transition"
                />
              </button>
            </div>

            <div className="relative w-full mb-8">
              <input
                type="text"
                id="search"
                value={keyword}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full py-3 pt-4 pl-12 pr-4 text-base border-b border-gray-500 bg-transparent text-black placeholder-transparent focus:outline-none focus:border-teal-600"
              />
              <label
                htmlFor="search"
                className={`absolute left-12 text-base text-gray-400 transition-all duration-200
    ${keyword ? "top-0 text-sm text-teal-600" : "top-4"}
  `}
              >
                Search for a product
              </label>

              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div
              className="max-h-[calc(100vh-200px)] overflow-y-auto"
              data-search-results
            >
              {isSearching ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 mx-auto border-4 border-teal-600 border-r-transparent rounded-full animate-spin"></div>
                  <p className="mt-3 text-gray-500">Searching...</p>
                </div>
              ) : keyword && searchedItem?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchedItem.map((item, idx) => {
                    const sanitizeSlug = (str) =>
                      str
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "");

                    return (
                      <Link
                        href={`/products/${sanitizeSlug(
                          item?.brand_name || item?.name
                        )}/${item?.id}`}
                        key={idx}
                        onClick={() => {
                          setKeyword("");
                          setSearchedItem([]);
                          toggleSearchSidebar();


                        }}
                        className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition"
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={
                              item.image_path ||
                              item.images?.[0] ||
                              noImg ||
                              "/placeholder.svg"
                            }
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {item?.data?.discount > 0 && (
                              <span className="text-gray-500 line-through text-sm">
                                {countrySign}
                                {getPriceByCountry(
                                  item,
                                  prices,
                                  country
                                ).toLocaleString("en-US")}
                              </span>
                            )}
                            <p className="text-teal-700 font-semibold">
                              {countrySign}
                              {getPriceByCountry(
                                item,
                                prices,
                                country
                              ).toLocaleString("en-US")}
                            </p>
                            {!countrySign ? (
                              <>
                                {item.discount > 0 && (
                                  <p className="text-xs text-gray-500 line-through">
                                    {(
                                      item.retails_price -
                                      (item.retails_price *
                                        (item.discount || 0)) /
                                      100
                                    ).toFixed(2)}
                                  </p>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : keyword ? (
                <div className="text-center py-8 text-gray-500">
                  No products found matching &ldquo;{keyword}&rdquo;
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  Start typing to search for products
                </div>
              )}
            </div>
          </div>
        </div>

        <Navbar
          setIsLoginModal={setIsLoginModal}
          openCart={openCart}
          setOpenCart={setOpenCart}
          data={data}
          user={userInfo}
        />


        {/* Mobile search results */}
        {keyword && searchedItem?.length > 0 && !isSearchSidebarOpen && (
          <div className="lg:hidden">
            <Search
              searchedItem={searchedItem}
              setSearchText={setKeyword}
              setSearchedItem={setSearchedItem}
              searchBarRef={searchBarRef}
            />
          </div>
        )}

        {openCart && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
            <CartItems />
          </div>
        )}

        {/* Overlay for sidebar */}
        {(isSidebarOpen || isSearchSidebarOpen) && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
            onClick={() => {
              if (isSidebarOpen) toggleSidebar();
              if (isSearchSidebarOpen) toggleSearchSidebar();
            }}
          />
        )}


      </div>
    </div>
  );
};

export default HeaderUi;
