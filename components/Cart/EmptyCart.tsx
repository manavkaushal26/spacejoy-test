import { PushEvent } from '@utils/analyticsLogger';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { oldSpacejoyUrl } from '@utils/config';
import shoppingBagIcon from '@public/images/empty-bag.svg';

const EmptyCart = () => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={shoppingBagIcon}
            alt="Interior Designs"
            width={90}
            height={100}
            className="rounded-tl-xl rounded-tr-xl"
          />
          <h3 className="text-xl">Your cart is empty</h3>
          <h5 className="text-xs">Looks like you have not added anything to your cart.</h5>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl">Here are a few suggestions curated for you:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <Link href="/room-select" passHref>
              <a
                onClick={() => {
                  PushEvent({
                    category: `Empty Cart - Explore Design Sets`,
                    action: `Go to design sets listing page`,
                    label: `Explore Design Sets`,
                  });
                }}
              >
                <div className="h-full shadow-lg cursor-pointer rounded-xl hover:bg-gray-100">
                  <div className="relative w-full ">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1645524503/web/icons/image_2_qrba31.svg"
                      alt="Interior Designs"
                      width={300}
                      height={280}
                      className="rounded-tl-xl rounded-tr-xl"
                    />
                  </div>
                  <div className="flex flex-col p-4 items-center">
                    <h3 className="text-lg font-poppins">Explore design sets</h3>
                    <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full my-2" />
                  </div>
                </div>
              </a>
            </Link>

            <Link href="/shop" passHref>
              <a
                onClick={() => {
                  PushEvent({
                    category: `Empty Cart - Explore Products`,
                    action: `Go to Shop Page`,
                    label: `Explore Products`,
                  });
                }}
              >
                <div className="h-full shadow-lg cursor-pointer rounded-xl hover:bg-gray-100">
                  <div className="relative w-full ">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1645524498/web/icons/image_1_xamr3b.svg"
                      alt="Tips and Guides"
                      width={300}
                      height={280}
                      className="rounded-tl-xl rounded-tr-xl"
                    />
                  </div>
                  <div className="flex flex-col p-4 items-center">
                    <h3 className="text-lg font-poppins">Explore products</h3>
                    <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full my-2" />
                  </div>
                </div>
              </a>
            </Link>

            <Link href={`${oldSpacejoyUrl}/trending-items`} passHref>
              <a
                target="_blank"
                onClick={() => {
                  PushEvent({
                    category: `Empty Cart - Get the latest deals`,
                    action: `Go to Trending Items`,
                    label: `Get the latest deals`,
                  });
                }}
              >
                <div className="h-full shadow-lg cursor-pointer rounded-xl hover:bg-gray-100">
                  <div className="relative w-full">
                    <Image
                      src="https://res.cloudinary.com/spacejoy/image/upload/v1645524493/web/icons/image_3_v3vwfl.svg"
                      alt="Customer Stories"
                      width={300}
                      height={280}
                      className="rounded-tl-xl rounded-tr-xl"
                    />
                  </div>
                  <div className="flex flex-col p-4 items-center">
                    <h3 className="text-lg font-poppins">Get the latest deals</h3>
                    <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full my-2" />
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
