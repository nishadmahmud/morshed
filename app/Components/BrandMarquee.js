import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
const noImg = '/no-image.jpg'
import { userId } from '../constants';

const BrandMarquee = async () => {
  const brandsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/brands/${userId}`, { cache: 'no-cache' });
  const brands = await brandsRes.json();

  return (
    <section className="bg-gray-50 py-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Brand Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 items-center justify-items-center">
          {brands?.data?.slice(0, 8).map((brand, index) => (
            <Link
              key={index}
              href={`/brands/${brand.id}?brand=${brand.name}`}
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <Image
                src={brand.image_path || noImg}
                alt={brand.name || `brand_${index}`}
                width={80}
                height={40}
                className="object-contain h-8 md:h-10 w-auto grayscale hover:grayscale-0 transition-all duration-200"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
