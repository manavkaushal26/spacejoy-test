import CollectionCard from '@components/Collection/CollectionCard';
import CollectionCardDimmer from '@components/Collection/CollectionCardDimmer';
import EmptyState from '@components/Shared/EmptyState';
import LoadingState from '@components/Shared/LoadingState';
import Pagination from '@components/Shared/Pagination';
import usePagination from '@hooks/usePagination';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CollectionListInterface } from './interface';

const entry = keyframes`
	from { 
		opacity: 0;
    transform: scale(0.7);
	}
	to {
    opacity: 1;
    transform: scale(1);
	}
`;

const AnimateBox = styled.ul`
  & > li {
    opacity: 0;
    transform: scale(0.7);
    animation: ${entry} 0.4s forwards;
    &:nth-child(1) {
      animation-delay: 100ms;
    }
    &:nth-child(2) {
      animation-delay: 150ms;
    }
    &:nth-child(3) {
      animation-delay: 200ms;
    }
    &:nth-child(4) {
      animation-delay: 250ms;
    }
    &:nth-child(5) {
      animation-delay: 300ms;
    }
    &:nth-child(6) {
      animation-delay: 350ms;
    }
    &:nth-child(7) {
      animation-delay: 400ms;
    }
    &:nth-child(8) {
      animation-delay: 450ms;
    }
    &:nth-child(9) {
      animation-delay: 500ms;
    }
    &:nth-child(10) {
      animation-delay: 550ms;
    }
    &:nth-child(11) {
      animation-delay: 600ms;
    }
    &:nth-child(12) {
      animation-delay: 650ms;
    }
  }
`;

const CollectionList: React.FC<CollectionListInterface> = ({ feedData }) => {
  const { list, count: totalRecords } = feedData;
  const { currentRenderList, isFetching, buttons } = usePagination(
    { url: publicRoutes.collectionFeedV2, method: 'GET' },
    list,
    totalRecords,
    internalPages.InteriorDesigns.DEFAULT_PAGINATION_BUTTON_COUNT,
    internalPages.Collection.DEFAULT_PAGE_SIZE,
    'data',
    {},
    {}
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-end py-20">
        <div className="flex-1">
          <p className="text-gray-500">Our most popular design ideas handpicked for you</p>
          <h1 className="my-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Explore Curated Collections
          </h1>
          <p className="text-gray-800 max-w-3xl">
            Take a look at the wide collection of interior design ideas curated by our design experts for special
            occasions and ever-evolving trends. Our collections will help you visualize your new room effortlessly and
            create a space that is best suited for your needs.
          </p>
        </div>
      </div>
      <div className="relative bg-white">
        <AnimateBox className="grid grid-cols-3 xl:grid-cols-3 gap-4 xl:gap-6 2xl:gap-8 gap-y-10">
          {isFetching && (
            <>
              {[...new Array(internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE)].map((_d, _i) => (
                <CollectionCardDimmer key={Math.random()} />
              ))}
            </>
          )}
          {currentRenderList?.map((collection) => (
            <CollectionCard cardData={collection} key={collection?._id} inset={false} />
          ))}
        </AnimateBox>
        {currentRenderList?.length === 0 && (
          <>
            {isFetching ? (
              <LoadingState />
            ) : (
              <EmptyState title="No collections found" message="Please refresh the page" />
            )}
          </>
        )}
        <br />
        <br />
        <Pagination buttonList={buttons} />
      </div>
    </div>
  );
};

export default React.memo(CollectionList);
