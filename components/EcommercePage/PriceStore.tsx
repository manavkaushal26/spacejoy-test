import React from 'react';
import SectionHeading from './SectionHeading';
import styled from 'styled-components';
import Link from 'next/link';
import { PushEvent } from '@utils/analyticsLogger';

interface BackgroundProps {
  readonly image: string;
  readonly color: string;
  readonly position: string;
}

const bgData = [
  {
    id: 1,
    bgImage:
      'https://res.cloudinary.com/spacejoy/image/upload/v1650958896/web/furniture-decor-shop/V2/pricestore_bg_a_ypa2ts.png',
    bgColor: '#FFF8F3',
    bgPosition: '0 0',
    prefix: 'UNDER',
    price: 50,
    href: '/shop?price=1%3A%3A50',
  },
  {
    id: 2,
    bgImage:
      'https://res.cloudinary.com/spacejoy/image/upload/v1650957343/web/furniture-decor-shop/V2/pricestore_bg_b_mxwrsj.png',
    bgColor: '#F1FFF8',
    bgPosition: '100% 0',
    prefix: 'UNDER',
    price: 100,
    href: '/shop?price=1%3A%3A100',
  },
  {
    id: 3,
    bgImage:
      'https://res.cloudinary.com/spacejoy/image/upload/v1650957347/web/furniture-decor-shop/V2/pricestore_bg_c_osfkog.png',
    bgColor: '#F2FFFF',
    bgPosition: '0 100%',
    prefix: 'UNDER',
    price: 500,
    href: '/shop?price=1%3A%3A500',
  },
  {
    id: 4,
    bgImage:
      'https://res.cloudinary.com/spacejoy/image/upload/v1650957352/web/furniture-decor-shop/V2/pricestore_bg_d_erdwcv.png',
    bgColor: '#FFFAEE',
    bgPosition: '100% 100%',
    prefix: 'UNDER',
    price: 1000,
    href: '/shop?price=1%3A%3A1000',
  },
];

const Background = styled.div<BackgroundProps>`
  background-image: ${({ image }) => `url(${image})`};
  background-color: ${({ color }) => `${color}`};
  background-position: ${({ position }) => `${position}`};
  background-size: 75%;
  background-repeat: no-repeat;
  height: 100%;
  @media (min-width: 1280px) {
    background-size: 50%;
  } ;
`;

const PriceStore = ({ mobile }) => {
  return (
    <div className="container max-w-7xl px-4 mx-auto">
      <SectionHeading title="The price store" />
      <div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bgData?.map((store) => (
            <Link key={store.id} href={store.href} passHref>
              <a
                target={!mobile ? '_blank' : ''}
                onClick={() => {
                  PushEvent({
                    category: `Price Store Section Click - ${store.prefix} $${store.price}`,
                    action: `Go to $${store.price} Shop Page`,
                    label: `Shop Now`,
                  });
                }}
              >
                <div className="w-full aspect-1 h-full rounded-md sm:aspect-[2/1.2] lg:aspect-1 xl:aspect-[2/1.2]">
                  <Background image={store.bgImage} color={store.bgColor} position={store.bgPosition}>
                    <div className="h-full flex flex-col items-center justify-center font-semibold">
                      <p className="uppercase">{store.prefix}</p>
                      <div className="my-2 text-center">
                        <p className="text-5xl">
                          <sup>$</sup>
                          <span>{store.price}</span>
                        </p>
                        <p className="uppercase">STORE</p>
                      </div>

                      <button className="text-white text-xs py-1.5 px-3 mx-2 rounded-lg border border-gray-900 bg-gray-900 hover:bg-gray-700 whitespace-nowrap uppercase">
                        Shop Now
                      </button>
                    </div>
                  </Background>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceStore;
