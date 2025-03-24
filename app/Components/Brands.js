import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Heading from '../CustomHooks/heading';
const Brands = ({brands}) => {

    return (

       <div style={{ backgroundImage: `url(https://i.ibb.co.com/Zp6Zwfzd/2e352a34f29bd02eadca4b5d39136fd9.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="">
         <div className="md:mt-20 mt-10 ">
            <div>
                <div className='h-5 w-10'>
                </div>
                <div>
                    <Heading title={'Shop By Brands'} />
                </div>
                
            </div>
            <div className='grid w-11/12 my-8 mx-auto md:gap-y-7 md:gap-6 md:grid-cols-4 grid-cols-3 gap-3 items-center justify-center justify-items-center lg:w-8/12 '>
            {
                brands?.data && brands?.data.length > 0 ?
                brands.data.map((item) => {
                    return <Link key={item.id} href={`/brands/${item.id}?brand=${item.name}`} className='bg-white rounded-sm xl:px-20 md:px-10 px-5 py-1'>
                    <Image
                    unoptimized
                    alt='apple'
                    src={item.image_path}
                    height={105}
                    width={105}
                    className='lg:w-36 w-16'
                    />
                    </Link>
                })
                : <p>No Brands Available</p>
            }    
            </div>

            <div>
            <div className='pb-5 flex flex-col justify-center items-center justify-items-center'>
            <Link
                href="/brands"
                className="text-[#c03b2c] hover:bg-[#c03b2c] text-nowrap lg:w-40 w-32 justify-center hover:text-white transition-all ease-in-out border rounded-2xl border-[#c03b2c] flex items-center gap-2 px-2 h-fit py-1 lg:text-md text-sm pl-2"

                >
                All Brands
                {/* <span className="sr-only">View all brands</span> */}
                <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                    />
                </svg>

            </Link>
            </div>

            </div>
           
        </div>
       </div>
    );
};

export default Brands;