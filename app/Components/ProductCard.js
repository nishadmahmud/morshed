"use client";
import Image from "next/image";
import Link from "next/link";
import useStore from "../CustomHooks/useStore";
import noImg from "/public/no-image.jpg";
import { ShoppingCart } from "lucide-react";
import useWishlist from "../CustomHooks/useWishlist";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import "../globals.css";

const ProductCard = ({ product }) => {
  const { handleCart, selectedCountry, convertedPrice } = useStore();
  const { toggleWishlist, isInWishlist } = useWishlist();

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

  const discountedPrice = product?.discount
    ? (product.retails_price - (product.retails_price * product.discount) / 100).toFixed(0)
    : null;

  const sanitizeSlug = (str) => {
  return str
    ?.toLowerCase()
    .split(" ")
    .slice(0, 2)
    .join(" ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

  return (
    <div className="group bg-white rounded-sm transition-all duration-300 md:w-56 w-44 h-[23rem] md:h-[25.5rem] relative overflow-hidden flex flex-col">
      
      {/* Image */}
   <Link
  href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
  onClick={updateRecentViews}
  className="block w-full md:h-72 h-56 relative overflow-hidden"
>
  {/* Base image */}
  <Image
    src={product?.image_path || noImg}
    alt={product?.name}
    fill
    unoptimized
    className="object-cover transition-opacity duration-300"
  />

  {/* Hover image (fades in on hover) */}
  {product?.image_path1 && (
    <Image
      src={product.image_path1}
      alt={`${product?.name} hover`}
      fill
      unoptimized
      className="object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
    />
  )}
</Link>




      {/* Discount Tag */}
      {product?.discount && (
        <span className="absolute top-3 left-2 bg-gray-200 text-red-500 text-xs font-semibold py-1 px-2 rounded z-10">
          -{product.discount}%
        </span>
      )}

      {/* Wishlist Icon */}
      <div
        className="absolute top-5 right-3 p-1.5 bg-white rounded-full opacity-100 transition-opacity duration-300 cursor-pointer z-10"
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

      {/* Content */}
      <div className="relative flex-grow pb-16">
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          onClick={updateRecentViews}
          className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-[#115e59]"
        >
          {product?.name || "N/A"}
        </Link>
      </div>

      {/* Fixed bottom bar */}
      <div className="absolute bottom-0 left-0 w-full py-2 bg-white">
        <div className="flex items-center justify-between">
          {product?.discount ? (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#115e59]">
                <span className="font-bangla">৳</span> {discountedPrice}
              </span>
              <span className="text-sm text-gray-500 line-through">
                <span className="font-bangla">৳</span> {product.retails_price}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-[#115e59]">
              <span className="font-bangla">{selectedCountry.symbol}</span> {convertedPrice}
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              handleCart(product, 1);
            }}
            className="p-2 rounded-full hover:bg-gray-100 text-black transition"
            title="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

 
      
    </div>
  );
};

export default ProductCard;
