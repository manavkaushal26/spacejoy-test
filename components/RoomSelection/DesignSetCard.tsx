import { CollagesListInterface } from '@components/Collages/interface';
import { CubeIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface DesignSetCardProps {
  designData: CollagesListInterface;
  large: boolean;
}

const DesignSetCard: React.FC<DesignSetCardProps> = ({ designData, large }) => {
  return (
    <Link
      href={{
        pathname: `/design-sets/${designData?._id}`,
      }}
    >
      <a>
        <div
          className={`border rounded-lg border-solid border-gray-300 h-full w-full py-4 px-8 flex gap-x-8 transition-shadow cursor-pointer hover:shadow-lg ${
            large ? 'flex-col' : 'flex-row'
          }`}
        >
          <div className={`relative aspect-w-16  ${large ? 'aspect-h-9' : 'aspect-ratio-6'} ${!large && 'w-full'}`}>
            <Image
              src={`https://res.cloudinary.com/spacejoy/image/upload/ar_1.67,c_mpad/e_trim/fl_lossy,q_auto,ar_1.67,${
                large ? 'w_1400' : 'w_600'
              },c_pad,b_auto/${designData?.thumbnail}`}
              layout="fill"
              alt={designData?.collageId}
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col justify-around">
            <div>
              <div className={`capitalize text-lg ${large && 'mt-4'} mb-1 line-clamp-1 font-bold tracking-normal`}>
                {designData?.name.slice(0, -11)}
              </div>
              <div className="flex justify-between gap-x-8 gap-y-1 flex-wrap">
                <div>
                  &#9733; Contains: Products from <span className="text-yellow-500">Wayfair, Target, etc</span>
                </div>
                <div className="flex gap-2 items-center opacity-0">
                  <CubeIcon className="w-4 h-4" /> Ships Friday!
                </div>
              </div>
              <div className="font-bold text-xl mt-2 mb-4">${designData?.price.toFixed(2)}</div>

              <div className="flex gap-4">
                <a className="px-4 py-2 border border-black rounded-lg bg-black text-white">Personalize</a>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DesignSetCard;
