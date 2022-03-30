import Carousel from '@components/Carousel';
import ProductCard from '@components/Shop/ProductCard';
import useRecommendations from '@hooks/useRecommendations';
import React from 'react';

const SimilarProducts = ({ productId }) => {
  const { recommendations, loading } = useRecommendations(productId);
  const recommendationsData = React.useMemo(() => {
    return recommendations;
  }, [recommendations]);

  if (recommendationsData?.length === 0) return null;

  const responsive = {
    dots: true,
    arrows: false,
    slidesToShow: 1.5,
    className: 'with-space',
  };

  return (
    <div className="py-4 bg-gray-100 -mx-4 px-4 lg:-mx-36 lg:px-36">
      <h2 className="text-2xl tracking-wide">Similar Products</h2>
      <p className="mt-2 text-gray-700">Shop from a collection of similar products</p>

      <div className="mt-4 grid grid-cols-1 ">
        <Carousel imageCount={5} slidesToShow={5} withNav={false} responsive={responsive}>
          {recommendationsData?.slice(0, 5)?.map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default React.memo(SimilarProducts);
