import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageKit } from '@utils/config';

const ShopBanner = ({ linkTo, shopInjectBanner }) => {
  return (
    <div>
      <div className="container relative hidden max-w-screen-xl mx-auto mt-16 mb-6 sm:block aspect-[80/23]">
        <Link href={linkTo || ''} passHref>
          <a target="_blank">
            <Image
              src={`${imageKit.baseDeliveryUrl}/v1642414643/web/homev3/Inject_Banner-2_he75rr.gif`}
              alt="Referral Banner"
              className="cursor-pointer rounded-lg"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <div
        className={`container relative max-w-screen-xl mx-auto mb-6 sm:hidden aspect-[941/1057] ${
          shopInjectBanner === false ? 'mt-32' : 'mt-16'
        }`}
      >
        <Link href={linkTo || ''} passHref>
          <a target="_blank">
            <Image
              src={`${imageKit.baseDeliveryUrl}/v1645618931/web/homev3/Referral_Banner_Mobile_3_jmpjy6.gif`}
              alt="Referral Banner"
              className="cursor-pointer rounded-lg"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ShopBanner;
