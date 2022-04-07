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
    <div className="">
      <div className="flex space-x-10 justify-between">

        <Link href="/pricing" passHref>
          <a>
            <div className="h-full shadow-sm cursor-pointer rounded-xl bg-indigo-50 hover:bg-indigo-100 hover:shadow-md">
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

      </div>
    </div>
  );
};
