"use client"
import {
  Modal,
  Box,
 
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react"
import useSWR from "swr"
import axios from "axios"
import toast from "react-hot-toast"
import noImg from "/public/no-image.jpg"
import { htmlToText } from "html-to-text"
import InnerImageZoom from "react-inner-image-zoom"
import "react-inner-image-zoom/lib/styles.min.css"
import useStore from "@/app/CustomHooks/useStore"
import useWishlist from "@/app/CustomHooks/useWishlist"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import SizeGuideModal from "@/app/Components/SizeGuideModal"
import CustomImageZoom from "@/app/Components/CustomImageZoom";
import CursorImageZoom from "@/app/Components/CustomImageZoom";
// Fetcher function from the original code
const fetcher = (url) => fetch(url).then((res) => res.json())
const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : ""

const ProductPage = ({ params }) => {
  const { id } = params
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [scroll, setScroll] = useState(0)
  const [isInCart, setIsInCart] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [cartItems, setCartItems] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [recentProducts, setRecentProducts] = useState([])
  const [imageArray, setImageArray] = useState([])
    const { handleCart, handleBuy } = useStore();
    const { toggleWishlist, isInWishlist } = useWishlist();

    // size guide modal

   const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(0);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleTabChange = (event, newValue) => setTab(newValue);
  
    const inches = [
      ["1/2 CHEST", "20.75", "21.75", "22.75", "24", "25.5", "27.25", "28.75"],
      ["BODY LENGTH", "52", "54", "54/56", "56/58", "60", "62", "64"],
    ];
  
    const cm = [
      ["1/2 CHEST", "52.7", "55.2", "57.8", "61", "64.7", "69.2", "73"],
      ["BODY LENGTH", "132", "137", "137/142", "142/147", "152", "157", "162"],
    ];

  // Demo data for sizes

  const [selectedSize, setSelectedSize] = useState("M")

  const { data: product, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}` : null,
    fetcher,
  )

  useEffect(() => {
    const getCartItems = () => {
      const storedCart = localStorage.getItem("cart")
      return storedCart ? JSON.parse(storedCart) : []
    }

    setCartItems(getCartItems())

    if (product?.data) {
      const isProductInCart = getCartItems().find((item) => item?.id === product?.data.id)
      setIsInCart(!!isProductInCart)
    }
  }, [product?.data])

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!id) return

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

    fetchRelatedProducts()
  }, [id])

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || []
    if (storedProducts.length) {
      const withoutThisProduct = storedProducts.filter((item) => item.id != id)
      setRecentProducts(withoutThisProduct)
    }
  }, [id])

  useEffect(() => {
    if (product?.data) {
      if (product.data?.have_variant === "1" && product.data?.imei_image && product?.data?.imei_image?.length > 0) {
        setImageArray(product?.data?.imei_image)
      } else {
        setImageArray(product?.data?.images)
      }
    }
  }, [product?.data])

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Demo color data
  const demoColors = ["Black", "White", "Navy", "Olive"]
  const [selectedColor, setSelectedColor] = useState(demoColors[0])

  const colorMap = {
    Black: "#222222",
    White: "#f8f8f8",
    Navy: "#0a2463",
    Olive: "#556b2f",
  }

  const handleAddToCart = () => {
    if (!product?.data) return

    const newCartItem = {
      ...product.data,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    }

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = [...currentCart, newCartItem]
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    setIsInCart(true)
    toast.success("Added to cart")
  }

  const handleBuyNow = () => {
    if (!product?.data) return

    handleAddToCart()

    console.log("Buy now:", {
      product: product.data.id,
      quantity,
      color: selectedColor,
      size: selectedSize,
    })
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  if (!product && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Failed to load product data</div>
      </div>
    )
  }

  const descriptionText = product?.data?.description
    ? htmlToText(product.data.description, {
        wordwrap: false,
        selectors: [{ selector: "a", options: { ignoreHref: true } }],
      })
    : null;

      const isCartItem = cartItems.find(
    (item) => item?.id === product?.data.id || undefined
  );


  



 
  

  return (
    <section className=" text-black lg:pt-16 md:pt-16 pt-14">
      <div className="px-4 lg:px-8 pt-6 lg:pt-12 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8 mb-12">

          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 mt-4 md:mt-0">
                {imageArray && imageArray.length > 0 ? (
                  imageArray.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className={`relative border rounded-md overflow-hidden ${
                        imageIndex === idx ? "ring-2 ring-black" : ""
                      }`}
                    >
                      <Image
                        unoptimized
                        src={image || "/placeholder.svg?height=80&width=80"}
                        alt={`Product view ${idx + 1}`}
                        width={80}
                        height={80}
                        className="object-cover aspect-square"
                      />
                    </button>
                  ))
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                )}
              </div>

              {/* Main Image */}
              <div className="relative flex-1">
                {product?.data?.discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-medium px-2 py-1 rounded-md">
                    SAVE {product.data.discount}%
                  </div>
                )}
                {imageArray && imageArray.length > 0 ? (
                  <CursorImageZoom
  src={imageArray[imageIndex]}
  alt={product?.data?.name || noImg}
  className="w-full md:h-[75vh] h-[55vh] rounded-lg"
  zoomScale={2.5}
/>

                ) : product?.data?.image_path ? (
                  <Image
                    unoptimized
                    src={product.data.image_path || "/placeholder.svg"}
                    alt={product?.data?.name || "Product image"}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-200 rounded-lg"></div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product?.data?.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              {product?.data?.discount > 0 && (
                <span className="text-gray-500 line-through text-sm">৳{product?.data?.retails_price}</span>
              )}
              <span className="text-2xl font-bold">
                ৳
                {product?.data?.discount > 0
                  ? (product.data.retails_price - (product.data.retails_price * product.data.discount) / 100).toFixed(0)
                  : product?.data?.retails_price}
              </span>
              {product?.data?.discount > 0 && (
                <span className="text-xs font-medium text-green-600 border border-green-600 px-2 py-0.5 rounded-full">
                  {product.data.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-6">
              {descriptionText ? (
                <p className="text-gray-600 whitespace-pre-line mb-4">{descriptionText.substring(0, 33)}</p>
              ) : (
                <p>Description is not available</p>
              )}
            </p>

            {/* Color Selection (Demo) */}
            {/* <div className="mb-6">
              <h3 className="font-medium text-sm mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {demoColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                      selectedColor === color ? "border-black" : "border-gray-200"
                    }`}
                    aria-label={`Select ${color} color`}
                  >
                    <span className="w-8 h-8 rounded-full" style={{ backgroundColor: colorMap[color] }} />
                  </button>
                ))}
              </div>
            </div> */}

            {/* Size Selection (Demo) */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-sm">Size: {selectedSize}</h3>
                <button onClick={handleOpen} className="text-sm text-gray-600 underline">Size Guide</button>
              </div>
              <div className="flex gap-3">
                {product?.data?.product_variants && product.data.product_variants.length > 0
                  ? product.data.product_variants.map((variant) => (
                      <button
                        key={variant.name}
                        onClick={() => setSelectedSize(variant?.name)}
                        className={`flex items-center justify-center w-12 h-12 border rounded-md cursor-pointer ${
                          selectedSize === variant.name
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {variant?.name}
                      </button>
                    ))
                  : "No size availavle"}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">{product?.data?.status || "In Stock"}</span>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-black md:text-base text-sm hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 md:text-base text-sm flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                    isInCart ? "bg-white text-black border border-gray-300" : "bg-gray-200 hover:bg-gray-300 text-black"
                  }`}
                  disabled={isInCart}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </button>
                <button
                onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Add to wishlist"
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
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mb-12 lg:mt-20">
          <div className="border-b">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-2 px-4 text-base font-medium ${
                activeTab === "description" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Description
            </button>
          </div>

          <div className={`pt-6 ${activeTab === "description" ? "block" : "hidden"}`}>
            <div id="Description" className="mt-5 p-3 text-sm border rounded-lg">
              <h2 className="text-xl font-bold text-gray-900">Description</h2>
              <div className="w-[6.5rem] h-[2px] bg-[#212121] mt-1 mb-4"></div>
              {descriptionText ? (
                <p className="text-gray-600 whitespace-pre-line mb-4">{descriptionText}</p>
              ) : (
                <p>Description is not available</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts && relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`}
                  className="group"
                >
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100 mb-3">
                    <Image
                      unoptimized
                      src={item.image_path || noImg}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-sm">৳{item.retails_price}</p>
                </Link>
              ))
            ) : (
              <p className="col-span-4 text-gray-500">No related products available.</p>
            )}
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-10">
            {recentProducts && recentProducts.length > 0 ? (
              recentProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`}
                  className="group"
                >
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100 mb-3">
                    <Image
                      unoptimized
                      src={item.image || noImg}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-sm">৳{item.price}</p>
                </Link>
              ))
            ) : (
              <p className="col-span-4 text-gray-500">No recently viewed products.</p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar */}
      {scroll > 500 && product?.data && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg py-3 px-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                unoptimized
                src={
                  imageArray && imageArray.length > 0
                    ? imageArray[0]
                    : product.data.image_path || "/placeholder.svg?height=50&width=50"
                }
                alt={product.data.name}
                width={50}
                height={50}
                className="rounded-md"
              />
              <div>
                <h3 className="font-medium text-sm line-clamp-1">{product.data.name}</h3>
                <p className="text-sm font-bold">
                  ৳
                  {product.data.discount > 0
                    ? (product.data.retails_price - (product.data.retails_price * product.data.discount) / 100).toFixed(
                        0,
                      )
                    : product.data.retails_price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={decrementQuantity} className="px-2 py-1 text-gray-600">
                  <Minus className="h-3 w-3" />
                </button>
                <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
                <button onClick={incrementQuantity} className="px-2 py-1 text-gray-600">
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <button
                 onClick={() =>
                      handleCart(
                        {
                          ...product?.data,
                          storage: selectedStorage,
                          color: selectedColor,
                          price: selectedSalePrice,
                        },
                        quantity
                      )
                    }
                className={`py-2 px-4 rounded-md font-medium ${
                  isCartItem ? "bg-white text-black border border-gray-300" : "bg-black hover:bg-gray-800 text-white"
                }`}
                disabled={isCartItem}
              >
                {isCartItem !== undefined ? "Added" : "Add to Cart"}
              </button>

              <button
                onClick={() => handleBuy(product?.data, quantity)}
                className="hidden md:block bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 700,
            bgcolor: "background.paper",
            margin: "100px auto",
            padding: 4,
            outline: "none",
            borderRadius: 2,
          }}
        >
          <Typography color="black" variant="h6" mb={2}>
            MEN&apos;S THOBE - REGULAR FIT
          </Typography>

          <Tabs value={tab} onChange={handleTabChange} aria-label="Size Guide Tabs">
            <Tab label="IN" />
            <Tab label="CM" />
          </Tabs>

          <Box mt={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Measurement Points</TableCell>
                  <TableCell>XS</TableCell>
                  <TableCell>S</TableCell>
                  <TableCell>M</TableCell>
                  <TableCell>L</TableCell>
                  <TableCell>XL</TableCell>
                  <TableCell>2XL</TableCell>
                  <TableCell>3XL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(tab === 0 ? inches : cm).map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell key={j}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Modal>
    </section>
  )
}

export default ProductPage
