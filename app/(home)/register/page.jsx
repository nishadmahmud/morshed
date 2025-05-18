"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { userId } from "../page"
import register from '../../../public/register (2).png'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    // confirm_password: "",
    agree_terms: false,
  })

  const router = useRouter()

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = (e) => {
    console.log('clicked');
    e.preventDefault()

   

    if (!formData.agree_terms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      user_id: userId,
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/customer-registration`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const customerId = res?.data?.data?.id

        // Update formData with customer_id before saving it
        const updatedFormData = {
          ...formData,
          customer_id: customerId,
          // confirm_password: undefined,
          agree_terms: undefined,
        }

        toast.success("Registration Successful!")
        localStorage.setItem("user", JSON.stringify(updatedFormData))
        router.push("/login")
      })
      .catch((error) => toast.error("Invalid Registration Credentials!"))
  }

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full max-w-6xl grid grid-cols-1 justify-center items-center md:h-screen md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col items-center justify-center p-8 ">

          <iframe height="700px" src="https://lottie.host/embed/095f80c1-b154-417e-89b2-c5efcea3974c/HBU70DxaEe.lottie"></iframe>
    
         
        </div>

        <div className="p-8 flex flex-col justify-center items-center mt-16">
          <div className="max-w-md w-full mx-auto bg-white rounded-xl p-8 shadow-sm border">
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">Let&lsquo;s join us.</h1>
            <p className="text-gray-600 mb-8">Register with your Phone</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full max-w-full relative pt-2">
                <div className="absolute top-0.5 left-2 px-1 bg-white">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your name
                </label>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                    required
                  />
                  
                </div>
              </div>

              <div className="w-full max-w-full relative pt-2">
                <div className="absolute top-0.5 left-2 px-1 bg-white">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Type phone number..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                  required
                />
              </div>

              <div className="w-full max-w-full relative pt-2">

                <div className="absolute top-0.5 left-2 px-1 bg-white">

                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                  required
                />
              </div>

              <div className="w-full max-w-full relative pt-2">

                <div className="absolute top-0.5 left-2 px-1 bg-white">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Type password..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                  required
                />
              </div>

             

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree_terms"
                  name="agree_terms"
                  checked={formData.agree_terms}
                  onChange={handleChange}
                  className="h-3 w-3 text-teal-500 focus:ring-[#006d77] border-gray-300 rounded"
                />
                <label htmlFor="agree_terms" className="ml-2 block text-sm text-gray-700">
                  Agree to the terms and conditions.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#006d77] hover:bg-[#005d65] text-white font-medium rounded-md transition duration-200"
              >
                Register Now
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Have an account?{" "}
                <Link href="/login" className="text-[#006d77] hover:underline font-medium">
                  Login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
