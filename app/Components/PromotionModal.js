'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useStore from "../CustomHooks/useStore";
import { IoClose } from 'react-icons/io5';
import { FadeLoader } from 'react-spinners';

const PromotionModal = ({ promotionBanner }) => {
    const { isOpenPromoBanner, setIsOpenPromoBanner } = useStore();
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    useEffect(() => {
        const hasSeenModal = sessionStorage.getItem('hasSeenPromoBanner');

        if (!hasSeenModal) {
            setIsFirstVisit(true);
            setIsOpenPromoBanner(true);
            sessionStorage.setItem('hasSeenPromoBanner', 'true');
        }
    }, [setIsOpenPromoBanner]);

    const handleClose = () => {
        setIsOpenPromoBanner(false);
    };

    const lastImage = promotionBanner?.length ? promotionBanner[promotionBanner.length - 1].image : null;

    return (
        <div className={`modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[9999] items-center px-4 ${isOpenPromoBanner && isFirstVisit ? '' : 'hidden'}`}>
            <dialog
                open
                className="relative p-1.5 lg:p-2 rounded-lg flex flex-col justify-center bg-white text-black w-[90%] md:w-[90%] lg:w-[60%] h-auto"
            >
                {/* Close Button */}
                <div className="absolute top-1 right-1 bg-[#dc2626] p-1 rounded-md z-30">
                    <IoClose className="cursor-pointer text-white" onClick={handleClose} />
                </div>

                {/* Image Container */}
                <div className="relative aspect-[16/8] w-full h-full flex justify-center items-center">
                    {lastImage ? (
                        <Image className='rounded-md' src={lastImage} priority={true} alt='promo' fill style={{ objectFit: 'cover' }} />
                    ) : (
                        <div>
                            <FadeLoader color='#F16724' />
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default PromotionModal;
