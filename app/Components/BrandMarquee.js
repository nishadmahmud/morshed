import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';
import noImg from '/public/no-image.jpg'


const BrandMarquee = ({ brands }) => {
  console.log(brands);

  return (
    <div className="w-full py-4">
      <Marquee pauseOnHover speed={50}>
        {brands?.data.map((brand, index) => (
          <div key={index} className="pr-20 gap-6 flex items-center">
            <Image
              src={brand.image_path || noImg}
              alt={`brand_${index}`}
              width={200} // set your desired width
              height={200} // set your desired height
              className="object-contain md:w-20 w-14"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandMarquee;
