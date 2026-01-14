import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
const noImg = '/no-image.jpg'
import { userId } from '../constants';

const BrandMarquee = async () => {
  const brandsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/brands/${userId}`, { cache: 'no-cache' });
  const brands = await brandsRes.json();

  return (
    <section className="bg-white py-10 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Trusted by Global Brands</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-20 py-4">
          {/* First set of brands */}
          {brands?.data?.map((brand, index) => (
            <Link
              key={`b1-${index}`}
              href={`/brands/${brand.id}?brand=${brand.name}`}
              className="relative block w-24 h-12 md:w-32 md:h-16 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <Image
                src={brand.image_path || noImg}
                alt={brand.name || `brand_${index}`}
                fill
                className="object-contain"
              />
            </Link>
          ))}

          {/* Duplicate set for seamless scrolling */}
          {brands?.data?.map((brand, index) => (
            <Link
              key={`b2-${index}`}
              href={`/brands/${brand.id}?brand=${brand.name}`}
              className="relative block w-24 h-12 md:w-32 md:h-16 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <Image
                src={brand.image_path || noImg}
                alt={brand.name || `brand_${index}`}
                fill
                className="object-contain"
              />
            </Link>
          ))}
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
      </div>

    </section>
  );
};

export default BrandMarquee;
