import { newSpacejoyStoreUrl } from '@utils/config';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TopBarMobile = () => {
  return (
    <div className="flex justify-start space-x-2 overflow-x-auto hide-scrollbar">
      <div className="p-2 mb-2 bg-gray-100 border-2 rounded-md cursor-pointer border-b-indigo-500">
        <Link href={`/quiz/start-quiz`} passHref>
          <a rel="noreferrer">
            <div className="flex space-x-3">
              <div className="relative w-8 h-8 aspect-1">
                <Image
                  src={`${imageKit.baseDeliveryUrl}/v1637051084/web/icons/find_products_tyqdmn.svg`}
                  alt=""
                  layout="responsive"
                  height={50}
                  width={50}
                />
              </div>
              <span className="text-[10px] my-auto whitespace-nowrap">
                <span className="text-xs font-bold">Start</span>
                <br /> Project
              </span>
            </div>
          </a>
        </Link>
      </div>
      {/* <div className="p-2 mb-2 bg-gray-100 border-2 rounded-md cursor-pointer border-b-lime-400">
        <Link href={`/room-select`} passHref>
          <a rel="noreferrer">
            <div className="flex space-x-3">
              <div className="relative w-8 h-8 aspect-1">
                <Image
                  src={`${imageKit.baseDeliveryUrl}/v1622456552/web/icons/diy-1_zc1c5q.svg`}
                  alt=""
                  layout="responsive"
                  height={50}
                  width={50}
                />
              </div>
              <span className="text-[10px] my-auto whitespace-nowrap">
                <span className="text-xs font-bold">Shop</span>
                <br /> Sets
              </span>
            </div>
          </a>
        </Link>
      </div> */}
      <div className="p-2 mb-2 bg-gray-100 border-2 rounded-md cursor-pointer border-b-rose-300">
        <Link href={`/shop-furniture-decor`} passHref>
          <a rel="noreferrer">
            <div className="flex space-x-3">
              <div className="relative w-8 h-8 aspect-1">
                <Image
                  src={`${imageKit.baseDeliveryUrl}/v1597998234/web/shopping_thc5s3.svg`}
                  alt=""
                  layout="responsive"
                  height={50}
                  width={50}
                />
              </div>
              <span className="my-auto text-xs whitespace-nowrap">
                <span className="font-bold ">Shop</span>
              </span>
            </div>
            <span className="my-auto text-xs whitespace-nowrap">
              <span className="font-bold ">Shop</span>
            </span>
          </a>
        </Link>
      </div>
      {/* <div className="p-2 mb-2 bg-gray-100 border-2 rounded-md cursor-pointer border-b-blue-300">
        <Link href={`${oldSpacejoyUrl}/interior-designs-blog`} passHref>
          <a rel="noreferrer">
          <div className="flex space-x-1">
              <div className='relative aspect-1 h-7 w-7'>
                <Image
                src={`${imageKit.baseDeliveryUrl}/v1588099575/web/icons/idea_ns0dy1.svg`}
                alt=""
                layout='responsive'
                height={50}
                width={50}
              /></div>
              <span className="my-auto text-sm whitespace-nowrap">Tips & Guides</span>
            </div>
          </a>
        </Link>
      </div> */}
    </div>
  );
};

export default TopBarMobile;
