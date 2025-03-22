import Image from 'next/image';
import React from 'react';
import noImg from '/public/no-image.jpg'

const SmallBanner = ({banner}) => {
    return (
        <div className='block md:hidden w-[96%] mx-auto'>
             <div className="w-full mx-auto grid grid-cols-1 mt-2 gap-2 lg:mt-0 gap-y-2">
                        {banner?.data?.[0] && (
                          <div className="w-full h-44 relative">
                            <Image
                            unoptimized
                              src={banner.data[0].image_path}
                              fill
                              style={{ objectFit: "cover" }}
                              className="cursor-pointer rounded-md "
                              alt="banner"
                              priority={true}
                            />
                          </div>
                        )}
            
                        {banner?.data?.[1] && (
                          <div className="w-full h-44 relative">
                            <Image
                            unoptimized
                              src={banner.data[1].image_path || noImg}
                              fill
                              style={{ objectFit: "cover" }}
                              className="cursor-pointer rounded-md"
                              alt="banner"
                              priority={true}
                            />
                          </div>
                        )}
                      </div>
        </div>
    );
};

export default SmallBanner;