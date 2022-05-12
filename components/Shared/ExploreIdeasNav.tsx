import { ArrowRightIcon } from '@heroicons/react/outline';
import { PushEvent } from '@utils/analyticsLogger';
import { oldSpacejoyUrl } from '@utils/config';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export const ExploreIdeasNav = () => {
  const mobile = Cookies.get('isMobile') === 'true' ? true : false;

  return (
    <div className="z-10">
      <div className="flex space-x-10">
        <Link href="/interior-designs" passHref>
          <a
            onClick={() => {
              PushEvent({
                category: `Top Nav - Explore Ideas`,
                action: `Go to Interior Designs`,
                label: `Interior Designs`,
              });
            }}
          >
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-yellow-50 hover:bg-yellow-100 hover:shadow-md">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1618336397/blog_spacejoy/midcentury-modern-style-decor.png"
                  alt="Interior Designs"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl "
                  // objectFit='contain'
                />
              </div>
              <div className="flex justify-between p-4">
                <h3 className="text-base font-poppins">Design Ideas</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full" />
              </div>
            </div>
          </a>
        </Link>

        <Link href="/collection" passHref>
          <a>
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-orange-50 hover:bg-orange-100 hover:shadow-md">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1644326196/spj-v2/collection_oy3r9v.jpg"
                  alt="Collection"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl "
                  // objectFit='contain'
                />
              </div>
              <div className="flex justify-between p-4">
                <h3 className="text-lg font-poppins">Popular Lookbooks</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full" />
              </div>
            </div>
          </a>
        </Link>

        <Link href={`/interior-designs-blog`} passHref>
          <a
            onClick={() => {
              PushEvent({
                category: `Top Nav - Explore Ideas`,
                action: `Go to Tips & Guides`,
                label: `Tips & Guides`,
              });
            }}
          >
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-blue-50 hover:bg-blue-100 hover:shadow-md">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1644244318/spj-v2/tips_and_guides_suvngg.jpg"
                  alt="Tips and Guides"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl "
                />
              </div>
              <div className="flex justify-between p-4">
                <h3 className="text-base font-poppins">Tips &amp; Guides</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full" />
              </div>
            </div>
          </a>
        </Link>

        <Link href={`/customer-stories`} passHref>
          <a
            onClick={() => {
              PushEvent({
                category: `Top Nav - Explore Ideas`,
                action: `Go to Customer Stories`,
                label: `Customer Stories`,
              });
            }}
          >
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-green-50 hover:bg-green-100 hover:shadow-md">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1644244341/spj-v2/customer_stories_cdytgy.jpg"
                  alt="Customer Stories"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl "
                  // objectFit='contain'
                />
              </div>
              <div className="flex justify-between p-4">
                <h3 className="text-base font-poppins">Customer Stories & Reviews</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full" />
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
