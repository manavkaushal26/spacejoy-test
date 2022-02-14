import LottieAnimation from '@components/Shared/LottieAnimation';
import PinterestSearch from '@public/lotties/pinterest-loading.json';
import { PushEvent } from '@utils/analyticsLogger';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import styled, { keyframes } from 'styled-components';
import { useFindYourInpirationContext } from '../usePinterestSearchContext';

const FadeInAnimation = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

export const MasonryItem = styled.div<{ delay: number }>`
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;

  opacity: 0;

  animation: ${FadeInAnimation} 0.1s forwards;
  animation-delay: ${({ delay }) => `${delay * 0.05}s`};
  // @media (max-width: 576px) {
  // 	min-height: 80px;
  // }
  // @media (min-width: 576px) {
  // 	min-height: 120px;
  // }
  border-radius: 1rem;
  overflow: hidden;

  /* &:hover {
    box-shadow: 2px 12px 14px rgba(28, 34, 51, 0.4);
  } */
  .overlay {
    opacity: 0;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    transition: all 0.2s ease;
    span {
      color: white;
      font-weight: bold;
      background-color: black;
      color: white;
      position: absolute;
      padding: 1rem;
      border-radius: 1rem;
      font-size: 0.9rem;
    }
  }

  &:hover {
    .overlay {
      /* z-index: 1; */
      opacity: 1;
    }
  }
`;

export const StyledImage = styled.img`
  min-height: 150px;
  @media (max-width: 576px) {
    min-height: 80px;
  }
`;

const PinterestBoardsList: React.FC = () => {
  const { searchText, pinList, loading, error } = useFindYourInpirationContext();
  const scrollToRef = useRef<HTMLDivElement>();

  const isUnsupportedUrl = useMemo(() => {
    if (/pin\.it/.test(searchText)) {
      return true;
    }

    return false;
  }, [searchText]);

  const message = useMemo(() => {
    if (isUnsupportedUrl) {
      return "Oops this is on us. We don't support pins at the moment. Please share the link of a board";
    }
    if (!error && pinList.length > 0) {
      return 'Select an image to see our product recommendations.';
    }

    return "Oops this is on us. We can't seem to recognize this link. Please share the link of a board.";
  }, [error, pinList, isUnsupportedUrl]);

  const sendEventToGA = (pinterestUrl) => {
    PushEvent({
      category: 'Click on Pinterest Pin - Find Similar Products',
      action: `Go to Product recommendations Page | ${pinterestUrl}`,
      label: `Find Similar Products`,
    });
  };

  useEffect(() => {
    if (scrollToRef?.current && pinList.length) {
      // console.log(scrollToRef);
      scrollToRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [pinList]);

  return (
    <div ref={scrollToRef} className={`${pinList.length ? 'pt-24' : ''}`}>
      {(pinList?.length !== 0 || error || isUnsupportedUrl) && (
        <div className="flex justify-center mb-12">
          <span
            className={`p-4 border-2 ${
              error || isUnsupportedUrl ? 'border-red-500 bg-red-100' : 'border-sky-600 bg-sky-100'
            }   rounded-lg text-gray-800`}
          >
            {message}
          </span>
        </div>
      )}
      <div>
        {loading && (
          <div>
            <LottieAnimation height={200} width={200} animationData={PinterestSearch} />
          </div>
        )}
      </div>
      <div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 5 }}>
          <Masonry gutter="20px">
            {pinList.map((imgItem, index) => (
              // <Button raw onClick={() => setImgSrc(imgItem.images["564x"].url)}>
              <Link
                key={imgItem?.id}
                href={`/pinterest/find-products?imgSrc=${imgItem.images['564x'].url}&searchQuery=${searchText}`}
              >
                <a onClick={() => sendEventToGA(`${searchText}`)}>
                  <MasonryItem
                    delay={index}
                    className="overflow-hidden rounded-lg masonry-item shine group "
                    key={imgItem.id}
                  >
                    <StyledImage
                      width="100%"
                      src={imgItem.images['564x'].url}
                      // placeholderSrc="images/fallback-background.svg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-all scale-50 rounded-lg opacity-0 bg-black/50 backdrop-blur-sm group-hover:opacity-100 group-hover:scale-100">
                      <span className="p-4 text-white bg-black rounded-lg">Find similar products</span>
                    </div>
                  </MasonryItem>
                </a>
              </Link>
              /* </Button> */
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default PinterestBoardsList;
