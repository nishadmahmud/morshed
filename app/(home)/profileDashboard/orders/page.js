"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import noImg from "/public/no-image.jpg";

const MyOrders = () => {
  const tabs = [
    { type: "1", label: "Order Processing" },
    { type: "2", label: "Order Completed" },
    { type: "3", label: "Delivery Processing" },
    { type: "4", label: "Delivery Completed" },
    { type: "5", label: "Delivery Canceled" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].type);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));

  const customer_id = userData?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/customer-order-list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: activeTab,
              customer_id: customer_id,
              limit: "10",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        console.log(activeTab);
        const data = await response.json();
        console.log(data?.data?.data);
        // Filter orders based on tran_status matching activeTab
        const filteredOrders = data?.data?.data?.filter((order) => {
          console.log(
            "Order Status:",
            order.tran_status,
            "Active Tab:",
            activeTab
          );
          return String(order.tran_status).trim() === String(activeTab).trim();
        });

        console.log("Filtered Orders:", filteredOrders);

        setOrderData(filteredOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab, customer_id]);

  return (
    <div className="px-4 md:px-0 w-full flex flex-col overflow-hidden">
      <h2 className="text-xl font-bold my-6 text-[#c03b2c] text-center md:text-left">
        My Orders
      </h2>
      <div className="bg-white text-black md:p-2 p-1 shadow-md rounded-lg">
        <div className="w-full mx-auto md:p-1 p-0 md:pt-0 pt-4">
          {/* Tabs Navigation */}
          <div className="flex justify-center  space-x-4 overflow-x-scroll"> {/* md:border-b md:border-gray-300 */}
            {tabs.map((tab) => (
              <button
                key={tab.type}
                onClick={() => setActiveTab(tab.type)}
                className={`relative md:px-3 md:py-2 md:text-xs text-[8px] font-medium transition-colors duration-300 whitespace-nowrap
                                    ${
                                      activeTab === tab.type
                                        ? "text-[#c03b2c]"
                                        : "text-gray-500"
                                    }`}
              >
                <div className="flex flex-col items-center leading-tight"> {/* md:flex-row md:space-x-1 */}
                  <span>{tab.label.split(" ")[0]}</span>
                  <span>{tab.label.split(" ")[1]}</span>
                </div>
                {activeTab === tab.type && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-[1px] sm:h-1 bg-[#c03b2c]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center text-gray-500"
                >
                  Loading...
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center text-red-500"
                >
                  {error}
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {orderData && orderData.length > 0 ? (
                    <ul className="space-y-4">
                      {orderData.map((order, index) => (
                        <li
                          key={index}
                          className="p-4 border rounded-lg shadow-sm"
                        >
                          {order?.sales_details &&
                          order.sales_details.length > 0 ? (
                            <ul className="mt-2 space-y-2">
                              {order.sales_details.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center justify-center justify-items-center md:justify-between space-x-4 border-b pb-2 md:flex-row flex-col"
                                >
                                  <div className="flex items-center md:flex-row flex-col justify-center gap-1">
                                    <Image
                                      unoptimized
                                      width={100}
                                      height={100}
                                      src={
                                        item?.product_info?.image_path || noImg
                                      }
                                      alt={item.name}
                                      className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <span className="text-gray-800 md:w-56 w-40 text-ellipsis line-clamp-1 text-center">
                                      {item?.product_info?.name}
                                    </span>
                                  </div>

                                  <div className="flex font-semibold text-gray-800">
                                    <span className="block md:hidden">
                                      Price:
                                    </span>
                                    <span className="ml-1">{item?.product_info?.retails_price}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500">
                              No sales details available.
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center md:text-left">
                      No orders found.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
