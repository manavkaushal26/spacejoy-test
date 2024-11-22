import Head from 'next/head';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import CarouselNavButton from './Buttons';

const SliderWrapper = styled.div`
  .slick-list {
    overflow: visible !important;
  }
`;

const settings = {
  initialSlide: 1,
  // lazyLoad: 'ondemand',
  infinite: true,
  speed: 500,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 1500,
  pauseOnHover: true,
  // mobileFirst: true,
  accessibility: true,
  focusOnSelect: false,
  slidesToShow: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export enum position {
  top = 'top',
  bottom = 'bottom',
  outside = 'outside',
}

interface CarouselInterface {
  centerPadding: string;
  centerMode: boolean;
  position: position;
  customButtons: boolean;
  slidesToShow?: number;
  buttons?: boolean;
  fade?: boolean;
  dots?: boolean;
}

const Carousel: React.FC<CarouselInterface> = ({
  children,
  centerPadding,
  centerMode,
  position,
  slidesToShow = 1,
  customButtons,
  buttons = false,
  fade = false,
  dots = false,
}) => {
  const sliderRef = useRef<Slider>(null);

  const renderTopButtons = () => (
    <div className="absolute grid w-full grid-cols-2 gap-4 mx-auto xl:gap-8 -top-10 lg:-top-14 ">
      <CarouselNavButton flow="left" onClick={() => sliderRef?.current?.slickPrev()} />
      <CarouselNavButton flow="right" onClick={() => sliderRef?.current?.slickNext()} />
    </div>
  );

  const renderBottomButtons = () => (
    <div className="absolute grid w-full grid-cols-2 gap-4 mx-auto xl:gap-8 bottom-10 ">
      <CarouselNavButton flow="left" onClick={() => sliderRef?.current?.slickPrev()} />
      <CarouselNavButton flow="right" onClick={() => sliderRef?.current?.slickNext()} />
    </div>
  );

  const renderOutBottomButtons = () => (
    <div className="absolute grid w-full grid-cols-2 gap-4 mx-auto xl:gap-8 -bottom-16 ">
      <CarouselNavButton flow="left" onClick={() => sliderRef?.current?.slickPrev()} />
      <CarouselNavButton flow="right" onClick={() => sliderRef?.current?.slickNext()} />
    </div>
  );

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      </Head>
      <div className="relative">
        {position === 'top' && customButtons && renderTopButtons()}
        <SliderWrapper className="">
          <Slider
            {...settings}
            arrows={!customButtons && buttons}
            centerMode={centerMode}
            centerPadding={centerPadding}
            slidesToShow={slidesToShow}
            slidesToScroll={slidesToShow}
            fade={fade}
            ref={sliderRef}
          >
            {children}
          </Slider>
        </SliderWrapper>
        {position === 'bottom' && customButtons && renderBottomButtons()}
        {position === 'outside' && customButtons && renderOutBottomButtons()}
      </div>
    </>
  );
};

export default Carousel;
