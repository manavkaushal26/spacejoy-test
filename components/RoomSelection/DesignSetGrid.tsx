import CollageCardDimmer from '@components/Collages/CollageCardDimmer';
import { CollagesListInterface, CollageSubcategories } from '@components/Collages/interface';
import EmptyState from '@components/Shared/EmptyState';
import Pagination from '@components/Shared/Pagination/index';
import useGenericPagination from '@hooks/useGenericPagination';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { cloudinary, internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
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
  tagFilters?: Array<string>;
  themeFilters?: Array<string>;
}

const DesignSetGrid: React.FC<DesignSetGridInterface> = ({
  feedData,
  category = '',
  selectedSubCategoryList,
  tagFilters,
  themeFilters = [],
}) => {
  const isMobileScreen = Cookies.get('isMobile');
  const isMobile = isMobileScreen === 'true' ? true : false;
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
          tags: [...tagFilters],
          themes: [...themeFilters],
        },
        searchText: '',
        wildcard: true,
      },
    };
  }, [category, selectedSubCategoryList, tagFilters, themeFilters]);

  const { currentRenderList, isFetching, buttons } = useGenericPagination(
    apiParams,
    feedData?.list,
    feedData?.count,
    internalPages.Collages.DEFAULT_PAGINATION_BUTTON_COUNT,
    internalPages.Collages.DEFAULT_PAGE_SIZE,
    { onButtonClick: onButtonClick }
  );

  const indexes = [0, 4, 6, 10, 12];
  const { data } = useFirebaseContext();

  return (
    <div className="bg-gray-100" ref={ref}>
      <div className="container mx-auto ">
        <div className="grid grid-cols-12 lg:gap-8">
          {/* Uncomment below code and chagne col-span-12 to col-span-9 in the next block to get sidebar */}
          {/* <div className="col-span-3 border rounded-xl">
            <div></div> 
          </div> */}
          <div className="grid grid-cols-4 gap-4 lg:gap-8 col-span-12">
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
            {!isFetching && !currentRenderList?.length ? (
              <div className="col-span-12">
                <EmptyState title="No matching design sets found" message="Try changing the filters" />
              </div>
            ) : (
              <>
                {currentRenderList.map((design, index) => {
                  // const large = index % 2 == 0 && index % 3 !== 2;
                  const large = isMobile ? index % 1 == 0 : index % 5 == 0;

                  return (
                    <>
                    {index == 5 && (
                        <div
                          className={`relative rounded-xl ${
                            large
                              ? 'col-span-4 row-span-2 aspect-[16/7] lg:aspect-[16/6] xl:aspect-[16/5]'
                              : 'col-span-2 row-span-1 aspect-[16/14] lg:aspect-[16/10] xl:aspect-[16/8]'
                          }`}
                        >
                          <Link href="https://form.typeform.com/to/V1SWVv3c">
                          <a target="_blank">
                          <div className="container rounded-lg w-full h-full relative">
                          <Image
                              src="https://res.cloudinary.com/spacejoy/image/upload/v1648536337/web/webengagebanners/Big-Card_vxtxup.gif"
                              alt="affirm"
                              layout="fill"
                              className="object-contain rounded-2xl"
                              placeholder="blur"
                              blurDataURL={blurredBgProduct}
                            />
                          </div>
                          </a>
                          </Link>
                        </div>
                      )}
                      {index == 10 && (
                        <div
                          className={`relative rounded-xl ${
                            large
                              ? 'col-span-4 row-span-2 aspect-[16/7] lg:aspect-[16/6] xl:aspect-[16/5]'
                              : 'col-span-2 row-span-1 aspect-[16/14] lg:aspect-[16/10] xl:aspect-[16/8]'
                          }`}
                        >
                          <div className="container rounded-lg w-full h-full relative">
                            <Image
                              src="https://res.cloudinary.com/spacejoy/image/upload/v1645764975/web/homepage-v3/Group_9designsetBigAffirm_ayi0hz.svg"
                              alt="affirm"
                              layout="fill"
                              className="object-contain rounded-2xl"
                              placeholder="blur"
                              blurDataURL={blurredBgProduct}
                            />
                          </div>
                        </div>
                      )}
                      {index == 6 && data?.designListingV2?.visible && (
                        <div className="relative rounded-xl col-span-4 row-span-2 aspect-[16/7] lg:aspect-[16/6] xl:aspect-[16/5]">
                          {data?.designListingV2?.link !== undefined && data?.designListingV2?.link !== '' ? (
                            <Link href={data?.designListingV2?.link}>
                              <a>
                                <Image
                                  src={`${cloudinary.baseDeliveryURL}/${data?.designListingV2?.cdn}`}
                                  alt="designListBanner"
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </a>
                            </Link>
                          ) : (
                            <Image
                              src={`${cloudinary.baseDeliveryURL}/${data?.designListingV2?.cdn}`}
                              alt="designListBanner"
                              layout="fill"
                              objectFit="contain"
                            />
                          )}
                        </div>
                      )}
                      <div
                        key={design?._id}
                        className={`relative ${large ? 'col-span-4 row-span-2' : 'col-span-2 row-span-1'}`}
                      >
                        <DesignSetCardV2 designData={design} large={large} isMobile={isMobile} />
                      </div>
                    </>
                  );
                })}
              </>
            )}
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
