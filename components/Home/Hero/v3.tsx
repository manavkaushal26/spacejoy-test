import { blurredBgImage } from '@public/images/bg-base-64';
import Image from 'next/image';
import React from 'react';

const v3 = () => {
  return (
    <div className="container relative mx-auto">
      <div className="absolute inset-0">
        <Image
          className="object-cover rounded-lg"
          src="https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=1800&q=80"
          alt="home banner"
          layout="fill"
          placeholder="blur"
          blurDataURL={blurredBgImage}
        />
      </div>
      <div className="flex flex-col min-h-[700px] justify-center items-center relative z-10">
        <h1 className="text-5xl text-center leading-normal">
          Which room will you <br /> furnish today?
        </h1>
        <button
          type="button"
          className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default React.memo(v3);
