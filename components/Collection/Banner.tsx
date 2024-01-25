import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import useBoolean from '@hooks/useBoolean';
import React, { useMemo, useState } from 'react';
import { Tween } from 'react-gsap';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface BannerProps {
  data: {
    publishedDate?: string;
    name?: string;
    description?: string;
    coverImg?: string;
  };
}

const CollectionBanner: React.FC<BannerProps> = ({ data }) => {
  const initialLengthToShow = 275; // Adjust the initial length to show
  const [showFullParagraph, setShowFullParagraph] = useState(false);

  const toggleParagraph = () => {
    setShowFullParagraph((prev) => !prev);
  };

  const date = new Date(data?.publishedDate || '');
  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  const displayedText = useMemo(() => {
    return showFullParagraph ? (
      data?.description.split(/\r?\n/).map((str) => (
        <p key={str} className="mt-4 text-gray-700">
          {str}
        </p>
      ))
    ) : (
      <p className="inline">{data?.description.slice(0, initialLengthToShow)}... </p>
    );
  }, [data?.description, showFullParagraph]);

  return (
    <div className="container px-4 pt-8 mx-auto">
      <div className="flex items-center xl:space-x-10 2xl:space-x-20">
        <div className="max-w-4xl">
          <Tween from={{ opacity: 0, x: 20 }} to={{ opacity: 1, x: 0 }} duration={1} stagger={0.5}>
            <h1 className="mb-4 text-2xl text-gray-900 lg:text-5xl lg:leading-snug">{data?.name}</h1>
            <div className="mt-4 mb-8 text-sm text-gray-600">
              {displayedText}
              <button className="text-[#F5296E]" onClick={toggleParagraph}>
                {!showFullParagraph ? ' read more' : ' hide'}
              </button>
            </div>
          </Tween>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;
