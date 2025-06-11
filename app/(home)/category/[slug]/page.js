"use client"

import React, { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import Image from "next/image"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import useWishlist from "@/app/CustomHooks/useWishlist"
import Link from "next/link"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ProductListing({ params }) {
  const searchParams = useSearchParams()
  const searchedCategory = searchParams.get("category") || "All Products"
  const searchedTotal = searchParams.get("total") || "100"

  const limit = 20;
  const totalPage = Math.ceil(Number.parseInt(searchedTotal) / limit)
  const { slug: id } = params

  const [filteredItems, setFilteredItems] = useState([])
  const [sortBy, setSortBy] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [isAccordionOpen, setIsAccordionOpen] = useState({
    price: true,
    size: true,
    color: true,
    brand: true,
  })

  const filterRef = useRef(null)

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(sessionStorage.getItem(`currentPage-${id}`)) || 1
    }
    return 1
  })

  const { data: products, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${id}?page=${currentPage}&limit=${limit}`,
    fetcher,
  )




  useEffect(() => {
    if (products) {
      setFilteredItems(products.data)
    }
  }, [products])

  useEffect(() => {
    let filtered = products?.data || []

    if (sortBy === "low-to-high") {
      filtered = [...filtered].sort((a, b) => a.retails_price - b.retails_price)
    } else if (sortBy === "high-to-low") {
      filtered = [...filtered].sort((a, b) => b.retails_price - a.retails_price)
    } else if (sortBy === "a-z") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "z-a") {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === "newest") {
      filtered = [...filtered].sort((a, b) => (a.is_new === b.is_new ? 0 : a.is_new ? -1 : 1))
    }

    // Apply filters (in a real app, these would filter the actual data)
    if (selectedSizes.length > 0 || selectedColors.length > 0 || selectedBrands.length > 0) {
      // This is just a placeholder for actual filtering logic
      console.log("Filtering by:", { selectedSizes, selectedColors, selectedBrands, priceRange })
    }

    setFilteredItems(filtered)
  }, [sortBy, products, selectedSizes, selectedColors, selectedBrands, priceRange])

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`currentPage-${id}`, currentPage)
    }
  }, [currentPage, id])

  // Close filter sidebar when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target) && isFilterOpen) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isFilterOpen])

  // Available filter options (would come from API in real app)
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const availableColors = ["Black", "White", "Blue", "Red", "Green", "Grey", "Beige"]
  const availableBrands = ["Fashion Brand", "Denim Co", "Urban Style", "Luxury Collection", "Casual Wear"]

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const handleColorToggle = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const clearAllFilters = () => {
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedBrands([])
    setPriceRange([0, 1000])
  }

  const toggleAccordion = (section) => {
    setIsAccordionOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl text-black">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">Home / Collections / {searchedCategory}</div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-medium text-gray-900">{searchedCategory}</h1>
          <p className="text-gray-500 mt-1">{searchedTotal || filteredItems.length} products</p>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
              onClick={() => setIsFilterOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              Filter
            </button>

            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 w-[180px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="a-z">Name: A to Z</option>
                <option value="z-a">Name: Z to A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">Filters</h2>
              {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedBrands.length > 0) && (
                <button className="text-sm text-gray-500 hover:text-gray-700" onClick={clearAllFilters}>
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Price Range */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 text-base font-medium"
                  onClick={() => toggleAccordion("price")}
                >
                  Price Range
                  <svg
                    className={`h-5 w-5 transition-transform ${isAccordionOpen.price ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isAccordionOpen.price && (
                  <div className="pt-2 pb-6">
                    <div className="relative pt-5 pb-6">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Size */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 text-base font-medium"
                  onClick={() => toggleAccordion("size")}
                >
                  Size
                  <svg
                    className={`h-5 w-5 transition-transform ${isAccordionOpen.size ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isAccordionOpen.size && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        className={`h-9 text-sm font-medium border rounded-md ${
                          selectedSizes.includes(size)
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleSizeToggle(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Color */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 text-base font-medium"
                  onClick={() => toggleAccordion("color")}
                >
                  Color
                  <svg
                    className={`h-5 w-5 transition-transform ${isAccordionOpen.color ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isAccordionOpen.color && (
                  <div className="space-y-2 pt-2">
                    {availableColors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onChange={() => handleColorToggle(color)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                        />
                        <label htmlFor={`color-${color}`} className="flex items-center gap-2 text-sm text-gray-700">
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{
                              backgroundColor: color.toLowerCase(),
                              borderColor: color.toLowerCase() === "white" ? "#e5e7eb" : color.toLowerCase(),
                            }}
                          ></div>
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Brand */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 text-base font-medium"
                  onClick={() => toggleAccordion("brand")}
                >
                  Brand
                  <svg
                    className={`h-5 w-5 transition-transform ${isAccordionOpen.brand ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isAccordionOpen.brand && (
                  <div className="space-y-2 pt-2">
                    {availableBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm text-gray-700">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        {isFilterOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setIsFilterOpen(false)}></div>
            <div
              ref={filterRef}
              className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="p-4">
                {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedBrands.length > 0) && (
                  <button className="text-sm text-gray-500 hover:text-gray-700 mb-4" onClick={clearAllFilters}>
                    Clear all filters
                  </button>
                )}

                <div className="space-y-4">
                  {/* Price Range */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      className="flex w-full items-center justify-between py-3 text-base font-medium"
                      onClick={() => toggleAccordion("price")}
                    >
                      Price Range
                      <svg
                        className={`h-5 w-5 transition-transform ${isAccordionOpen.price ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isAccordionOpen.price && (
                      <div className="pt-2 pb-6">
                        <div className="relative pt-5 pb-6">
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex items-center justify-between mt-2">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Size */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      className="flex w-full items-center justify-between py-3 text-base font-medium"
                      onClick={() => toggleAccordion("size")}
                    >
                      Size
                      <svg
                        className={`h-5 w-5 transition-transform ${isAccordionOpen.size ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isAccordionOpen.size && (
                      <div className="grid grid-cols-4 gap-2 pt-2">
                        {availableSizes.map((size) => (
                          <button
                            key={size}
                            className={`h-9 text-sm font-medium border rounded-md ${
                              selectedSizes.includes(size)
                                ? "bg-gray-900 text-white border-gray-900"
                                : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                            }`}
                            onClick={() => handleSizeToggle(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Color */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      className="flex w-full items-center justify-between py-3 text-base font-medium"
                      onClick={() => toggleAccordion("color")}
                    >
                      Color
                      <svg
                        className={`h-5 w-5 transition-transform ${isAccordionOpen.color ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isAccordionOpen.color && (
                      <div className="space-y-2 pt-2">
                        {availableColors.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`mobile-color-${color}`}
                              checked={selectedColors.includes(color)}
                              onChange={() => handleColorToggle(color)}
                              className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                            />
                            <label
                              htmlFor={`mobile-color-${color}`}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <div
                                className="w-4 h-4 rounded-full border"
                                style={{
                                  backgroundColor: color.toLowerCase(),
                                  borderColor: color.toLowerCase() === "white" ? "#e5e7eb" : color.toLowerCase(),
                                }}
                              ></div>
                              {color}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Brand */}
                  <div className="border-b border-gray-200 pb-4">
                    <button
                      className="flex w-full items-center justify-between py-3 text-base font-medium"
                      onClick={() => toggleAccordion("brand")}
                    >
                      Brand
                      <svg
                        className={`h-5 w-5 transition-transform ${isAccordionOpen.brand ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isAccordionOpen.brand && (
                      <div className="space-y-2 pt-2">
                        {availableBrands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`mobile-brand-${brand}`}
                              checked={selectedBrands.includes(brand)}
                              onChange={() => handleBrandToggle(brand)}
                              className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                            />
                            <label htmlFor={`mobile-brand-${brand}`} className="text-sm text-gray-700">
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {/* Active Filters */}
          {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedBrands.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedSizes.map((size) => (
                <span
                  key={`badge-size-${size}`}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                >
                  Size: {size}
                  <button onClick={() => handleSizeToggle(size)} className="ml-1 text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </span>
              ))}
              {selectedColors.map((color) => (
                <span
                  key={`badge-color-${color}`}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                >
                  Color: {color}
                  <button onClick={() => handleColorToggle(color)} className="ml-1 text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </span>
              ))}
              {selectedBrands.map((brand) => (
                <span
                  key={`badge-brand-${brand}`}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                >
                  Brand: {brand}
                  <button onClick={() => handleBrandToggle(brand)} className="ml-1 text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {totalPage > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Button (Fixed) */}
      <button
        className="md:hidden fixed bottom-24 left-7 bg-gray-900 text-white p-3 rounded-full z-30 shadow-lg"
        onClick={() => setIsFilterOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="21" x2="4" y2="14"></line>
          <line x1="4" y1="10" x2="4" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="3"></line>
          <line x1="20" y1="21" x2="20" y2="16"></line>
          <line x1="20" y1="12" x2="20" y2="3"></line>
          <line x1="1" y1="14" x2="7" y2="14"></line>
          <line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="17" y1="16" x2="23" y2="16"></line>
        </svg>
      </button>
    </div>
  )
}

// Product Card Component
function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)

  const { toggleWishlist, isInWishlist } = useWishlist();

const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const updateRecentViews = () => {
      if (!product?.id) return;
      let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      recentViews = recentViews.filter((p) => p.id !== product.id);
      recentViews.unshift({
        id: product.id,
        name: product.name,
        image: product.image_path || product.images?.[0] || noImg.src,
        price: product.retails_price,
        discount: product.discount || 0,
      });
      if (recentViews.length > 6) recentViews.pop();
      localStorage.setItem("recentlyViewed", JSON.stringify(recentViews));
    };
  

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100 relative">
        <Image
        width={500}
        height={500}
          src={product.image_path || "/placeholder.svg?height=300&width=250"}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick actions */}
         <div
                className="absolute top-5 right-3 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isInWishlist(product.id) ? (
                  <FaHeart
                    color="teal"
                    size={18}
                    className="transition-all duration-300 animate-heart-bounce"
                  />
                ) : (
                  <FaRegHeart color="black" size={18} className="transition-all duration-300" />
                )}
              </div>

        {/* New badge */}
        {product.is_new && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black text-white">
              New
            </span>
          </div>
        )}

        {/* Quick shop button */}
        <z
          className={`absolute bottom-0 inset-x-0 flex justify-center p-4 transition-all duration-200 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <Link  href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
        onClick={updateRecentViews} className="w-full mx-auto text-center py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            Quick Shop
          </Link>
        </z>
      </div>

      <div className="mt-3">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
          <div className="flex items-center">
            {product.discount_price ? (
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">৳{product.discount_price}</span>
                <span className="text-xs text-gray-500 line-through">৳{product.retails_price}</span>
              </div>
            ) : (
              <span className="text-sm font-medium text-gray-900">৳{product.retails_price}</span>
            )}
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>

        {/* Color options */}
        <div className="mt-2 flex gap-1">
          {product.colors &&
            product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="h-3 w-3 rounded-full border"
                style={{
                  backgroundColor: color.toLowerCase(),
                  borderColor: color.toLowerCase() === "white" ? "#e5e7eb" : color.toLowerCase(),
                }}
                title={color}
              ></div>
            ))}
          {product.colors && product.colors.length > 3 && (
            <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// Product Card Skeleton
function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-md bg-gray-200"></div>
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = []

  // Create array of page numbers to display
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages)
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        className={`flex items-center justify-center w-8 h-8 rounded-md border ${
          currentPage === 1
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="rotate-90"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        <span className="sr-only">Previous page</span>
      </button>

      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <button
              className={`min-w-[2.5rem] h-8 px-3 rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        className={`flex items-center justify-center w-8 h-8 rounded-md border ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-rotate-90"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        <span className="sr-only">Next page</span>
      </button>
    </div>
  )
}
