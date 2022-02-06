import { cloudinary } from '@utils/config';
import Image from 'next/image';
import React from 'react';

const ImageContainer: React.FC = () => {
  return (
    <div className="relative w-full h-full rounded-lg col-span-3 lg:col-span-1">
      <Image
        src={`${cloudinary.baseDeliveryURL}/w_1000/v1622011999/web/spj-living-room-min_y9ujxb.jpg`}
        alt=""
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
};

export default ImageContainer;
