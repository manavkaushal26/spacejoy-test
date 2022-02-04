import { ArrowRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React from 'react';

const CustomerStoriesNav = () => {
  return (
    <div className=" max-w-800 max-w-screen-xl">
      <div className="grid grid-cols-4 gap-10">
        <div className="shadow-sm rounded-xl bg-green-50 h-full cursor-pointer hover:bg-green-100" onClick={()=>location.href="/interior-designs"}>
          <div className="flex h-full p-4 flex-col">
            <div className="text-left">
              <Image
                src="https://res.cloudinary.com/spacejoy/image/upload/v1643898253/spj-v2/3d-icons/Icon_qtem1z.png"
                alt="No markups"
                height={'50'}
                width={'65'}
                layout="intrinsic"
              />
            </div>
            <div>
              <h3 className="text-lg mt-2 text-green-700 font-poppins">Interior Designs</h3>
              <p className="text-sm mb-2">Discover inspiration for your next design project</p>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="shadow-sm rounded-xl bg-red-50 h-full cursor-pointer hover:bg-red-100" onClick={()=>location.href="/collection"}>
          <div className="flex h-full p-4 flex-col">
            <div className="text-left">
              <Image
                src="https://res.cloudinary.com/spacejoy/image/upload/v1643898249/spj-v2/3d-icons/Group_rp4mis.png"
                alt="No markups"
                height={'50'}
                width={'65'}
                layout="intrinsic"
              />
            </div>
            <div>
              <h3 className="text-lg mt-2 text-red-700 font-poppins">Collection</h3>
              <p className="text-sm mb-2">Explore ideas for every style and space</p>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="shadow-sm rounded-xl bg-cyan-50 h-full cursor-pointer hover:bg-cyan-100" onClick={()=>location.href="https://www.spacejoy.com/interior-designs-blog"}>
          <div className="flex h-full p-4 flex-col">
            <div>
              <Image
                src="https://res.cloudinary.com/spacejoy/image/upload/v1643898245/spj-v2/3d-icons/Group_1_t66jhx.png"
                alt="No markups"
                height={'50'}
                width={'50'}
                layout="intrinsic"
              />
            </div>
            <div>
              <h3 className="text-lg mt-2 text-cyan-700 font-poppins">Design Matters</h3>
              <p className="text-sm mb-2">Tips & Guides</p>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="shadow-sm rounded-xl bg-yellow-50 h-full cursor-pointer hover:bg-yellow-100" onClick={()=>location.href="https://www.spacejoy.com/customer-stories"}>
          <div className="flex h-full p-4 flex-col ">
            <div>
              <Image
                src="https://res.cloudinary.com/spacejoy/image/upload/v1643898240/spj-v2/3d-icons/Group_2_mbdyzg.png"
                alt="No markups"
                height={'50'}
                width={'50'}
                layout="intrinsic"
              />
            </div>
            <div>
              <h3 className="text-lg mt-2 text-yellow-700 font-poppins">Customer Stories</h3>
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
