import { ArrowRightIcon } from '@heroicons/react/outline';
import { blurredBgImage } from '@public/images/bg-base-64';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CollectionCardDataInterface } from './interface';

interface CollectionCardInterface {
  cardData: CollectionCardDataInterface;
  inset: boolean;
}

const CollectionCard: React.FC<CollectionCardInterface> = ({ cardData, inset }) => {
  return (
    <li>
      <Link href={`/interior-designs/${cardData?.slug}`}>
        <a className="inline-block w-full rounded focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-700 focus:outline-none">
          <div className="relative overflow-hidden transition-all duration-300 transform bg-gray-200 border border-gray-300 rounded shadow-sm group hover:shadow-xl hover:-translate-y-1">
            {inset ? (
              <Image
                className="object-cover rounded"
                alt={cardData?.name}
                src={imageKit.baseDeliveryUrl + '/' + cardData?.cdnThumbnail}
                height="300"
                width="225"
                placeholder="blur"
                blurDataURL={blurredBgImage}
              />
            ) : (
              <div className="w-full aspect-w-2 aspect-h-1">
                <Image
                  alt={cardData?.name}
                  src={imageKit.baseDeliveryUrlShort + '/' + cardData?.cdnThumbnail}
                  className="object-cover object-center w-full h-full"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={blurredBgImage}
                />
              </div>
            )}
            {inset && (
              <div className="absolute bottom-0 left-0 right-0 px-4 pt-16 pb-4 bg-gradient-to-t from-gray-900 to-transparent">
                <p className="mb-1 text-base font-bold text-white sm:text-xl">
                  {cardData?.name}
                  <ArrowRightIcon className="inline w-4 h-4 transition-transform transform group-hover:translate-x-3" />
                </p>
                {/* <p className="text-xs text-gray-300 sm:text-sm">{cardData?.metaTitle}</p> */}
              </div>
            )}
          </div>
          {!inset && (
            <div className="pt-4">
              <p className="text-base font-semibold sm:text-lg">{cardData?.name}</p>
              {/* <p className="text-xs text-gray-500 sm:text-sm">{cardData?.metaTitle}</p> */}
            </div>
          )}
        </a>
      </Link>
    </li>
  );
};

export default React.memo(CollectionCard);
