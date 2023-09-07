import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageKit } from '@utils/config';

const HeroBanner = ({ linkTo }) => {
  return (
    <div>
      <div className="hidden sm:block">
        <Link href={linkTo} passHref>
          <a target="_blank">
            <Image
              src={`${imageKit.baseDeliveryUrl}/v1652177402/web/furniture-decor-shop/Summer_Sale-02_dkvhzb.jpg`}
              alt="Ecommerce shop page main banner"
              width={1561}
              height={500}
              className="hidden cursor-pointer md:block"
            />
          </a>
        </Link>
      </div>
      <div className="sm:hidden">
        <Link href={linkTo} passHref>
          <a>
            <Image
              src={`${imageKit.baseDeliveryUrl}/v1652177413/web/furniture-decor-shop/Summer_Sale-04_jqgqsn.jpg`}
              alt="Ecommerce shop page main banner"
              width={800}
              height={934}
              className="cursor-pointer lg:hidden"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
