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
    <div className="bg-white border border-gray-300 shadow-sm rounded-lg flex flex-col poppins transition ease-in-out hover:scale-105 h-full">
      <Link onClick={updateRecentViews} href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}>
        <div className="relative h-36 w-40 mx-auto">
          <Image
            src={validImage}
            alt={product?.name}
            width={800}
            height={200}
            unoptimized
            className="object-cover"
            quality={100}
          />
        </div>
        {product?.discount && (
          <p className="absolute top-2 left-2 bg-[#c03b2c] text-white text-xs font-bold py-1 px-2 rounded-md">
            SAVE {product?.discount}%
          </p>
        )}
        <div className="px-4 flex-grow">
          <h3 className="text-sm font-semibold text-black line-clamp-1 text-ellipsis mt-4">
            {product?.name}
          </h3>
          <div className="mt-2">
            {product?.discount ? (
              <div className="flex items-center gap-2">
                <span className="md:text-xl text-sm font-bold text-[#c03b2c]">
                  <span className="font-bangla text-sm md:text-xl">৳</span> {discountedPrice}
                </span>
                <span className="text-sm font-bold text-[#504f4d] line-through">
                  <span className="font-bangla md:text-xl text-sm">৳</span>{product?.retails_price}
                </span>
              </div>
            ) : (
              <span className="md:text-xl text-sm font-bold text-[#c03b2c]">
                <span className="font-bangla text-sm lg:text-xl">৳</span> {product?.retails_price}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="mt-auto flex flex-col gap-2 p-3 border-t border-gray-200">
        <button
          onClick={() => handleBuy(product, 1)}
          className="border-[#c03b2c] border text-xs text-[#c03b2c] w-full px-2 py-1.5 rounded-md font-semibold transition-colors"
        >
          Buy Now
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleCart(product, 1);
          }}
          className="bg-[#c03b2c] border border-transparent text-xs text-white w-full px-2 py-1.5 rounded-md font-semibold transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
