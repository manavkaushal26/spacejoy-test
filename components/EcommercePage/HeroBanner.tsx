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
              src="https://res.cloudinary.com/spacejoy/image/upload/v1650087061/web/furniture-decor-shop/Easter_Special-04_fwtttc.jpg"
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
              src="https://res.cloudinary.com/spacejoy/image/upload/v1650087061/web/furniture-decor-shop/Easter_Special-05_fe8ohx.jpg"
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
