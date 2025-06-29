"use client"

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import noImg from '/public/no-image.jpg';

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const MensBanner = ({ banner }) => {
  const imageSrc = banner?.data?.[1]?.image_path || noImg;
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: '-100px' });

  return (
    <div className="w-full lg:h-[65vh] h-[35vh] flex flex-col lg:flex-row">
      {/* Left Side - Text */}
      <div
        className="bg-teal-800/90 backdrop-blur-lg text-white flex flex-col justify-center px-8 lg:w-1/2 w-full md:py-10 py-5 pt-7 md:pt-10"
        ref={textRef}
      >
        {['Redefining Modern Elegance', 'A Curated Selection for Him', 'Discover timeless silhouettes, sharp tailoring, and elevated essentials — designed for the modern man.'].map(
          (text, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={textVariants}
              className={i === 0
                ? 'text-3xl lg:text-6xl font-semibold mb-4 text-center md:text-start'
                : i === 1
                ? 'text-2xl lg:text-5xl font-semibold mb-6 text-center md:text-start'
                : 'text-sm lg:text-base mb-6 text-center md:text-start'}
            >
              {text}
            </motion.div>
          )
        )}
      </div>

      {/* Right Side - Image */}
      <div className="relative  w-full h-[35vh] lg:h-[65vh]">
        <Image
          src={imageSrc}
          alt="Mens Banner"
          fill
          className="object-cover h-fit"
          priority={true}
        />
      </div>
    </div>
  );
};

export default MensBanner;
