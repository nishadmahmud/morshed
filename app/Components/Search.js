import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import noImg from '/public/no-image.jpg'


const Search = ({searchedItem,setSearchText,setSearchedItem,searchBarRef}) => {
    const sanitizeSlug = (str) => {
        return str
          ?.toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with dashes
          .replace(/[^a-z0-9-]/g, ""); // Remove special characters
      };
    return (
        <>
        {   searchedItem && searchedItem.length > 0 ? 
            <div ref={searchBarRef} className='bg-white text-black min-w-[23rem] md:min-w-[28rem] max-w-[27rem] lg:w-[28rem] p-5 absolute lg:top-[6rem] top-[5.5rem] z-[1000] lg:z-50 left-1/2 transform -translate-x-1/2 rounded-md max-h-[21.5rem] overflow-y-auto'>
            <h5 className='text-right'>Products</h5>
            <div className='flex flex-col gap-3'>
                {
                    searchedItem.map((item,idx) => {
                        return <Link onClick={() => {setSearchText(''),setSearchedItem([])}} href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`} key={idx} className='flex gap-2 items-center z-50 hover:bg-gray-200'>
                            {
                                item?.images?.length > 0 ? 
                                <Image
                                unoptimized={true}
                                    src={item?.images[0]}
                                    height={50} 
                                    width={50} 
                                    alt="mobile-phone"
                                    quality={75}
                                />  : 
                                item?.image_path ? 
                                <Image 
                                src={item.image_path}
                                height={50}
                                width={50}
                                alt='product'
                                />
                                :
                                <Image
                                    src={noImg}
                                    height={50} 
                                    width={50} 
                                    alt="mobile-phone"
                                    quality={75}
                                />
                            }
                            <h3 className='text-black text-sm font-medium z-50 text-wrap'>{item.name}</h3>
                        </Link>
                    })
                }
            </div>
            
        </div>
        : <p>No Products</p>

        }
        </>
    );
};

export default Search;