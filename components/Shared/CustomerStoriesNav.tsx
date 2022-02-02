import { ArrowRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React from 'react';

const CustomerStoriesNav = () => {
  return (
    <div className=" max-w-800 max-w-screen-xl">
      <div className="flex flex-row space-x-5">
        <div className="shadow-sm rounded-xl bg-yellow-100 h-full cursor-pointer hover:bg-yellow-200" onClick={()=>location.href="/interior-designs"}>
          <div className="flex h-full p-4 flex-col justify-end">
            <div className="text-left">
              <Image
                src="https://res.cloudinary.com/spacejoy/image/upload/v1622188228/spj-v2/3d-icons/spj-10_pcm6mi.svg"
                alt="No markups"
                height={'75'}
                width={'75'}
                layout="intrinsic"
              />
            </div>
            <div>
              <h3 className="text-lg mt-2 text-green-700 font-poppins">Interior Designs</h3>
              <p className="text-sm mb-2">Explore various creative designs by our team</p>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="shadow-sm rounded-xl bg-gray-100 h-full cursor-pointer hover:bg-gray-200" onClick={()=>location.href="/collection"}>
          <div className="flex h-full p-4 flex-col justify-end">
            <div className="text-left">
              <Image
                src="https://res.cloudinary.com/spacejoy/image/upload/v1622188245/spj-v2/3d-icons/spj-26_ifwect.svg"
                alt="No markups"
                height={'75'}
                width={'75'}
                layout="intrinsic"
              />
            </div>
            <div>
              <h3 className="text-lg mt-2 text-green-700 font-poppins">Collection</h3>
              <p className="text-sm mb-2">Largest collection of 3D rendered images</p>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="shadow-sm rounded-xl bg-teal-100 h-full cursor-pointer hover:bg-teal-200" onClick={()=>location.href="https://www.spacejoy.com/interior-designs-blog"}>
          <div className="flex h-full p-4 flex-col justify-end">
            <div>
              <Image
                src="https://res.cloudinary.com/spacejoy/image/upload/h_300,w_300/v1622188242/spj-v2/3d-icons/spj-25_dhewua.png"
                alt="No markups"
                height={'75'}
                width={'75'}
                layout="intrinsic"
              />
            </div>
            <div>
              <h3 className="text-lg mt-2 text-red-700 font-poppins">Design Matters</h3>
              <p className="text-sm mb-2">Tips & Guides</p>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="shadow-sm rounded-xl bg-red-100 h-full cursor-pointer hover:bg-red-200" onClick={()=>location.href="https://www.spacejoy.com/customer-stories"}>
          <div className="flex h-full p-4 flex-col justify-end">
            <div className="text-left">
              <Image
                src="https://res.cloudinary.com/spacejoy/image/upload/h_300,w_300/v1622188232/spj-v2/3d-icons/spj-13_khzmql.png"
                alt="No markups"
                height={'75'}
                width={'75'}
                layout="intrinsic"
              />
            </div>
            <div>
              <h3 className="text-lg mt-2 text-green-700 font-poppins">Customer Stories</h3>
              <p className="text-sm mb-2">100% Happiness Delivered</p>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomerStoriesNav);
