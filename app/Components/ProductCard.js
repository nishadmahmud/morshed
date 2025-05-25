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
  const { handleCart } = useStore();
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

  const frontImage =
    product?.image_path || (Array.isArray(product?.images) && product.images[0]) || noImg;

  const sanitizeSlug = (str) => {
    return str?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  return (
    <div className="group bg-white rounded-sm transition-all duration-300 w-56 h-96 md:h-[25.5rem] relative overflow-hidden flex flex-col">
      {/* Image */}
      <Link
        href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
        onClick={updateRecentViews}
        className="block w-full h-72 relative overflow-hidden"
      >
        <Image
          src={frontImage}
          alt={product?.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </Link>

      {/* Discount Tag */}
      {product?.discount && (
        <span className="absolute top-3 left-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded z-10">
          SAVE {product.discount}%
        </span>
      )}

      {/* Wishlist Icon */}
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

      {/* Content */}
      <div className="relative flex-grow  pb-16"> {/* add pb-16 for spacing */}
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          onClick={updateRecentViews}
          className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-[#115e59]"
        >
          {product?.name || "N/A"}
        </Link>
      </div>

      {/* Fixed bottom bar */}
      <div className="absolute bottom-0 left-0 w-full  py-2 bg-white">
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
              <span className="font-bangla">৳</span> {product.retails_price}
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

      {/* Heart animation */}
      <style jsx>{`
        @keyframes heart-bounce {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-heart-bounce {
          animation: heart-bounce 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
