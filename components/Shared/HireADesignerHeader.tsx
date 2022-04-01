import { ArrowRightIcon } from '@heroicons/react/outline';
import { PushEvent } from '@utils/analyticsLogger';
import { oldSpacejoyUrl } from '@utils/config';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export const HireADesignerHeader = () => {
  const mobile = Cookies.get('isMobile') === 'true' ? true : false;

  return (
    <div className="max-w-screen-xl ">
      <div className="flex space-x-10 justify-between">
        <Link href={`${oldSpacejoyUrl}/online-interior-design`} passHref>
          <a target="_blank">
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-green-50 hover:bg-green-100 hover:shadow-md">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1644242817/spj-v2/interior_designs_v5ctez.jpg"
                  alt="Interior Designs"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="flex justify-between p-4">
                <h3 className="text-xl font-poppins">Online Interior Design</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full" />
              </div>
            </div>
          </a>
        </Link>

        <Link href={`${oldSpacejoyUrl}/pricing`} passHref>
          <a target="_blank">
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-rose-50 hover:bg-rose-100 hover:shadow-md">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1621586303/web/icons/Price-match_yrxifw.svg"
                  alt="Pricing"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="flex justify-between p-4">
                <h3 className="text-xl font-poppins">Pricing</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full" />
              </div>
            </div>
          </a>
        </Link>

        <Link href={`${oldSpacejoyUrl}/interior-designs-blog`} passHref>
          <a
            target="_blank"
            onClick={() => {
              PushEvent({
                category: `Top Nav - Explore Ideas`,
                action: `Go to Tips & Guides`,
                label: `Tips & Guides`,
              });
            }}
          >
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-cyan-50 hover:bg-cyan-100 hover:shadow-md">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1644244318/spj-v2/tips_and_guides_suvngg.jpg"
                  alt="Tips and Guides"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="flex justify-between p-4">
                <h3 className="text-xl font-poppins">Tips &amp; Guides</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full" />
              </div>
            </div>
          </a>
        </Link>

        <Link href={`${oldSpacejoyUrl}/customer-stories`} passHref>
          <a
            target="_blank"
            onClick={() => {
              PushEvent({
                category: `Top Nav - Explore Ideas`,
                action: `Go to Customer Stories`,
                label: `Customer Stories`,
              });
            }}
          >
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-yellow-50 hover:bg-yellow-100 hover:shadow-md">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1644244341/spj-v2/customer_stories_cdytgy.jpg"
                  alt="Customer Stories"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="flex justify-between p-4">
                <h3 className="text-xl font-poppins">Customer Stories</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full" />
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
