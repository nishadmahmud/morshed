"use client"
import Image from "next/image"
import Link from "next/link"
import useStore from "../hooks/useStore"
const noImg = "/no-image.jpg"

const FeaturedCategoryUi = ({ categories }) => {
  const categoryList = categories;
  const { setIsCategorySidebarOpen } = useStore();

  const handleViewAllClick = () => {
    setIsCategorySidebarOpen(true);
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Shop By Category
          </h2>
          <p className="mt-3 text-gray-500 text-base md:text-lg">
            Find your perfect style
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categoryList?.data && categoryList?.data?.length ?
            categoryList.data.slice(0, 8).map((category, index) => (
              <Link
                key={index}
                href={`category/${encodeURIComponent(category?.category_id)}?category=${encodeURIComponent(
                  category?.name,
                )}&total=${encodeURIComponent(category?.products_count)}`}
                className="group block"
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  {/* Category Image */}
                  <Image
                    src={category.image_url || noImg}
                    alt={category.name || "category"}
                    fill
                    className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Simple Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />

                  {/* Category Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold text-sm md:text-base truncate">
                      {category.name}
                    </h3>
                    {category?.products_count && (
                      <span className="text-white/80 text-xs">
                        {category.products_count} items
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )) : (
              <p className="col-span-full text-center text-gray-500">No categories available</p>
            )}
        </div>

        {/* View All Button - Opens Sidebar */}
        <div className="text-center mt-8">
          <button
            onClick={handleViewAllClick}
            className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-[#0f766e] transition-colors"
          >
            View All Categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategoryUi

