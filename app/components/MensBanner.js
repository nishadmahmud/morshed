"use client";

import Image from 'next/image';
import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
const noImg = '/no-image.jpg';

const MensBanner = ({ banner }) => {
  const imageSrc = banner?.data?.[1]?.image_path || noImg;
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: '-100px' });

  return (
    <div className="w-full flex flex-col lg:flex-row mt-10">
      {/* Left Side - Text */}
      <div
        className="bg-teal-800/90 backdrop-blur-lg text-white flex flex-col justify-center w-full md:w-3/4  mx-auto py-5 md:py-5 pl-2"
        ref={textRef}
      >
        {[
          'Redefining Modern Elegance',
          'A Curated Selection for Him',
          'Discover timeless silhouettes, sharp tailoring, and elevated essentials — designed for the modern man.',
        ].map((text, i) => (
          <div
            key={i}
            className={`
              transition-all duration-1000 ease-out fill-mode-forwards
              ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
              ${i === 0
                ? 'text-2xl md:text-4xl lg:text-5xl font-semibold mb-3 text-center lg:text-left'
                : i === 1
                  ? 'text-xl md:text-3xl lg:text-4xl font-semibold mb-5 text-center lg:text-left'
                  : 'text-sm md:text-base lg:text-lg mb-5 text-center lg:text-left'
              }
            `}
            style={{ transitionDelay: `${i * 300}ms` }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Right Side - Image */}
      <div className="relative w-full lg:w-1/2 aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt="Mens Banner"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default MensBanner;
