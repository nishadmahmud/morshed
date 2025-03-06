"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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

    const customer_id = userData?.customer_id;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const response = await fetch(`https://www.outletexpense.xyz/api/customer-order-list`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        type: activeTab,
                        customer_id: customer_id,
                        limit: "10",
                    }),
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
    console.log(activeTab);
                const data = await response.json();
                console.log(data?.data?.data);
                // Filter orders based on tran_status matching activeTab
                const filteredOrders = data?.data?.data?.filter(order => {
                    console.log("Order Status:", order.tran_status, "Active Tab:", activeTab);
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
        <div className="px-4 md:px-10">
            <h2 className="text-xl font-bold my-6 text-[#F16724] text-center md:text-left">My Orders</h2>
            <div className="bg-white text-black p-6 shadow-md rounded-lg">
                <div className="w-full mx-auto p-4 pt-0">
                    {/* Tabs Navigation */}
                    <div className="flex justify-center md:justify-start space-x-2 border-b border-gray-300 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.type}
                                onClick={() => setActiveTab(tab.type)}
                                className={`relative px-3 py-2 text-md font-medium transition-colors duration-300 whitespace-nowrap
                                    ${activeTab === tab.type ? "text-[#F16724]" : "text-gray-500"}`}
                            >
                                {tab.label}
                                {activeTab === tab.type && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 right-0 bottom-0 h-1 bg-[#F16724]"
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
                <li key={index} className="p-4 border rounded-lg shadow-sm">
                    
                    {order?.sales_details && order.sales_details.length > 0 ? (
                        <ul className="mt-2 space-y-2">
                            {order.sales_details.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-center justify-items-center md:justify-between space-x-4 border-b pb-2 md:flex-row flex-col">
                                    <div className="flex items-center md:flex-row flex-col gap-1">
                                    <Image
                                    unoptimized
                                    width={100}
                                    height={100}
                                        src={item?.product_info?.image_path}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <span className="text-gray-800 md:w-56 w-40 text-ellipsis line-clamp-1">{item?.product_info?.name}</span>
                                    </div>

                                    <div className="font-semibold text-gray-800">
                                        <span className="block lg:hidden">Price: </span>
                                        {item?.product_info?.purchase_price }</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No sales details available.</p>
                    )}
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-gray-500 text-center md:text-left">No orders found.</p>
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
