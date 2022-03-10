import React from 'react';
import SectionHeading from './SectionHeading';
import Link from 'next/link';
import Layout from '@components/Shared/Layout';
import Image from 'next/image';

const PinterestBanner = () => {
  return (
    <div>
      <SectionHeading
        title="It's a Pin come true!"
        subTitle="Connect your Pinterest board. Discover and shop everything you love from your pins."
      />
      <div className="relative hidden sm:block aspect-[62/29]">
        <Link href="/pinterest/search" passHref>
          <a target="_blank">
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1641548005/web/furniture-decor-shop/Weekend_Sale_Sale_Shop_Page-03-min_j3zgzq.jpg"
              alt="Connect with Pinterest"
              className="cursor-pointer"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <div className="sm:hidden relative aspect-[585/1112]">
        <Link href="/pinterest/search" passHref>
          <a>
            <Image
              src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1641548011/web/furniture-decor-shop/Weekend_Sale_Sale_Mobile-02-min_krcnfd.jpg"
              alt="Connect with Pinterest"
              className="rounded-md cursor-pointer"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PinterestBanner;
