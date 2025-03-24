import Heading from "../CustomHooks/heading";
import Image from "next/image";
import Link from "next/link";
import SubHeading from "../CustomHooks/subHeading";
import noImg from "/public/no-image.jpg";

const FeaturedCategories = ({ categories }) => {
  return (
    <div>
      <div className="lg:mt-8 lg:mb-4">
        <Heading title={"Featured Categories"} />   
      </div>

      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 w-11/12 mx-auto my-8">
        {categories.data &&
          categories.data.length > 0 &&
          categories.data.map((item, idx) => (
            <Link
              href={`category/${encodeURIComponent(
                item?.category_id
              )}?category=${encodeURIComponent(
                item?.name
              )}&total=${encodeURIComponent(item?.product_count)}`}
              key={idx}
              className="group "
            >
              <div className="flex flex-col items-center justify-between flex-grow text-black lg:h-30 py-1 
              group-hover:text-[#c03b2c] transition ease-in-out ">
                
                {/* Image Wrapper */}
                <div className="bg-gray-200 rounded-full">
                  <Image
                  unoptimized
                    src={item?.image_url ?? noImg}
                    alt={item?.name || "mobile-phone"}
                    height={120}
                    width={120}
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    className="rounded-full transition-transform duration-300 border-2 p-4 border-gray-200 group-hover:scale-105"
                  />
                </div>

                {/* Category Name */}
                <h3 className="text-[9.3px] mt-2.5 md:text-[15px] text-center group-hover:font-semibold 
                transition-transform duration-300 group-hover:scale-105">
                  {item?.name}
                </h3>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
