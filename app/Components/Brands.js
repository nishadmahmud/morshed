import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Heading from '../CustomHooks/heading';
const Brands = ({brands}) => {

    return (


        <div className='lg:mt-20 mt-10'>
            <div>
                <div className='h-5 w-10'>
                </div>
                <div>
                    <Heading title={'Shop By Brands'} />
                </div>
                
            </div>
            <div className='grid w-11/12 mx-auto gap-y-10 gap-6 grid-cols-4 items-center justify-center justify-items-center lg:w-8/12'>
            {
                brands?.data && brands?.data.length > 0 ?
                brands.data.map((item) => {
                    return <Link key={item.id} href={`/brands/${item.id}?brand=${item.name}`}>
                    <Image
                    alt='apple'
                    src={item.image_path}
                    height={105}
                    width={105}
                    className='lg:w-32 w-20'
                    />
                    </Link>
                })
                : <p>No Brands Available</p>
            }    
            </div>

            <div>
            <div className='pb-4 flex flex-col justify-center items-center justify-items-center'>
            <Link
                href="/brands"
                className="text-[#F16724] hover:bg-[#F16724] text-nowrap lg:w-40 w-32 justify-center hover:text-white transition-all ease-in-out border rounded-2xl border-[#F16724] flex items-center gap-2 px-2 h-fit py-1 lg:text-md text-sm pl-2"

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
    );
};

export default Brands;