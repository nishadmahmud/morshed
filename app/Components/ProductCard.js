"use client"

import Image from "next/image"
const noImg = "/no-image.jpg"
import Link from "next/link"
import { useEffect } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import useWishlist from "../CustomHooks/useWishlist"
import useStore from "../CustomHooks/useStore"

const ProductCard = ({ product, compact = false }) => {
  const { prices, country, setProductPrice } = useStore()
  const { toggleWishlist, isInWishlist } = useWishlist();

  const countrySign = country?.value === "BD" ? "৳" : "$"


  useEffect(() => {
    if (product?.id && product?.retails_price) {
      setProductPrice(product.id, product?.retails_price, product?.intl_retails_price || null)
    }
  }, [product.id, product.retails_price, product.intl_retails_price])

  const productPrice = prices[product.id]

  const getPriceByCountry = () => {
    if (country && country.value === "BD") {
      return productPrice?.basePrice || product?.retails_price || 0
    } else {
      return productPrice?.intl_retails_price || product?.intl_retails_price || 0
    }
  }

  const discountedPrice = country?.value === "BD" ?
    product?.discount
      ? product?.discount_type === "Percentage"
        ? (product.retails_price - (product.retails_price * product.discount) / 100).toFixed(0)
        : (product.retails_price - product.discount).toFixed(0)
      : null
    : product?.intl_discount
      ? product?.discount_type === "Percentage"
        ? (product.intl_retails_price - (product.intl_retails_price * product.intl_discount) / 100).toFixed(0)
        : (product.intl_retails_price - product.intl_discount).toFixed(0)
      : null
  const discountSuffix = product?.discount_type === "Percentage" ? "%" : product?.discount_type === "Fixed" ? "Tk" : ""


  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  return (
    <div
      className={`
      group bg-white rounded-lg overflow-hidden
      transition-all duration-300 mx-auto w-full max-w-sm
      flex flex-col h-full
      ${compact ? 'text-sm' : 'sm:max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-sm'}
    `}
    >
      {/* Image Container */}
      <div
        className={`
        relative w-full overflow-hidden bg-gray-50
        ${compact ? 'aspect-square' : 'aspect-square sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5]'}
      `}
      >
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          className="block w-full h-full"
        >
          <Image
            src={product?.image_path || noImg}
            alt={product?.name || "Product image"}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover Image */}
          {product?.image_path1 && (
            <Image
              src={product.image_path1 || "/placeholder.svg"}
              alt={`${product?.name} alternate view`}
              fill
              className="
                object-cover absolute inset-0 opacity-0 
                group-hover:opacity-100 transition-opacity duration-500
                hidden sm:block
              "
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Discount Badge */}
        {
          countrySign ? <>
            {product?.discount && (
              <div className={`absolute left-2 z-10 ${compact ? 'top-2' : 'top-2 sm:top-3 sm:left-3'}`}>
                <span
                  className={`
              bg-gray-900 text-white font-semibold 
              rounded-full
              ${compact ? 'text-[10px] py-0.5 px-2' : 'text-xs py-0.5 px-3'}
            `}
                >
                  Save {product?.discount}
                  {discountSuffix}
                </span>
              </div>
            )}
          </> : ""
        }

        {product?.status.toLowerCase() === "stock out" && (
          <div className={`
              absolute z-10 right-3 bg-red-500 text-white font-semibold 
              rounded-full
              ${compact ? 'top-2 text-[10px] py-0.5 px-2' : 'top-5 text-xs py-0.5 px-3'}
            `}>
            Stock Out
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`${compact ? 'py-2 space-y-1' : 'py-3 space-y-2 sm:space-y-3'} flex-1 flex flex-col`}>
        {/* Brand Name */}
        {product?.brand_name && (
          <h5
            className={`
            text-start font-medium text-gray-800 uppercase tracking-wide 
            truncate
            ${compact ? 'text-[10px]' : 'text-xs'}
          `}
          >
            {product.brand_name}
          </h5>
        )}

        {/* Product Name */}
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          className="flex-1 w-full"
        >
          <h3
            className={`
            font-medium text-gray-900 hover:text-gray-600
            transition-colors duration-200 
            text-start truncate line-clamp-1
            ${compact ? 'text-xs sm:line-clamp-1' : 'text-sm sm:text-base sm:line-clamp-2 md:text-sm lg:text-base'}
          `}
          >
            {product?.name || "N/A"}
          </h3>
        </Link>

        {/* Price and Cart Section */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col justify-between gap-1">
            {discountedPrice ? (
              <div className="flex items-start gap-2 flex-wrap">
                <span
                  className={`
                  font-bold text-gray-900
                  ${compact ? 'text-sm' : 'text-base sm:text-lg md:text-base lg:text-lg'}
                `}
                >
                  {countrySign}
                  {discountedPrice}
                </span>
                <p
                  className={`
                  text-gray-500 
                  font-medium line-through text-start
                  ${compact ? 'text-[10px]' : 'text-xs sm:text-sm md:text-xs lg:text-sm'}
                `}
                >
                  {countrySign}
                  {getPriceByCountry()}
                </p>
              </div>
            ) : (
              <span
                className={`
                font-bold text-gray-900
                ${compact ? 'text-sm' : 'text-base sm:text-lg md:text-base lg:text-lg'}
              `}
              >
                {countrySign}
                {getPriceByCountry()}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            className={`
            flex rounded-full hover:bg-gray-100 
              text-gray-600 hover:text-gray-900 transition-all duration-200
             ${compact ? 'p-1' : 'p-1.5 sm:p-2'}
          `}
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product)
            }}
            title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist(product.id) ? (
              <FaHeart className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-5 sm:h-5'} text-teal-600`} />
            ) : (
              <FaRegHeart className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-5 sm:h-5'} text-gray-600 hover:text-red-500 transition-colors`} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
