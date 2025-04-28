/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import useStore from "@/app/CustomHooks/useStore"
import { FaWhatsapp } from "react-icons/fa6"
import Link from "next/link"
import useSWR from "swr"
import noImg from "/public/no-image.jpg"
import MagnifiedImage from "@/app/Components/MagnifiedImage"
// import nearestColor from 'nearest-color';
import { colornames } from "color-name-list"
import toast from "react-hot-toast"
import Breadcrumbs from "@/app/Components/Breadcrumbs"
import { fetcher, userId } from "@/app/(home)/page"
import axios from "axios"

const Page = ({ params }) => {
  const { handleCart, getCartItems, refetch, setRefetch, handleBuy } = useStore()
  const [scroll, setScroll] = useState(0)
  // const [product,setProduct] = useState({});
  const [recentItems, setRecentItems] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("Specification")
  const [region, setRegion] = useState([])
  const [imageIndex, setImageIndex] = useState(0)
  const [colors, setColors] = useState([])
  const [imageArray, setImageArray] = useState([])

  useEffect(() => {
    setCartItems(getCartItems())
    if (refetch) {
      // setCartItems(getCartItems());
      setRefetch(false)
    }
  }, [refetch, getCartItems])

  const { id } = params
  const { data: product, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}` : null,
    fetcher,
  )

  const [selectedStorage, setSelectedStorage] = useState("")

  const [storages, setStorages] = useState("")

  const isCartItem = cartItems.find((item) => item?.id === product?.data.id || undefined)

  // console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/public/get-related-products`, {
          product_id: id,
          user_id: userId,
        })
        setRelatedProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])

  useMemo(() => {
    if (product && product?.data.imeis && product?.data.imeis.length > 0) {
      const uniqueStorage = [...new Set(product.data.imeis.map((item) => item.storage))]
      setStorages(uniqueStorage)
    }
  }, [product])

  console.log(product)
  // console.log(colornames("Black Titanium"));
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [recentProducts, setRecentProducts] = useState([])

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || []
    if (storedProducts.length) {
      const WithoutThisProduct = storedProducts.filter((item) => item.id != id)
      setRecentProducts(WithoutThisProduct)
    }
  }, [])

  const [selectedSalePrice, setSelectedSalePrice] = useState(
    product?.data.imeis && product?.data.imeis.length ? product?.data.imeis[0].sale_price : product?.data.retails_price,
  )

  const [selectedColor, setSelectedColor] = useState(product?.data?.color[0])
  const [selectedRegion, setSelectedRegion] = useState("")

  useEffect(() => {
    if (product?.data) {
      // Set the image array based on have_variant and check if imei_image is empty
      if (product.data.have_variant === "1" && product.data.imei_image && product.data.imei_image.length > 0) {
        setImageArray(product.data.imei_image)
      } else {
        // If have_variant is 0 or imei_image is empty, use images array
        setImageArray(product.data.images || [])
      }
    }
  }, [product?.data])

  const handleColorChange = (colorCode) => {
    setSelectedColor(colorCode)

    // Find the IMEI that matches the selected color
    const selectedImei = product?.data.imeis.find((item) => item.color === colorCode)

    // If have_variant is 1, update the image to the one associated with this color
    if (product?.data.have_variant === "1" && selectedImei) {
      // Set the image index to 0 to show the first image
      setImageIndex(0)
      // Find the image path from the selected IMEI
      const imeiImagePath = selectedImei.image_path
      // Find the index of this image in the imei_image array if it exists
      const imageIdx = product.data.imei_image.findIndex((img) => img === imeiImagePath)
      if (imageIdx !== -1) {
        setImageIndex(imageIdx)
      }
    }

    // Update other selections based on the available variant
    if (selectedImei) {
      setSelectedStorage(selectedImei.storage)
      setSelectedSalePrice(selectedImei.sale_price)
      setSelectedRegion(selectedImei.region)
    }
  }

  useEffect(() => {
    if (product?.data.imeis && product?.data.imeis.length) {
      const regions = product?.data.imeis.flatMap((imei) => imei.region)
      const uniqueRegions = [...new Set(regions)]
      setRegion(uniqueRegions)
    }
  }, [product?.data])

  useEffect(() => {
    const imeis = product?.data?.imeis
    if (imeis && imeis.length) {
      setSelectedColor(imeis[0].color)
      setSelectedStorage(imeis[0].storage)
      setSelectedRegion(imeis[0].region)
    }
  }, [product])

  const handleStorageChange = (storage) => {
    const findImei =
      product?.data.imeis && product?.data.imeis.length
        ? product?.data.imeis.find((item) => item.storage === storage && item.color === selectedColor)
        : null
    if (!findImei) {
      toast.error("This variant is not available")
      return
    }
    setSelectedStorage(storage)
    setSelectedSalePrice(findImei.sale_price)
  }

  const handleRegionChange = (rgn) => {
    const findImei =
      product?.data.imeis && product?.data.imeis.length
        ? product?.data.imeis.find(
            (item) => item.region === rgn && item.color === selectedColor && item.storage === selectedStorage,
          )
        : null
    if (!findImei) {
      toast.error("This variant is not available")
      return
    }
    setSelectedRegion(rgn)
    setSelectedSalePrice(findImei.sale_price)
  }

  const someNamedColor = colornames.find((color) => color.name === "Black Titanium")

  useEffect(() => {
    if (product?.data.color && typeof product?.data.color === "object") {
      const colors = Object.values(product.data.color)
      const uniqueColors = [...new Set(colors)]
      setColors(uniqueColors)
    } else if (product?.data.color && product?.data.color.length) {
      const uniqueColors = [...new Set(product.data.color)]
      setColors(uniqueColors)
    }
  }, [product?.data])

  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^a-z0-9-]/g, "") // Remove special characters
  }

  console.log(imageIndex)

  return (
    <section className="bg-white">
      <div className="px-5 lg:p-8 lg:pt-28 md:pt-24 pt-20 mx-auto text-black max-w-7xl overflow-hidden sans">
        <h1 className="text-base sans lg:text-xl font-semibold lg:hidden block lg:text-nowrap">{product?.data.name}</h1>
        <Breadcrumbs />
        <div className="container mx-auto px-4 lg:pt-5 pb-8">
          <div className="flex flex-col md:flex-row flex-1 gap-8">
            <div className="relative">
              {/* desktop */}
              <div
                id="magnify"
                className="hidden  mb-4 col-span-1  lg:flex justify-center rounded-2xl p-2 cursor-zoom-in"
              >
                {imageArray?.length > 0 ? (
                  <div>
                    <MagnifiedImage image_path={imageArray[imageIndex]} alt={product?.data.name} />
                  </div>
                ) : product?.data?.image_path ? (
                  <div>
                    <MagnifiedImage image_path={product.data.image_path} alt={product?.data.name} />
                  </div>
                ) : (
                  <Image
                    src={
                      "https://i.postimg.cc/ZnfKKrrw/Whats-App-Image-2025-02-05-at-14-10-04-beb2026f.jpg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    unoptimized
                    height={300}
                    width={300}
                    alt={product?.data.name}
                    quality={75}
                  />
                )}
              </div>

              {/* mobile */}
              <div className="flex justify-center lg:hidden mt-3">
                {imageArray?.length > 0 ? (
                  <Image
                    unoptimized
                    height={200}
                    width={200}
                    alt="product"
                    src={imageArray[imageIndex] || "/placeholder.svg"}
                  />
                ) : product?.data.image_path ? (
                  <Image
                    unoptimized
                    height={200}
                    width={200}
                    alt="product"
                    src={product?.data.image_path || "/placeholder.svg"}
                  />
                ) : (
                  <Image
                    src={noImg || "/placeholder.svg"}
                    height={200}
                    width={200}
                    alt="mobile-phone"
                    quality={75}
                    unoptimized
                  />
                )}
              </div>
              {/* discount ribon */}
              {product?.data.discount ? (
                <p
                  className="text-white bg-[#c03b2c] rounded-md  absolute py-1 
              px-[6px] text-sm top-5 md:top-3 lg:top-3 left-12"
                >
                  SAVE {product?.data?.discount}%
                </p>
              ) : (
                ""
              )}
              <div className="flex justify-center space-x-2 lg:mb-4 mt-2">
                {imageArray && imageArray.length > 0
                  ? imageArray.map((image, idx) => {
                      return (
                        <div
                          key={idx}
                          className={`relative p-2  ${
                            imageIndex === idx ? "border-2 border-[#0F98BA]" : ""
                          } }   overflow-hidden `}
                        >
                          <Image
                            unoptimized
                            onClick={() => setImageIndex(idx)}
                            src={image || "/placeholder.svg"}
                            alt={product?.data.name}
                            height={71}
                            width={71}
                            quality={100}
                            className="cursor-pointer"
                          />
                        </div>
                      )
                    })
                  : ""}
              </div>
            </div>

            <div>
              <h1 className="text-base sans lg:text-xl font-semibold mb-2 hidden lg:block lg:text-nowrap">
                {product?.data.name}
              </h1>

              <div className="mb-4 md:flex md:items-center gap-5">
                <div className="bg-gray-200 px-4 rounded-sm text-xs py-1 flex items-center md:justify-center gap-1">
                  {product?.data?.discount ? "Cash Discount Price:" : "Retail Price:"}
                  <div className="text-nowrap flex gap-2 items-center">
                    {product?.data?.discount ? (
                      <span className="sans text-xs font-bold text-[#4b4947] line-through">
                        {(selectedSalePrice - (selectedSalePrice * product?.data.discount) / 100).toFixed(0)} ৳
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="text-sm font-bold text-[#C03B2C]  font-bangla">
                      {selectedSalePrice ?? product?.data.retails_price} ৳
                    </span>
                  </div>
                </div>

                <div className="bg-gray-200 px-4 rounded-sm text-xs py-1.5 flex items-center gap-1 mt-2 md:mt-0">
                  Product Code: <span className="font-semibold">{id}</span>
                </div>
              </div>

              <div className="mb-4 flex items-center  lg:flex-nowrap md:gap-3 gap-2">
                {/* <p className="text-gray-800 text-xs  px-4 py-1.5 rounded-sm bg-gray-200 flex items-center text-nowrap gap-2">
                  <Landmark size={16} /> EMI Available{" "}
                  <Link
                    target="_blank"
                    href={
                      "/Convenient Global EMI (for QR) (Updated- 05-01-22)(0)(0)(0).pdf"
                    }
                    className="text-blue-500 font-semibold"
                  >
                    View Plans
                  </Link>
                </p> */}
                <p className="text-gray-800 text-xs lg:mr-0 mr-2 text-nowrap bg-gray-200 px-4 py-1.5 rounded-sm">
                  {" "}
                  Exchange{" "}
                  <Link href={"/plans"} className="text-blue-500 font-semibold">
                    View Plans
                  </Link>
                </p>
              </div>
              <Link
                href="https://wa.me/+8801725171313"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-fit space-x-3 text-xs px-4 py-1 text-white font-semibold rounded-md bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 hover:text-white transition-colors duration-200 mb-3"
              >
                <FaWhatsapp className="text-2xl" />
                <span>
                  Message <br /> on WhatsApp
                </span>
              </Link>

              <div className="flex justify-between items-center gap-2">
                <div className="mb-4">
                  <h3 className="font-medium text-sm mb-4">Color: {selectedColor || "N/A"}</h3>
                  <div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-4 gap-3">
                    {colors.length
                      ? colors.map(
                          (color) =>
                            color && (
                              <div
                                className={`rounded-lg border-2 p-0.5 ${
                                  selectedColor === color
                                    ? "border-[#ff7060] shadow-[0_2px_4px_4px] p-0.5 shadow-[#cf4b3c]"
                                    : "border-gray-200"
                                }`}
                                key={color}
                              >
                                <button
                                  className={`p-2 w-7 h-7 text-xs rounded-md`}
                                  onClick={() => handleColorChange(color)}
                                  style={{
                                    backgroundColor:
                                      color === "Desert Titanium"
                                        ? "#e7d4c6"
                                        : color === "Black Titanium"
                                          ? "#5b5b5b"
                                          : color === "Blue Titanium"
                                            ? "#17192b"
                                            : color === "White Titanium"
                                              ? "#e4e4e4"
                                              : color === "Natural Titanium"
                                                ? "#aba5a0"
                                                : color,
                                  }}
                                >
                                  &nbsp; {/* This adds some space inside the button */}
                                </button>
                              </div>
                            ),
                        )
                      : null}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm font-medium">Status: </span>{" "}
                <p
                  className="text-xs"
                  style={{
                    color: product?.data.status === "Stock Out" ? "red" : "green",
                  }}
                >
                  {product?.data.status === "Stock Out" ? "Stock Out" : "In Stock"}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-sm mb-1">Region: {selectedRegion || "N/A"}</h3>
                <div className="flex space-x-2">
                  {region.length
                    ? region.map(
                        (rgn) =>
                          rgn && (
                            <button
                              key={rgn}
                              className={`rounded-md px-2 ${
                                selectedRegion === rgn ? "bg-[#c03b2c] text-white" : "bg-[#EDEDED] text-gray-700"
                              }`}
                              onClick={() => handleRegionChange(rgn)}
                            >
                              {rgn}
                            </button>
                          ),
                      )
                    : null}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-1 text-sm">Storage: {selectedStorage || "N/A"}</h3>
                <div className="flex space-x-2">
                  {storages.length
                    ? storages.map((storage) => (
                        <button
                          key={storage}
                          onClick={() => handleStorageChange(storage)}
                          className={`px-4 text-xs py-2 rounded ${
                            selectedStorage === storage ? "bg-[#c03b2c] text-white" : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {storage}
                        </button>
                      ))
                    : null}
                </div>
              </div>

              <div className="flex md:flex-wrap items-center gap-4 justify-start mb-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#0F98BA] rounded-md overflow-hidden">
                  <button
                    onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}
                    className="md:px-4 px-3 md:py-2 py- text-[#0F98BA] font-semibold"
                  >
                    -
                  </button>
                  <div className="md:px-4 px-3 md:py-2 py- border-x border-[#0F98BA] text-[#0F98BA] font-semibold">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="md:px-4 px-3 md:py-2 py-1 text-[#0F98BA] font-semibold"
                  >
                    +
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleBuy(product?.data, quantity)}
                    className="lg:px-5 px-2.5 py-0.5 text-sm  md:py-1 bg-[#c03b2c] text-white hover:bg-white hover:text-[#c03b2c] hover:border-[#c03b2c] rounded-sm border border-transparent"
                  >
                    Buy Now
                  </button>

                  <button
                    disabled={isCartItem !== undefined}
                    className={`border border-[#c03b2c] md:px-4 text-sm md:py-1 px-2.5 py-1 bg-transparent text-[#c03b2c] hover:bg-[#c03b2c] hover:text-white rounded-sm ${
                      isCartItem !== undefined ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                      handleCart(
                        {
                          ...product?.data,
                          storage: selectedStorage,
                          color: selectedColor,
                          price: selectedSalePrice,
                        },
                        quantity,
                      )
                    }
                  >
                    {isCartItem !== undefined ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-8">
          <div className="col-span-2">
            <div className="flex space-x-2 lg:space-x-4 bg-gray-100 w-fit mb-5 p-2 rounded-lg">
              {["Specification", "Description", "Warranty"].map((tab) => (
                <Link
                  key={tab}
                  href={`#${tab}`} // Use lowercase IDs for section navigation
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1 text-sm font-semibold rounded-lg ${
                    activeTab === tab ? "text-black bg-white shadow" : "text-gray-500"
                  }`}
                >
                  {tab}
                </Link>
              ))}
            </div>
            <div className="border p-4 rounded-lg">
              <h2 className="text-[#4D5959] text-xl mb-2 font-semibold">Specification</h2>

              <div className="w-[7.5rem] h-[2px] bg-[#c03b2c] mt-1 mb-4"></div>
              <table id="Specification" className="table-auto w-full text-sm text-left">
                <tbody>
                  {product?.data.specifications && product?.data.specifications.length > 0
                    ? product?.data.specifications.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 font-semibold border pl-3 ">{item.name}</td>
                          <td className="py-2 pl-3 border">{item.description}</td>
                        </tr>
                      ))
                    : [
                        { label: "Brand", value: "N/A" },
                        { label: "Model", value: "N/A" },
                        { label: "Network", value: "N/A" },
                        { label: "Dimensions", value: "N/A" },
                        { label: "Weight", value: "N/A" },
                        { label: "SIM", value: "N/A" },
                        { label: "Display Type", value: "N/A" },
                        { label: "Display Size", value: "N/A" },
                        { label: "Display Resolution", value: "N/A" },
                        { label: "OS", value: "N/A" },
                        { label: "Chipset", value: "N/A" },
                        { label: "CPU", value: "N/A" },
                        { label: "Memory", value: "N/A" },
                        { label: "Main Camera", value: "N/A" },
                        { label: "Selfie Camera", value: "N/A" },
                        { label: "Sound", value: "N/A" },
                        { label: "Battery Info", value: "N/A" },
                        { label: "Sensors", value: "N/A" },
                      ].map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 font-semibold border pl-3 ">{item.label}</td>
                          <td className="py-2 pl-3 border">{item.value}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            {/* extra descriptions */}
            <div id="Description" className="mt-5 p-3 text-sm border rounded-lg">
              <h2 className="text-xl font-bold text-gray-900">Description</h2>
              <div className="w-[6.5rem] h-[2px] bg-[#c03b2c] mt-1 mb-4"></div>
              {product?.data.description ? (
                <p className="text-gray-600 mb-4">{product?.data.description}</p>
              ) : (
                <p>Description is not Available</p>
              )}
            </div>
            {/* warranty */}
            <div id="Warranty" className="bg-white text-sm border rounded-lg p-6 mt-5 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Warranty</h2>
              <div className="w-24 h-[2px] bg-[#c03b2c] mt-1 mb-4"></div>
              <p className="text-gray-700">
                Explore our{" "}
                <a href="/warranty-policy" className="text-[#c03b2c] font-semibold hover:underline">
                  Warranty Policy
                </a>{" "}
                page for detailed information about our warranty coverage.
              </p>
            </div>
          </div>

          {/* recent viewed items */}

          <div className="container mx-auto p-4">
            <h2 className="text-lg font-bold mb-4">Related Products</h2>
            {relatedProducts.length > 0 ? (
              <div className="grid gap-3 grid-cols-2">
                {relatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
                    className="border p-2 rounded-md hover:shadow-md"
                  >
                    <div className="relative w-full h-[150px] flex justify-center items-center">
                      <Image
                        unoptimized
                        src={product.image_path || noImg}
                        alt={product.name}
                        width={120}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <h3 className="text-sm font-semibold text-ellipsis line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 font-semibold">{product.retails_price} ৳</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No related products avaiable.</p>
            )}
          </div>
        </div>
        <div className="container mx-auto p-4">
          <h2 className="text-lg font-bold mb-4">Recently Viewed</h2>
          {recentProducts.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5 grid-cols-2">
              {recentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
                  className="border p-2 rounded-md hover:shadow-md"
                >
                  <div className="relative w-full h-[150px] flex justify-center items-center">
                    <Image
                      unoptimized
                      src={product.image || noImg}
                      alt={product.name}
                      width={120}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <h3 className="text-sm font-semibold text-ellipsis line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 font-semibold">{product.price} ৳</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recently viewed products.</p>
          )}
        </div>

        {/* bottom cart */}
        {/* desktop */}
        <div
          className={`hidden md:flex  ${
            scroll > 700 ? "fixed left-0 bottom-0" : "ease-out hidden fade"
          } transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full  bg-white text-black  justify-between items-center py-4 px-6 border-t`}
        >
          {/* Product Information */}
          <div className="text-lg font-light">
            <span className="font-medium text-black">{product?.data?.name}</span>
          </div>

          {/* Quantity and Buttons */}
          <div className="flex items-center space-x-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded">
              <input
                type="number"
                value={quantity}
                min={quantity}
                max={2}
                className="w-12 h-10 text-center border-none focus:outline-none no-arrows bg-white "
              />
              <div className="flex flex-col justify-between">
                <button onClick={() => setQuantity(quantity + 1)} className="px-2 border-b border-l border-gray-300">
                  ▲
                </button>
                <button
                  onClick={() => (quantity > 1 ? setQuantity(quantity - 1) : null)}
                  className="px-2 border-l border-gray-300"
                >
                  ▼
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={isCartItem !== undefined}
              onClick={() => handleCart(product?.data, quantity)}
              className={`border px-4 rounded-md py-1 border-[#c03b2c] text-[#c03b2c] hover:bg-[#c03b2c] hover:text-white  ${
                isCartItem !== undefined ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
              }`}
            >
              {isCartItem !== undefined ? "Added" : "ADD TO CART"}
            </button>

            {/* Buy It Now Button */}
            <button
              onClick={() => handleBuy(product?.data, quantity)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
            >
              BUY IT NOW
            </button>
          </div>
        </div>

        {/* mobile */}
        <div
          className={`${
            scroll > 700 ? "fixed left-0 bottom-0" : "ease-out hidden fade"
          } transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full  bg-white text-black flex flex-col justify-between gap-y-5 items-center md:hidden py-4 px-6 border-t`}
        >
          {/* Product Information */}
          <div className="flex items-center gap-5 w-full">
            <div className="text-sm font-light">
              <span className="font-medium">{product?.data.name}</span>
            </div>

            <div className="flex items-center border border-gray-300 rounded">
              <input
                type="number"
                value={quantity}
                min={quantity}
                max={2}
                className="w-12 h-10 text-center bg-white dark:bg-white border-none focus:outline-none no-arrows"
              />
              <div className="flex flex-col justify-between">
                <button onClick={() => setQuantity(quantity + 1)} className="px-2 border-b border-l border-gray-300">
                  ▲
                </button>
                <button
                  onClick={() => (quantity > 0 ? setQuantity(quantity - 1) : null)}
                  className="px-2 border-l border-gray-300"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Quantity and Buttons */}
          <div className="  flex  items-center justify-between w-full">
            {/* Quantity Selector */}

            {/* Add to Cart Button */}
            <button
              disabled={isCartItem !== undefined}
              onClick={() => handleCart(product?.data, quantity)}
              className={`border px-4 py-1 border-[#c03b2c] text-[#c03b2c] hover:bg-[#c03b2c] hover:text-white  ${
                isCartItem !== undefined ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
              }`}
            >
              {isCartItem !== undefined ? "Added" : "ADD TO CART"}
            </button>

            {/* Buy It Now Button */}
            <button
              onClick={() => handleBuy(product?.data, quantity)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
            >
              BUY IT NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
