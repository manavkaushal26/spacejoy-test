import DesignCardDimmer from '@components/InteriorDesigns/DesignCardDimmer';
import Pagination from '@components/Shared/Pagination';
import useGenericPagination from '@hooks/useGenericPagination';
import usePagination from '@hooks/usePagination';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary, internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react'
import BlogCard from './BlogCard';
import { BlogListInterface } from './BlogListInterface';

const BlogList: React.FC<BlogListInterface> = ({ data }) => {
  const { data: firebaseData } = useFirebaseContext();
  const ref = useRef<HTMLDivElement>();
  const onButtonClick = (pgNo: any) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    PushEvent({
      category: 'Go to Page',
      action: `Go to Next Page - Interior Designs Blog | ${pgNo}`,
      label: 'Go to Page',
    });
  };

  
  const { currentRenderList, isFetching, buttons } = usePagination(
    { url: publicRoutes.interiorDesignsBlogList, method: 'GET' },
    data.blogs,
    data?.count,
    internalPages.InteriorDesignsBlog.DEFAULT_PAGINATION_BUTTON_COUNT,
    internalPages.InteriorDesignsBlog.DEFAULT_PAGE_SIZE,
    '',
    {},
    {}
  );


  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-6 2xl:gap-8 lg:gap-y-14 mb-14">
          {isFetching && (
            <>
              {[...new Array(internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE)].map((_d, _i) => (
                <DesignCardDimmer key={Math.random()} />
              ))}
            </>
          )}
          {currentRenderList.map((blog, index) => (
            <>
            {index !== 0 && index % 9 === 0 && firebaseData?.homepageV2?.hp2 && (
              <div className="relative rounded-xl col-span-full row-span-1 aspect-[16/7] lg:aspect-[16/6] xl:aspect-[16/5]">
                {firebaseData?.homepageV2?.hp2Link !== undefined && firebaseData?.homepageV2?.hp2Link !== '' ? (
                  <Link href={firebaseData?.homepageV2?.hp2Link}>
                    <a>
                      <Image
                        src={`${cloudinary.baseDeliveryURL}/${firebaseData?.homepageV2?.hp2}`}
                        alt="designListBanner"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                ) : (
                  <Image
                    src={`${cloudinary.baseDeliveryURL}/${firebaseData?.homepageV2?.hp2}`}
                    alt="designListBanner"
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
            )}
            <BlogCard cardData={blog} key={blog?._id} /></>
          ))}
        </div>
        <Pagination buttonList={buttons} />
      </div>
    </div>
  );
}

export default BlogList
