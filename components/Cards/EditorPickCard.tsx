import { blurredBgImage } from '@public/images/bg-base-64';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RecommendedIcon from '@public/images/recommended.svg';
import { imageKit } from '@utils/config';

const correctedSlug = (slug: string) => {
  return slug?.split(' ').join('-');
};

const EditorPickCard = ({ data }) => {
  return (
    <Link
      href={`/interior-designs/${correctedSlug(data.room.slug)}/${data?.slug}`}
      as={`/interior-designs/${correctedSlug(data?.room?.slug)}/${data?.slug}`}
    >
      <a>
        <div className="mt-8 cursor-pointer">
          <div className="relative overflow-hidden transition border border-gray-200 rounded group-hover:shadow-md">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            <Image
              className="object-cover transition duration-700 transform rounded-t-lg filter group-hover:brightness-110 hover:brightness-110 hover:scale-105"
              alt={data?.name}
              src={`${imageKit.baseDeliveryUrlShort}${data?.cdnRender[0]}`}
              height="300"
              width="500"
              layout="responsive"
              placeholder="blur"
              blurDataURL={blurredBgImage}
            />
            <div className="absolute rounded-full ring-2 ring-white bg-[#F39C12] h-10 w-10 top-5 right-5 -mb-1 border-1 border-white overflow-hidden">
              <Image src={RecommendedIcon} alt={`${data.customerName}`} layout="fill" />
            </div>
          </div>
          <div className="flex items-center px-4 py-4 bg-white rounded-b-lg">
            <div className="flex-1 mr-2">
              <p className="text-xs text-gray-500 capitalize">{data?.room?.roomType}</p>
              <p className="mt-1 text-gray-800 transition hover:text-red-500 line-clamp-2">{data?.name}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default EditorPickCard;
