"use client";
import React, { useEffect, useState } from "react";
import useStore from "../../CustomHooks/useStore";
import Image from "next/image";
import noImg from "/public/no-image.jpg";
import Link from "next/link";

const CartPage = () => {
  const {
    getCartItems,
    refetch,
    setRefetch,
    handleCartItemDelete,
    handleDncQuantity,
    handleIncQuantity,
  } = useStore();
  const [cartItems, setCartItems] = useState([]);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);


  useEffect(() => {
    setCartItems(getCartItems());
    if (refetch) {
      setRefetch(false);
      setCartItems(getCartItems());
    }
  }, [refetch, getCartItems, cartTotal, setRefetch]);

  useEffect(() => {
    const total = cartItems
      .reduce(
        (prev, curr) =>
          prev +
          (curr?.discount
            ? curr.discounted_price  *
              curr.quantity
            : curr?.retails_price * curr.quantity),
        0
      )
      .toFixed(2);
    setCartTotal(total);
  }, [cartItems]);


  const handleClearCart = () => {
    setRefetch(true);
    localStorage.removeItem("cart");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-black font-bold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Your Cart
            <span className="ml-2 text-sm bg-gray-100 text-gray-800 py-1 px-2 rounded-full">
              {cartItems.length} items
            </span>
          </h1>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-blue-600 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border overflow-hidden shadow-sm"
                  >
                    <div className="p-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 rounded-md overflow-hidden border bg-white p-2">
                          {item?.images && item?.images.length > 0 ? (
                            <Image
                              src={item.images[0]}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          ) : item?.image_path ? (
                            <Image
                              src={item.image_path}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          ) : (
                            <Image
                              src={noImg}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <h3 className="font-medium text-base text-black line-clamp-2">
                                {item.name}
                              </h3>
                              <p className="text-blue-600 font-bold mt-1">
                                 {item.discounted_price ? item.discounted_price.toLocaleString() : item.retails_price.toLocaleString()} 
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border rounded-md">
                                <button
                                  className="h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                  onClick={() =>
                                    handleDncQuantity(item.id, item.quantity)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>
                                <span className="w-8 text-center text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  className="h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                  onClick={() =>
                                    handleIncQuantity(item.id, item.quantity)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <button
                                className="text-red-500 hover:text-red-700 text-sm flex items-center px-2 py-1 hover:bg-red-50 rounded"
                                onClick={() => handleCartItemDelete(item.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end">
                  <button
                    className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-50 text-sm font-medium"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">
                  Looks like you haven&apos;t added anything to your cart yet.
                </p>
                <Link
                  href="/"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-800">৳ {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="border-t my-3 pt-3"></div>
                  <div className="flex justify-between font-bold">
                    <span className="text-black">Total</span>
                    <span className="text-blue-600">৳ {cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-gray-500">
                    * The final price with your coupon code will apply in
                    Checkout page
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    * All charges are billed in BDT. While the content of your
                    cart is currently displayed in BDT, the checkout will use
                    BDT at the most current exchange rate.
                  </p>
                </div>
              </div>
              <div className="p-6 border-t">
                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mr-2"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree with the terms and conditions.
                    </label>
                  </div>
                  <Link
                    href={'/checkout'}
                    className={`w-full py-3 px-4 rounded font-medium flex items-center justify-center ${
                      termsAgreed
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!termsAgreed}
                  >
                    Proceed to Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <div className="w-10 h-6 bg-gray-100 rounded border flex items-center justify-center">
                      <span className="text-[8px] text-gray-500">Visa</span>
                    </div>
                    <div className="w-10 h-6 bg-gray-100 rounded border flex items-center justify-center">
                      <span className="text-[8px] text-gray-500">Master</span>
                    </div>
                    <div className="w-10 h-6 bg-gray-100 rounded border flex items-center justify-center">
                      <span className="text-[8px] text-gray-500">Amex</span>
                    </div>
                    <div className="w-10 h-6 bg-gray-100 rounded border flex items-center justify-center">
                      <span className="text-[8px] text-gray-500">PayPal</span>
                    </div>
                    <div className="w-10 h-6 bg-gray-100 rounded border flex items-center justify-center">
                      <span className="text-[8px] text-gray-500">bKash</span>
                    </div>
                    <div className="w-10 h-6 bg-gray-100 rounded border flex items-center justify-center">
                      <span className="text-[8px] text-gray-500">Nagad</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
