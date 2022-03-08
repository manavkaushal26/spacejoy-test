import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Slider from 'react-slick';

const MAX_NAV_IMAGES_DESKTOP = 6;
const MAX_NAV_IMAGES_MOBILE = 4;

export default function Carousel({ children, imageCount }) {
  const [nav1, setNav1] = useState<any>();
  const [nav2, setNav2] = useState<any>();

  const renderArrows = () => {
    return (
      <div className="slider-arrow">
        <div
          className="absolute top-1/2 left-32 z-10 h-8 w-8 rounded-full border border-gray-900 flex items-center justify-center bg-white bg-opacity-25 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => nav1 && nav1?.slickPrev()}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </div>
        <div
          className="absolute top-1/2 right-0 z-10 cursor-pointer h-8 w-8 rounded-full border border-gray-900 flex items-center justify-center bg-white bg-opacity-25 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => nav1 && nav1.slickNext()}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    );
  };

  const navSliderSettings = {
    slidesToShow: imageCount > MAX_NAV_IMAGES_DESKTOP ? MAX_NAV_IMAGES_DESKTOP : imageCount,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
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

  return (
    <div className="w-full relative">
      <div className="ml-0 md:pl-24 w-full relative">
        {renderArrows()}
        <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)} arrows={false}>
          {children}
        </Slider>
      </div>
      <div className="relative w-full md:absolute md:w-16 top-0 nav-slider">
        <Slider asNavFor={nav1} ref={(slider2) => setNav2(slider2)} {...navSliderSettings}>
          {children}
        </Slider>
      </div>
    </div>
  );
}
