import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import useBoolean from '@hooks/useBoolean';
import React from 'react';
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
  const date = new Date(data?.publishedDate || '');
  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const { value, toggle } = useBoolean(false);

  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="flex items-center xl:space-x-10 2xl:space-x-20">
        <div className="max-w-4xl">
          <Tween from={{ opacity: 0, x: 20 }} to={{ opacity: 1, x: 0 }} duration={1} stagger={0.5}>
            <h1 className="text-2xl lg:text-5xl lg:leading-snug text-gray-900 mb-4">{data?.name}</h1>
            <div className="mt-4 mb-8 text-sm text-gray-600">
              <p className={`${!value && 'line-clamp-3'} text-gray-700`}>
                {data?.description.split(/\r?\n/).map((str) => {
                  return (
                    <p key={str} className="mt-2">
                      {str}
                    </p>
                  );
                })}
              </p>
              <button className="my-1 text-gray-500" onClick={toggle}>
                {!value ? '... read more' : 'hide'}
              </button>
            </div>
          </Tween>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;
