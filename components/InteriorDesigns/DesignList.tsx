import DesignCard from '@components/InteriorDesigns/DesignCard';
import DesignCardDimmer from '@components/InteriorDesigns/DesignCardDimmer';
import Pagination from '@components/Shared/Pagination/index';
import usePagination from '@hooks/usePagination';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { internalPages, imageKit } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface DesignListInterface {
  feedData: {
    count: number;
    list: [];
    filters?: any;
  };
}

const DesignList: React.FC<DesignListInterface> = ({ feedData }) => {
  const { data: firebaseData } = useFirebaseContext();
  const { filters = {} } = feedData || {};

  const { currentRenderList, isFetching, buttons } = usePagination(
    { url: publicRoutes.designFeed, method: 'POST', payload: { data: { ...filters } } },
    feedData?.list,
    feedData?.count,
    internalPages.InteriorDesigns.DEFAULT_PAGINATION_BUTTON_COUNT,
    internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE,
    'list',
    {},
    {}
  );

  return (
    <div className="bg-white">
      <div className="container p-4 mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:gap-6 2xl:gap-8 lg:gap-y-14 mb-14">
          {isFetching && (
            <>
              {[...new Array(internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE)].map((_d, _i) => (
                <DesignCardDimmer key={Math.random()} />
              ))}
            </>
          )}
          {currentRenderList.map((design, index) => (
            <>
              {index !== 0 && index % 9 === 0 && firebaseData?.homepageV2?.hp2 && (
                <div className="relative rounded-xl col-span-full row-span-1 aspect-[16/7] lg:aspect-[16/6] xl:aspect-[16/5]">
                  {firebaseData?.homepageV2?.hp2Link !== undefined && firebaseData?.homepageV2?.hp2Link !== '' ? (
                    <Link href={firebaseData?.homepageV2?.hp2Link}>
                      <a>
                        <Image
                          src={`${imageKit.baseDeliveryUrl}/${firebaseData?.homepageV2?.hp2}`}
                          alt="designListBanner"
                          layout="fill"
                          objectFit="contain"
                        />
                      </a>
                    </Link>
                  ) : (
                    <Image
                      src={`${imageKit.baseDeliveryUrl}/${firebaseData?.homepageV2?.hp2}`}
                      alt="designListBanner"
                      layout="fill"
                      objectFit="contain"
                    />
                  )}
                </div>
              )}
              <DesignCard cardData={design} key={design?._id} />
            </>
          ))}
        </div>
        <Pagination buttonList={buttons} />
      </div>
    </div>
  );
};

export default React.memo(DesignList);
