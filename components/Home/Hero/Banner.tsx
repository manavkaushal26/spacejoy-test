import { blurredBgImage } from '@public/images/bg-base-64';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import React from 'react';

const Banner: React.FC = () => {
  return (
    // fl_lossy,f_auto,q_auto,h_1050,w_1671
    <Image
      className="object-cover filter contrast-115 brightness-110 rounded-xl"
      src={`${imageKit.baseDeliveryUrl}/v1622172527/spj-v2/spj-happy-customer_ahkoxm.jpg`}
      alt="spacejoy happy customer"
      height={'700'}
      width={'1114'}
      layout="responsive"
      placeholder="blur"
      blurDataURL={blurredBgImage}
      priority
    />
  );
};

export default React.memo(Banner);
