import { CollagesListInterface } from '@components/Collages/interface';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { PushEvent } from '@utils/analyticsLogger';
import { priceToLocaleString } from '@utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface DesignSetCardV2Props {
  designData: CollagesListInterface;
  large: boolean;
}

const DesignSetCardV2: React.FC<DesignSetCardV2Props> = ({ designData, large }) => {
  const tagsInPills = useMemo(() => {
    return [
      ...(designData?.themes?.split(',')?.slice(0, 1) || []),
      ...(designData?.tags?.split(',')?.slice(0, 1) || []),
    ];
  }, [designData]);

  return (
    <Link
      href={{
        pathname: `/design-sets/${designData?._id}`,
      }}
    >
      <a>
        <div
          className={`grid grid-cols-4 border transition-all hover:shadow-lg rounded-xl overflow-hidden group  ${
            large ? 'aspect-[16/5]' : 'aspect-[16/8] '
          }`}
          onClick={() => {
            PushEvent({
              category: `Select Design Set Card`,
              action: `Go to Design Set PDP Page | ${designData?._id}`,
              label: `Explore Design Set`,
            });
          }}
        >
          <div className={`relative overflow-hidden ${large ? 'col-span-3' : 'col-span-2'}`}>
            <div className="z-10 h-full p-4">
              <div className="relative h-full">
                <Image
                  loading="eager"
                  className="z-10"
                  src={`https://res.cloudinary.com/spacejoy/image/upload/e_trim/ar_1.67,c_mpad/${
                    large ? 'w_1400' : 'w_800'
                  },c_pad/f_auto,q_auto/${designData?.thumbnail}`}
                  layout="fill"
                  alt={designData?.collageId}
                  objectFit={'contain'}
                  placeholder="blur"
                  blurDataURL={blurredBgProduct}
                />
              </div>
            </div>
            {/* <Image
              className="z-0"
              src={`https://res.cloudinary.com/spacejoy/image/upload/q_auto,w_1000,f_auto/v1643871522/spj-v2/DIY/room-background_ukes2y.jpg`}
              layout="fill"
              alt={`${designData?.collageId} background`}
              objectFit="cover"
            /> */}
          </div>
          <div className={`bg-gray-100  ${large ? 'col-span-1' : 'col-span-2'} p-8 flex flex-col justify-between`}>
            <div className="flex flex-col gap-2">
              <h2 className={`capitalize text-lg  line-clamp-2 font-bold tracking-normal`}>
                {/* Change line-clamp-2 to line-clamp-1 if there is more data to be displayed */}
                {designData?.name.slice(0, -11)}
              </h2>
              {tagsInPills?.length > 0 && (
                <div className="flex gap-1 mt-1 mb-1">
                  {tagsInPills.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="px-2 py-1 text-xs capitalize bg-gray-300 border rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-600 line-clamp-2">{designData?.description}</p>
            </div>
            <div>
              <div className="mt-2 mb-4 text-xl font-bold">{priceToLocaleString(designData?.price)}</div>

              <div className="flex gap-4">
                <a className="px-4 py-2 transition-all border border-black rounded-lg group-hover:scale-105 hover:shadow-xl">
                  Personalize
                </a>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DesignSetCardV2;
