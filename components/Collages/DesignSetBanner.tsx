import { blurredBgImage } from '@public/images/bg-base-64';
import { cloudinary } from '@utils/config';
import topCollages from '@utils/Mocks/topCollages';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

const DesignSetBanner = () => {
  const roomTypesList = useMemo(() => {
    return topCollages?.list?.filter((item) => !item?.disabled);
  }, []);
  const router = useRouter();

  const { query: { slugParam = '' } = {} } = router;

  return (
    <div className="bg-white flex p-8 mb-4">
      {roomTypesList.map((roomType, index) => {
        return (
          <Link href={`/design-sets/room/${roomType?.slug}`} key={roomType?._id} passHref>
            <div className={`cursor-pointer ${index > 0 ? 'ml-8' : ''}  `}>
              <div
                className={`h-40 w-40 relative rounded-md ${
                  roomType?.slug === slugParam ? 'border-2 border-rose-500' : 'border-2 border-transparent'
                }`}
              >
                <Image
                  src={`${cloudinary.baseDeliveryURL}/${roomType?.cdnThumbnail}`}
                  alt={roomType?.name}
                  placeholder="blur"
                  blurDataURL={blurredBgImage}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <p className="text-center">{roomType?.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default DesignSetBanner;
