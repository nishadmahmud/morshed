"use client";
import Image from "next/image";
import Link from "next/link";

import { Heart } from "lucide-react";
import useWishlist from "@/app/CustomHooks/useWishlist";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="p-5 pt-20 text-black w-11/12 mx-auto">
      <h2 className="text-2xl flex items-center gap-1 font-bold mb-4"><Heart></Heart> My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white border p-3 rounded-lg shadow-sm relative">
              <Link href={`/products/${item.brand_name?.toLowerCase().replace(/\s+/g, "-")}/${item.id}`}>
                <Image
                  src={item.image || "/no-image.jpg"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="object-cover w-full h-40 rounded"
                  unoptimized
                />
              </Link>
              <div className="mt-2">
                <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                <p className="text-[#115e59] font-bold text-sm">
                  <span className="font-bangla">৳</span>{item.discount
                    ? (item.price - (item.price * item.discount) / 100).toFixed(0)
                    : item.price}
                </p>
              </div>
              <button
                onClick={() => toggleWishlist(item)}
                className="absolute top-2 right-2"
                aria-label="Remove from wishlist"
              >
                <Heart size={18} fill="teal" color="teal" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
