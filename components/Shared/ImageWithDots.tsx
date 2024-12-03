import { DesignType } from '@components/Home/v3/LookBook';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ImageWithDotsProps = {
  designData: DesignType;
};

const ImageWithDots: React.FC<ImageWithDotsProps> = ({ designData }) => {
  return (
    <div className="relative">
      {/* Desktop */}
      <div className="relative w-full max-w-full group hidden md:block aspect-[2.39/1]">
        <Image
          src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto' + designData.desktop.imgSrc}
          alt={designData.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md shadow-md"
        />

        {/* {designData.desktop.dots.map((dot, index) => (
          <div
            key={index}
            className="absolute flex flex-col items-center text-center transition-opacity duration-200"
            style={{
              top: `${dot.y}%`,
              left: `${dot.x}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-6 h-6">
              <div className="flex items-center justify-center w-full h-full bg-white rounded-full">
                <div className="w-3 h-3 rounded-full bg-spj-red" />
              </div>
            </div>

            <span className="px-3 py-1 mt-2 text-sm font-semibold bg-white rounded-md shadow-md">{dot.label}</span>
          </div>
        ))} */}
      </div>

      {/* Mobile */}
      <div className="relative w-full max-w-full group aspect-[1/1.5] md:hidden">
        <Image
          src={'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto' + designData.mobile.imgSrc}
          alt={designData.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md shadow-md"
        />
        {/* {designData.mobile.dots.map((dot, index) => (
          <div
            key={index}
            className="absolute flex flex-col items-center text-center transition-opacity duration-200"
            style={{
              top: `${dot.y}%`,
              left: `${dot.x}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-6 h-6">
              <div className="flex items-center justify-center w-full h-full bg-white rounded-full">
                <div className="w-3 h-3 rounded-full bg-spj-red" />
              </div>
            </div>

            <span className="px-3 py-1 mt-2 text-sm font-semibold bg-white rounded-md shadow-md">{dot.label}</span>
          </div>
        ))} */}
      </div>

      <div className="absolute bottom-0 left-0 font-medium text-white leading-[1] bg-black rounded-tr-[2rem] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 p-6 min-w-[38rem] max-w-[40rem] w-full">
        <Link href={designData.url ?? '#'}>
          <a target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:underline">
            {/* <BookmarkIcon className="w-5 h-5" /> */}
            <p className="text-2xl">{designData.name}</p>
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        </Link>
        <p className="max-w-[300px] text-base opacity-80 md:max-w-none">{designData.description}</p>
      </div>
    </div>
  );
};

export default ImageWithDots;
