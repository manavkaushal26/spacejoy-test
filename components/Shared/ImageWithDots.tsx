import Image from 'next/image';
import React from 'react';

type Dot = {
  x: number; // X-coordinate in percentage (0-100)
  y: number; // Y-coordinate in percentage (0-100)
  label: string; // Label text
};

type ImageWithDotsProps = {
  src: string; // Image source
  alt: string; // Image alt text
  width?: number; // Image width
  height?: number; // Image height
  dots: Dot[]; // Array of dots
};

// bg-gradient-to-br from-spj-red to-spj-yellow

const ImageWithDots: React.FC<ImageWithDotsProps> = ({ src, alt, width, height, dots }) => {
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
          <div className="w-4 h-4 transition-transform duration-200 rounded-full bg-white/75 md:group-hover:scale-125" />
          <span className="px-3 py-1 mt-2 text-sm font-semibold transition-opacity duration-200 rounded-md shadow-md opacity-100 bg-white/75 md:opacity-0 md:group-hover:opacity-100">
            {dot.label}
          </span>
        </div>
      ))}
      <div className="absolute bottom-0 left-0 font-medium text-white leading-[1] bg-gray-400 rounded-tr-[2rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 p-6 group-hover:translate-y-full transform translate-y-0 transition-all duration-200">
        <p className="text-[2rem]">Modern Rustic Cabin</p>
        <p className="text-xl opacity-80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, praesentium?
        </p>
      </div>
    </div>
  );
};

export default ImageWithDots;
