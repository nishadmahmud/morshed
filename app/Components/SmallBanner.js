import Image from 'next/image';
import React from 'react';
import noImg from '/public/no-image.jpg'

const SmallBanner = ({banner}) => {
    return (
        <div className='w-11/12 lg:w-[100%] bg-gray-300 mx-auto lg:mt-20 mt-10'>
             <div className="w-full mx-auto grid grid-cols-1 xl:grid-cols-2 mt-2 gap-2 lg:mt-0 gap-y-2 justify-center items-center justify-items-center">

                        {banner?.data?.[0] && (
                          <div className="w-full h-44 xl:h-[50vh] lg:h-[40vh] md:h-35vh relative">
                            <Image
                            unoptimized
                              src={banner.data[0].image_path || noImg}
                              fill
                              style={{ objectFit: "cover" }}
                              className="cursor-pointer"
                              alt="banner"
                              priority={true}
                            />
                          </div>
                        )}
                         <div>
             <div>
               <h1 className='text-center text-2xl md:text-4xl tracking-widest text-gray-600 py-8 md:py-0'>
              The New Era of <br></br> Feminine Style
              </h1>
             </div>
            </div>
            
                       
                      </div>
        </div>
    );
};

export default SmallBanner;