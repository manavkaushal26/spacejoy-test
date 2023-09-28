import { CollagesListInterface } from '@components/Collages/interface';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { PushEvent } from '@utils/analyticsLogger';
import { imageKit } from '@utils/config';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface DesignSetCardV2Props {
  designData: CollagesListInterface;
  large: boolean;
  pageRef: string;
  isMobile?: boolean;
}

const DesignSetCardV2: React.FC<DesignSetCardV2Props> = ({ designData, large, isMobile, pageRef }) => {
  const mobile = Cookies.get('isMobile') === 'true' ? true : false;

  const tagsInPills = useMemo(() => {
    return [
      ...(designData?.themes?.toString().split(',')?.slice(0, 1) || []),
      ...(designData?.tags?.toString().split(',')?.slice(0, 1) || []),
    ];
  }, [designData]);

  return (
    <Link
      href={{
        pathname: `/design-sets/${designData?._id}`,
      }}
    >
      <a
        target={!mobile ? '_blank' : null}
        onClick={() => {
          PushEvent({
            category: `Click on Design Set Card | ${pageRef}`,
            action: `Go To design set viewer page | did: ${designData?._id}`,
            label: `Explore Design Set`,
          });
        }}
      >
        {!isMobile ? (
          <div className="grid grid-cols-4 overflow-hidden bg-white border rounded-lg">
            <div className={`${large ? 'col-span-3' : 'col-span-4'} px-4 py-4`}>
              <div className={`relative ${large ? 'aspect-[2.32]' : 'aspect-[2]'} `}>
                {/* e_trim/${
                    large ? 'ar_2.32' : 'ar_2'
                  },c_fill/f_auto,q_auto,${large ? 'w_1200' : 'w_700'} */}
                <Image
                  loading="eager"
                  className="z-10 overflow-hidden rounded-lg"
                  src={`${imageKit.baseDeliveryUrlShort}/${designData?.thumbnail}`}
                  layout="fill"
                  alt={designData?.collageId}
                  objectFit={'contain'}
                  placeholder="blur"
                  blurDataURL={blurredBgProduct}
                />
              </div>
            </div>
            <div className={`${large ? 'col-span-1' : 'col-span-4'}  p-4  `}>
              <div className="flex flex-col h-full">
                {tagsInPills?.length > 0 && (
                  <div className="flex gap-1 mt-1 mb-2">
                    {tagsInPills.map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        className="px-2 py-1 text-xs text-white capitalize border rounded-full bg-neutral-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div>
                  <div className={'flex flex-col gap-2 mb-2'}>
                    <h2 className={`capitalize text-lg  line-clamp-2  font-bold tracking-normal`}>
                      {/* Change line-clamp-2 to line-clamp-1 if there is more data to be displayed */}
                      {designData?.name.slice(0, -11)}
                    </h2>
                    {designData?.description && <p className="text-gray-600 line-clamp-2">{designData?.description}</p>}
                  </div>
                  <div>
                    {/* <div className="mt-2 mb-4 text-xl font-bold">{priceToLocaleString(designData?.price)}</div> */}

                    <div className="flex gap-4">
                      <a className="flex items-center gap-2 px-4 py-2 transition-all border border-black rounded-lg group-hover:scale-105 hover:shadow-xl">
                        Explore <ArrowRightIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid bg-white border rounded-lg grid-rows-12">
            <div className={`sm:px-4 sm:py-4 row-span-8`}>
              <div className={`relative ${large ? 'aspect-[2]' : 'aspect-[2]'} `}>
                {/* /e_trim/${large ? 'ar_2' : 'ar_2'},c_fill/f_auto,q_auto,${
                    large ? 'w_1200' : 'w_700'
                  } */}
                <Image
                  loading="eager"
                  className="z-10 overflow-hidden rounded-lg"
                  src={`${imageKit.baseDeliveryUrl}/${designData?.thumbnail}`}
                  layout="fill"
                  alt={designData?.collageId}
                  objectFit={'contain'}
                  placeholder="blur"
                  blurDataURL={blurredBgProduct}
                />
              </div>
            </div>
            <div className={`p-4`}>
              <div className="flex flex-col h-full">
                {tagsInPills?.length > 0 && (
                  <div className="flex gap-1 mt-1 mb-2">
                    {tagsInPills.map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        className="px-2 py-1 text-xs text-black capitalize bg-gray-100 border rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div>
                  <div className={'flex flex-col gap-2 mb-2'}>
                    <div className="flex space-x-10">
                      <h2
                        className={`capitalize text-sm md:text-base line-clamp-2 font-semibold tracking-normal w-2/3`}
                      >
                        {/* Change line-clamp-2 to line-clamp-1 if there is more data to be displayed */}
                        {designData?.name.slice(0, -11)}
                      </h2>
                      <div>
                        <div className="flex justify-center gap-4">
                          <a className="flex items-center gap-2 px-4 py-2 transition-all border border-black rounded-md group-hover:scale-105 hover:shadow-xl">
                            Explore <ArrowRightIcon className="w-5 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {designData?.description && <p className="text-gray-600 line-clamp-2">{designData?.description}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </a>
    </Link>
  );
};

export default DesignSetCardV2;
