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
  lazyLoad: 'ondemand',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 1500,
  pauseOnHover: true,
  mobileFirst: true,
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
}

const Carousel: React.FC<CarouselInterface> = ({
  children,
  centerPadding,
  centerMode,
  position,
  slidesToShow = 1,
  customButtons,
  buttons = false,
}) => {
  const sliderRef = useRef<Slider>(null);

  const renderTopButtons = () => (
    <div className="grid gap-4 xl:gap-8 grid-cols-2 mx-auto w-full absolute -top-10 lg:-top-14 ">
      <CarouselNavButton flow="left" onClick={() => sliderRef?.current?.slickPrev()} />
      <CarouselNavButton flow="right" onClick={() => sliderRef?.current?.slickNext()} />
    </div>
  );

  const renderBottomButtons = () => (
    <div className="grid gap-4 xl:gap-8 grid-cols-2 mx-auto w-full absolute bottom-10 ">
      <CarouselNavButton flow="left" onClick={() => sliderRef?.current?.slickPrev()} />
      <CarouselNavButton flow="right" onClick={() => sliderRef?.current?.slickNext()} />
    </div>
  );

  const renderOutBottomButtons = () => (
    <div className="grid gap-4 xl:gap-8 grid-cols-2 mx-auto w-full absolute -bottom-16 ">
      <CarouselNavButton flow="left" onClick={() => sliderRef?.current?.slickPrev()} />
      <CarouselNavButton flow="right" onClick={() => sliderRef?.current?.slickNext()} />
    </div>
  );

  return (
    <div className="relative">
      {position === 'top' && customButtons && renderTopButtons()}
      <SliderWrapper className="overflow-hidden">
        <Slider
          {...settings}
          arrows={!customButtons && buttons}
          centerMode={centerMode}
          centerPadding={centerPadding}
          slidesToShow={slidesToShow}
          slidesToScroll={slidesToShow}
          ref={sliderRef}
        >
          {children}
        </Slider>
      </SliderWrapper>
      {position === 'bottom' && customButtons && renderBottomButtons()}
      {position === 'outside' && customButtons && renderOutBottomButtons()}
    </div>
  );
};

export default Carousel;
