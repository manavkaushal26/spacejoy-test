import Carousel from '@components/Carousel';
import { PushEvent } from '@utils/analyticsLogger';
import { imageKit } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
    imgSrcMob: `${imageKit.baseDeliveryUrl}/v1657192670/web/furniture-decor-shop/V2/Generic_Banners_Shop_Page_Main_banner_Mobile_nzuhby.jpg`,
    imgSrcDesk: `${imageKit.baseDeliveryUrl}/v1657194365/web/furniture-decor-shop/V2/Generic_Banners_Shop_Page_Main_banner1_rbvq30.jpg`,
    href: '/shop',
  },
  {
    id: 2,
    imgSrcMob: `${imageKit.baseDeliveryUrl}/v1657192670/web/furniture-decor-shop/V2/Generic_Banners_Shop_Page_Main_banner_Mobile_nzuhby.jpg`,
    imgSrcDesk: `${imageKit.baseDeliveryUrl}/v1657192669/web/furniture-decor-shop/V2/Generic_Banners_Shop_Page_Main_banner2_d68mka.jpg`,
    href: `/quiz/start-quiz`,
  },
  // fl_lossy,q_auto/w_800
  // /fl_lossy,q_auto
  {
    id: 3,
    imgSrcMob: `${imageKit.baseDeliveryUrl}/v1652325144/web/furniture-decor-shop/V2/Card_zjq1g2.jpg`,
    imgSrcDesk: `${imageKit.baseDeliveryUrl}/v1652185038/web/furniture-decor-shop/V2/Banner_3_uqqhjz.jpg`,
    href: '',
  },
];

const HeroCarousel = ({ mobile }) => {
  return (
    <div className="pt-6 mx-auto max-w-7xl">
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
              <a
                href={!mobile ? '_blank' : ''}
                onClick={() => {
                  banner.href.length !== 0 &&
                    PushEvent({
                      category: `Hero Banner Click - Banner ${banner.id}`,
                      action: `Go to -> ${banner.href}`,
                      label: `Shop Now`,
                    });
                }}
              >
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
