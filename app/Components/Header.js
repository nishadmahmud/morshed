"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { FaUsers } from "react-icons/fa6"
import Image from "next/image"
import Link from "next/link"
import { Gift, Menu, NotebookPen, ShoppingBag, User } from "lucide-react"
import { IoCloseSharp, IoSearch } from "react-icons/io5"
import axios from "axios"
import noImg from "/public/no-image.jpg"
import Search from "./Search"

import companyLogo from "/public/morshed-mart-logo-removebg-preview.png"
;
const Header = ({ data }) => {
  const [keyword, setKeyword] = useState("")
  const [searchedItem, setSearchedItem] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const debounceRef = useRef()
  const searchBarRef = useRef(null)

  // Mock user and cart data
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null
  const cartItems = []
  const cartTotal = cartItems?.length || 0

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const toggleSearchSidebar = () => {
    setIsSearchSidebarOpen((prev) => !prev)
    if (!isSearchSidebarOpen) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus()
      }, 300)
    }
  }

  const searchProducts = async (keyword) => {
    if (!keyword.trim()) {
      setSearchedItem([])
      return
    }

    setIsSearching(true)

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API || "https://api.example.com"}/public/search-product`,
        {
          keyword,
          user_id: "userId",
        },
      )
      const result = await response.data
      setSearchedItem(result?.data?.data || [])
    } catch (error) {
      console.log(error)
      // Mock data for demonstration
      setSearchedItem([
        {
          id: 1,
          name: "Wireless Headphones",
          images: ["/placeholder.svg?height=80&width=80"],
          retails_price: 99.99,
          discount: 10,
          brand_name: "Audio Tech",
        },
        {
          id: 2,
          name: "Smartphone Case",
          image_path: "/placeholder.svg?height=80&width=80",
          retails_price: 19.99,
          brand_name: "PhonePro",
        },
        {
          id: 3,
          name: "Laptop Backpack",
          images: [],
          retails_price: 59.99,
          brand_name: "TravelGear",
        },
        {
          id: 4,
          name: "Smart Watch",
          image_path: "/placeholder.svg?height=80&width=80",
          retails_price: 149.99,
          discount: 15,
          brand_name: "TechWear",
        },
      ])
    } finally {
      setIsSearching(false)
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setKeyword(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      searchProducts(value)
    }, 500)
  }

  const handleClickOutside = useCallback(
    (event) => {
      // Close sidebars when clicking outside
      if (
        isSidebarOpen &&
        !event.target.closest('[data-sidebar="mobile"]') &&
        !event.target.closest('[data-sidebar-trigger="mobile"]')
      ) {
        setIsSidebarOpen(false)
      }

      if (
        isSearchSidebarOpen &&
        !event.target.closest('[data-sidebar="search"]') &&
        !event.target.closest('[data-sidebar-trigger="search"]') &&
        !event.target.closest("[data-search-results]")
      ) {
        setIsSearchSidebarOpen(false)
      }
    },
    [isSidebarOpen, isSearchSidebarOpen],
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  return (
    <div>
      <div className="w-full z-50 text-white transition-all duration-500 fixed mt-0">
        {/* Main header */}
        <div className="flex justify-between items-center bg-teal-800/90 backdrop-blur-md text-white p-3 py-3 md:py-2 lg:px-16">
          {/* Mobile menu button and logo */}
          <div className="xl:hidden flex items-center lg:gap-3 gap-1">
            <button onClick={toggleSidebar} aria-label="Toggle menu" data-sidebar-trigger="mobile">
              <Menu className="text-white text-right" />
            </button>
            
          </div>

          {/* Desktop logo */}
          <Link href={"/"} className="hidden xl:block">
           <Image width={500} height={500} className="hidden xl:block md:w-9 h-auto" alt="logo" src={companyLogo}></Image>
          </Link>

          {/* Categories - desktop only */}
          <div className="hidden xl:flex h-10 text-white px-4 rounded-sm items-center gap-6">
            {data?.data?.slice(0, 5).map((item, index) => (
              <Link
                key={item?.category_id || index}
                href={`/category/${encodeURIComponent(item?.category_id || "")}?category=${encodeURIComponent(item?.name || "")}&total=${encodeURIComponent(item?.product_count || 0)}`}
                className="hover:text-gray-300 transition-all text-sm hover:tracking-wide"
              >
                {item?.name || `Category ${index + 1}`}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center justify-end gap-6">
           
           

            {/* Search icon - desktop */}
            <button
              onClick={toggleSearchSidebar}
              className="flex items-center transition ease-in-out text-white"
              aria-label="Search"
              data-sidebar-trigger="search"
            >
              <IoSearch size={22} />
            </button>

            {/* Cart icon */}
            <button
              onClick={() => setOpenCart(!openCart)}
              className="flex items-center cursor-pointer"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag size={22} className="text-white" />
                {cartTotal > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-teal-800 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartTotal}
                  </span>
                )}
              </div>
            </button>

            {/* User account */}
            {!user ? (
              <button className="hidden lg:flex items-center cursor-pointer" aria-label="Login">
                <User size={22} className="text-white" />
              </button>
            ) : (
              <Link href="/profileDashboard" className="hidden lg:flex items-center cursor-pointer">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <Image src="/placeholder.svg?height=32&width=32" alt="User" width={32} height={32} />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile sidebar */}
        <div
          data-sidebar="mobile"
          className={`fixed top-0 left-0 w-3/5 max-w-xs bg-white text-black px-5 pt-5 pb-[4.5rem] z-50 transform transition-transform overflow-y-auto duration-300 h-full ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-2 border-b-2 border-teal-800">
            <Link href={"/"} onClick={toggleSidebar}>
              <div className=" text-teal-800 flex items-center justify-center">
                <span className="text-sm font-bold">Morshed Mart</span>
              </div>
            </Link>
            <button onClick={toggleSidebar} aria-label="Close menu">
              <IoCloseSharp size={24} className="cursor-pointer" />
            </button>
          </div>
          <ul className="mt-4 space-y-4 px-3">
            {data?.data?.map((item, idx) => (
              <Link
                key={idx}
                onClick={toggleSidebar}
                href={`/category/${encodeURIComponent(item?.category_id || "")}?category=${encodeURIComponent(item?.name || "")}&total=${encodeURIComponent(item?.product_count || 0)}`}
                className="text-black text-sm hover:text-teal-800 transition ease-in-out hover:font-semibold flex items-center gap-1"
              >
                {item?.name || `Category ${idx + 1}`}
              </Link>
            ))}
            <div className="flex flex-col gap-2 font-medium text-teal-800 pt-4 border-t">
              <Link onClick={toggleSidebar} className="flex items-center gap-1" href="/offer">
                <Gift size={15} /> Latest Offer
              </Link>
              <Link onClick={toggleSidebar} className="flex items-center gap-1" href="/blogs">
                <NotebookPen size={15} /> Blog
              </Link>
              <Link onClick={toggleSidebar} className="flex items-center gap-1" href="/about-us">
                <FaUsers size={16} /> About Us
              </Link>
            </div>
          </ul>
        </div>

        {/* Search sidebar - slides from top */}
        <div
          data-sidebar="search"
          className={`fixed inset-x-0 top-0 bg-white text-black z-50 transform transition-transform duration-500 ease-in-out shadow-lg ${
            isSearchSidebarOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-teal-800">Search Products</h2>
              <button onClick={toggleSearchSidebar} aria-label="Close search">
                <IoCloseSharp size={24} className="cursor-pointer text-teal-800" />
              </button>
            </div>

            <div className="relative mb-6">
              <input
                id="search-input"
                type="text"
                value={keyword}
                onChange={handleChange}
                placeholder="Search for products..."
                className="w-full p-3 pl-10 border border-gray-400 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>

            {/* Search results */}
            <div className="max-h-[calc(100vh-180px)] overflow-y-auto" data-search-results>
              {isSearching ? (
                <div className="py-8 text-center">
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                  <p className="mt-2 text-gray-500">Searching...</p>
                </div>
              ) : keyword && searchedItem.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchedItem.map((item, idx) => {
                    const sanitizeSlug = (str) => {
                      return str
                        ?.toLowerCase()
                        .replace(/\s+/g, "-") // Replace spaces with dashes
                        .replace(/[^a-z0-9-]/g, "") // Remove special characters
                    }

                    return (
                      <Link
                        href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`}
                        key={idx}
                        onClick={() => {
                          setKeyword("")
                          setSearchedItem([])
                          toggleSearchSidebar()

                          // Handle recent view when product card is clicked
                          if (!item?.id) return

                          let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")

                          // Remove existing entry if present
                          recentViews = recentViews.filter((p) => p.id !== item.id)

                          // Add new entry to beginning
                          recentViews.unshift({
                            id: item.id,
                            name: item.name,
                            image: item.image_path || (item.images && item.images[0]) || noImg.src,
                            price: item.retails_price,
                            discount: item.discount || 0,
                          })

                          // Keep only last 6 items
                          if (recentViews.length > 6) recentViews.pop()

                          localStorage.setItem("recentlyViewed", JSON.stringify(recentViews))
                        }}
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          {item?.images?.length > 0 ? (
                            <Image
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : item?.image_path ? (
                            <Image
                              src={item.image_path || "/placeholder.svg"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image
                              src={noImg || "/placeholder.svg"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-teal-700 font-semibold">
                              ${(item.retails_price - (item.retails_price * (item.discount || 0)) / 100).toFixed(2)}
                            </p>
                            {item.discount > 0 && (
                              <p className="text-gray-500 line-through text-xs">${item.retails_price.toFixed(2)}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : keyword ? (
                <div className="text-center py-8 text-gray-500">No products found matching &ldquo;{keyword}&#34;</div>
              ) : (
                <div className="text-center py-8 text-gray-500">Start typing to search for products</div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search results */}
        {keyword && searchedItem.length > 0 && !isSearchSidebarOpen && (
          <div className="lg:hidden">
            <Search
              searchedItem={searchedItem}
              setSearchText={setKeyword}
              setSearchedItem={setSearchedItem}
              searchBarRef={searchBarRef}
            />
          </div>
        )}

        {/* Overlay for sidebar */}
        {(isSidebarOpen || isSearchSidebarOpen) && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => {
              if (isSidebarOpen) toggleSidebar()
              if (isSearchSidebarOpen) toggleSearchSidebar()
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Header
