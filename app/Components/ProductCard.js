"use client"
import Image from "next/image";
import Link from "next/link";
import useStore from "../CustomHooks/useStore";
import noImg from '/public/no-image.jpg';

const ProductCard = ({ product }) => {
  const { handleCart, handleBuy } = useStore();

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
    <div className="bg-white border border-gray-300 shadow-sm rounded-lg flex flex-col poppins transition ease-in-out relative hover:scale-105 h-full">
      <Link onClick={updateRecentViews} href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}>
        <div className=" h-36 w-40 mx-auto">
          <Image
            src={validImage || noImg}
            alt={product?.name}
            width={800}
            height={200}
            unoptimized
            className="object-cover"
            quality={100}
          />
        </div>
        {product?.discount && (
          <p className="absolute top-3 -left-2 bg-[#c03b2c] text-white text-[10px] font-bold py-1 px-2 rounded-md">
            SAVE {product?.discount || null}%
          </p>
        )}
        <div className="px-4 flex flex-col flex-grow justify-center items-center">
          <h3 className="text-sm font-semibold text-black line-clamp-1 text-ellipsis mt-6">
            {product?.name || "N/A"}
          </h3>
          <div>
            {product?.discount ? (
              <div className="flex items-center gap-2">
                <span className="md:text-lg text-sm font-bold text-[#c03b2c]">
                  <span className="font-bangla text-sm md:text-sm">৳</span> {discountedPrice || 0}
                </span>
                <span className="text-sm font-bold text-[#504f4d] line-through">
                  <span className="font-bangla md:text-sm text-sm">৳</span>{product?.retails_price || 0}
                </span>
              </div>
            ) : (
              <span className="md:text-lg text-sm font-bold text-[#c03b2c]">
                <span className="font-bangla text-sm lg:text-sm">৳</span> {product?.retails_price || 0}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="mt-auto flex flex-col md:flex-col lg:flex-row gap-2 p-3 pt-2 border-gray-200 cardBtn pb-4">
        <button
          onClick={() => handleBuy(product, 1)}
          className="bg-[#c03b2c32] border text-xs text-[#c03b2c] hover:bg-[#c03b2c] hover:text-white w-full px-2 py-1.5 rounded-md font-semibold transition-colors text-nowrap"
        >
          Buy Now
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleCart(product, 1);
          }}
          className="hover:bg-[#383838] bg-[#b4b4b474] border border-transparent text-xs hover:text-white text-black w-full px-2 py-1.5 rounded-md font-semibold transition-colors text-nowrap"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
