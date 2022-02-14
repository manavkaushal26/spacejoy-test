import { ArrowRightIcon } from '@heroicons/react/outline';
import { PushEvent } from '@utils/analyticsLogger';
import { oldSpacejoyUrl } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CustomerStoriesNav = () => {
  return (
    <div className="max-w-screen-xl min-h-[80vh]">
      <div className="grid grid-cols-4 gap-10">
        <Link href={`${oldSpacejoyUrl}/interior-designs`} passHref>
          <a
            target="_blank"
            onClick={() => {
              PushEvent({
                category: `Top Nav - Explore Ideas`,
                action: `Go to Interior Designs`,
                label: `Interior Designs`,
              });
            }}
          >
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-green-50 hover:bg-green-100">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1644242817/spj-v2/interior_designs_v5ctez.jpg"
                  alt="Interior Designs"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="flex flex-col p-4">
                <h3 className="text-xl font-poppins">Interior Designs</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full my-2" />
              </div>
            </div>
          </a>
        </Link>

        {/* <div
          className="h-full shadow-sm cursor-pointer rounded-xl bg-red-50 hover:bg-red-100"
          onClick={() => (location.href = `/collection`)}
        >
          <div className="relative w-full">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/v1644326196/spj-v2/collection_oy3r9v.jpg"
              alt="Collection"
              width={300}
              height={280}
              className="rounded-tl-xl rounded-tr-xl"
            />
          </div>
          <div className="flex flex-col p-4">
            <h3 className="text-xl font-poppins">Collection</h3>
            <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full my-2" />
          </div>
        </div> */}

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
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-cyan-50 hover:bg-cyan-100">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1644244318/spj-v2/tips_and_guides_suvngg.jpg"
                  alt="Tips and Guides"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="flex flex-col p-4">
                <h3 className="text-xl font-poppins">Tips &amp; Guides</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full my-2" />
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
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-yellow-50 hover:bg-yellow-100">
              <div className="relative w-full">
                <Image
                  src="https://res.cloudinary.com/spacejoy/image/upload/v1644244341/spj-v2/customer_stories_cdytgy.jpg"
                  alt="Customer Stories"
                  width={300}
                  height={280}
                  className="rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="flex flex-col p-4">
                <h3 className="text-xl font-poppins">Customer Stories</h3>
                <ArrowRightIcon className="w-9 h-9 p-[9px] text-white bg-black rounded-full my-2" />
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(CustomerStoriesNav);
