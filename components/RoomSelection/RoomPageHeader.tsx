import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const RoomPageHeader: NextPage<{ category: string }> = ({ category }) => {
  return (
    <div className="flex my-4 gap-4 items-center">
      <div className="w-1/2 text-4xl xl:leading-snug">
      <span className="font-bold capitalize">{category} Sets</span>
        
      </div>
      <div className="w-1/2 bg-gray-100 rounded-3xl py-4 px-6 flex gap-4 items-center justify-between">
        <span className="text-xl text-bold flex-grow font-bold">
        Shop products from your <br/>favorite pins
        </span>
        <Link href="/pinterest/search">
          <a className=" flex-grow bg-red-600/75 px-3 py-3 rounded-full text-ellipsis overflow-hidden  flex space-between text-base items-center transition-all font-bold gap-4 text-white hover:shadow-lg ">
            <Image
              src={
                'https://res.cloudinary.com/spacejoy/image/upload/v1640335624/web/pinterest-integration/icons/badgeRGB-FFFFFF_iozyje.svg'
              }
              alt="pinterest logo"
              className=" h-8 w-8"
              width="64px"
              height="64px"
            />
            <span className="whitespace-nowrap text-ellipsis">Connect to Pinterest</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default RoomPageHeader;
