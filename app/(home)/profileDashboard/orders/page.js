"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const MyOrders = () => {
    const tabs = [
        { id: "tab1", label: "Order Processing", content: "Welcome to order processing!" },
        { id: "tab2", label: "Order Completed", content: "This is the Order completed page." },
        { id: "tab3", label: "Delivery Processing", content: "Get in touch via the delivery processing" },
        { id: "tab4", label: "Delivery Completed", content: "Get in touch via the delivery completed" },
        { id: "tab5", label: "Delivery Canceled", content: "Get in touch via the delivery canceled" },
      ];
      const [activeTab, setActiveTab] = useState(tabs[0].id);
    return (
      <div>
        <h2 className="text-xl font-bold my-6 text-[#F16724]">My Orders</h2>
        <div className="bg-white text-black p-6 shadow-md rounded-lg">
        <div className="w-full  mx-auto p-4">
      <div className="flex space-x-2 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-3 py-2 text-md font-medium transition-colors duration-300 
              ${activeTab === tab.id ? "text-[#F16724]" : "text-gray-500"}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 bottom-0 h-1 bg-[#F16724]"
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
        <AnimatePresence mode="wait">
          {tabs.map((tab) =>
            activeTab === tab.id ? (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700">{tab.content}</p>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
        </div>
      </div>
    )
  }
  
  export default MyOrders
  
  