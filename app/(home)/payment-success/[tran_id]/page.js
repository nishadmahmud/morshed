"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Copy, ShoppingBag } from "lucide-react"
import { useParams } from "next/navigation"


export default function Page() {

  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const {tran_id} = useParams();


  const copyToClipboard = () => {
    navigator.clipboard.writeText(tran_id)
    setCopied(true)
    setShowToast(true)
    setTimeout(() => {
      setCopied(false)
      setShowToast(false)
    }, 2000)
  }

  return (
    <div className="container max-w-md mx-auto pb-12 pt-20 px-4 lg:pt-40">
      {/* Toast notification */}
      {showToast && (
      <div className="fixed inset-0 flex items-start justify-center z-50 pointer-events-none mt-10">
          <div className="bg-black text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-down">
            ✔️ Copied to clipboard!
          </div>
        </div>
        )} 
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="text-center p-6 pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Order Successful!</h2>
          <p className="text-gray-500 mt-1">Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <div className="px-6 space-y-4">
          <div className="rounded-lg bg-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Transaction ID</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium text-black">{tran_id}</span>
                <button
                  className="h-6 w-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span className="sr-only">Copy transaction ID</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Order Details</h3>
            <div className="h-px bg-gray-200 w-full"></div>
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm text-gray-900">{new Date().toLocaleDateString()}</span>
            </div>
            {/* <div className="flex justify-between py-1">
              <span className="text-sm text-gray-500">Payment Method</span>
              <span className="text-sm text-gray-900">Credit Card</span>
            </div> */}
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-500">Status</span>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                Paid
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-2">
          <Link href={'/order-tracking'} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition-colors">
            <ShoppingBag className="mr-2 h-4 w-4" />
            View Order Details
          </Link>
          <Link
            href="/"
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md font-medium flex items-center justify-center transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

