import { ExternalLinkIcon } from '@heroicons/react/outline';
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
          <div className="relative w-6 h-6">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-spj-red" />
            </div>
          </div>

          <span className="px-3 py-1 mt-2 text-sm font-semibold rounded-md shadow-md bg-white">{dot.label}</span>
        </div>
      ))}
      <div className="absolute bottom-0 left-0 font-medium text-white leading-[1] bg-black rounded-tr-[2rem] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 p-6 min-w-[38rem] max-w-[40rem] w-full">
        <Link href={designData.url ?? '#'}>
          <a target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:underline">
            {/* <BookmarkIcon className="w-5 h-5" /> */}
            <p className="text-2xl">{designData.name}</p>
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        </Link>
        <p className="text-base opacity-80">{designData.description}</p>
      </div>
    </div>
  );
};

export default ImageWithDots;
