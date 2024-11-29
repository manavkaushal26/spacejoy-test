import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import { useState } from 'react';
import Slider from 'react-slick';
import { SRLWrapper } from 'simple-react-lightbox';

const MAX_NAV_IMAGES_DESKTOP = 6;
const MAX_NAV_IMAGES_MOBILE = 4;
export const lightBoxOptions = {
  settings: {
    overlayColor: 'rgb(25, 136, 124)',
    autoplaySpeed: 1500,
    transitionSpeed: 900,
    downloadedFileName: 'Buy from Spacejoy',
  },
  buttons: {
    backgroundColor: '#1b5245',
    iconColor: 'rgba(126, 172, 139, 0.8)',
  },
  caption: {
    showCaption: false,
  },
};

export default function Carousel({
  children,
  imageCount,
  arrows = true,
  withLightBox = false,
  slidesToShow = 1,
  withNav = false,
  responsive = {},
  autoplay = false,
  autoplaySpeed = 2000,
  infinite = false,
  fade = false,
  ...props
}) {
  const [nav1, setNav1] = useState<any>();
  const [nav2, setNav2] = useState<any>();

  const navSliderSettings = {
    slidesToShow: imageCount > MAX_NAV_IMAGES_DESKTOP ? MAX_NAV_IMAGES_DESKTOP : imageCount,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    infinite: infinite,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: imageCount > MAX_NAV_IMAGES_MOBILE ? MAX_NAV_IMAGES_MOBILE : imageCount,
          slidesToScroll: 1,
          vertical: false,
          verticalSwiping: false,
          centerPadding: '100px',
        },
      },
    ],
  };

  const mainSliderSettings = {
    dots: true,
    infinite: false,
    arrows: false,
    fade: fade,
    dotsClass: 'custom-pagination',
    slidesToShow,
    className: 'with-space',
    mobileFirst: true,
    autoplay: false,
    autoplaySpeed: autoplaySpeed,
    responsive: [
      {
        breakpoint: 992,
        settings: { arrows: true, ...responsive },
      },
    ],
    ...props,
  };

  const renderArrows = () => {
    return (
      <div className={`slider-arrow ${!mainSliderSettings?.arrows ? 'block lg:hidden' : ''}`}>
        <div
          className="absolute z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-25 border border-gray-900 rounded-full cursor-pointer top-1/2 left-8 md:left-32"
          onClick={() => nav1 && nav1?.slickPrev()}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </div>
        <div
          className="absolute right-0 z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-25 border border-gray-900 rounded-full cursor-pointer top-1/2"
          onClick={() => nav1 && nav1.slickNext()}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      </Head>
      <div className="relative w-full">
        <div className={`ml-0 ${withNav ? 'md:pl-24' : ''} w-full relative`}>
          {imageCount > 1 && arrows === true ? renderArrows() : null}
          {withLightBox ? (
            <SRLWrapper {...lightBoxOptions}>
              <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)} {...mainSliderSettings} accessibility={false}>
                {children}
              </Slider>
            </SRLWrapper>
          ) : (
            <Slider
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
              {...mainSliderSettings}
              infinite={infinite}
              accessibility={false}
            >
              {children}
            </Slider>
          )}
        </div>
        {imageCount > 1 && withNav && (
          <div className="relative top-0 hidden w-full md:absolute md:w-16 nav-slider sm:mt-4 lg:mt-0 lg:block">
            <Slider asNavFor={nav1} ref={(slider2) => setNav2(slider2)} {...navSliderSettings} infinite={infinite}>
              {children}
            </Slider>
          </div>
        )}
      </div>
    </>
  );
}
