import React, { useRef } from 'react';
import Slider from 'react-slick';
import RoomSelectCard from './RoomSelectCard';

interface FeedObject {
  _id: number;
  name: string;
  metaDescription: string;
  slug: string;
  cdnThumbnail: string;
  metaTitle: string;
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
              <p className='pt-4 text-xl'>
              Pick one to get started
              </p>
            </div>
          </div>
          <div className="relative my-8 grid grid-cols-5 gap-4">
            {/* <Slider {...settings} ref={ref}> */}
            {list.map((collection, i) => (
              <RoomSelectCard key={collection?._id} cardData={collection} inset index={i} />
            ))}
            {/* </Slider> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TopCollagesList);
