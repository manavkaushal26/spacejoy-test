/* eslint-disable @next/next/no-img-element */
import LottieAnimation from '@components/Shared/LottieAnimation';
import MachineLearning from '@public/lotties/machine-learning.json';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSearchProductsWithImageContext } from '../UseSearchProductsFromImageProvider';

const BoundingBox = styled.button<{
  hue: number;
  selected: boolean;
  bottom: number;
  multiplier: number;
  left: number;
}>`
  border: 10px ${({ hue }) => `hsl(${hue}, 95%, 88%) double`};
  position: absolute;
  background-color: ${({ selected, hue }) => (selected ? `hsl(${hue}, 95%, 88%)` : 'transparent')};
  bottom: ${({ bottom }) => `${bottom - 1}%`};

  left: ${({ left }) => `${left - 1}%`};
  z-index: ${({ multiplier }) => (multiplier * 2 + 5) % multiplier};
  width: 10px;
  height: 10px;
  border-radius: 30px;
  &:hover {
    span {
      display: inline;
    }
  }
  span {
    position: absolute;
    white-space: nowrap;
    color: black;
    z-index: 10;
    display: none;
    ${({ selected }) => selected && 'display: inline;'}
    background-color: white;
    ${({ left }) => (left > 52 ? 'right: 0' : 'left: 0')};
    top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.8rem;
    font-weight: 400;
    background-color: ${({ hue }) => `hsl(${hue}, 95%, 95%)`};
  }
  &:hover {
    border: 10px ${({ hue }) => `hsl(${hue}, 95%, 88%)`} double;
    background-color: ${({ hue }) => `hsl(${hue}, 95%, 88%)`};
  }
`;

const ImageWithPins: React.FC<{ imgSrc: string }> = ({ imgSrc }) => {
  const { boundingBoxData, repeatMarkedCategories, selectedBox, setSelectedBox, searchQuery, categoryHues, loading } =
    useSearchProductsWithImageContext();
  const [naturalWidth, naturalHeight] = boundingBoxData?.queryImageSize || [];

  const onBoundingBoxChange = useCallback(
    (data) => {
      setSelectedBox({ ...data });
      // PushEvent({
      //   category: `Similar Product Page - Filter category from Image`,
      //   action: `Filter category from Image | ${searchQuery} | ${data?.productCategory}`,
      //   label: `Explore Category`,
      // });
    },
    [searchQuery]
  );

  return (
    <div className=" relative rounded-3xl overflow-hidden sticky top-28">
      <img alt={imgSrc} src={imgSrc} className=" rounded-3xl" />
      {loading?.findingProducts && (
        <div className="absolute top-0 flex flex-col text-center text-white  justify-center items-center inset-0 backdrop-blur-sm bg-black/40">
          <LottieAnimation height={200} width={200} animationData={MachineLearning} />
          Identifying products.
          <br />
          We&apos;ll populate your list in a moment
        </div>
      )}
      {repeatMarkedCategories?.map((data, index) => {
        const boundingBoxCoordinates = data?.boundingBoxCoordinates;
        const [[minX, maxY], [maxX, minY]] = boundingBoxCoordinates;
        const invertedMaxY = naturalHeight - maxY;
        const invertedMinY = naturalHeight - minY;

        const bottomPosition = Math.abs(((invertedMaxY + (invertedMinY - invertedMaxY) / 2) * 100) / naturalHeight);
        const leftPosition = Math.abs(((minX + (maxX - minX) / 2) * 100) / naturalWidth);

        return data?.similarAssetIds?.length ? (
          <BoundingBox
            key={data?.queryProductUrl}
            multiplier={repeatMarkedCategories?.length - index}
            hue={categoryHues[data?.productCategory]}
            selected={selectedBox?.queryProductUrl === data?.queryProductUrl}
            onClick={() => onBoundingBoxChange(data)}
            bottom={bottomPosition}
            left={leftPosition}
          >
            <span>{data?.productCategory}</span>
          </BoundingBox>
        ) : undefined;
      })}
    </div>
  );
};

export default ImageWithPins;
