'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const OfferPage = () => {
  const deadline = new Date('2025-06-11T00:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="/banner-04.jpg"
        alt="Roland Grand White Shirt"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#f9f8f6]/0 flex items-center justify-end">
        <div className="text-black w-full md:w-1/2 px-10 space-y-6 text-center md:text-left z-10">
          <p className="uppercase text-sm tracking-wide font-semibold">Deal of the week</p>
          <h2 className="text-4xl md:text-5xl font-light leading-snug">
            Roland Grand White <br /> short checkered T-shirt
          </h2>
          <p className="text-gray-500 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 text-xl font-medium">
            <div>{timeLeft.days}<span className="text-sm">d</span></div>
            <div>:</div>
            <div>{timeLeft.hours.toString().padStart(2, '0')}<span className="text-sm">h</span></div>
            <div>:</div>
            <div>{timeLeft.minutes.toString().padStart(2, '0')}<span className="text-sm">m</span></div>
            <div>:</div>
            <div>{timeLeft.seconds.toString().padStart(2, '0')}<span className="text-sm">s</span></div>
          </div>
          <button className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition">Shop Now</button>
          <p className="text-xs text-gray-500 pt-6">
            Limited time offer. The deal will expires on <span className="bg-yellow-200 px-2 py-1 font-semibold">June 11, 2025</span> HURRY UP!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
