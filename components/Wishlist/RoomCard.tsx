import { ArrowRightIcon } from '@heroicons/react/outline';
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
        <div className="block p-6 rounded-lg  bg-white max-w-sm pt-2">
          <h5 className="text-gray-900 text-lg font-bold leading-tight font-medium mb-6">{room?.name}</h5>

          <Link href={`/wishlist/${room?._id}`}>
            <a
              href={`/wishlist/${room?._id}`}
              className="text-base py-2 px-4 bg-gray-900 rounded-lg text-white  text-md inline-flex items-center group"
              onClick={() => analytics()}
            >
              Open List
              <ArrowRightIcon className="h-4 w-4 text-white ml-1 group-hover:translate-x-1 " />
            </a>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(RoomCard);
