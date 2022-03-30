import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Slider from 'react-slick';
import { SRLWrapper } from 'simple-react-lightbox';

const MAX_NAV_IMAGES_DESKTOP = 6;
const MAX_NAV_IMAGES_MOBILE = 4;
const lightBoxOptions = {
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
  withLightBox = false,
  slidesToShow = 1,
  withNav = false,
  responsive = {},
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
    dotsClass: 'custom-pagination',
    slidesToShow,
    className: 'with-space',
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { ...responsive },
      },
    ],
  };
  const renderArrows = () => {
    return (
      <div className={`slider-arrow ${!mainSliderSettings?.arrows ? 'block lg:hidden' : ''}`}>
        <div
          className="absolute top-1/2 left-8 md:left-32 z-10 h-8 w-8 rounded-full border border-gray-900 flex items-center justify-center bg-white bg-opacity-25 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => nav1 && nav1?.slickPrev()}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </div>
        <div
          className="absolute top-1/2 right-0 z-10 cursor-pointer h-8 w-8 rounded-full border border-gray-900 flex items-center justify-center bg-white bg-opacity-25 -translate-y-1/2 -translate-x-1/2"
          onClick={() => nav1 && nav1.slickNext()}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full relative">
      <div className={`ml-0 ${withNav ? 'md:pl-24' : ''} w-full relative`}>
        {imageCount > 1 ? renderArrows() : null}
        {withLightBox ? (
          <SRLWrapper {...lightBoxOptions}>
            <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)} {...mainSliderSettings}>
              {children}
            </Slider>
          </SRLWrapper>
        ) : (
          <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)} {...mainSliderSettings}>
            {children}
          </Slider>
        )}
      </div>
      {imageCount > 1 && withNav && (
        <div className="relative w-full md:absolute md:w-16 top-0 nav-slider sm:mt-4 lg:mt-0 hidden lg:block">
          <Slider asNavFor={nav1} ref={(slider2) => setNav2(slider2)} {...navSliderSettings} infinite={false}>
            {children}
          </Slider>
        </div>
      )}
    </div>
  );
}
