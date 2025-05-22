import Heading from "../CustomHooks/heading";
import Image from "next/image";
import Link from "next/link";
import noImg from "/public/no-image.jpg";

const FeaturedCategories = ({ categories }) => {

  const stories = [
  {
    image: '/solid-pattern-tshirt.jpg',
    title: 'Solid Pattern T-shirt',
    description: 'Elevate your everyday look with our classic solid pattern tees.',
  },
  {
    image: '/striped-tshirt.jpg',
    title: 'Striped T-shirt',
    description: 'Make a bold statement with timeless striped designs.',
  },
  {
    image: '/half-seleeve.jpg',
    title: 'Half Sleeve Polo',
    description: 'Stay cool and stylish with our comfortable half sleeve polos.',
  },
  {
    image: '/eid.jpg',
    title: 'Eid Collection',
    description: 'Celebrate in style with our exclusive Eid special wear.',
  },
  {
    image: '/zipper-polo.jpg',
    title: 'Zipper Polo Shirt',
    description: 'Modern design meets comfort with our sleek zipper polos.',
  },
];

  
  const categoryList = categories?.data ?? [];

  const repeatedCategories = Array.from({ length: 4 }, (_, i) => categoryList[i % categoryList.length]);

  return (
    // <div>
    //   <div className="lg:mt-8 lg:mb-4">
    //     {/* <Heading title={"Categories"} /> */}
    //   </div>

    //   <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 w-11/12 mx-auto my-8">
    //     {repeatedCategories.map((item, idx) => (
    //       <>
          
    //       <Link
    //         href={`category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(
    //           item?.name
    //         )}&total=${encodeURIComponent(item?.product_count)}`}
    //         key={idx}
    //         className="group"
    //       >
    //         <div className="flex flex-col items-center justify-between flex-grow text-black lg:h-30 py-1 group-hover:text-[#115e59] transition ease-in-out">
    //           {/* Image Wrapper */}
    //           <div>
    //             <Image
    //               unoptimized
    //               src={item?.image_url ?? noImg}
    //               alt={item?.name || "category"}
    //               height={100}
    //               width={100}
    //               style={{ objectFit: "cover" }}
    //               loading="lazy"
    //               className="bg-transparent transition-transform duration-300 p-2 group-hover:scale-105"
    //             />
    //           </div>

    //           {/* Category Name */}
    //           <h3 className="text-[9.3px] mt-2.5 md:text-[15px] text-center group-hover:font-semibold transition-transform duration-300 group-hover:scale-105">
    //             {item?.name}
    //           </h3>
    //         </div>
    //       </Link>
    //       <Link
    //         href={`category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(
    //           item?.name
    //         )}&total=${encodeURIComponent(item?.product_count)}`}
    //         key={idx}
    //         className="group"
    //       >
    //         <div className="flex flex-col items-center justify-between flex-grow text-black lg:h-30 py-1 group-hover:text-[#115e59] transition ease-in-out">
    //           {/* Image Wrapper */}
    //           <div>
    //             <Image
    //               unoptimized
    //               src={item?.image_url ?? noImg}
    //               alt={item?.name || "category"}
    //               height={100}
    //               width={100}
    //               style={{ objectFit: "cover" }}
    //               loading="lazy"
    //               className="bg-transparent transition-transform duration-300 p-2 group-hover:scale-105"
    //             />
    //           </div>

    //           {/* Category Name */}
    //           <h3 className="text-[9.3px] mt-2.5 md:text-[15px] text-center group-hover:font-semibold transition-transform duration-300 group-hover:scale-105">
    //             {item?.name}
    //           </h3>
    //         </div>
    //       </Link></>
    //     ))}
    //   </div>
    // </div>
    <div className="mt-16">
    
    <div className="bg-black min-h-[50vh] text-white px-8 py-12">
      <h2 className="text-3xl font-bold mb-1">Stories that inspire</h2>
      <p className="text-xl text-white/70 mb-6">Curated weekly</p>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {stories.map((story, index) => (
          <div
            key={index}
            className="min-w-[250px] max-w-[250px] bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 relative"
          >
            <div className="relative h-72 w-full">
              <Image
                src={story.image}
                alt={story.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
              <h3 className="font-bold text-sm">{story.title}</h3>
              <p className="text-xs">{story.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};


export default FeaturedCategories;
