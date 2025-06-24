import Image from 'next/image';
import React from 'react';
import noImg from '/public/no-image.jpg';

const SmallBanner = ({ banner }) => {
  return (
    <div className="w-full bg-gray-100 mt-10 lg:mt-20">
      {banner?.data?.[0] && (
        

        <div
            className="w-full lg:h-[70vh] md:h-[50vh] h-[35vh] bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.data[0].image_path || noImg})` }}
        >
            
        </div>
      )}
    </div>
  );
};

export default SmallBanner;
