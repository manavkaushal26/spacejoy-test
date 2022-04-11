import { Hero3 } from '@components/Home';
import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import OutputGallery from '@components/Home/OutputGallery';
import Carousel, { position } from '@components/Shared/Carousel';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import SEOWrapper from '@components/Shared/SEO/SEOWrapper';
import TopBarMobile from '@components/Shared/TopBarMobile';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import TeamData from '@mocks/DesignTeamData';
import { blurredBgImage, blurredBgProduct } from '@public/images/bg-base-64';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary, oldSpacejoyUrl, pinterestConfig } from '@utils/config';
import TestimonialData from '@utils/Mocks/Testimonials';
import { HomePageSEO } from '@utils/SEO'; // can also have jsonLD config
import useWindowSize from '@utils/useWindowSize';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

const DynamicFeaturedWithNoSSR = dynamic(() => import('@components/Home/Featured'), { ssr: false });

export const Home = (): JSX.Element => {
  const router = useRouter();
  const { data } = useFirebaseContext();
  const isBroadcastVisible = data?.broadcastV2?.broadcaststripVisible;
  const isMobile = Cookies.get('isMobile');
  const { width } = useWindowSize();
  const showTopNavTags = useMemo(() => width <= 992, [width]);
  const isScreenMedium = useMemo(() => width < 768, [width]);


  return (
    <>
      <SEOWrapper seoProps={HomePageSEO.HomeSEO} />
      <Layout>
        <Head>
          <meta key="keywords" name="keywords" content="online furniture store, home decor store, home design diy" />
        </Head>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          {showTopNavTags && (
            <div className={`px-4 ${isBroadcastVisible ? 'relative top-6 mb-12' : 'mb-4'}`}>
              <TopBarMobile />
            </div>
          )}
          <Hero3 />
          <div className="container px-4 mx-auto mt-16 sm:mt-32 mb-6 sm:mb-12">
            <HomeSectionTitle className="text-left">
              <HomeSectionTitle.MainTitle>
                Add this, <span className="text-[#F5296E]">swap that</span>
              </HomeSectionTitle.MainTitle>
              {isMobile !== 'true' && (
                <HomeSectionTitle.Description align="left">
                  Meet our style sets. Curated by us and Personalized by you. <br />
                  Your whole room perfected in a single click.
                </HomeSectionTitle.Description>
              )}
            </HomeSectionTitle>
          </div>
          {/* Section Start */}
          <div className="container px-4 mx-auto mb-20">
            <div className="grid grid-cols-1 gap-2 md:gap-8 md:grid-cols-3">
              <div
                className="flex-1 space-y-4 p-4  rounded-xl hover:cursor-pointer"
                onClick={() => {
                  location.href = '/design-sets/room/living-room-design-sets';
                }}
              >
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1648817963/web/homepage-v3/Image_02_qqdwnv.jpg"
                    alt="sofas"
                    className="object-cover object-center w-full h-full rounded-lg"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg lg:text-xl">Living Room Styles</h3>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full lg:w-10 lg:h-10">
                    <ArrowRightIcon className="inline w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div
                className="flex-1 space-y-4 p-4  rounded-xl hover:cursor-pointer"
                onClick={() => {
                  location.href = '/design-sets/room/dining-room-design-sets';
                }}
              >
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1648817963/web/homepage-v3/IMG_1404_bpldad.png"
                    alt="sofas"
                    className="object-cover object-center w-full h-full rounded-lg"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg lg:text-xl">Dining Room Styles</h3>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full lg:w-10 lg:h-10">
                    <ArrowRightIcon className="inline w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div
                className="flex-1 space-y-4 p-4  rounded-xl hover:cursor-pointer"
                onClick={() => {
                  location.href = '/design-sets/room/bedroom-design-sets';
                }}
              >
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1648817967/web/homepage-v3/Spring_Women_Day_Set_Three_Look_1_kajgr8.png"
                    alt="sofas"
                    className="object-cover object-center w-full h-full rounded-lg"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg lg:text-xl">Bedroom Styles</h3>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full lg:w-10 lg:h-10">
                    <ArrowRightIcon className="inline w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                onClick={() => {
                  PushEvent({
                    category: `Shop by Category`,
                    action: `Go to Shop All Page`,
                    label: `Shop Now`,
                  });
                  location.href = '/room-select';
                }}
              >
                Explore All Styles
              </button>
            </div>
          </div>

          {/* Section Start */}
          {pinterestConfig.enable === true && (
            <div className="container px-4 mx-auto my-28 xl:my-40 xl:px-20">
              <div className="flex flex-col xl:flex-row">
                <div className="w-full mb-6 xl:mb-0 xl:w-3/4">
                  <HomeSectionTitle className="text-left">
                    <HomeSectionTitle.MainTitle>
                      From Pinterest to{isMobile === 'true' ? <br /> : ' '}
                      <span className="text-[#F5296E]">your home</span>
                    </HomeSectionTitle.MainTitle>
                    {isMobile !== 'true' && (
                      <HomeSectionTitle.Description align="left">
                        Inspiration tucked away in Pinterest Boards? Connect and shop everything you love from your
                        pins.
                      </HomeSectionTitle.Description>
                    )}
                  </HomeSectionTitle>
                </div>
                <button
                  className="flex items-center w-full h-32 p-4 border border-red-400  rounded-xl max-w-[375px]"
                  onClick={() => {
                    PushEvent({
                      category: `Connect Pinterest`,
                      action: `Go to Pinterest Connect`,
                      label: `HP Connect Pinterest Button`,
                    });
                    location.href = '/pinterest/search';
                  }}
                >
                  <div className="flex-grow-0">
                    <span className="sr-only">Pinterest</span>
                    <svg
                      className="text-red-400 h-11 w-11"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path d="M256.05 32c-123.7 0-224 100.3-224 224 0 91.7 55.2 170.5 134.1 205.2-.6-15.6-.1-34.4 3.9-51.4l28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58 20.4 0 30.2 15.3 30.2 33.6 0 20.5-13.1 51.1-19.8 79.5-5.6 23.8 11.9 43.1 35.4 43.1 42.4 0 71-54.5 71-119.1 0-49.1-33.1-85.8-93.2-85.8-67.9 0-110.3 50.7-110.3 107.3 0 19.5 5.8 33.3 14.8 43.9 4.1 4.9 4.7 6.9 3.2 12.5l-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6-31.3-12.8-45.9-47-45.9-85.6 0-63.6 53.7-139.9 160.1-139.9 85.5 0 141.8 61.9 141.8 128.3 0 87.9-48.9 153.5-120.9 153.5-24.2 0-46.9-13.1-54.7-27.9l-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.13 225.13 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32z" />
                    </svg>
                  </div>
                  <div className="flex-grow text-left">
                    <h3 className="text-2xl text-red-400 ml-2">Connect Now!</h3>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 col-span-2 bg-red-400 rounded-full justify-self-end">
                    <ArrowRightIcon className="inline w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Section Start */}
          <div className="container mx-auto px-4 mt-16 sm:mt-32 mb-4 sm:mb-8">
            <HomeSectionTitle className="text-left sm:text-center">
              <HomeSectionTitle.MainTitle>
                Shop all things home in <span className="text-[#F5296E]">one place</span>
              </HomeSectionTitle.MainTitle>
              {isMobile !== 'true' && (
                <HomeSectionTitle.Description align="center">
                  Discover thousands of products from all your favorite brands in a single click!
                </HomeSectionTitle.Description>
              )}
            </HomeSectionTitle>
          </div>
          <div className="container px-4 mx-auto mb-12 sm:mb-24">
            <div className="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-3">
              <div
                className="flex-1 p-4 lg:p-8 bg-violet-100 rounded-xl hover:cursor-pointer"
                onClick={() => {
                  PushEvent({
                    category: `Shop by Category`,
                    action: `Go to Sofas List Page`,
                    label: `Shop Now`,
                  });
                  location.href = '/shop?subcategory=Sofas';
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg lg:text-xl">Sofas</h3>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full lg:w-10 lg:h-10">
                    <ArrowRightIcon className="inline w-4 h-4" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1 w-full">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_600/v1644386536/spj-v2/sofas_m12dj0.png"
                    alt="sofas"
                    className="object-contain object-center w-full h-full"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>

              <div
                className="flex-1 p-4 bg-blue-100 lg:p-8 rounded-xl hover:cursor-pointer"
                // onClick={() => (location.href = '/shop?subcategory=Beds')}
                onClick={() => {
                  PushEvent({
                    category: `Shop by Category`,
                    action: `Go to Coffee Tables List Page`,
                    label: `Shop Now`,
                  });
                  location.href = '/shop?subcategory=Tables&vertical=Coffee+Tables';
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg leading-tight lg:text-xl lg:leading-tight w-min lg:w-full">Coffee Tables</h3>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full lg:w-10 lg:h-10">
                    <ArrowRightIcon className="inline w-4 h-4" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1 w-full">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_600/v1644386529/spj-v2/coffee_tables_vltvlc.png"
                    alt="coffee tables"
                    className="object-contain object-center w-full h-full"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div
                className="flex-1 p-4 bg-teal-100 lg:p-8 rounded-xl hover:cursor-pointer"
                onClick={() => {
                  PushEvent({
                    category: `Shop by Category`,
                    action: `Go to Beds List Page`,
                    label: `Shop Now`,
                  });
                  location.href = '/shop?subcategory=Beds';
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg lg:text-xl">Beds</h3>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full lg:w-10 lg:h-10">
                    <ArrowRightIcon className="inline w-4 h-4" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1 w-full">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_600/v1644386383/spj-v2/Beds_qrwweq.png"
                    alt="beds"
                    className="object-contain object-center w-full h-full"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                onClick={() => {
                  PushEvent({
                    category: `Shop by Category`,
                    action: `Go to Shop All Page`,
                    label: `Shop Now`,
                  });
                  location.href = '/shop';
                }}
              >
                Explore All
              </button>
            </div>
          </div>

          {/* Section Start */}
          <div className="container px-4 mx-auto xl:my-40 my-16 sm:my-32 xl:px-20">
            <div className="flex flex-col items-center justify-between md:flex-row space-y-6 md:space-x-8 xl:space-x-32">
              <div className="flex-1 mt-6 sm:mt-0">
                <HomeSectionTitle className="text-left">
                  <HomeSectionTitle.MainTitle>
                    Want us to do the heavy lifting?
                    <br />
                    <span className="text-[#F5296E]">Get paired with a Designer!</span>
                  </HomeSectionTitle.MainTitle>
                  {isMobile !== 'true' && (
                    <HomeSectionTitle.Description align="left" isMaxWidthHalf={false}>
                      In just 7 days, get 3D Designs of your actual room with products you can shop right away on
                      Spacejoy!
                    </HomeSectionTitle.Description>
                  )}
                </HomeSectionTitle>
                {!isScreenMedium && <Link href={`${oldSpacejoyUrl}/online-interior-design`} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <button
                      type="button"
                      className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                    >
                      Hire a Designer
                    </button>
                  </a>
                </Link>}
              </div>
              <div className="relative w-full mx-auto  md:w-1/2">
                <Carousel centerPadding="0%" centerMode customButtons position={position.bottom}>
                  {TeamData.map((item) => (
                    <div key={item.lastName}>
                      <div className="relative aspect-[3/4] sm:aspect-[1] md:aspect-[3/4] lg:aspect-[1] rounded-3xl">
                        <Image
                          src={`https://res.cloudinary.com/spacejoy/w_800/${item.bg}`}
                          alt="image 1"
                          className="object-cover object-center w-full h-full rounded-3xl"
                          layout="fill"
                          objectFit="cover"
                          placeholder="blur"
                          blurDataURL={blurredBgImage}
                        />
                        <div className="absolute top-auto flex items-end justify-center -translate-x-1/2 bottom-28 left-1/2">
                          <div className="text-center">
                            <h2 className="text-2xl font-bold whitespace-pre text-gray-50">
                              {item.firstName} {item.lastName}
                            </h2>
                            <p className="mt-2 text-white">Design Expert</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
              {isScreenMedium && <div className="text-center">
                <Link href={`${oldSpacejoyUrl}/online-interior-design`} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <button
                      type="button"
                      className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                      onClick={() => {
                        PushEvent({
                          category: `Explore Sets`,
                          action: `Go to Room Select`,
                          label: `HP Connect Explore Sets Button`,
                        });
                      }}
                    >
                      Hire a Designer
                    </button>
                  </a>
                </Link>
              </div>}
            </div>
          </div>

          {/* Section Start */}
          <div className="container grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-4 md:gap-5 lg:gap-8 px-4 mx-auto my-10">
            <div className="col-span-1 sm:col-span-3">
              {data?.homepageV2?.hp1Link !== undefined && data?.cartBannerV2?.hp1Link !== '' ? (
                <Link href={data?.homepageV2?.hp1Link}>
                  <a target="_blank">
                    <div className="relative aspect-[77/18]">
                      <Image
                        src={`${cloudinary.baseDeliveryURL}/${data?.homepageV2?.hp1}`}
                        alt="offers"
                        layout="fill"
                        className="object-contain rounded-xl"
                        placeholder="blur"
                        blurDataURL={blurredBgProduct}
                      />
                    </div>
                  </a>
                </Link>
              ) : (
                <div className="relative aspect-[77/18]">
                  <Image
                    src={`${cloudinary.baseDeliveryURL}/${data?.homepageV2?.hp1}`}
                    alt="offers"
                    layout="fill"
                    className="object-contain rounded-xl"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              )}
            </div>
            <div className="relative aspect-[287/215] col-span-1 rounded-xl">
              <Image
                src="https://res.cloudinary.com/spacejoy/image/upload/v1645766721/web/homepage-v3/Group_8homePageAffirm_dkndyv.svg"
                alt="affirm"
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={blurredBgProduct}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="container px-4 mx-auto mt-16 sm:mt-32 mb-24 sm:mb-40">
            <HomeSectionTitle className="text-left sm:text-center">
              <HomeSectionTitle.MainTitle>
                <span className="text-[#F5296E]">Why</span> Spacejoy?
              </HomeSectionTitle.MainTitle>
              {isMobile !== 'true' && (
                <HomeSectionTitle.Description align="center">Hear it from our customers</HomeSectionTitle.Description>
              )}
            </HomeSectionTitle>
            <div className="mt-6">
              <Carousel centerPadding="0%" centerMode customButtons slidesToShow={4} position={position.outside}>
                {TestimonialData.map((item) => (
                  <div key={item.id} className="h-full">
                    <div className="h-full p-4 m-4 border border-gray-300 rounded-3xl 2xl:p-8">
                      <div className="flex justify-between">
                        <div className="flex">
                          {[...new Array(5)].map((_d, i) => (
                            <StarIcon key={`star-${i}`} className="w-6 h-6 text-gray-700" />
                          ))}
                        </div>
                        {/* <div>
                          <p>{item?.roomType}</p>
                        </div> */}
                      </div>
                      <div className="my-8">
                        <p className="text-sm leading-relaxed">{item?.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div>
                          <Image
                            src={`https://res.cloudinary.com/spacejoy/${item?.dp}`}
                            alt="image 1"
                            className="object-cover object-center w-full h-full rounded-3xl"
                            height={62}
                            width={62}
                            placeholder="blur"
                            blurDataURL={blurredBgImage}
                          />
                        </div>
                        <div>
                          <h3>{item?.name}</h3>
                          <p className="text-sm text-gray-400">{item?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          {/* Section Start */}
          <div className="container mx-auto px-4 sm:mt-32 mb-6 sm:mb-12">
            <HomeSectionTitle className="text-left sm:text-center">
              <HomeSectionTitle.MainTitle>Beautiful spaces await you</HomeSectionTitle.MainTitle>
              {isMobile !== 'true' && (
                <HomeSectionTitle.Description align="center">
                  From a corner to a whole room, see how our customers are transforming their homes
                </HomeSectionTitle.Description>
              )}
            </HomeSectionTitle>
          </div>
          <OutputGallery />
          {/* Section Start */}
          <div className="mt-16 sm:mt-32 mb-6 sm:mb-12">
            <DynamicFeaturedWithNoSSR />
          </div>

          {/* Section Start */}
          <PreFooter />
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
};

export default React.memo(Home);
