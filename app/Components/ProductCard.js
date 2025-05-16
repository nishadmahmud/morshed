"use client";
import Image from "next/image";
import Link from "next/link";
import useStore from "../CustomHooks/useStore";
import noImg from '/public/no-image.jpg';
import { Heart, ShoppingCart } from "lucide-react";
import useWishlist from "../CustomHooks/useWishlist";

const ProductCard = ({ product }) => {
  const { handleCart } = useStore();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const updateRecentViews = () => {
    if (!product?.id) return;
    let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    recentViews = recentViews.filter(p => p.id !== product.id);
    recentViews.unshift({
      id: product.id,
      name: product.name,
      image: product.image_path || (product.images?.[0] || noImg.src),
      price: product.retails_price,
      discount: product.discount || 0
    });
    if (recentViews.length > 6) recentViews.pop();
    localStorage.setItem("recentlyViewed", JSON.stringify(recentViews));
  };

  const discountedPrice = product?.discount
    ? (product.retails_price - (product.retails_price * product.discount) / 100).toFixed(0)
    : null;

  const validImage =
    product?.image_path ||
    (Array.isArray(product?.images) && product.images[0]) ||
    noImg;

  const sanitizeSlug = (str) => {
    return str?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  return (
    <div className="bg-white rounded-lg flex flex-col poppins transition w-52 ease-in-out relative hover:scale-105 h-72 mb-10">
      <div className="h-56">
        <Link
          onClick={updateRecentViews}
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          className="h-auto w-full mx-auto rounded-t-md"
        >
          <Image
            src={validImage || noImg}
            alt={product?.name}
            width={800}
            height={300}
            unoptimized
            className="object-cover w-full h-56 rounded-t-md"
            quality={100}
          />
        </Link>

        {product?.discount && (
          <p className="absolute top-3 -left-2 bg-[#115e59] text-white text-[10px] font-bold py-1 px-2 rounded-md">
            SAVE {product.discount}%
          </p>
        )}

        <div
          className="cursor-pointer absolute top-2 right-1 text-white text-[10px] font-bold py-1 px-2 rounded-md"
          onClick={() => toggleWishlist(product)}
          title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={22} fill={isInWishlist(product.id) ? "teal" : "none"} color="white" />
        </div>
      </div>

      {/* Content pushed to bottom */}
      <div className="flex flex-col flex-grow px-1 pb-1">
        <Link
  onClick={updateRecentViews}
  href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
  className="text-sm font-semibold text-black line-clamp-2 text-ellipsis text-start my-2"
>
  {product?.name || "N/A"}
</Link>

<div className="mt-auto flex justify-between items-center w-full">
  {product?.discount ? (
    <div className="flex items-center gap-2">
      <span className="md:text-lg text-sm font-bold text-[#115e59]">
        <span className="font-bangla text-sm md:text-sm">৳</span> {discountedPrice || 0}
      </span>
      <span className="text-sm font-bold text-[#504f4d] line-through">
        <span className="font-bangla md:text-sm text-sm">৳</span>{product?.retails_price || 0}
      </span>
    </div>
  ) : (
    <span className="md:text-lg text-sm font-bold text-[#115e59]">
      <span className="font-bangla text-sm lg:text-sm">৳</span> {product?.retails_price || 0}
    </span>
  )}

  <div
    className="cursor-pointer p-1 rounded hover:bg-gray-100"
    onClick={(e) => {
      e.preventDefault();
      handleCart(product, 1);
    }}
    title="Add to cart"
  >
    <ShoppingCart size={18} color="black" />
  </div>
</div>

      </div>
    </div>
  );
};

export default ProductCard;
