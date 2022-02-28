import { CollagesListInterface } from '@components/Collages/interface';
import { blurredBgProduct } from '@public/images/bg-base-64';
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
        <div className="grid grid-cols-4 rounded-lg overflow-hidden border">
          <div className="col-span-4">
            {tagsInPills?.length > 0 && !large && (
              <div className="flex gap-1 mt-1 mb-2 px-4 pt-4 pb-2">
                {tagsInPills.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="px-2 py-1 text-xs capitalize bg-neutral-500 text-white  border rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className={`${large ? 'col-span-3' : 'col-span-4'} px-4 ${large && 'py-4'}`}>
            <div className={`relative ${large ? 'aspect-[2.32]' : 'aspect-[2]'} `}>
              <Image
                loading="eager"
                className="z-10 rounded-lg overflow-hidden"
                src={`https://res.cloudinary.com/spacejoy/image/upload/e_trim/${
                  large ? 'ar_2.32' : 'ar_2'
                },c_fill/f_auto,q_auto/${designData?.thumbnail}`}
                layout="fill"
                alt={designData?.collageId}
                objectFit={'contain'}
                placeholder="blur"
                blurDataURL={blurredBgProduct}
              />
            </div>
          </div>
          <div className={`${large ? 'col-span-1' : 'col-span-4'}  p-4  `}>
            <div className="flex flex-col justify-between h-full">
              {tagsInPills?.length > 0 && large && (
                <div className="flex gap-1 mt-1 mb-2">
                  {tagsInPills.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="px-2 py-1 text-xs capitalize bg-neutral-500 text-white  border rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div>
                <div className={'flex flex-col gap-2'}>
                  <h2 className={`capitalize text-lg  line-clamp-2  font-bold tracking-normal`}>
                    {/* Change line-clamp-2 to line-clamp-1 if there is more data to be displayed */}
                    {designData?.name.slice(0, -11)}
                  </h2>
                  {designData?.description && <p className="text-gray-600 line-clamp-2">{designData?.description}</p>}
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
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DesignSetCardV2;
