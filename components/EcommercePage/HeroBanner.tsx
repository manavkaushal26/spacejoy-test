import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroBanner = ({ linkTo }) => {
  return (
    <div>
      <div className="hidden sm:block">
        <Link href={linkTo} passHref>
          <a target="_blank">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1649677541/web/furniture-decor-shop/shop_page_main_banner_ktnnoq.jpg"
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
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1649677792/web/furniture-decor-shop/Mobeil_shop_page_main_banner_ytgqtx.jpg"
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
