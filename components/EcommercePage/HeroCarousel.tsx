import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@components/Carousel';

const sliderSettings = {
  dots: true,
  arrows: false,
  slidesToShow: 1,
  className: 'responsive',
  autoplay: true,
  autoplaySpeed: 4000,
};

const data = [
  {
    id: 1,
    imgSrcMob:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652325140/web/furniture-decor-shop/V2/Hero_banner_1_mobile_bbkuiw.jpg',
    imgSrcDesk:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652184958/web/furniture-decor-shop/V2/Banner_1_awmx87.jpg',
    href: '/shop',
  },
  {
    id: 2,
    imgSrcMob:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652325141/web/furniture-decor-shop/V2/Hero_Banner_wouvnq.jpg',
    imgSrcDesk:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652185012/web/furniture-decor-shop/V2/Banner_2_rgqgj6.jpg',
    href: '',
  },
  {
    id: 3,
    imgSrcMob:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652325144/web/furniture-decor-shop/V2/Card_zjq1g2.jpg',
    imgSrcDesk:
      'https://res.cloudinary.com/spacejoy/image/upload/v1652185038/web/furniture-decor-shop/V2/Banner_3_uqqhjz.jpg',
    href: '',
  },
];

const HeroCarousel = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Carousel imageCount={data?.length || 0} responsive={sliderSettings} autoplay infinite arrows={false}>
        {data.map((banner) => (
          <>
            <Link key={banner.id} href={banner.href} passHref>
              <div className="relative aspect-[45/53] md:hidden">
                <Image src={banner.imgSrcMob} alt={banner.imgSrcMob} layout="fill" objectFit="contain" />
              </div>
            </Link>
            <Link key={banner.id} href={banner.href} passHref>
              <div className="relative aspect-[1080/403] hidden md:block">
                <Image src={banner.imgSrcDesk} alt={banner.imgSrcDesk} layout="fill" objectFit="contain" />
              </div>
            </Link>
          </>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
