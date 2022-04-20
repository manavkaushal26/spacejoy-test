import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary } from '@utils/config';
import { defaultImgSrcCover } from '@utils/Mocks/DefaultFavourites';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

const RoomCard = ({ room }) => {
  const imgUrl = useMemo(() => {
    return room?.thumbnail ? `${cloudinary.baseDeliveryURL}/${room?.thumbnail}` : null;
  }, [room]);
  const analytics = () => {
    PushEvent({
      category: `Open room button clicked`,
      action: `Open room button Clicked for ${room?.name} | ${room?._id}`,
      label: `Open room button clicked`,
    });
  };

  return (
    <Link href={`/wishlist/${room?._id}`} passHref>
      <div className="mt-4 group hover:shadow-md rounded-md py-2 cursor-pointer">
        <div className="max-w-sm rounded overflow-hidden relative w-full aspect-[1.5]">
          <Image
            src={imgUrl || defaultImgSrcCover}
            alt="Sunset in the mountains"
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
        <div className=" py-4 px-4">
          <div className="font-bold text-base mb-2">{room?.name}</div>
          <Link href={`/wishlist/${room?._id}`}>
            <a
              href={`/wishlist/${room?._id}`}
              className="text-base py-2 px-4 bg-gray-900 rounded-lg text-white mt-4"
              onClick={() => analytics()}
            >
              Open List
            </a>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(RoomCard);
