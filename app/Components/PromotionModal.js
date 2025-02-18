'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useStore from "../CustomHooks/useStore";
import { IoClose } from 'react-icons/io5';
import { userId } from '../(home)/page';
import { RotateLoader } from 'react-spinners';

const PromotionModal = () => {
    const { isOpenPromoBanner, setIsOpenPromoBanner } = useStore();
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        setIsOpenPromoBanner(true);
    }, [setIsOpenPromoBanner]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`)
            .then((response) => response.json())
            .then((data) => setOffer(data))
            .catch((error) => console.error("Error fetching offer:", error));
    }, []);

    const lastImage = offer?.data?.length ? offer.data[offer.data.length - 1].image : null;

    return (
        <div className={`modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[9999] items-center px-4 ${isOpenPromoBanner ? '' : 'hidden'}`}>
            <dialog
                open
                className="relative p-1.5 lg:p-3 rounded-lg flex flex-col justify-center bg-white text-black w-[90%] md:w-[90%] lg:w-[60%] h-auto"
            >
                {/* Close Button - Positioned absolutely */}
                <div className="absolute top-1 right-1 bg-[#dc2626] p-1 rounded-md z-30">
                    <IoClose className="cursor-pointer text-white" onClick={() => setIsOpenPromoBanner(false)} />
                </div>

                {/* Image Container */}
                <div className="relative aspect-[16/7] w-full h-full flex justify-center items-center justify-items-center">
                    {lastImage ? (
                        <Image className='rounded-md' src={lastImage} alt='promo' fill style={{ objectFit: 'cover' }} />
                    ) : (
                       <div>
                         <RotateLoader  color='#F16724'></RotateLoader>
                       </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default PromotionModal;
