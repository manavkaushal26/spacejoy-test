import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { blurredBgProduct } from '@public/images/bg-base-64';

const AffirmCard = ({ imgUrl }) => {
  return (
    <div className="container rounded-lg w-full h-full relative">
      <Image
        src={imgUrl}
        alt="affirm"
        layout="fill"
        className="object-contain rounded-xl"
        placeholder="blur"
        blurDataURL={blurredBgProduct}
      />
    </div>
  );
};

export default AffirmCard;
