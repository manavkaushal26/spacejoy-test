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
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1645780796/web/furniture-decor-shop/Artboard_9_copy_2_2x-100_ifas07.jpg"
              alt="Spacejoy exclusive offer"
              className={`${linkTo && 'cursor-pointer'}`}
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <div className="container max-w-screen-xl mx-auto mt-32 mb-6 sm:hidden relative aspect-[800/1293]">
        <Link href={linkTo || ''} passHref>
          <a>
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1645779585/web/homev3/Month_end_Clearance_Sale_-_HP-Mobile-05-min_uyyzpj.jpg"
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
