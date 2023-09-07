import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageKit } from '@utils/config';

const AffirmBanner = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 mt-16 mb-8">
      <div className="relative hidden sm:block aspect-[200/47]">
        <Image
          src={`${imageKit.baseDeliveryUrl}/fl_lossy,q_auto/v1647428160/web/homev3/Happy_St._Patrick_s_Day-07_ycee7y.jpg`}
          alt="Affirm Banner"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <div className="relative sm:hidden aspect-[160/119]">
        <Image
          src={`${imageKit.baseDeliveryUrl}/fl_lossy,q_auto/w_800/v1647428160/web/homev3/Happy_St._Patrick_s_Day-06_xq2tgv.jpg`}
          alt="Affirm Banner"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default AffirmBanner;
