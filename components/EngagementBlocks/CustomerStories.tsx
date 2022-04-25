import { ChevronRightIcon } from '@heroicons/react/outline';
import { blurredBgImage } from '@public/images/bg-base-64';
import RecommendedIcon from '@public/images/recommended.svg';
import { cloudinary } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const correctedSlug = (slug: string) => {
  return slug?.split(' ').join('-');
};

export const CustomerStoryCard = ({ data }) => {
  return (
    <Link href={{ pathname: '/customer-stories', query: { slug: data.slug } }} as={`/customer-stories/${data.slug}`}>
      <a>
        <div className="cursor-pointer sm:mt-8">
          <div className=" rounded relative border border-gray-200 transition group-hover:shadow-md">
            <div className=' relative'>
            <div className="absolute inset-0" />
            <Image
              className="object-cover transition duration-700 filter transform group-hover:brightness-110 hover:brightness-110 hover:scale-105"
              alt={data?.name}
              src={`https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_1000,h_600/${data?.afterImage.cdn}`}
              height="300"
              width="500"
              layout="responsive"
              placeholder="blur"
              blurDataURL={blurredBgImage}
            />
            
            </div>
            <div className=" absolute -bottom-3 right-3 rounded-full ring-2 ring-white bg-[#F39C12] h-14 w-14  -mb-1 border-1 border-white overflow-hidden">
              <Image
                src={`${cloudinary.baseDeliveryURL}/${data.customerAvatar}`}
                alt={`${data.customerName}`}
                layout="fill"
              />
            </div>
          </div>
          
          <div className="flex items-center py-4 px-4 bg-white">
            <div className="flex-1 mr-2">
              <p className="text-gray-800 mt-1 transition hover:text-red-500">{data?.title}</p>
              <p className="text-gray-500 text-xs capitalize">{`${data.meta?.roomType} Designed For ${data.customerName}`}</p>
              <button className="flex align-middle mt-4 text-sm transition hover:text-red-500">
                Read Full Story <ChevronRightIcon className="h-4 w-4 pt-1" />
              </button>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const CustomerStories = ({ data }) => {
  return (
    <>
      {data.length &&
        data.map((item) => {
          return <CustomerStoryCard data={item} key={item._id} />;
        })}
    </>
  );
};

export default React.memo(CustomerStories);
