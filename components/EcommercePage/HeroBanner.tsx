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
              src="https://res.cloudinary.com/spacejoy/image/upload/v1651219856/web/furniture-decor-shop/26th-The_Happiness_Sale_-05_j9x4yd.jpg"
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
              src="https://res.cloudinary.com/spacejoy/image/upload/v1651219851/web/furniture-decor-shop/26th-The_Happiness_Sale_-08_nra24c.jpg"
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
