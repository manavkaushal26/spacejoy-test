import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { blurredBgImage } from '@public/images/bg-base-64';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';

const CustomerStoryCard = ({ data }) => {
  return (
    <Link href={`/customer-stories/${data.slug}`}>
      <a>
        <div className="cursor-pointer">
          <div className="relative transition border border-gray-200 rounded group-hover:shadow-md">
            <div className="relative ">
              <div className="absolute inset-0" />
              <Image
                className="object-cover transition duration-700 transform rounded-t-lg filter group-hover:brightness-110 hover:brightness-110 hover:scale-105"
                alt={data?.name}
                src={`${imageKit.baseDeliveryUrlShort}${data?.afterImage.cdn}`}
                height="300"
                width="500"
                layout="responsive"
                placeholder="blur"
                blurDataURL={blurredBgImage}
              />
            </div>
            <div className=" absolute -bottom-3 right-3 rounded-full ring-2 ring-white bg-[#F39C12] h-14 w-14  -mb-1 border-1 border-white overflow-hidden">
              <Image
                src={`${imageKit.baseDeliveryUrl}/${data.customerAvatar}`}
                alt={`${data.customerName}`}
                layout="fill"
              />
            </div>
          </div>

          <div className="flex items-center px-4 py-4 bg-white rounded-b-lg">
            <div className="flex-1 mr-2">
              <p className="mt-1 text-gray-800 transition hover:text-red-500 line-clamp-2">{data?.title}</p>
              <p className="text-xs text-gray-500 capitalize">{`${data.meta?.roomType} Designed For ${data.customerName}`}</p>
              <button className="flex mt-4 text-sm align-middle transition hover:text-red-500">
                Read Full Story <ChevronRightIcon className="w-4 h-4 pt-1" />
              </button>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CustomerStoryCard;
