import { HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { blurredBgImage } from '@public/images/bg-base-64';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface DesignCardInterface {
  cardData: {
    name: string;
    slug: string;
    cdnRender: Array<string>;
    room: {
      slug: string;
      roomType: string;
    };
  };
}
const correctedSlug = (slug: string) => {
  return slug?.split(' ').join('-');
};

const DesignCard: React.FC<DesignCardInterface> = ({ cardData }) => {
  return (
    <Link href={`/interior-designs/${correctedSlug(cardData.room.slug)}/${cardData?.slug}`}>
      <a>
        <div className="cursor-pointer group">
          <div className="relative overflow-hidden transition border border-gray-200 rounded group-hover:shadow-md">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            <Image
              className="object-cover transition duration-700 transform filter group-hover:brightness-110"
              alt={cardData?.name}
              src={`${imageKit.baseDeliveryUrlShort}${cardData?.cdnRender[0]}`}
              height="300"
              width="500"
              layout="responsive"
              placeholder="blur"
              blurDataURL={blurredBgImage}
            />
          </div>
          <div className="flex items-center my-2">
            <div className="flex-1 mr-2">
              <p className="text-xs text-gray-500 capitalize">{cardData?.room?.roomType}</p>
              <p className="mt-1 text-gray-800 transition group-hover:text-red-500">{cardData?.name}</p>
            </div>
            {/* <div>
              <button
                type="button"
                className="px-2 py-2 text-xs text-gray-700 rounded-full focus:outline-none hover:shadow-sm hover:bg-gray-100"
              >
                <span className="sr-only">Like</span>
                <HeartIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="px-2 py-2 text-xs text-gray-700 rounded-full focus:outline-none hover:shadow-sm hover:bg-gray-100"
              >
                <span className="sr-only">Share</span>
                <ShareIcon className="w-5 h-5" />
              </button>
            </div> */}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DesignCard;
