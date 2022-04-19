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
              src="https://res.cloudinary.com/spacejoy/image/upload/v1650361741/web/homev3/shop_page_main_banner_anvfkp.jpg"
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
              src="https://res.cloudinary.com/spacejoy/image/upload/v1650361741/web/homev3/Mobeil_shop_page_main_banner_lm9mi2.jpg"
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
