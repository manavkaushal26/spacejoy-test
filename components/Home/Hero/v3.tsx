import { oldSpacejoyUrl } from '@utils/config';
import useWindowSize from '@utils/useWindowSize';
import Link from 'next/link';
import React, { useMemo } from 'react';
import TextLoop from 'react-text-loop';

const LOOP_CATEGORY = ["Kid's Room", 'Entryway', 'Dining Room', 'Home Office', 'Bedroom', 'Living Room', 'Imagination'];

const V3 = () => {
  const { width } = useWindowSize();
  const isScreenSmall = useMemo(() => width <= 640, [width]);

  return (
    <div className="container relative mx-auto">
      <main className="lg:relative">
        <div className="max-w-7xl w-full pt-16 pb-20 text-center py-44 lg:text-left">
          <div className="px-4 w-full lg:w-1/3 sm:px-8 xl:pr-16">
            <h1 className="mb-1 text-4xl sm:leading-normal text-left md:text-4xl">
              <span className=" whitespace-nowrap">
                Design
                <br /> Your
              </span>{' '}
              <br />
              <span className="text-gray-900  whitespace-nowrap">
                <TextLoop mask>
                  {LOOP_CATEGORY.map((category, idx) => (
                    <span key={idx}>{category}</span>
                  ))}
                </TextLoop>
              </span>
            </h1>
            <p className="font-bold text-2xl text-gray-900 mt-5 text-left">
              The best way to design and shop for your home
            </p>
            <p className="mt-2 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl text-left">
              Create a stunning home with handpicked products from top brands that you can shop instantly
            </p>
            <div className="mt-10 ">
              <div className="rounded-md shadow">
                <Link href={`${oldSpacejoyUrl}/new-project`} passHref>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900  md:py-4 md:text-lg md:px-10"
                  >
                    Start Your Project
                  </a>
                </Link>
              </div>
              <div className="mt-4 rounded-md shadow ">
                <Link href={`${oldSpacejoyUrl}/interior-designs`} passHref>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 border border-gray-900"
                  >
                    Explore Design Ideas
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/3 full">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            src="https://res.cloudinary.com/spacejoy/image/upload/v1648726729/web/homepage-v3/jonathan-borba-COzqEKjaxqo-unsplash_1_u6m2q2.jpg"
            alt=""
          />
        </div>
      </main>
    </div>
  );
};

export default React.memo(V3);
