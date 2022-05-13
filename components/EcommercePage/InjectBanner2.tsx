import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { oldSpacejoyUrl } from '@utils/config';

const InjectBanner2 = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 mt-16 mb-8">
      <a href={`${oldSpacejoyUrl}/referrals`} target="_blank" rel="noreferrer">
        <div className="relative hidden sm:block aspect-[80/23]">
          <Image
            src="https://res.cloudinary.com/spacejoy/image/upload/v1652365416/web/Cart_Banner_ixjnn6.jpg"
            alt="Affirm Banner"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="relative sm:hidden aspect-[300/337]">
          <Image
            src="https://res.cloudinary.com/spacejoy/image/upload/v1652437331/web/Referral_Banner_Mobile-min_kwdwea.jpg"
            alt="Affirm Banner"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </a>
    </div>
  );
};

export default InjectBanner2;
