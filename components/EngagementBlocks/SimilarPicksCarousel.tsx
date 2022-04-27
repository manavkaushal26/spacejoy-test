
import SimilarPickCard from '@components/Cards/SimilarPickCard';
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



const SimilarPicksCarousel = ({ data }) => {
  return (
    <>
      <Carousel
        responsive={responsive}
        imageCount={data.length}
        slidesToShow={3}
        autoplay
        autoplaySpeed={3000}
        infinite
      >
        {data.map((item) => {
          return item?.room && <SimilarPickCard data={item} key={item?._id} />;
        })}
      </Carousel>
    </>
  );
};

export default React.memo(SimilarPicksCarousel);
