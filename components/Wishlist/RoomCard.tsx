import { ArrowRightIcon } from '@heroicons/react/outline';
import { PushEvent } from '@utils/analyticsLogger';
import { imageKit } from '@utils/config';
import { defaultImgSrcCover } from '@utils/Mocks/DefaultFavourites';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

const RoomCard = ({ room }) => {
  const imgUrl = useMemo(() => {
    return room?.thumbnail ? `${imageKit.baseDeliveryUrl}/${room?.thumbnail}` : null;
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
      <div className="py-2 mt-4 rounded-md cursor-pointer group hover:shadow-md">
        <div className="max-w-sm rounded overflow-hidden relative w-full aspect-[1.5]">
          <Image
            src={imgUrl || defaultImgSrcCover}
            alt={room.name}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
        <div className="block max-w-sm p-6 pt-2 bg-white rounded-lg">
          <h5 className="mb-6 text-lg font-medium font-bold leading-tight text-gray-900">{room?.name}</h5>

          <Link href={`/wishlist/${room?._id}`}>
            <a
              href={`/wishlist/${room?._id}`}
              className="inline-flex items-center px-4 py-2 text-base text-white bg-gray-900 rounded-lg text-md group"
              onClick={() => analytics()}
            >
              Open List
              <ArrowRightIcon className="w-4 h-4 ml-1 text-white group-hover:translate-x-1 " />
            </a>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(RoomCard);
