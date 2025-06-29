// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect } from "react";
// import useStore from "../CustomHooks/useStore";
// import noImg from "/public/no-image.jpg";
// import { ShoppingCart } from "lucide-react";
// import useWishlist from "../CustomHooks/useWishlist";
// import { FaHeart, FaRegHeart } from "react-icons/fa6";
// import "../globals.css";

// const ProductCard = ({ product }) => {
//   const { handleCart, prices, country, setProductPrice } = useStore();
//   const { toggleWishlist, isInWishlist } = useWishlist();

//   useEffect(() => {
//     if (product?.id && product?.retails_price) {
//       setProductPrice(
//         product.id,
//         product?.retails_price,
//         product?.wholesale_price || null
//       );
//     }
//   }, []);

//   const productPrice = prices[product.id];

//   const getPriceByCountry = () => {
//     if (country && country.value === "BD") {
//       return productPrice?.basePrice || product?.retails_price || 0;
//     } else {
//       return productPrice?.wholesalePrice || product?.wholesale_price || 1000;
//     }
//   };

//   // Calculate discounted price
//   const discountedPrice = product?.discount
//     ? product?.discount_type === "Percentage"
//       ? (
//           product.retails_price -
//           (product.retails_price * product.discount) / 100
//         ).toFixed(0)
//       : (product.retails_price - product.discount).toFixed(0)
//     : null;

//     console.log(product);

//   const discountSuffix =
//     product?.discount_type === "Percentage"
//       ? "%"
//       : product?.discount_type === "Fixed"
//       ? "Tk"
//       : "";

//   const updateRecentViews = () => {
//     if (!product?.id) return;
//     let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
//     recentViews = recentViews.filter((p) => p.id !== product.id);
//     recentViews.unshift({
//       id: product.id,
//       name: product.name,
//       image: product.image_path || product.images?.[0] || noImg.src,
//       price: product.retails_price,
//       discount: product.discount || 0,
//     });
//     if (recentViews.length > 6) recentViews.pop();
//     localStorage.setItem("recentlyViewed", JSON.stringify(recentViews));
//   };

//   const sanitizeSlug = (str) => {
//     return str
//       ?.toLowerCase()
//       .split(" ")
//       .slice(0, 2)
//       .join(" ")
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "");
//   };

//   return (
//     <div className="group bg-white rounded-sm transition-all duration-300 w-full sm:w-48 md:w-72 h-[23rem] md:h-[30rem] relative overflow-hidden flex flex-col shadow-sm">
//       {/* Image */}
//       <Link
//         href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
//         onClick={updateRecentViews}
//         className="block w-full md:h-96 h-64 relative overflow-hidden"
//       >
//         <Image
//           src={product?.image_path || noImg}
//           alt={product?.name}
//           fill
//           className="object-cover transition-opacity duration-300"
//           loading="lazy"
//         />

//         {product?.image_path1 && (
//           <Image
//             src={product.image_path1}
//             alt={`${product?.name} hover`}
//             fill
//             loading="lazy"
//             className="object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
//           />
//         )}
//       </Link>

//       {/* Discount Tag */}
//       {product?.discount ? (
//         <span className="absolute top-3 left-4 bg-gray-800 text-gray-100 text-xs font-semibold py-1 px-2 rounded z-50">
//           Save {product.discount? product.discount : ""}
//           {discountSuffix}
//         </span>
//       ) : ""}

//       {/* Wishlist Icon */}
//       <div
//         className="absolute top-5 right-3 p-1.5 bg-white rounded-full transition-opacity duration-300 cursor-pointer z-10"
//         onClick={(e) => {
//           e.stopPropagation();
//           toggleWishlist(product);
//         }}
//         title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
//       >
//         {isInWishlist(product.id) ? (
//           <FaHeart
//             color="teal"
//             size={18}
//             className="transition-all duration-300 animate-heart-bounce"
//           />
//         ) : (
//           <FaRegHeart color="black" size={18} className="transition-all duration-300" />
//         )}
//       </div>

//       {/* Product Name */}
//       <div className="relative flex-grow  flex">

//         <Link
//           href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
//           onClick={updateRecentViews}
//           className="text-sm truncate line-clamp-1 text-ellipsis overflow-hidden mt-2 md:text-base font-semibold text-black  hover:text-[#115e59] text-start"
//         >
//           {product?.name || "N/A"}
//         </Link>
//       </div>

//       {/* Bottom Bar - Price and Cart */}
//       <div className="absolute bottom-0 left-0 w-full pb-3 bg-white">
//         <div className="flex items-center justify-between">
//           {discountedPrice ? (
//             <div className="flex items-center gap-1">
//               <span className="text-lg font-bold text-[#115e59]">
//                 <span className="font-bangla">৳</span> {discountedPrice}
//               </span>
//               <span className="text-sm text-gray-500 line-through">
//                 <span className="font-bangla">৳</span> {getPriceByCountry()}
//               </span>
//             </div>
//           ) : (
//             <span className="text-lg font-bold text-[#115e59]">
//               <span className="font-bangla">৳</span> {getPriceByCountry()}
//             </span>
//           )}

//           <Link
//             onClick={(e) => {
//               e.preventDefault();
//               handleCart(product, 1);
//             }}
//             href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
//             className="p-2 rounded-full hover:bg-gray-100 text-black transition"
//             title="Add to cart"
//           >
//             <ShoppingCart size={18} />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



"use client";

import Image from "next/image";
import noImg from '/public/no-image.jpg'
import Link from "next/link";
import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import useWishlist from "../CustomHooks/useWishlist";
import useStore from "../CustomHooks/useStore";

// Mock hooks for demonstration - replace with your actual hooks


const ProductCard = ({ product }) => {
  const { handleCart,handleBuy, prices, country, setProductPrice } = useStore();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"))

  const countrySign = selectedCountry?.value === "BD" ? "৳" :  "$";

 
   useEffect(() => {
     if (product?.id && product?.retails_price) {
       setProductPrice(
         product.id,
         product?.retails_price,
         product?.wholesale_price || null
       );
     }
   }, []);

   const productPrice = prices[product.id];

   const getPriceByCountry = () => {
     if (country && country.value === "BD") {
       return productPrice?.basePrice || product?.retails_price || 0;
     } else {
       return productPrice?.wholesalePrice || product?.wholesale_price || 1000;
     }
   };

 
   const discountedPrice = product?.discount
     ? product?.discount_type === "Percentage"
       ? (
           product.retails_price -
           (product.retails_price * product.discount) / 100
         ).toFixed(0)
       : (product.retails_price - product.discount).toFixed(0)
     : null;

     console.log(product);

   const discountSuffix =
     product?.discount_type === "Percentage"
       ? "%"
       : product?.discount_type === "Fixed"
       ? "Tk"
       : "";

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
    <div className="group bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 w-full max-w-sm mx-auto">
      {/* Image Container */}
      <div className="relative aspect-[4/4] overflow-hidden bg-gray-50">
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          onClick={updateRecentViews}
          className="block w-full h-full"
        >
          <Image
            src={product?.image_path || noImg}
            alt={product?.name || "Product image"}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover Image */}
          {product?.image_path1 && (
            <Image
              src={product.image_path1 || "/placeholder.svg"}
              alt={`${product?.name} alternate view`}
              fill
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </Link>

        {/* Discount Badge */}
        {product?.discount && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500 text-white text-xs font-bold py-1.5 px-2.5 rounded-full shadow-lg">
              -{product.discount}
              {discountSuffix}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-200 z-10"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist(product.id) ? (
            <FaHeart className="w-4 h-4 text-teal-600" />
          ) : (
            <FaRegHeart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          )}
        </button>

        {/* Quick Add to Cart - Shows on Hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => handleBuy(product, 1)}
            className="w-full bg-teal-600 text-white py-2 px-2 rounded-md font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="py-4 space-y-3">
        {/* Brand Name */}
        {product?.brand_name && (
          <p className="text-xs text-start font-medium text-gray-800 uppercase tracking-wide">{product.brand_name}</p>
        )}

        {/* Product Name */}
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          onClick={updateRecentViews}
          className="block"
        >
          <h3 className="font-medium text-gray-900 line-clamp-1 hover:text-gray-600 transition-colors duration-200 text-start leading-tight">
            {product?.name || "N/A"}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold text-gray-900">{countrySign}{discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through">{countrySign}{getPriceByCountry()}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">{countrySign}{getPriceByCountry()}</span>
            )}
          </div>

          {/* Desktop Cart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleCart(product, 1);
            }}
            className="flex p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200"
            title="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default ProductCard;

