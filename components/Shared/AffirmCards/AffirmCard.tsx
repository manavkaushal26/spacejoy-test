import { blurredBgProduct } from '@public/images/bg-base-64';
import Image from 'next/image';
import React from 'react';

const AffirmCard = ({ imgUrl }) => {
  return (
    <div className="container rounded-lg w-full h-full relative">
      <Image
        src={imgUrl}
        alt="affirm"
        layout="fill"
        className="object-cover object-center rounded-2xl"
        placeholder="blur"
        blurDataURL={blurredBgProduct}
      />
    </div>
  );
};

export default AffirmCard;
