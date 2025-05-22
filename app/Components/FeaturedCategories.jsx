import Heading from "../CustomHooks/heading";
import Image from "next/image";
import Link from "next/link";
import noImg from "/public/no-image.jpg";

const FeaturedCategories = ({ categories }) => {

  
  const categoryList = categories?.data ?? [];

  console.log('categoryyy', categoryList);

  return (
  
    <div className="mt-16">
    
    <div className="bg-black min-h-[50vh] text-white px-8 py-12">
  <h2 className="text-3xl font-bold mb-1">Categories that inspire</h2>
  <p className="text-xl text-white/70 mb-6">Featured categories</p>

  <div className="flex space-x-6 overflow-x-auto pb-4">
    {categoryList.map((category, index) => (
      <Link
       href={`category/${encodeURIComponent(
                category?.category_id
              )}?category=${encodeURIComponent(
                category?.name
              )}&total=${encodeURIComponent(category?.product_count)}`}
        key={index}
        className="min-w-[250px] max-w-[250px] bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 relative"
      >
        <div className="relative h-72 w-full">
          <Image
            unoptimized
            src={category.image_url || noImg}
            alt={category.name || "category"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
          <h3 className="font-bold text-sm">{category.name}</h3>
        </div>
      </Link>
    ))}
  </div>
</div>


    </div>
  );
};


export default FeaturedCategories;
