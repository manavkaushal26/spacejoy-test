
import CustomerStoryCard from '@components/Cards/CustomerStoryCard';
import Carousel from '@components/Carousel';
import React from 'react';


const responsive = {
  dots: true,
  arrows: false,
  slidesToShow: 1,
  className: 'responsive',
  autoplay: true,
  autoplaySpeed: 2000,
};



const CustomerStoriesCarousel = ({ data }) => {
  return (
    <>
      <Carousel
        responsive={responsive}
        imageCount={data.length}
        slidesToShow={3}
        autoplay
        autoplaySpeed={2500}
        infinite
      >
        {data.map((item) => {
          return <CustomerStoryCard data={item} key={item?._id} />;
        })}
      </Carousel>
    </>
  );
};

export default React.memo(CustomerStoriesCarousel);
