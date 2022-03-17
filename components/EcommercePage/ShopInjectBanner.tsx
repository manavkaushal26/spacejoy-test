import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ShopInjectBanner = ({ linkTo }) => {
  return (
    <div>
      <div className="container relative hidden max-w-screen-xl mx-auto mt-16 mb-6 sm:block aspect-[80/23]">
        <Link href={linkTo || ''} passHref>
          <a target="_blank">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1647428847/web/furniture-decor-shop/Happy_St._Patrick_s_Day-1-09_ynpigd.jpg"
              alt="Spacejoy exclusive offer"
              className={`${linkTo && 'cursor-pointer'}`}
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <div className="container max-w-screen-xl mx-auto mt-32 mb-6 sm:hidden relative aspect-[80/99]">
        <Link href={linkTo || ''} passHref>
          <a>
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1647428159/web/homev3/Happy_St._Patrick_s_Day-05_f0cjl8.jpg"
              alt="Spacejoy exclusive offer"
              className={`${linkTo && 'cursor-pointer'}`}
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ShopInjectBanner;
