"use client"

import { useEffect, useState } from "react"
import useStore from "../../CustomHooks/useStore"
import Image from "next/image"
import noImg from "/public/no-image.jpg"
import Link from "next/link"
import { NotebookPen, ShoppingCart, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import CartSkeleton from "@/app/Components/CartSkeleton"
import { ShoppingBag } from "lucide-react"

const CartPage = () => {
  const { getCartItems, refetch, setRefetch, handleCartItemDelete, prices, country, setProductPrice } = useStore();

  const [cartItems, setCartItems] = useState([])
  const [note, setNote] = useState("")
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalSubtotalWithoutDiscount, setTotalSubtotalWithoutDiscount] = useState(0)
  const [couponCode, setCouponCode] = useState("")
  const [voucherCode, setVoucherCode] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCartItems(getCartItems())
    if (refetch) {
      setRefetch(false)
      setCartItems(getCartItems())
    }
    setLoading(false)
  }, [refetch, getCartItems, cartTotal, setRefetch])

  // Fixed: Iterate through cartItems array to set prices for each product
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item) => {
        if (item?.id && item?.retails_price) {
          setProductPrice(item.id, item?.retails_price, item?.wholesale_price || null)
        }
      })
    }
  }, [ setProductPrice])

  // Fixed: Accept item parameter to get price for specific product
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPriceByCountry = (item) => {
    const productPrice = prices[item.id]

    if (country && country.value === "BD") {
      return productPrice?.basePrice || item?.retails_price || 0
    } else {
      return productPrice?.wholesalePrice || item?.wholesale_price || 1000
    }
  }

  useEffect(() => {
    const total = cartItems.reduce((prev, curr) => {
      const basePrice = getPriceByCountry(curr)
      const priceAfterDiscount =
        curr.discount_type === "Fixed"
          ? basePrice - (curr.discount || 0)
          : basePrice - (basePrice * (curr.discount || 0)) / 100

      return prev + priceAfterDiscount * curr.quantity
    }, 0)

    const totalDiscount = cartItems.reduce((prev, curr) => {
      const basePrice = getPriceByCountry(curr)
      let discountAmount = 0

      if (curr.discount_type === "Fixed") {
        discountAmount = (curr.discount || 0) * curr.quantity
      } else if (curr.discount_type === "Percentage") {
        discountAmount = ((basePrice * (curr.discount || 0)) / 100) * curr.quantity
      }

      return prev + discountAmount
    }, 0)

    setCartTotal(total)
    setTotalDiscount(totalDiscount)
  }, [ prices, country, getPriceByCountry])

  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => {
      const price = getPriceByCountry(item)
      const quantity = item?.quantity || 0
      return acc + price * quantity
    }, 0)

    setTotalSubtotalWithoutDiscount(subtotal)
  }, [ prices, country, getPriceByCountry])

  useEffect(() => {
    const savedNote = localStorage.getItem("cartAttachment")
    if (savedNote) {
      setNote(savedNote)
    }
  }, [])

  useEffect(() => {
    if (note) {
      localStorage.setItem("cartAttachment", note)
    } else {
      localStorage.removeItem("cartAttachment")
    }
  }, [note])

  const handleClearCart = () => {
    setRefetch(true)
    localStorage.removeItem("cart")
  }

  const handleApplyCoupon = () => {
    alert(`Applying coupon: ${couponCode}`)
  }

  const handleApplyVoucher = () => {
    alert(`Applying voucher: ${voucherCode}`)
  }

  const incQuantity = (id, qty) => {
    const items = getCartItems()
    const item = items.find((item) => item.id === id)

    if (item && (item.current_stock !== undefined || item.status)) {
      if (qty + 1 > item.current_stock) {
        toast.error("Cannot add more items. Stock limit reached!")
        return
      }

      if (item.status === "Stock out") {
        toast.error("This item is out of stock!")
        return
      }
    }

    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: qty + 1 }
      }
      return item
    })

    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(updatedItems))
    handleCartUpdate()
  }

  const dncQuantity = (id, qty) => {
    if (qty <= 1) {
      handleCartItemDelete(id)
      toast.success("Item removed from cart")
      return
    }

    const items = getCartItems()
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: qty - 1 }
      }
      return item
    })

    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(updatedItems))
    handleCartUpdate()
  }

  const handleCartUpdate = () => {
    setRefetch(true)
    const updatedItems = getCartItems()
    setCartItems(updatedItems)
  }

  if (loading) {
    return <CartSkeleton />
  }

  return (
    <div className="bg-white min-h-screen w-11/12 mx-auto pt-5">
      <div className="container mx-auto px-4 pb-8 pt-16">
        <h1 className="text-2xl font-semibold flex items-center gap-1 mb-6 dark:text-black">
          <ShoppingBag size={21}></ShoppingBag>
          Shopping Cart
        </h1>

        {cartItems.length > 0 ? (
          <>
            {/* Desktop Cart Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border dark:text-black">
                    <th className="py-4 px-4 text-left font-semibold">Image</th>
                    <th className="py-4 px-4 text-left font-semibold">Product Name</th>
                    <th className="py-4 px-4 text-left font-semibold">Details</th>
                    <th className="py-4 px-4 text-center font-semibold">Quantity</th>
                    <th className="py-4 px-4 text-right font-semibold">Unit Price</th>
                    <th className="py-4 px-4 text-right font-semibold">Total</th>
                    <th className="py-4 px-4 text-center font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const unitPrice = getPriceByCountry(item)
                    const totalPrice = unitPrice * item.quantity

                    return (
                      <tr key={item.id} className="border dark:text-black">
                        <td className="py-4 px-4">
                          <div className="w-20 h-20 relative">
                            {item?.images && item?.images.length > 0 ? (
                              <Image
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            ) : item?.image_path ? (
                              <Image
                                src={item.image_path || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <Image
                                src={noImg || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium">{item.name}</td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="flex gap-2">
                              <p className="text-sm text-gray-500">Brand: {item.brand_name || "N/A"},</p>
                              <p className="text-sm text-gray-500">Color: {item.color || "N/A"},</p>
                            </div>
                            <div className="flex gap-2">
                              <p className="text-sm text-gray-500">Storage: {item.storage || "N/A"}</p>
                              <p className="text-sm text-gray-500">Region: {item.region || "N/A"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => dncQuantity(item.id, item.quantity)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-gray-50 dark:bg-white dark:text-black"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-10 h-8 text-center border-t border-b border-gray-300 dark:bg-white dark:text-black"
                            />
                            <button
                              onClick={() => incQuantity(item.id, item.quantity)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-gray-50 dark:bg-white dark:text-black"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">BDT {unitPrice.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right font-medium">BDT {totalPrice.toLocaleString()}</td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleCartItemDelete(item.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cart Items */}
            <div className="md:hidden space-y-4">
              {cartItems.map((item) => {
                const unitPrice = getPriceByCountry(item)
                const totalPrice = unitPrice * item.quantity

                return (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        {item?.images && item?.images.length > 0 ? (
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        ) : item?.image_path ? (
                          <Image
                            src={item.image_path || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <Image src={noImg || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium dark:text-black">{item.name}</h3>
                        <p className="text-sm text-gray-500">{`${item?.brand_name || ""}`}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-gray-300">
                            <button
                              onClick={() => dncQuantity(item.id, item.quantity)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-white dark:text-black"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-8 h-8 text-center border-x border-gray-300"
                            />
                            <button
                              onClick={() => incQuantity(item.id, item.quantity)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-white dark:text-black"
                            >
                              +
                            </button>
                          </div>

                          <button onClick={() => handleCartItemDelete(item.id)} className="text-gray-500">
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-500">Price:</span>
                          <span className="font-medium dark:text-black">BDT {unitPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-gray-500">Total:</span>
                          <span className="font-medium dark:text-black">BDT {totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Cart Summary and Actions */}
            <div className="grid md:grid-cols-2 items-start gap-8 mt-8">
              <div className="w-full max-w-2xl mx-auto">
                <label
                  htmlFor="order-note"
                  className="md:text-base text-sm font-medium text-gray-700 mb-2 flex justify-start items-center gap-1"
                >
                  <NotebookPen size={19}></NotebookPen>
                  Special instructions or delivery notes
                </label>
                <textarea
                  id="order-note"
                  rows={3}
                  placeholder="e.g., Please deliver between 5 PM - 8 PM"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-teal-600 focus:border-teal-600 dark:text-black text-white dark:bg-white resize-none"
                ></textarea>
              </div>

              {/* Right Column - Order Summary */}
              <div className="bg-white rounded-lg dark:text-black">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Sub-Total:</span>
                    <span className="font-bold">BDT {totalSubtotalWithoutDiscount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Total Discount:</span>
                    <span>BDT {totalDiscount.toLocaleString() || 0}</span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-gray-900 font-bold">Total:</span>
                    <span className="text-teal-800 font-bold">BDT {cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={"/checkout"}
                    className={`w-full py-3 px-4 rounded font-medium flex items-center justify-center bg-[#115e59] text-white hover:bg-teal-600`}
                  >
                    Proceed to Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 flex flex-col justify-center items-center">
            <ShoppingCart color="teal" size={50}></ShoppingCart>
            <h2 className="md:text-3xl text-xl mt-4 font-bold mb-2 text-black">Your cart is Empty</h2>
            <p className="text-gray-600 mb-8">Must add items on the cart before you proceed to check out</p>
            <Link
              href="/"
              className="bg-teal-500 text-white px-6 py-2 text-sm rounded-md font-medium hover:bg-teal-600"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
