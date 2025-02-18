import Heading from "../CustomHooks/heading";
import Image from "next/image";
import Link from "next/link";
import SubHeading from "../CustomHooks/subHeading";
import noImg from "/public/no-image.jpg";

const FeaturedCategories = ({ categories }) => {
  return (
    <div>
      <div className="lg:mt-8 lg:mb-4">
        <Heading title={"FEATURED CATEGORIES"} />
        <p className="text-sm text-black w-11/12 mx-auto">
          Get your desired product from featured category
        </p>

        {/* <SubHeading subheading={'Get your desired product from featured category'}/>  */}
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 w-11/12 mx-auto my-8">
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
              className="group"
            >
              <div className="flex flex-col items-center justify-between flex-grow text-black lg:h-30 py-1  group-hover:text-[#F16724] transition ease-in-out">
                <div className="lg:p-10 p-4 flex items-center bg-[#e2e2e2]  relative lg:h-40 lg:w-40 rounded-md border">
                  <Image
                    src={item?.image_url ?? noImg} // Uses 'noImg' if 'image_url' is null or undefined
                    alt={item?.name || "mobile-phone"} // Uses a default alt text if 'name' is missing
                    height={80}
                    width={80}
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-[9.3px] mt-3 md:text-[15px] lg:text-base text-center font-semibol">
                  {item?.name}
                </h3>
                {/* <p className='text-gray-500 font-semibold text-sm '>{item?.product_count} Items</p> */}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
