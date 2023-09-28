import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { blurredBgImage } from '@public/images/bg-base-64';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';

const correctedSlug = (slug: string) => {
  return slug?.split(' ').join('-');
};

const SimilarPickCard = ({ data }) => {
  return (
    <Link href={`/interior-designs/${correctedSlug(data.room.slug)}/${data?.slug}`}>
      <a className="inline-block w-full mt-5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-700 focus:outline-none">
        <div className="relative overflow-hidden transition-all duration-300 transform bg-gray-200 shadow-sm hover:shadow-xl hover:scale-105">
          <div className="w-full aspect-w-2 aspect-h-1">
            <Image
              alt={data?.name}
              src={`${imageKit.baseDeliveryUrlShort}${data?.cdnRender[0]}`}
              className="object-cover object-center w-full h-full rounded-lg"
              layout="fill"
              placeholder="blur"
              blurDataURL={blurredBgImage}
            />
          </div>
          <div className="absolute bottom-0 w-full px-4 py-4 rounded-b-lg h-fit bg-gradient-to-t from-gray-900 to-transparent">
            <p className="mb-1 text-sm text-white md:text-base sm:text-xl line-clamp-2">
              {data?.name}
              <ArrowRightIcon className="inline w-4 h-4 transition-transform transform hover:translate-x-3" />
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SimilarPickCard;
