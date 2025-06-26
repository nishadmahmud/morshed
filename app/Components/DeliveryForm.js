"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetcher, userId } from "../(home)/page";
import Image from "next/image";
import Modal from "./Modal";
import { RiInformation2Line } from "react-icons/ri";
import PaymentMethodForm from "./PaymentMethodForm";
import {
  ShoppingBag,
  Headset,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  Home,
  Building,
  HandHelping,
  Pointer,
} from "lucide-react";
import PrizeModal from "./PrizeModal";
import { Dialog } from "@headlessui/react";
import { Wheel } from "react-custom-roulette";
import useStore from "../CustomHooks/useStore";


const prizeData = [
  {
    option: "10% off",
    image: {
      uri: "/ten.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
   {
    option: "4 pc Solid Shirt",
    image: {
      uri: "/fourshirt.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
  {
    option: "Try Again",
    image: {
      uri: "/tryAgain.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
  {
    option: "50% off",
    image: {
      uri: "/fifty.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
  {
    option: "One pis Stripe T-shirt",
    image: {
      uri: "/shirtPrize.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
 
  {
    option: "Solid Shirt",
    image: {
      uri: "/solid-shirt.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
 
 
];


const DeliveryForm = ({ cartItems, cartTotal, setShippingFee, couponAmount, couponCode, selectedDonate, setSelectedDonate, donations }) => {

  console.log({couponCode, couponAmount});
  const { data: paymentMethods, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/payment-type-list/${userId}`,
    fetcher
  );

  
  const { setToken, googleLogin, setUserInfo, isRegistered, setIsRegistered } = useStore()
  const date = new Date().toISOString();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payment, setPayment] = useState("Cash");
  const [isCod, setIsCod] = useState(true);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const customer_id = userData?.id;
  const customer_phone = userData?.mobile_number;
  const [location, setLocation] = useState("inside");
  const shippingFee = location === "inside" ? 70 : 130;
  
  const [couponValue, setCouponValue] = useState(couponAmount)
// console.log(selectedDonate);
  useEffect(() => {
  setCouponValue(couponAmount);
}, [couponAmount]);

 const searchParams = useSearchParams()
  const intendedUrl = searchParams.get("redirect")
  console.log(intendedUrl);
const users = JSON.parse(localStorage.getItem("user"));
const parts = users?.name?.trim().split(/\s+/); 
const firstName = parts? parts[0] : "";
const lastName = parts?.length > 1 ? parts[parts.length - 1] : "" || "";
const modal = useState(false)
const onClose = () => {
  modal[1](false); 
};


 const [reload, setReload] = useState(false)
 

 const handleGoogleLogin = async () => {
    try {
      const response = await googleLogin();
      const result = response.user;
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API}/customer-login`,
          { email: result.email, password: result.uid,user_id  : String(userId)},
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setReload(true);
          if (intendedUrl) {
            router.push(intendedUrl);
          } 
          if (modal) {
            onClose();
          }

          console.log(res.data);
          setToken(res.data.token);
          toast.success("Login Successful!");
          setUserInfo(res?.data?.customer);
          localStorage.setItem("user", JSON.stringify(res?.data?.customer));
          localStorage.setItem("token", res?.data?.token);
          
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };


  
  useEffect(() => {
    setShippingFee(shippingFee);
  }, [location, setShippingFee, shippingFee]);

  const [formData, setFormData] = useState({
    country: "Bangladesh",
    email: userEmail || "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    billCountry: "",
    billFirstName: "",
    billLastName: "",
    billAddress: "",
    address2: "",
    billApartment: "",
    billCity: "",
    billPostalCode: "",
    billPhone: "",
  });

  const [selectedMethodId, setSelectedMethodId] = useState(null);

  const handleClose = () => setShowPaymentModal(false);

  const [orderSchema, setOrderSchema] = useState({
    pay_mode: payment,
    paid_amount: 0,
    sub_total: Number(cartTotal) + shippingFee,
    vat: 0,
    tax: 0,
    discount: couponValue,
    coupon_code: couponCode,
    product: cartItems.map((item) => ({
      product_id: item.id,
      qty: item.quantity,
      price: item.retails_price,
      mode: 1,
      size: 1,
      sales_id: 3,
      imei_id: item?.imeis ? item?.imeis[0]?.id : null,
    })),
    delivery_method_id: 1,
    donation_amount: selectedDonate,
    delivery_info_id: 1,
    delivery_customer_name: formData.firstName + formData.lastName,
    delivery_customer_address: formData.address || formData.address2,
    delivery_customer_phone: formData?.phone ? formData?.phone : "N/A",
    delivery_fee: shippingFee,
    payment_method: paymentMethods?.data?.data.map((item) => ({
      payment_type_category_id: item.payment_type_category[0]?.id,
      payment_type_id: item.payment_type_category[0]?.payment_type_id,
      payment_amount: 0,
    })),
    variants: [],
    imeis: cartItems.map((item) => {
      if (item?.imeis && item?.imeis.length > 0) {
        return Number.parseInt(item?.imeis[0].imei);
      } else {
        return null;
      }
    }),
    created_at: date,
    customer_id: customer_id || null,
    customer_name: `${formData.firstName}+${formData.lastName}`,
    customer_phone: customer_phone,
    sales_id: userId,
    user_id: userId,
    wholeseller_id: 1,
    status: 3,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setOrderSchema((prev) => ({
      ...prev,
      ["customer_name"]: `${updatedFormData.firstName}  ${updatedFormData.lastName}`,
      ["delivery_customer_name"]: `${updatedFormData.firstName}  ${updatedFormData.lastName}`,
      ["delivery_customer_address"]: updatedFormData.address || updatedFormData.billAddress,
      ["customer_phone"]: customer_phone,
      ["delivery_customer_phone"]: updatedFormData?.phone ? updatedFormData?.phone : "N/A",
      ["customer_id"]: customer_id,
    }));
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleBillingChange = (e) => {
    setBillingSameAsShipping(e.target.value === "same");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserEmail(user?.email || null);
    }
  }, []);

  useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
  }
}, []);

// spining wheel code

   const [isModalOpen, setIsModalOpen] = useState(false);
  const [wonPrize, setWonPrize] = useState("");

  const handleSpinComplete = (prize) => {
    setWonPrize(prize);
    setIsModalOpen(true);
  };


  const [showWheelModal, setShowWheelModal] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState("");
  const [prizeName, setPrizeName] = useState("");
  const [invoiceId, setInvoiceId] = useState(null);



 
 const handleOrderComplete = (e) => {
    e.preventDefault();
  

    if (cartItems.length > 0) {
      console.log(orderSchema);
      
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API}/public/ecommerce-save-sales`,
          {...orderSchema,donation_amount: selectedDonate}
        )
        .then((res) => {
          if (res.status === 200) {
            const _invoiceId = res?.data?.data?.invoice_id;
            console.log(res?.data);
            setInvoiceId(_invoiceId);
            // localStorage.removeItem("cart");
            toast.success("Order Placed Successfully!");
           router.push(`/payment-success/${_invoiceId}?pay_mode=${payment}`);

            
            const total = Number(cartTotal) + shippingFee;
  //           if (total >= 100) {
            

  //             setShowWheelModal(true);
  //           } else {
  //             setTimeout(() => {
  //   router.push(`/payment-success/${invoiceId}`);
  // }, 2000);
  //           }

  //   setTimeout(() => {
  //  router.push(`/payment-success/${invoiceId}`);

  // }, 3000);
          }
        })
        .catch((err) => {
          toast.error("Error occurred. Try again.");
          console.log(err);
        });
    } else {
      alert("Add some products to the cart first.");
      router.push("/");
    }
  };


  const [spinCount, setSpinCount] = useState(0);
  const handleSpinClick = () => {
  const nextTimeIndex = prizeData.findIndex((item) => item.option === "Try Again");
  const cashPrizeIndex = prizeData.findIndex((item) => item.option === "10% off");

  const newSpinCount = spinCount + 1;
  setSpinCount(newSpinCount);

  if (newSpinCount === 2) {
    setPrizeNumber(cashPrizeIndex); 
  } else {
    setPrizeNumber(nextTimeIndex); 
  }

  setMustSpin(true);
  setResult("");
};


  const handleSpinEnd = () => {
  const selectedPrize = prizeData[prizeNumber]?.image?.uri || "Unknown";
  const selectedPrizeName = prizeData[prizeNumber]?.option || "Unknown";
  setPrizeName(selectedPrizeName)
  setResult(selectedPrize);
  setMustSpin(false);
  setShowWheelModal(false)
  setIsModalOpen(true);
};

const handleModalClose = () => {
  setIsModalOpen(false);
  setTimeout(() => {
    router.push(`/payment-success/${invoiceId}`);
  }, 500);
};



  const handlePaymentMethod = (item) => {
    setShowPaymentModal(true);
    if (item.payment_type_category && item.payment_type_category.length > 0) {
      setPayment(item.payment_type_category[0].payment_category_name);
      setSelectedMethodId(item.payment_type_category[0].id);
    } else {
      setPayment(item.value);
      setSelectedMethodId(item.category_id);
    }
    setOrderSchema((prevSchema) => {
      return {
        ...prevSchema,
        payment_method: [
          {
            payment_type_category_id:
              item.payment_type_category?.[0]?.id || item.category_id,
            payment_type_id:
              item.payment_type_category?.[0]?.payment_type_id || item.id,
            account_number:
              item.payment_type_category?.[0]?.account_number ||
              item.account_number,
          },
        ],
      };
    });
  };

  const handleAmount = (e) => {
    const amount = e.target.value;
    const updatedMethod = [...orderSchema.payment_method];
    const existingMethodIndex = updatedMethod.findIndex(
      (item) => item.payment_type_category_id === selectedMethodId
    );
    updatedMethod[existingMethodIndex].payment_amount = Number.parseInt(amount);
  };

  const handleRefId = (e) => {
    const refId = e.target.value;
    const updatedMethod = [...orderSchema.payment_method];
    const existingMethodIndex = updatedMethod.findIndex(
      (item) => item.payment_type_category_id === selectedMethodId
    );
    updatedMethod[existingMethodIndex].ref_id = refId;
  };


  const handleDonationClick = (donation) => {
    setSelectedDonate(donation);
  }

  return (
    <div className="space-y-4">
      {/* Customer Support Banner */}
     

      <form onSubmit={handleOrderComplete} className="space-y-8">
        {/* Delivery Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Information
              </h2>
              <p className="text-sm text-gray-600">
                Where should we deliver your order?
              </p>
            </div>
          </div>

        <div className="text-black mb-5">
            <button onClick={handleGoogleLogin} >
            <FcGoogle size={25}></FcGoogle>
          </button>
    <br></br>
         <span>or</span>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country/Region */}
            {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country/Region
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors bg-white"
              >
                <option value="Bangladesh">Bangladesh</option>
              </select>
            </div> */}

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                defaultValue={firstName || ""}
                value={formData.firstName || firstName || ""}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="w-full px-4 py-3 border border-gray-300 text-black dark:bg-white rounded-lg focus:ring-2 transition-colors"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                defaultValue={lastName || ""} 
                value={formData.lastName || lastName || ""}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                className="w-full dark:bg-white px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div>

             {/* email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Mail size={18}></Mail>
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={users ? users.email : ""}
                value={formData.email || users? users.email : ""}
                onChange={handleChange}
                placeholder="Enter your email"
                
                className="w-full dark:bg-white text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div>

             {/* Phone */}
            <div className="block text-sm font-medium text-gray-700 mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full dark:bg-white px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div>

            {/* City */}
            <div className="hidden">
              <label className="text-sm  font-medium text-gray-700 mb-2 items-center gap-1">
                <Building size={18}></Building>
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                
                className="w-full text-black dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="inline h-4 w-4 mr-1" />
                Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House number and street name"
                required
                className="w-full text-black dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div>

            {/* Address2 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="inline h-4 w-4 mr-1" />
                Address 2 (Optional)
              </label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="House number and street name"
                
                className="w-full text-black dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div>

            {/* Apartment */}
            {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="inline h-4 w-4 mr-1" />
                Apartment, Suite, etc. (Optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div> */}

           

            {/* Postal Code */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Enter postal code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div> */}

           
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Shipping Method
              </h3>
              <p className="text-sm text-gray-600">
                Choose your preferred delivery option
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                location === "inside"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value="inside"
                checked={location === "inside"}
                onChange={() => setLocation("inside")}
                className="sr-only"
              />
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    location === "inside"
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {location === "inside" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      Inside Dhaka
                    </span>
                    <span className="font-semibold text-gray-900">৳70</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Delivery within 1-2 business days
                  </p>
                </div>
              </div>
            </label>

            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                location === "outside"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value="outside"
                checked={location === "outside"}
                onChange={() => setLocation("outside")}
                className="sr-only"
              />
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    location === "outside"
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {location === "outside" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      Outside Dhaka
                    </span>
                    <span className="font-semibold text-gray-900">৳130</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Delivery within 3-5 business days
                  </p>
                </div>
              </div>
            </label>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Exchange within 3 days</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Payment Method
              </h3>
              <p className="text-sm text-gray-600 flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                All transactions are secure and encrypted
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                payment === "Cash"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="Cash"
                checked={payment === "Cash"}
                onChange={(e) => {
                  handlePayment(e);
                  setIsCod(true);
                }}
                className="sr-only"
              />
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    payment === "Cash" ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  {payment === "Cash" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">
                    Cash on Delivery
                  </span>
                  <p className="text-sm text-gray-600">
                    Pay when you receive your order
                  </p>
                </div>
              </div>
            </label>

            {/* <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                payment === "online"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="online"
                checked={payment === "online"}
                onChange={(e) => {
                  handlePayment(e);
                  setIsCod(false);
                }}
                className="sr-only"
              />
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    payment === "online" ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  {payment === "online" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">
                    Online Payment
                  </span>
                  <p className="text-sm text-gray-600">
                    Credit Card / Mobile Banking / Net Banking
                  </p>
                </div>
              </div>
            </label> */}
          </div>

          {!isCod && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              {paymentMethods?.data?.data &&
              paymentMethods?.data?.data?.length > 0 ? (
                (() => {
                  const otherMethods = paymentMethods?.data?.data?.filter(
                    (item) => item?.type_name !== "Cash"
                  );

                  return otherMethods.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {otherMethods.map((item) => (
                        <div
                          onClick={() => handlePaymentMethod(item)}
                          key={item.id}
                          className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all border-2 ${
                            item?.payment_type_category[0]
                              ?.payment_category_name === payment
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Image
                            unoptimized
                            src={item?.icon_image || "/placeholder.svg"}
                            alt={
                              item?.payment_type_category[0]
                                ?.payment_category_name
                            }
                            height={40}
                            width={40}
                            className="rounded-md h-12 w-12 mb-2"
                          />
                          <span className="text-xs font-medium text-center">
                            {
                              item?.payment_type_category[0]
                                ?.payment_category_name
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-sm text-amber-700">
                      <AlertCircle className="h-4 w-4" />
                      <span>Only Cash On Delivery is available right now</span>
                    </div>
                  );
                })()
              ) : (
                <div className="text-sm text-gray-700">
                  <p>
                    You won&apos;t be redirected to a Payment Link immediately
                    due to stock limitation at real time. After your order is
                    placed, our team will call you with stock confirmation in
                    real time and will provide an SSL Wireless Gadget Bodda
                    Secure Payment Link. You can proceed with the payment then.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Billing Address */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Billing Address
              </h3>
              <p className="text-sm text-gray-600">
                Select the billing address that matches your payment method
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                billingSameAsShipping
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="billingAddress"
                value="same"
                checked={billingSameAsShipping}
                onChange={handleBillingChange}
                className="sr-only"
              />
              <div className="flex items-center space-x-4">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    billingSameAsShipping
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {billingSameAsShipping && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <span className="font-medium text-gray-900">
                  Same as shipping address
                </span>
              </div>
            </label>

            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                !billingSameAsShipping
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="billingAddress"
                value="different"
                checked={!billingSameAsShipping}
                onChange={handleBillingChange}
                className="sr-only"
              />
              <div className="flex items-center space-x-4">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    !billingSameAsShipping
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {!billingSameAsShipping && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <span className="font-medium text-gray-900">
                  Use a different billing address
                </span>
              </div>
            </label>
          </div>

          {!billingSameAsShipping && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                   placeholder="Enter Your First Name"
                    className="w-full px-4 py-3 dark:bg-white border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billFirstName"
                    onChange={handleChange}
                    value={formData.billFirstName}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                   placeholder="Enter Your Last Name"
                    className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billLastName"
                    onChange={handleChange}
                    value={formData.billLastName}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                   placeholder="Enter Your Full Address"
                    className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billAddress"
                    onChange={handleChange}
                    value={formData.billAddress}
                    required
                  />
                </div>

                {/* <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billApartment"
                    onChange={handleChange}
                    value={formData.billApartment}
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                   placeholder="Enter Your City"
                    className="w-full px-4 py-3 dark:bg-white border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billCity"
                    onChange={handleChange}
                    value={formData.billCity}
                    required
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code (optional)
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billPostalCode"
                    onChange={handleChange}
                    value={formData.billPostalCode}
                  />
                </div> */}

                <div className="block text-sm font-medium text-gray-700 mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (optional)
                  </label>
                  <input
                  placeholder="Enter Your Phone Number"
                    className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billPhone"
                    onChange={handleChange}
                    value={formData.billPhone}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Donation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between space-x-3 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
              <HandHelping className="h-6 w-6 text-green-600" />
            </div>
            <div>
              
                <h3 className="text-xl font-semibold text-gray-900">
                Donation
              </h3>

             
              
              <p className="text-sm text-gray-600">
               Even a small donation can make a big impact.
              </p>
            </div>
            </div>

             <RiInformation2Line className="cursor-pointer" title="Your donated money will be distributed among the poor and needy." size={20} color="black"></RiInformation2Line>

          </div>

           <div className="flex flex-row gap-2">
        {donations.map((donation) => {
          const isSelected = selectedDonate === donation;
          const displayText = typeof donation === "number" ? `Tk ${donation}` : donation;
        

          return (
            <button
            type="button"
              key={donation}
              onClick={() => handleDonationClick(donation)}
              className={`px-4 py-2 rounded-full border text-sm ${
                isSelected
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {displayText}
            
            </button>
          );
        })}
      </div>

        
        </div>

        {/* Complete Order Button */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <div className="flex items-center justify-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Complete Order</span>
            </div>
          </button>

          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="h-4 w-4" />
            <span>
              Your payment information is protected by 256-bit SSL encryption
            </span>
          </div>
        </div>
      </form>

      {showPaymentModal && (
        <Modal
          title={"Payment Info"}
          content={
            <PaymentMethodForm
              totalAmount={cartTotal}
              methodName={payment}
              selectedMethodId={selectedMethodId}
              methods={paymentMethods.data.data}
              firstValueFunction={handlePaymentMethod}
              paymentMethodSelection={orderSchema.payment_method}
              setOrderSchema={setOrderSchema}
              onAmountUpdate={handleAmount}
              onRefIdUpdate={handleRefId}
              setSelectedMethodId={setSelectedMethodId}
              onClose={handleClose}
            />
          }
          onClose={handleClose}
        />
      )}

      <Dialog
        open={showWheelModal}
        onClose={() => {}}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-transparent flex flex-col items-center">
            <div className="relative">

              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={prizeData}
                backgroundColors={["#008080", "#ffffff"]}
                textColors={["#000000", "#008080"]}
                outerBorderColor={["#000000", "#ffffff"]}
                outerBorderWidth={2}
                radiusLineColor="#008080"
                radiusLineWidth={1}
                fontSize={14}
                textDistance={70}
                onStopSpinning={handleSpinEnd}
                perpendicularText={true}
                isOnlyOnce={false}
              />

              <button
                onClick={handleSpinClick}
                className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-5 py-2 flex items-center gap-1 rounded-full text-lg font-semibold shadow hover:bg-gray-900"
              >
                {/* <FaGamepad size={20}></FaGamepad> */}
                Play
              </button>
            </div>
            {/* {result && (
              <p className="mt-6 text-center text-xl bg-white p-2 px-4 rounded-lg text-green-400 font-semibold">
                🎉You won:{" "}
                <Image
                  width={500}
                  height={500}
                  src={result}
                  alt="prize"
                ></Image>
              </p>
            )} */}
          </Dialog.Panel>
        </div>
      </Dialog>

      <PrizeModal
      invoiceId={invoiceId}
      prizeName={prizeName}
  isOpen={isModalOpen}
  onClose={handleModalClose}
  prize={result}
/>

    </div>
  );
};

export default DeliveryForm;
