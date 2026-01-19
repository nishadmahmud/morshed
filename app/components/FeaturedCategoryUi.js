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
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Category Grid - 3 columns, 2 rows = 6 items */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {categoryList?.data && categoryList?.data?.length ?
            categoryList.data.slice(0, 6).map((category, index) => (
              <Link
                key={index}
                href={`category/${encodeURIComponent(category?.category_id)}?category=${encodeURIComponent(
                  category?.name,
                )}&total=${encodeURIComponent(category?.products_count)}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  {/* Category Image */}
                  <Image
                    src={category.image_url || noImg}
                    alt={category.name || "category"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category Name at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm md:text-lg text-center drop-shadow-lg">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            )) : (
              <p className="col-span-full text-center text-gray-500">No categories available</p>
            )}
        </div>

        {/* View All Button - Opens Sidebar */}
        <div className="text-center mt-6">
          <button
            onClick={handleViewAllClick}
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#0f766e] text-[#0f766e] font-medium rounded hover:bg-[#0f766e] hover:text-white transition-colors"
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
