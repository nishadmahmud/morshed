"use client"

import Image from "next/image"
const noImg = "/no-image.jpg"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { ShoppingBag, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import useWishlist from "../hooks/useWishlist"
import useStore from "../hooks/useStore"
import toast from "react-hot-toast"

const ProductCard = ({ product, compact = false }) => {
  const { prices, country, setProductPrice, handleCart, cartItems, setSelectedSizeCart, setSelectedId } = useStore()
  const { toggleWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

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

  const discountPercent = product?.discount_type === "Percentage" ? product?.discount : null;

  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  // Check if product has variants
  const hasVariants = product?.have_variant === "1" || (product?.product_variants && product.product_variants.length > 0);
  const variants = product?.product_variants || [];

  // Get available sizes (with stock > 0)
  const availableSizes = variants.filter(v => v.quantity > 0);

  // Check if item is already in cart
  const isInCart = cartItems?.some(item => item.id === product.id);

  const handleSizeSelect = (variant) => {
    setSelectedSize(variant.name);
    setSelectedSizeCart(variant.name);
    setSelectedId(variant.id);
  };

  const onAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasVariants) {
      if (!selectedSize) {
        // Navigate to product page if no size selected
        router.push(`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`);
        return;
      }
      // Find selected variant
      const variant = variants.find(v => v.name === selectedSize);
      if (variant) {
        setIsAdding(true);
        handleCart(product, 1, variant.id, selectedSize);
        setTimeout(() => {
          setIsAdding(false);
          setSelectedSize(null);
        }, 1500);
      }
    } else {
      setIsAdding(true);
      handleCart(product, 1, null, null);
      setTimeout(() => setIsAdding(false), 1500);
    }
  }

  // Disabled sold out check - show all products as normal
  const isOutOfStock = false; // product?.status?.toLowerCase() === "stock out";

  return (
    <div
      className={`
        group bg-white rounded-xl overflow-hidden
        transition-all duration-300 mx-auto w-full
        flex flex-col h-full
        hover:shadow-xl hover:-translate-y-1
        border border-gray-100
        ${compact ? 'max-w-[180px]' : 'max-w-sm'}
      `}
    >
      {/* Image Container */}
      <div
        className={`
          relative w-full overflow-hidden bg-gray-50
          ${compact ? 'aspect-square' : 'aspect-[4/5]'}
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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover Image */}
          {product?.image_path1 && (
            <Image
              src={product.image_path1}
              alt={`${product?.name} alternate view`}
              fill
              className="
                object-cover absolute inset-0 opacity-0 
                group-hover:opacity-100 transition-opacity duration-500
              "
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Top Left Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
          {discountPercent && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              -{discountPercent}%
            </span>
          )}
          {product?.is_new && (
            <span className="bg-black text-white text-[10px] font-medium px-2 py-0.5 rounded">
              NEW
            </span>
          )}
        </div>

        {/* Out of Stock Overlay - Disabled */}
        {/* {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="bg-white text-black text-xs font-semibold px-3 py-1.5 rounded">
              SOLD OUT
            </span>
          </div>
        )} */}

        {/* Wishlist Button - Top Right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`
            absolute top-2 right-2 z-10
            w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
            flex items-center justify-center
            shadow-sm hover:shadow-md
            transition-all duration-200
            ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}
          `}
          title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist(product.id) ? (
            <FaHeart className="w-4 h-4" />
          ) : (
            <FaRegHeart className="w-4 h-4" />
          )}
        </button>

        {/* Size Selector - Appears on hover for variant products */}
        {hasVariants && availableSizes.length > 0 && !isOutOfStock && (
          <div className={`
            absolute bottom-0 left-0 right-0 
            bg-white/95 backdrop-blur-sm
            p-2 transform translate-y-full
            group-hover:translate-y-0
            transition-transform duration-300
            border-t border-gray-100
          `}>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {availableSizes.slice(0, 5).map((variant) => (
                <button
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSizeSelect(variant);
                  }}
                  className={`
                    min-w-[32px] h-7 px-2
                    text-xs font-medium
                    rounded border
                    transition-all duration-200
                    ${selectedSize === variant.name
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-black'}
                  `}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`${compact ? 'p-2' : 'p-3'} flex-1 flex flex-col`}>
        {/* Brand Name */}
        {product?.brand_name && (
          <p className={`
            text-gray-400 uppercase tracking-wider mb-0.5
            ${compact ? 'text-[9px]' : 'text-[10px]'}
          `}>
            {product.brand_name}
          </p>
        )}

        {/* Product Name */}
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          className="flex-1"
        >
          <h3
            className={`
              font-medium text-gray-900 hover:text-black
              transition-colors duration-200 
              line-clamp-2 leading-snug
              ${compact ? 'text-xs' : 'text-sm'}
            `}
          >
            {product?.name || "N/A"}
          </h3>
        </Link>

        {/* Price Row */}
        <div className="flex items-center justify-between mt-2 gap-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className={`font-bold text-gray-900 ${compact ? 'text-sm' : 'text-base'}`}>
              {countrySign}{discountedPrice || getPriceByCountry()}
            </span>
            {discountedPrice && (
              <span className={`text-gray-400 line-through ${compact ? 'text-[10px]' : 'text-xs'}`}>
                {countrySign}{getPriceByCountry()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {!isOutOfStock && (
            <button
              onClick={onAddToCart}
              disabled={isAdding}
              className={`
                flex items-center justify-center
                rounded-full
                transition-all duration-300
                ${isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-black text-white hover:bg-gray-800'}
                ${compact ? 'w-7 h-7' : 'w-9 h-9'}
              `}
              title={hasVariants && !selectedSize ? "Select size" : "Add to Cart"}
            >
              {isAdding ? (
                <Check className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
              ) : (
                <ShoppingBag className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
              )}
            </button>
          )}
        </div>

        {/* Selected Size Indicator */}
        {selectedSize && (
          <p className="text-[10px] text-gray-500 mt-1">
            Size: <span className="font-medium text-black">{selectedSize}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductCard
