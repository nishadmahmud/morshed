import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
const noImg = '/no-image.jpg';
import { api } from '../lib/api';

const BrandMarquee = async () => {
  const brandsRes = await fetch(api.getBrands(), { cache: 'no-cache' });
  const brands = await brandsRes.json();

  // Static placeholder brand to fill 10th slot if needed
  const placeholderBrand = {
    id: 'gant',
    name: 'GANT',
    image_path: '/brands/gant-logo.png' // You can add this logo to public/brands/
  };

  // Get brands and add placeholder if we have 9
  let displayBrands = brands?.data || [];
  if (displayBrands.length === 9) {
    displayBrands = [...displayBrands, placeholderBrand];
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Trusted by Global Brands</p>
        </div>

        {/* Brand Grid - 5 columns, 2 rows */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {displayBrands.slice(0, 10).map((brand, index) => (
            <Link
              key={index}
              href={`/brands/${brand.id}?brand=${brand.name}`}
              className="relative aspect-[3/2] bg-white border border-gray-100 rounded-lg p-4 flex items-center justify-center hover:border-gray-300 hover:shadow-md transition-all duration-300 group"
            >
              <Image
                src={brand.image_path || noImg}
                alt={brand.name || `brand_${index}`}
                fill
                className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
