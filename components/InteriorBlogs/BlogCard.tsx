import { blurredBgImage } from '@public/images/bg-base-64';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BlogCardInterface } from './BlogListInterface';
import { imageKit } from '@utils/config';
import SVGIcon from '@components/SVGIcon';
import { ChevronRightIcon } from '@heroicons/react/outline';

interface Props {
  cardData: BlogCardInterface;
}

const BlogCard: React.FC<Props> = ({ cardData }) => {
  return (
    <Link href={`/interior-designs-blog/${cardData.slug}`}>
      <a>
        <div className="cursor-pointer group">
          <div className="relative overflow-hidden transition border border-gray-200 rounded  group-hover:shadow-xl">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            <Image
              className="object-cover transition duration-700 transform filter group-hover:brightness-110 hover:scale-105"
              alt={cardData?.title}
              src={`${imageKit.baseDeliveryUrlShort}${cardData?.coverImgCdn}`}
              height="300"
              width="500"
              layout="responsive"
              placeholder="blur"
              blurDataURL={blurredBgImage}
            />
          </div>
          <div className="flex items-center my-2">
            <div className="flex-1 mr-2">
              <p className="text-xs text-gray-500 capitalize">{cardData?.category?.title}</p>
              <p className="mt-1 font-semibold text-gray-800 line-clamp-1 ">{cardData?.title}</p>
              <p className="mt-1 text-xs text-gray-800 line-clamp-2">{cardData?.description}</p>
              <button className="flex py-2 text-sm align-middle transition group-hover:text-red-500">
                Read Full Story <ChevronRightIcon className="w-4 h-4 pt-1" />
              </button>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogCard;
