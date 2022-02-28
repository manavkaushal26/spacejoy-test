import CollageCardDimmer from '@components/Collages/CollageCardDimmer';
import { CollagesListInterface, CollageSubcategories } from '@components/Collages/interface';
import AffirmCard from '@components/Shared/AffirmCards/AffirmCard';
import Pagination from '@components/Shared/Pagination/index';
import useGenericPagination from '@hooks/useGenericPagination';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
// import { ColorListType } from '@utils/Mocks/Colors';
import React, { useMemo, useRef } from 'react';
import DesignSetCardV2 from './DesignSetCardV2';

interface DesignSetGridInterface {
  feedData: {
    count: number;
    list: CollagesListInterface[];
    filters?: any;
  };
  // bg?: ColorListType;
  category?: string;
  selectedSubCategoryList?: CollageSubcategories[];
}

const DesignSetGrid: React.FC<DesignSetGridInterface> = ({ feedData, category = '', selectedSubCategoryList }) => {
  const ref = useRef<HTMLDivElement>();
  const onButtonClick = (pgNo: any) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // PushEvent({
    //   category: 'Go to Page',
    //   action: `Go to Next Page - Design Set Collection | ${pgNo}`,
    //   label: 'Go to Page',
    // });
  };

  const apiParams = useMemo(() => {
    return {
      url: `${publicRoutes.collageBase}/search`,
      method: 'POST',
      payload: {
        filters: {
          ...{ ...(category ? { category: [category] } : {}) },
          ...(selectedSubCategoryList?.length
            ? { subCategory: selectedSubCategoryList.map((subCat) => subCat.name) }
            : {}),
          isActive: true,
          price: ['1', '500000'],
        },
        searchText: '',
        wildcard: true,
      },
    };
  }, [category, selectedSubCategoryList]);

  const { currentRenderList, isFetching, buttons } = useGenericPagination(
    apiParams,
    feedData?.list,
    feedData?.count,
    internalPages.Collages.DEFAULT_PAGINATION_BUTTON_COUNT,
    internalPages.Collages.DEFAULT_PAGE_SIZE,
    { onButtonClick: onButtonClick }
  );

  const indexes = [0, 4, 6, 10, 12];

  return (
    <div className="bg-white my-8" ref={ref}>
      <div className="container mx-auto ">
        <div className="grid grid-cols-12 gap-8">
          {/* Uncomment below code and chagne col-span-12 to col-span-9 in the next block to get sidebar */}
          {/* <div className="col-span-3 border rounded-xl">
            <div></div> 
          </div> */}
          <div className="grid grid-cols-4 gap-8 col-span-12">
            {isFetching && (
              <>
                {[...new Array(internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE)].map((_d, i) => {
                  const large = i % 3 == 0;

                  return (
                    <div key={_d} className={`relative ${large ? 'col-span-4 row-span-2' : 'col-span-2 row-span-1'}`}>
                      <CollageCardDimmer />
                    </div>
                  );
                })}
              </>
            )}

            {currentRenderList.map((design, index) => {
              // const large = index % 2 == 0 && index % 3 !== 2;
              const large = index % 5 == 0;

              return (
                // <div
                //   key={design?._id}
                //   className={`relative ${large ? 'col-span-2 row-span-2' : 'col-span-2 row-span-1'}`}
                // >
                //   <DesignSetCard designData={design} large={large} />
                // </div>
                <>
                  {index == 5 && (
                    <div
                      className={`relative border rounded-xl ${
                        large
                          ? 'col-span-4 row-span-2 aspect-[16/7] lg:aspect-[16/6] xl:aspect-[16/5]'
                          : 'col-span-2 row-span-1 aspect-[16/14] lg:aspect-[16/10] xl:aspect-[16/8]'
                      }`}
                    >
                      <AffirmCard imgUrl="https://res.cloudinary.com/spacejoy/image/upload/v1645764975/web/homepage-v3/Group_9designsetBigAffirm_ayi0hz.svg" />
                    </div>
                  )}
                  <div
                    key={design?._id}
                    className={`relative ${large ? 'col-span-4 row-span-2' : 'col-span-2 row-span-1'}`}
                  >
                    <DesignSetCardV2 designData={design} large={large} />
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="my-8">
          <Pagination buttonList={buttons} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DesignSetGrid);
