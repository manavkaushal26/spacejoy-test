import Carousel from '@components/Carousel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SectionHeading from './SectionHeading';
import { titleCase } from '@utils/helpers';
import { PushEvent } from '@utils/analyticsLogger';

const sliderSettings = {
  dots: false,
  arrows: false,
  slidesToShow: 1.2,
  className: 'responsive',
  autoplay: false,
  autoplaySpeed: 4000,
};

const fakeCollectionData = [
  {
    id: 1,
    imgSrc:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652186012/web/furniture-decor-shop/V2/collections_a_axnhzy.jpg',
    title: 'Accent Chairs From $99',
    description: 'Make every seat the best seat in your house',
    href: '/chairs/accent-chairs',
  },
  {
    id: 2,
    imgSrc:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652186013/web/furniture-decor-shop/V2/collections_b_fh8503.jpg',
    title: 'Coffee Tables From $89',
    description: 'Find the table that anchors your living room effortlessly',
    href: '/tables/coffee-tables',
  },
  {
    id: 3,
    imgSrc:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652186013/web/furniture-decor-shop/V2/collections_c_gvpi0a.jpg',
    title: 'Sectionals From $599',
    description: `Discover comfortable seating that's also stylish`,
    href: '/sofas/sectionals',
  },
  {
    id: 4,
    imgSrc:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652186014/web/furniture-decor-shop/V2/collections_d_g4lzym.jpg',
    title: 'Queen Beds From $149',
    description: 'Our very best picks for your space, rest assured',
    href: '/beds/queen-beds',
  },
];

const NewCollection = () => {
  return (
    <div className="container max-w-7xl pl-4 mx-auto sm:px-4">
      <SectionHeading title="New Collections, awesome prices" />
      <div className="lg:hidden collections-slider">
        <Carousel imageCount={fakeCollectionData?.length || 0} responsive={sliderSettings} arrows={false}>
          {fakeCollectionData.map((collection) => (
            <Link key={collection.id} href={collection.href}>
              <a
                onClick={() => {
                  PushEvent({
                    category: `Shop Collections - ${collection.title}`,
                    action: `Go to ${titleCase(collection.href.split('/')[2].replace('-', ' '))} Shop Page`,
                    label: `Shop Now`,
                  });
                }}
              >
                <div className="shadow-md rounded-lg cursor-pointer">
                  <div className="relative aspect-[46/25]">
                    <Image
                      src={collection.imgSrc}
                      alt={collection.title}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-tr-xl rounded-tl-xl"
                    />
                  </div>
                  <div className="bg-white p-5 rounded-bl-xl rounded-br-xl">
                    <div className="mb-2">
                      <h3 className="text-lg">{collection.title}</h3>
                      <p className="line-clamp-2">{collection.description}</p>
                    </div>
                    <p className="text-gray-700 text-sm font-semibold py-1.5 rounded-lg hover:bg-gray-50 px-5 border border-gray-600 flex items-center justify-center mt-3 w-fit">
                      Shop Now
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </Carousel>
      </div>
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {fakeCollectionData.map((collection) => (
          <Link key={collection.id} href={collection.href}>
            <a
              target="_blank"
              onClick={() => {
                PushEvent({
                  category: `Shop Collections - ${collection.title}`,
                  action: `Go to ${titleCase(collection.href.split('/')[2].replace('-', ' '))} Shop Page`,
                  label: `Shop Now`,
                });
              }}
            >
              <div className="shadow-md rounded-xl transition duration-200 hover:shadow-lg cursor-pointer">
                <div className="relative aspect-[46/25]">
                  <Image
                    src={collection.imgSrc}
                    alt={collection.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-tr-xl rounded-tl-xl"
                  />
                </div>
                <div className="bg-white p-5 rounded-bl-xl rounded-br-xl">
                  <div className="mb-2">
                    <h3 className="text-lg">{collection.title}</h3>
                    <p className="line-clamp-2">{collection.description}</p>
                  </div>
                  <Link href={collection.href} passHref>
                    <p className="text-gray-700 text-sm font-semibold py-1.5 rounded-lg hover:bg-gray-50 px-5 border border-gray-600 flex items-center justify-center mt-3 w-fit">
                      Shop Now
                    </p>
                  </Link>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewCollection;
