import { ArrowRightIcon } from '@heroicons/react/outline';
import { cloudinary } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const entry = keyframes`
	from { 
		opacity: 0;
    transform: scale(0.7);
	}
	to {
    opacity: 1;
    transform: scale(1);
	}
`;

const AnimateBox = styled.span<{ index: number }>`
  opacity: 0;
  transform: scale(0.7);
  animation: ${entry} ${({ index }) => `${index * 0.4 + 0.4}s`} forwards;
`;

interface TopCollageCardInterface {
  cardData: {
    slug: string;
    cdnThumbnail: string;
    name: string;
    metaTitle: string;
  };
  inset: boolean;
  index: number;
}

const TopCollageCard: React.FC<TopCollageCardInterface> = ({ cardData, inset, index }) => {
  return (
    <AnimateBox index={index} className="inline-block">
      <Link href={`/design-sets/room/${cardData?.slug}`}>
        <a className="rounded-2xl  focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-700 focus:outline-none block">
          <div className="group rounded-2xl relative overflow-hidden bg-gray-200 transition-all transform duration-300  border border-gray-300 aspect-[0.77]">
            <Image
              className="rounded-2xl"
              alt={cardData?.name}
              src={`${cloudinary.baseDeliveryURL}/${cardData?.cdnThumbnail}`}
              layout="fill"
              objectFit="cover"
            />
            {inset && (
              <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-900 to-transparent pb-4 pt-16 px-4">
                <p className="text-xl font-bold text-white mb-1">
                  {cardData?.name}{' '}
                  <ArrowRightIcon className="transition-transform transform group-hover:translate-x-3 inline w-4 h-4" />
                </p>
                {/* <p className="text-gray-300 text-sm">{cardData?.metaTitle}</p> */}
              </div>
            )}
          </div>
          {!inset && (
            <div className="pt-4">
              <p className="text-lg font-semibold">{cardData?.name}</p>
              <p className="text-gray-500 text-sm">{cardData?.metaTitle}</p>
            </div>
          )}
        </a>
      </Link>
    </AnimateBox>
  );
};

export default React.memo(TopCollageCard);
