import Carousel from '@components/Carousel';
import { oldSpacejoyUrl } from '@utils/config';
import useWindowSize from '@utils/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';
import TextLoop from 'react-text-loop';

const LOOP_CATEGORY = ["Kid's Room", 'Entryway', 'Dining Room', 'Home Office', 'Bedroom', 'Living Room', 'Imagination'];
const responsive = {
  dots: true,
  arrows: false,
  slidesToShow: 1,
  className: 'responsive',
  autoplay: true,
  autoplaySpeed: 2000,
};
const bannerImages = [
  {
    src: 'https://res.cloudinary.com/spacejoy/image/upload/v1656677852/spj-v2/Summer_design_01-_Camera_1_1_-min_yz83hj.png',
  },
  {
    src: 'https://res.cloudinary.com/spacejoy/image/upload/v1657192491/web/homev3/Generic_Banners_Home_Page_Carousel_Card2_zbabfz.jpg',
  },
  {
    src: 'https://res.cloudinary.com/spacejoy/image/upload/v1657192492/web/homev3/Generic_Banners_Home_Page_Carousel_Card3_kfiiru.jpg',
  },
];

const V3 = ({ isMobile }) => {
  const { width } = useWindowSize();
  const isScreenSmall = useMemo(() => width <= 640, [width]);
  // const isMobile = Cookies.get('isMobile') === 'true' ? true : false;

  return isMobile === false ? (
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
            <p className="mt-2 max-w-md text-lg text-gray-500 sm:text-base md:mt-5 md:max-w-3xl text-left">
              Create a stunning home with handpicked products from top brands that you can shop instantly
            </p>
            <div className="mt-10 ">
              <div className="rounded-md shadow">
                <Link href={`/quiz/start-quiz`} passHref>
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
                    className="w-full flex items-center justify-center px-8 py-3 border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 border border-gray-900"
                  >
                    Explore Design Ideas
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/3 h-full px-5">
          <Carousel
            imageCount={bannerImages?.length || 0}
            responsive={responsive}
            autoplay
            autoplaySpeed={3000}
            infinite
          >
            {bannerImages.map((bannerImage, idx) => {
              return (
                <div key={idx}>
                  <Image
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    src={bannerImage.src}
                    alt=""
                    height={660}
                    width={990}
                    layout="responsive"
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      </main>
    </div>
  ) : (
    <div className="container relative mx-auto">
      {' '}
      <main>
        {/* <div className="pb-12 py-0 text-center"> */}
        <div className="py-0 my-0 mt-12">
          <h1 className="text-2xl text-left mb-1 px-4">
            Design Your{' '}
            <TextLoop mask>
              {LOOP_CATEGORY.map((category, idx) => (
                <span key={idx}>{category}</span>
              ))}
            </TextLoop>
          </h1>
          <p className="py-2 px-4 text-sm text-gray-500 sm:text-base md:mt-5 text-left">
            Create a stunning home with handpicked products from top brands that you can shop instantly
          </p>
          <div className="relative pt-4">
            <Carousel
              imageCount={bannerImages?.length || 0}
              responsive={responsive}
              autoplay
              autoplaySpeed={3000}
              infinite
              slidesToShow={1}
            >
              {bannerImages.map((bannerImage, idx) => {
                return (
                  <div key={idx}>
                    <Image
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      src={bannerImage.src}
                      alt=""
                      height={450}
                      width={450}
                      layout="responsive"
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="mt-10 px-4">
            <div className="rounded-md shadow">
              <Link href={`/quiz/start-quiz`} passHref>
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
                  className="w-full flex items-center justify-center px-8 py-3 border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 border border-gray-900"
                >
                  Explore Design Ideas
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* </div> */}
      </main>
    </div>
  );
};

export default React.memo(V3);
