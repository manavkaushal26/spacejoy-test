import DesignCardDimmer from '@components/InteriorDesigns/DesignCardDimmer';
import Pagination from '@components/Shared/Pagination';
import useGenericPagination from '@hooks/useGenericPagination';
import usePagination from '@hooks/usePagination';
import { PushEvent } from '@utils/analyticsLogger';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import React, { useRef } from 'react'
import BlogCard from './BlogCard';
import { BlogListInterface } from './BlogListInterface';

const BlogList: React.FC<BlogListInterface> = ({ data }) => {
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
    data,
    data?.length,
    internalPages.InteriorDesignsBlog.DEFAULT_PAGINATION_BUTTON_COUNT,
    internalPages.InteriorDesignsBlog.DEFAULT_PAGE_SIZE,
    '',
    {},
    {}
  );


  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-6 2xl:gap-8 lg:gap-y-14 mb-14">
          {isFetching && (
            <>
              {[...new Array(internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE)].map((_d, _i) => (
                <DesignCardDimmer key={Math.random()} />
              ))}
            </>
          )}
          {currentRenderList.map((blog) => (
            <BlogCard cardData={blog} key={blog?._id} />
          ))}
        </div>
        <Pagination buttonList={buttons} />
      </div>
    </div>
  );
}

export default BlogList