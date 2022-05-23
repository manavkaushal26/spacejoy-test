import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@components/Carousel';
import { oldSpacejoyUrl } from '@utils/config';

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
      'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1653308838/web/furniture-decor-shop/V2/Get_Ready_For_Memorial_Day_Sale-08_kgqbtl.jpg',
    imgSrcDesk:
      'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1653308840/web/furniture-decor-shop/V2/Get_Ready_For_Memorial_Day_Sale-07_hkpmko.jpg',
    href: '/shop',
  },
  {
    id: 2,
    imgSrcMob:
      'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1653308916/web/furniture-decor-shop/V2/Get_Ready_For_Memorial_Day_Sale-29_kt8bbh.jpg',
    imgSrcDesk:
      'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1653308920/web/furniture-decor-shop/V2/Get_Ready_For_Memorial_Day_Sale-28_pfadfl.jpg',
    href: `${oldSpacejoyUrl}/new-project`,
  },
  {
    id: 3,
    imgSrcMob:
      'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1652325144/web/furniture-decor-shop/V2/Card_zjq1g2.jpg',
    imgSrcDesk:
      'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1652185038/web/furniture-decor-shop/V2/Banner_3_uqqhjz.jpg',
    href: '',
  },
];

const HeroCarousel = ({ mobile }) => {
  return (
    <div className="max-w-7xl mx-auto pt-6">
      <Carousel
        imageCount={data?.length || 0}
        responsive={sliderSettings}
        autoplay
        autoplaySpeed={4000}
        infinite
        arrows={false}
      >
        {data.map((banner) => (
          <>
            <Link key={banner.id} href={banner.href} passHref>
              <a href={!mobile ? '_blank' : ''}>
                <div className="relative aspect-[45/53] md:hidden">
                  <Image
                    src={banner.imgSrcMob}
                    alt={banner.imgSrcMob}
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={banner.imgSrcMob}
                    className="rounded-lg"
                  />
                </div>
                <div className="relative aspect-[1561/500] hidden md:block">
                  <Image
                    src={banner.imgSrcDesk}
                    alt={banner.imgSrcDesk}
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={banner.imgSrcDesk}
                    className="rounded-lg"
                  />
                </div>
              </a>
            </Link>
          </>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
