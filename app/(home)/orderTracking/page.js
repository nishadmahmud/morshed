"use client"

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import orderRecived from "/public/orderRecived.png";
import orderConfirmed from "/public/orderConfirmd.png";
import deliveryProccesing from "/public/deliveryProcc.png";
import orderDelivered from "/public/completed.png";
import Image from "next/image";
import toast from "react-hot-toast";
import { userId } from "../page";

const STEPS = [
  { title: "Order Received", image: orderRecived },
  { title: "Order Confirmed", image: orderConfirmed },
  { title: "Delivery Processing", image: deliveryProccesing },
  { title: "Order Delivered", image: orderDelivered },
];

export default function Page() {
  const [orderId, setOrderId] = useState("");
  const [transStatus, setTransStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/search-web-invoice`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ invoice_id: orderId, user_id: userId }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch order status");

      const orderData = data?.data?.data[0];
      const status = orderData?.tran_status;

      if (!orderData || orderData.invoice_id !== orderId) {
        toast.error("Invoice ID does not match");
        setLoading(false);
        return;
      }

      setTransStatus(status);
    } catch (err) {
      setError(err.message || "Failed to fetch order details");
      setTransStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-20  lg:pt-0 md:pt-2">
      <div className="w-full text-black pt-5">
        <h1 className="text-2xl font-bold mb-2 text-center">Check Your Order Status</h1>
        <p className="text-gray-400 mb-8 text-center">
          Check to see the latest status of your order (e.g., received status, shipping status, etc.)
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-4">
            
            <div className="lg:flex lg:items-center justify-start lg:justify-center">
           <label className="block text-lg font-medium mr-3 text-center">Order ID</label>
           <div className="flex justify-center lg:flex-row mt-1 lg:mt-0 gap-1">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter order ID"
                className="flex justify-start lg:px-4 px-2 w-44 lg:w-full py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F16724]"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-0.5 px-2 bg-[#F16724] text-white rounded-md hover:bg-[#F16724] transition-colors disabled:opacity-50"
              >
                <SearchIcon size={20} />
              </button>
           </div>
            </div>
          </div>
        </form>

        {loading && <p className="mt-4 text-gray-500 text-center">Loading...</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>

      {transStatus !== null && (
        <div className="relative flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mx-auto mt-10">
          <div className="absolute top-1/2 md:top-1/4 left-0 w-full h-[2px] bg-gray-200 md:block hidden" />
          <div
            className="absolute top-1/2 md:top-1/4 left-0 h-[2px] bg-blue-500 transition-all duration-500 hidden md:block"
            style={{ width: transStatus ? `${((transStatus - 1) / (STEPS.length - 1)) * 100}%` : "0%" }}
          />

          {STEPS.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center z-10 text-center">
              <div className="w-36 h-36 mb-4 rounded-full bg-[#FDF7F3] flex items-center justify-center p-4">
                <Image width={100} height={100} src={step.image} alt={step.title} className="w-full h-full object-contain" />
              </div>

              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  index < transStatus ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"
                }`}
              >
                {index < transStatus && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              <span className="mt-2 text-sm font-medium text-gray-600">{step.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
