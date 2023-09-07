import { imageKit } from '@utils/config';
import Image from 'next/image';
import React from 'react';

const CategoryCard = ({ data, index }) => {
  return (
    <div className="overflow-hidden transition duration-200 bg-white rounded-lg cursor-pointer group hover:shadow-md">
      <div className="relative aspect-1">
        <Image src={`${imageKit.baseDeliveryUrl}/${data.imgSrc}`} alt={data.name} layout="fill" objectFit="contain" />
      </div>
      <div className={`p-4 text-center sm:p-5 ${index % 2 == 0 ? 'brand-card-color-1' : 'brand-card-color-2'}`}>
        <span className="text-lg sm:text-base">{data.offerPreText}</span>
        <span className="text-2xl font-semibold sm:text-xl lg:text-2xl">{data.offer}% OFF</span>
        <p className="pt-3 text-xl font-semibold sm:font-normal md:text-lg xl:text-xl">{data.title}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
