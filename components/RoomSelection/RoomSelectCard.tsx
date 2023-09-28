import { ArrowRightIcon } from '@heroicons/react/outline';
import { blurredBgImage } from '@public/images/bg-base-64';
import { PushEvent } from '@utils/analyticsLogger';
import { imageKit } from '@utils/config';
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
  disabled: boolean;
}

const TopCollageCard: React.FC<TopCollageCardInterface> = ({ cardData, inset, index, disabled }) => {

  return (
    <AnimateBox index={index} className="inline-block">
      {!disabled ? (
        <Link href={`/design-sets/room/${cardData?.slug}`}>
          <a
            className="block rounded-2xl focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-700 focus:outline-none"
            onClick={() => {
              PushEvent({
                category: `Design ${cardData?.name}`,
                action: `Go to ${cardData?.name} List Page`,
                label: `Design Space`,
              });
            }}
          >
            <div className="relative transition-all duration-300 transform bg-gray-200 border border-gray-300 rounded-lg shadow-sm group hover:shadow-xl hover:-translate-y-1">
              {inset ? (
                <Image
                  className="object-cover rounded-lg"
                  alt={cardData?.name}
                  src={`${imageKit.baseDeliveryUrl}/${cardData?.cdnThumbnail}`}
                  height="600"
                  width="500"
                  placeholder="blur"
                  blurDataURL={blurredBgImage}
                />
              ) : (
                <div className="w-full aspect-w-2 aspect-h-1">
                  <Image
                    alt={cardData?.name}
                    src={`${imageKit.baseDeliveryUrl}/${cardData?.cdnThumbnail}`}
                    className="object-cover object-center w-full h-full"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgImage}
                  />
                </div>
              )}
              {inset && (
                <div className="absolute bottom-0 left-0 right-0 px-4 pt-16 pb-4 bg-gradient-to-t from-gray-900 to-transparent">
                  <p className="mb-1 text-2xl font-bold text-white capitalize">
                    {cardData?.name}{' '}
                    <ArrowRightIcon className="inline w-5 h-5 transition-transform transform group-hover:translate-x-3" />
                  </p>
                  {/* <p className="text-sm text-gray-300">{cardData?.metaTitle}</p> */}
                </div>
              )}
            </div>
            {!inset && (
              <div className="pt-4">
                <p className="text-lg font-semibold capitalize">{cardData?.name}</p>
                <p className="text-sm text-gray-500">{cardData?.metaTitle}</p>
              </div>
            )}
          </a>
        </Link>
      ) : (
        <a
          // onMouseEnter={() => sendGAEvent()}
          // onClick={() => sendGAEvent(true)}
          className={`"block rounded-2xl focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-700 focus:outline-none${
            disabled ? 'grayscale cursor-default' : ''
          }`}
        >
          <div className="relative overflow-hidden transition-all duration-300 transform bg-gray-200 border border-gray-300 rounded shadow-sm group next-image-fix hover:shadow-xl hover:-translate-y-1">
            <Image
              className="object-cover rounded"
              alt={cardData?.name}
              src={`${imageKit.baseDeliveryUrl}/${cardData?.cdnThumbnail}`}
              height="600"
              width="500"
            />
            {inset && (
              <div className="absolute bottom-0 left-0 right-0 px-4 pt-16 pb-4 bg-gradient-to-t from-gray-900 to-transparent">
                <p className="mb-1 text-xl font-bold text-white capitalize">
                  {cardData?.name}{' '}
                  <ArrowRightIcon className="inline w-4 h-4 transition-transform transform group-hover:translate-x-3" />
                </p>
                {/* <p className="text-sm text-gray-300">{cardData?.metaTitle}</p> */}
              </div>
            )}
            {disabled && (
              <section className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white transition-opacity opacity-0 group-hover:opacity-100 bg-black/60 ">
                <span className="transition-transform translate-y-1 group-hover:translate-y-0">Coming Soon!</span>
              </section>
            )}
          </div>
          {!inset && (
            <div className="pt-4">
              <p className="text-lg font-semibold capitalize">{cardData?.name}</p>
              <p className="text-sm text-gray-500">{cardData?.metaTitle}</p>
            </div>
          )}
        </a>
      )}
    </AnimateBox>
  );
};

export default React.memo(TopCollageCard);
