import { DesignType } from '@components/Home/v3/LookBook';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ImageWithDotsProps = { designData: DesignType };

const DotElement = ({ dot }: { dot: DesignType['desktop']['dots'][0] }) => (
  <div
    className="absolute flex flex-col items-center text-left transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
    style={{ top: `${dot.y}%`, left: `${dot.x}%`, transform: 'translate(-50%, -50%)' }}
  >
    {dot.position === 'top' && <DotInfo dot={dot} />}
    <div className="relative w-5 h-5 my-1 md:w-6 md:h-6">
      <div className="flex items-center justify-center w-full h-full bg-white rounded-full">
        <div className="w-3 h-3 rounded-full md:w-4 md:h-4 bg-gradient-to-br from-spj-red to-spj-yellow" />
      </div>
    </div>
    {dot.position === 'bottom' && <DotInfo dot={dot} />}
  </div>
);

const DotInfo = ({ dot }: { dot: DesignType['desktop']['dots'][0] }) => (
  <Link href={`https://store.spacejoy.com/products/${dot.slug}`} passHref>
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="px-2 py-1 text-xs font-semibold transition-all duration-300 bg-white rounded-md shadow-md md:px-3 md:text-sm hover:scale-110"
    >
      <p className="text-[0.5rem] text-left text-gray-400 md:text-xs">{dot.retailer}</p>
      <div className="flex items-center space-x-2 max-w-[100px] md:max-w-none">
        <span>{dot.label}</span> <ExternalLinkIcon className="hidden w-4 h-4 md:block" />
      </div>
    </a>
  </Link>
);

const ImageWithDots: React.FC<ImageWithDotsProps> = ({ designData }) => (
  <div className="relative">
    {/* Desktop */}
    <div className="relative w-full group hidden md:block aspect-[2.39/1]">
      <Image
        src={`https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto${designData.desktop.imgSrc}`}
        alt={designData.name}
        layout="fill"
        objectFit="cover"
        className="rounded-md shadow-md"
        priority
        placeholder="blur"
        blurDataURL="/placeholder.jpg"
      />
      {designData.desktop.dots.map((dot) => (
        <DotElement key={dot.id} dot={dot} />
      ))}
    </div>

    {/* Mobile */}
    <div className="relative w-full group md:hidden aspect-[1/1.5]">
      <Image
        src={`https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto${designData.mobile.imgSrc}`}
        alt={designData.name}
        layout="fill"
        objectFit="cover"
        className="rounded-md shadow-md"
        placeholder="blur"
        blurDataURL="/placeholder.jpg"
      />
      {designData.mobile.dots.map((dot) => (
        <DotElement key={dot.id} dot={dot} />
      ))}
    </div>

    <div className="absolute bottom-0 left-0 font-medium text-white leading-[1] bg-black rounded-tr-[2rem] backdrop-blur-lg bg-opacity-30 p-6 max-w-xl">
      <Link href={designData.url ?? '#'} passHref>
        <a target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:underline">
          <p className="text-lg md:text-2xl">{designData.name}</p>
          <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
        </a>
      </Link>
      <p className="text-sm md:text-base opacity-80">{designData.description}</p>
    </div>
  </div>
);

export default ImageWithDots;
