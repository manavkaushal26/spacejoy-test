import Carousel from '@components/Carousel';
import DesignSetCardV2 from '@components/RoomSelection/DesignSetCardV2';
import useProductDesignSets from '@hooks/useProductDesignSets';
import React from 'react';

const ProductDesignSet = ({ productIds }) => {
  const { designSetData } = useProductDesignSets([...productIds]);

  const designs = React.useMemo(() => {
    return Object.keys(designSetData).reduce((acc, curr) => {
      return [...acc, ...designSetData[curr]];
    }, []);
  }, [designSetData]);

  if (designs?.length === 0) return null;

  const responsive = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    className: 'responsive',
  };

  const imageCount = Math.min(designs?.length, 3);

  return (
    <div className="py-4 bg-gray-100 -mx-4 px-4 lg:-mx-36 lg:px-36">
      <h2 className="text-2xl tracking-wide">See in a room</h2>
      <p className="mt-2 text-gray-700">Mix and match</p>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <Carousel imageCount={imageCount} withNav={false} responsive={responsive} slidesToShow={3}>
          {designs?.slice(0, 4)?.map((product) => {
            return <DesignSetCardV2 designData={product} isMobile={true} key={product?._id} large={false} />;
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default React.memo(ProductDesignSet);
