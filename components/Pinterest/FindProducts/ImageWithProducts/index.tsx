/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useSearchProductsWithImageContext } from '../UseSearchProductsFromImageProvider';
import ImageWithPins from './ImageWithPins';
import ProductsDisplaySection from './ProductsDisplaySection';

interface ImageWithProductsProps {
  imgSrc: string;
}

const ImageWithProducts: React.FC<ImageWithProductsProps> = ({ imgSrc }) => {
  const { loading } = useSearchProductsWithImageContext();

  return (
    <div className="flex gap-4 divide-x my-8 justify-center ">
      <div className="w-1/3">
        <ImageWithPins imgSrc={imgSrc} />
      </div>
      <div
        className={` transition-all duration-1000 ${
          loading.findingProducts ? 'w-0 opacity-0' : 'w-2/3 opacity-100'
        } p-4`}
      >
        <ProductsDisplaySection />
      </div>
    </div>
  );
};

export default ImageWithProducts;
