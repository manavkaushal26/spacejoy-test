import { BookmarkIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Dot = {
  x: number; // X-coordinate in percentage (0-100)
  y: number; // Y-coordinate in percentage (0-100)
  label: string; // Label text
};

type DesignData = {
  name: string;
  description: string;
  url: string;
};

type ImageWithDotsProps = {
  src: string; // Image source
  alt: string; // Image alt text
  width?: number; // Image width
  height?: number; // Image height
  dots: Dot[]; // Array of dots
  designData: DesignData;
};

// bg-gradient-to-br from-spj-red to-spj-yellow

const ImageWithDots: React.FC<ImageWithDotsProps> = ({ src, alt, width, height, dots, designData }) => {
  const aspectRatio = width && height ? `width / height` : null;

  return (
    <div className="relative w-full max-w-full group" style={{ aspectRatio: aspectRatio ? aspectRatio : '2.39/1' }}>
      <Image src={src} alt={alt} layout="fill" objectFit="contain" className="rounded-md shadow-md" />
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute flex flex-col items-center text-center transition-opacity duration-200"
          style={{
            top: `${dot.y}%`,
            left: `${dot.x}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 w-5 h-5 rounded-full border-[5px] border-spj-red/75 animate-pulse opacity-100 group-hover:animate-none transition-all duration-200" />
            <div className="absolute inset-0 w-3 h-3 transition-transform duration-200 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full md:group-hover:scale-125 top-1/2 left-1/2" />
          </div>

          <span className="px-3 py-1 mt-2 text-sm font-semibold transition-all duration-200 translate-y-1 rounded-md shadow-md opacity-100 bg-white/75 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            {dot.label}
          </span>
        </div>
      ))}
      <div className="absolute bottom-0 left-0 font-medium text-white leading-[1] bg-black rounded-tr-[2rem] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 p-6 min-w-[38rem] max-w-[40rem] w-full">
        <Link href={designData.url ?? '#'}>
          <a target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:underline">
            <BookmarkIcon className="w-5 h-5" /> <p className="text-2xl">{designData.name}</p>
          </a>
        </Link>
        <p className="text-base opacity-80">{designData.description}</p>
      </div>
    </div>
  );
};

export default ImageWithDots;
