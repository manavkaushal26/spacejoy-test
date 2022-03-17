import React, { useRef } from 'react';
import Slider from 'react-slick';
import styled, { keyframes } from 'styled-components';
import RoomSelectCard from './RoomSelectCard';

interface FeedObject {
  _id: number;
  name: string;
  metaDescription: string;
  slug: string;
  cdnThumbnail: string;
  metaTitle: string;
  disabled: boolean;
}

interface DesignListInterface {
  feedData: {
    list: Array<FeedObject>;
  };
}

const settings = {
  initialSlide: 0,
  // lazyLoad: 'ondemand',
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  arrows: false,
  // mobileFirst: true,
  accessibility: true,
  focusOnSelect: false,
  slidesToShow: 3.3,
  draggable: true,
  // responsive: [
  //   {
  //     breakpoint: 992,
  //     settings: {
  //       slidesToShow: 3,
  //       slidesToScroll: 1,
  //     },
  //   },
  // ],
};
const entry = keyframes`
	from { 
		opacity: 0;
    transform: scale(0.7);
	}
	to {
    opacity: 1;
    transform: scale(1);
	}
`;
const AnimateBox = styled.ul`
  & > li {
    opacity: 0;
    transform: scale(0.7);
    animation: ${entry} 0.4s forwards;
    &:nth-child(1) {
      animation-delay: 100ms;
    }
    &:nth-child(2) {
      animation-delay: 150ms;
    }
    &:nth-child(3) {
      animation-delay: 200ms;
    }
    &:nth-child(4) {
      animation-delay: 250ms;
    }
    &:nth-child(5) {
      animation-delay: 300ms;
    }
    &:nth-child(6) {
      animation-delay: 350ms;
    }
    &:nth-child(7) {
      animation-delay: 400ms;
    }
    &:nth-child(8) {
      animation-delay: 450ms;
    }
    &:nth-child(9) {
      animation-delay: 500ms;
    }
    &:nth-child(10) {
      animation-delay: 550ms;
    }
    &:nth-child(11) {
      animation-delay: 600ms;
    }
    &:nth-child(12) {
      animation-delay: 650ms;
    }
  }
`;

const TopCollagesList: React.FC<DesignListInterface> = ({ feedData }) => {
  const { list } = feedData;

  const ref = useRef<Slider>(null);

  return (
    <section className="interior-design-section">
      <div className="pb-4">
        <div className="container mx-auto px-4 pt-4">
          <div className="flex items-end">
            <div className="flex-1">
              <h1 className="mt-2 text-3xl leading-8 tracking-loose text-gray-900 sm:text-4xl">
                Which room do you want to furnish?
              </h1>
              <p className="py-4 text-xl">Pick one to get started</p>
            </div>
          </div>
          <AnimateBox className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-6 2xl:gap-8 gap-y-10 my-8">
            {/* <Slider {...settings} ref={ref}> */}
            {list.map((collection, i) => (
              <RoomSelectCard key={collection?._id} cardData={collection} inset index={i} disabled={collection.disabled} />
            ))}
            {/* </Slider> */}
          </AnimateBox>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TopCollagesList);
