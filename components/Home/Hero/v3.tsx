import { blurredBgImage } from '@public/images/bg-base-64';
import Image from 'next/image';
import React, { useMemo } from 'react';
import Link from 'next/link';
import TextLoop from 'react-text-loop';
import { oldSpacejoyUrl } from '@utils/config';
import Cookies from 'js-cookie';
import useWindowSize from '@utils/useWindowSize';

const LOOP_CATEGORY = ['Imagination', "Kid's Room", 'Entryway', 'Dining Room', 'Home Office', 'Bedroom', 'Living Room'];

const V3 = () => {
  const { width } = useWindowSize();
	const isScreenSmall = useMemo(() => width <= 640, [width]);

  return (
    <div className="container relative mx-auto">
      <div className="absolute inset-0">
        <Image
          className="object-cover rounded-lg"
          src="https://res.cloudinary.com/spacejoy/image/upload/v1648726729/web/homepage-v3/jonathan-borba-COzqEKjaxqo-unsplash_1_u6m2q2.jpg"
          alt="home banner"
          layout="fill"
          placeholder="blur"
          blurDataURL={blurredBgImage}
          priority
        />
      </div>
      <div className="flex flex-col min-h-[700px] justify-center items-center relative z-10">
        <div
          className={`bg-white bg-opacity-70 rounded-xl py-6 px-14 absolute sm:mx-0 sm:top-15 sm:right-10 opacity-2 space-y-4 ${
            isScreenSmall ? 'bottom-10' : ''
          }`}
        >
          <h1 className="mb-1 text-3xl leading-tight sm:leading-normal text-center md:text-4xl">
            <span className=" text-lg md:text-xl">Design Your</span> <br />
            <span className="text-[#F5296E] leading-normal sm:leading-relaxed">
              <TextLoop mask>
                {LOOP_CATEGORY.map((category, idx) => (
                  <span key={idx}>{category}</span>
                ))}
              </TextLoop>
            </span>
          </h1>
          <p className="leading-normal font-semibold text-center text-md sm:text-xl sm:leading-normal">
            The best way to design and <br /> shop for your home
          </p>
          {!isScreenSmall && (
            <p className="text-sm leading-normal text-center sm:text-base sm:leading-normal">
              Create a stunning home with handpicked <br />
              products from top brands that you can <br />
              shop instantly
            </p>
          )}
          <div className="flex flex-col space-y-2">
            <Link href={`${oldSpacejoyUrl}/new-project`} passHref>
              <a
                target="_blank"
                type="button"
                className="group text-center overflow-hidden shadow-sm hover:shadow-lg text-base sm:text-lg text-white py-2 xl:py-3 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
              >
                Start Your Project
              </a>
            </Link>
            <Link href={`${oldSpacejoyUrl}/interior-designs`} passHref>
              <a
                target="_blank"
                type="button"
                className="group text-center overflow-hidden shadow-sm hover:shadow-lg text-base sm:text-lg text-black py-2 xl:py-3 px-4 xl:px-10 mt-4 rounded-xl bg-gray-100 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
              >
                Explore Design Ideas
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(V3);
