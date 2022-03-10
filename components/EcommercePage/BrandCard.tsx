import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const BreakPoint = styled.br`
  display: none;
  @media (min-width: 315px) and (max-width: 380px) {
    display: block;
  }
`;

const BrandCard = ({ data, index }) => {
  return (
    <div className="overflow-hidden transition duration-200 bg-white rounded-lg cursor-pointer group hover:shadow-md">
      <div className="relative aspect-1">
        <Image src={data.img} alt={data.name} layout="fill" objectFit="contain" />
      </div>
      <div className={`p-4 text-center sm:p-5 ${index % 2 == 0 ? 'brand-card-color-1' : 'brand-card-color-2'}`}>
        <span className="text-sm lg:text-base">{data.offerPreText}</span>
        <BreakPoint />
        <span className="text-lg font-semibold sm:text-xl lg:text-2xl">{data.offer}% OFF</span>
      </div>
      <div className="bg-gray-200">
        <img src={data.logo} alt={data.name} className="w-3/5 mx-auto sm:w-1/2" />
      </div>
    </div>
  );
};

export default BrandCard;
