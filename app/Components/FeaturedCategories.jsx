"use client"
import Image from "next/image"
import Link from "next/link"
import noImg from "/public/no-image.jpg"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

import { useRef } from "react"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"

const FeaturedCategories = ({ categories }) => {
  const categoryList = categories?.data ?? []
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto min-h-[60vh] text-white px-3 sm:px-4 md:px-6 lg:px-8 py-12 md:py-16 relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Categories that inspire
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our curated collection of featured categories
          </p>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="absolute top-20 right-6 md:right-10 flex items-center space-x-3 z-20">
          <button
            ref={prevRef}
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
          >
            <MdArrowBackIos size={20} className="text-white group-hover:text-gray-200 ml-1" />
          </button>
          <button
            ref={nextRef}
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
          >
            <MdArrowForwardIos size={20} className="text-white group-hover:text-gray-200" />
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={false}
          breakpoints={{
            480: {
              slidesPerView: 1.8,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2.8,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 4.2,
              spaceBetween: 24,
            },
            1536: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          className="pb-8 !overflow-visible"
        >
          {categoryList.map((category, index) => (
            <SwiperSlide key={index} className="h-auto">
              <Link
                href={`category/${encodeURIComponent(category?.category_id)}?category=${encodeURIComponent(
                  category?.name,
                )}&total=${encodeURIComponent(category?.product_count)}`}
                className="group block h-full"
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 h-full w-full max-w-sm mx-auto">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      unoptimized
                      src={category.image_url || noImg}
                      alt={category.name || "category"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Product Count Badge */}
                    {category?.product_count && (
                      <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-2 py-1">
                        <span className="text-xs font-medium text-white">{category.product_count} items</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-sm md:text-base lg:text-base text-white mb-1 group-hover:text-gray-200 transition-colors duration-300 line-clamp-2">
                      {category.name}
                    </h3>
                    <div className="w-0 group-hover:w-8 md:group-hover:w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500 ease-out" />
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-pink-500/10 rounded-full blur-xl" />
      </div>
    </div>
  )
}

export default FeaturedCategories
