import { ArrowRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React from 'react';

const CustomerStoriesNav = () => {
  return (
    <div className="max-w-screen-xl min-h-[80vh]">
      <div className="grid grid-cols-4 gap-10">
        <div
          className="h-full shadow-sm cursor-pointer rounded-xl bg-green-50 hover:bg-green-100"
          onClick={() => (location.href = `/interior-designs`)}
        >
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

        <div
          className="h-full shadow-sm cursor-pointer rounded-xl bg-red-50 hover:bg-red-100"
          onClick={() => (location.href = `/collection`)}
        >
          <div className="relative w-full">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/v1644244135/spj-v2/collections_silwlq.jpg"
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
        </div>

        <div
          className="h-full shadow-sm cursor-pointer rounded-xl bg-cyan-50 hover:bg-cyan-100"
          onClick={() => (location.href = `https://www.spacejoy.com/interior-designs-blog`)}
        >
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

        <div
          className="h-full shadow-sm cursor-pointer rounded-xl bg-yellow-50 hover:bg-yellow-100"
          onClick={() => (location.href = `https://www.spacejoy.com/customer-stories`)}
        >
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
      </div>
    </div>
  );
};

export default React.memo(CustomerStoriesNav);
