import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface CardBackgroundInterface {
  bg: string;
}

const CardBackground = styled.div<CardBackgroundInterface>`
  background: ${({ bg }) => bg};
`;

const BrandCard: React.FC<{ data: any; section?: string }> = ({ data, section }) => {
  section === 'spacejoy picks' ? true : false;

  return (
    <div className="overflow-hidden transition duration-200 bg-white rounded-lg shadow-md cursor-pointer group hover:shadow-lg">
      {!section && (
        <CardBackground bg={data.color} className={`flex flex-col items-start py-6 px-8 text-left  sm:py-12 `}>
          <div className="w-fit mx-auto">
            <span className="text-lg sm:text-xl lg:text-2xl">{data.offerPreText}</span>
            <span className="text-xl sm:text-2xl font-semibold lg:text-4xl block">{data.offer}% OFF</span>
          </div>
        </CardBackground>
      )}
      <div className="bg-white">
        <img src={data.logo} alt={data.name} className="w-3/5 mx-auto sm:w-1/2" />
      </div>
    </div>
  );
};

export default BrandCard;
