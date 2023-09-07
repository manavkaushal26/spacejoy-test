import React from 'react';
import SectionHeading from './SectionHeading';
import Image from 'next/image';
import Carousel from '../Carousel';
import Link from 'next/link';
import { imageKit } from '@utils/config';

const sliderSettings = {
  dots: false,
  arrows: false,
  slidesToShow: 1,
  className: 'responsive',
  autoplay: false,
  autoplaySpeed: 4000,
};

const fakeData = {
  id: 1,
  img1Src: `${imageKit.baseDeliveryUrl}/v1650951859/web/furniture-decor-shop/V2/hot_deals_1_qoakb2.jpg`,
  img2Src: `${imageKit.baseDeliveryUrl}/v1651055776/web/furniture-decor-shop/V2/hot_deals_img2_yzqt3l.jpg`,
  title: 'Up to 10% off on all Furniture and Decor',
  href: '',
};

const HotDeals = () => {
  return (
    <div className="container px-4 mx-auto lg:px-4">
      <SectionHeading title="Hot deals" />

      <div className="md:grid md:grid-cols-3">
        <div className="relative aspect-[328/197] order-1 md:order-2">
          <Image
            src={fakeData.img1Src}
            alt={fakeData.title}
            layout="fill"
            objectFit="contain"
            className="rounded-tr-md rounded-tl-md"
          />
        </div>
        <div className="bg-[#FFF2EF] p-5 space-y-4 order-2 md:order-1 md:flex md:flex-col md:items-start md:justify-center">
          <h3 className="text-xl lg:text-4xl">{fakeData.title}</h3>
          <Link href={fakeData.href} passHref>
            <button className="text-gray-700 text-sm font-semibold py-1.5 rounded-lg hover:bg-gray-50 px-5 border border-gray-600 flex items-center justify-center">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="hidden relative aspect-[328/197] order-1 md:order-2 md:inline-block">
          <Image
            src={fakeData.img2Src}
            alt={fakeData.title}
            layout="fill"
            objectFit="cover"
            className="rounded-tr-md rounded-tl-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HotDeals;
