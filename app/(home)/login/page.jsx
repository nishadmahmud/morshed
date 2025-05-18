"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import useStore from "@/app/CustomHooks/useStore"
import { userId } from "../page"
import { CgGoogle } from "react-icons/cg"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_id: String(userId),
  })


  const { setToken } = useStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const intendedUrl = searchParams.get("redirect")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/customer-login`, formData)
      .then((res) => {
        if (res.data.token) {
          const userData = JSON.parse(localStorage.getItem("user") || "{}")
          const customer_id = userData?.customer_id
          const first_name = userData?.first_name
          const last_name = userData?.last_name
          const phone = userData?.phone

          const updatedFormData = {
            ...formData,
            customer_id,
            first_name,
            last_name,
            phone,
          }

          setFormData(updatedFormData)

          if (intendedUrl) {
            router.push(intendedUrl)
          } else {
            router.push("/")
          }

          toast.success("Login Successful!")
          localStorage.setItem("user", JSON.stringify(res.data.customer))
          setToken(res.data.token)
          localStorage.setItem("token", res.data.token)
        }
      })
      .catch((error) => toast.error("Invalid Login Credentials!"))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <iframe height={500} src="https://lottie.host/embed/f86f91b1-7ead-40ac-b231-62fb3b0c7151/6NU0cxwe90.lottie"></iframe>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto bg-white rounded-xl p-8 shadow-sm border">
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">Welcome back.</h1>
            <p className="text-gray-600 mb-8">Login with your Phone/Email</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="w-full max-w-full relative pt-2">
               <div className="absolute top-0.5 left-2 px-1 bg-white">
                 <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                  Phone Number or Email
                </label>
               </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type phone number or email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="w-full max-w-full relative pt-2">
                  <div className="absolute top-0.5 left-2 px-1 bg-white">
                    <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                    Password
                  </label>
                  </div>
                  {/* <Link href="/forgot-password" className="text-sm text-[#006d77] hover:underline">
                    Forgot password?
                  </Link> */}
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

              <button
                type="submit"
                className="w-full py-2.5 bg-[#006d77] hover:bg-[#005d65] text-white font-medium rounded-md transition duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#006d77] hover:underline font-medium">
                  Register now
                </Link>
              </p>
            </div>

            {/* <div className="mt-6">
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200">
                <CgGoogle className="h-5 w-5" />
                <span>Sign in with Google</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
