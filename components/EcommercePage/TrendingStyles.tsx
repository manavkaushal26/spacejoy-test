import Carousel from '@components/Carousel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SectionHeading from './SectionHeading';
import styled from 'styled-components';

const fakeCarouselData = [
  {
    id: 1,
    imgSrc:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652219112/web/furniture-decor-shop/V2/trending_styles_a_y5fejh.jpg',
    title: 'Outdoor Furniture',
    bgColor: '#FFFAEC',
    href: '/shop?subcategory=Outdoor+Furniture',
  },
  {
    id: 2,
    imgSrc:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652219114/web/furniture-decor-shop/V2/trending_styles_b_tstdvw.jpg',
    title: 'Outdoor Accessories',
    bgColor: '#F0FFF7',
    href: '/shop?subcategory=Outdoor+Accessories',
  },
  {
    id: 3,
    imgSrc:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652219115/web/furniture-decor-shop/V2/trending_styles_c_tkybdr.jpg',
    title: 'Outdoor Furnishings',
    bgColor: '#FFF6F3',
    href: '/shop?subcategory=Outdoor+Furnishings',
  },
];

const TrendingStylesCardText = styled.div<{ bg: string }>`
  background-color: ${({ bg }) => bg};
`;

const sliderSettings = {
  dots: false,
  arrows: false,
  slidesToShow: 1.2,
  className: 'responsive',
  autoplay: false,
  autoplaySpeed: 4000,
};

const TrendingStyles = ({ mobile }) => {
  return (
    <div className="container max-w-7xl pl-4 mx-auto mt-16 mb-8">
      <SectionHeading title="Trending styles" />
      <div className="collections-slider">
        <Carousel
          imageCount={fakeCarouselData?.length || 0}
          responsive={sliderSettings}
          arrows={false}
          slidesToShow={4}
        >
          {fakeCarouselData.map((style) => (
            <div key={style.id} className="shadow-md rounded-xl transition duration-200 hover:shadow-lg">
              <div className="relative aspect-[1/1]">
                <Image
                  src={style.imgSrc}
                  alt={style.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-tr-lg rounded-tl-lg"
                />
              </div>
              <TrendingStylesCardText bg={style.bgColor}>
                <div className="p-5 space-y-4 rounded-bl-xl rounded-br-xl">
                  <h3 className="text-xl">{style.title}</h3>
                  <Link href={style.href}>
                    <a
                      target={!mobile ? '_blank' : ''}
                      className="text-gray-700 text-sm font-semibold py-1.5 rounded-lg hover:bg-gray-50 px-5 border border-gray-600 flex items-center justify-center w-fit"
                    >
                      Shop Now
                    </a>
                  </Link>
                </div>
              </TrendingStylesCardText>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TrendingStyles;
