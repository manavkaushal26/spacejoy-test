import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageKit, oldSpacejoyUrl } from '@utils/config';
import { PushEvent } from '@utils/analyticsLogger';

const InjectBanner2 = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 mt-16 mb-8">
      <a
        href={`${oldSpacejoyUrl}/referrals`}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          PushEvent({
            category: 'Referrals Banner Click',
            action: `Go to Referrals Page`,
            label: `Refer a Friend`,
          });
        }}
      >
        <div className="relative hidden sm:block aspect-[80/23]">
          <Image
            src={`${imageKit.baseDeliveryUrl}/v1652365416/web/Cart_Banner_ixjnn6.jpg`}
            alt="Affirm Banner"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="relative sm:hidden aspect-[300/337]">
          <Image
            src={`${imageKit.baseDeliveryUrl}/v1652437331/web/Referral_Banner_Mobile-min_kwdwea.jpg`}
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
