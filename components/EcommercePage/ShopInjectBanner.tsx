import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ShopInjectBanner = () => {
  return (
    <div className="container max-w-7xl px-4 mx-auto mt-20 mb-8">
      <Link href="/shop" passHref>
        <a target="_blank">
          <div className="relative hidden sm:block aspect-[1080/311]">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1647428847/web/furniture-decor-shop/Happy_St._Patrick_s_Day-1-09_ynpigd.jpg"
              alt="Spacejoy exclusive offer"
              className={`cursor-pointer rounded-lg`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="relative sm:hidden aspect-[80/99]">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1647428159/web/homev3/Happy_St._Patrick_s_Day-05_f0cjl8.jpg"
              alt="Spacejoy exclusive offer"
              className={`cursor-pointer rounded-lg`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ShopInjectBanner;
