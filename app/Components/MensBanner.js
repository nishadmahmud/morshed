import Image from 'next/image';
import React from 'react';
import noImg from '/public/no-image.jpg';

const MensBanner = ({ banner }) => {
  const imageSrc = banner?.data?.[1]?.image_path || noImg;

  return (
    <div className="w-full lg:h-[80vh] h-auto flex flex-col lg:flex-row">
      {/* Left Side - Text with solid black background */}
      <div className="bg-teal-800/90 backdrop-blur-lg text-white flex flex-col justify-center px-8 lg:w-1/2 w-full py-10">
       <h1 className="text-4xl lg:text-6xl font-semibold mb-4">Redefining Modern Elegance</h1>
<h2 className="text-3xl lg:text-5xl font-semibold mb-6">A Curated Selection for Him</h2>
<p className="text-sm lg:text-base mb-6">
  Discover timeless silhouettes, sharp tailoring, and elevated essentials — designed for the modern man.
</p>

      </div>

      {/* Right Side - Image */}
      <div className="relative lg:w-1/2 w-full h-[60vh] lg:h-full">
        <Image
          src={imageSrc}
          alt="Mens Banner"
          fill
          className="object-cover"
          priority={true}
        />
      </div>
    </div>
  );
};

export default MensBanner;
