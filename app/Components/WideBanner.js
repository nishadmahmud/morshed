import Image from 'next/image';
import React from 'react';
import noImg from '/public/no-image.jpg'

const WideBanner = ({banner}) => {
    return (
        <div className='w-[92%] mx-auto lg:mt-20 mt-10'>
             <div className="w-full mx-auto grid grid-cols-1 mt-2 gap-2 lg:mt-0 gap-y-2">
                        
            
                        {banner?.data?.[3] && (
                          <div className="w-full h-44 xl:h-[50vh] lg:h-[40vh] md:h-35vh relative">
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

export default WideBanner;