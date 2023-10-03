import Slider from '@components/Carousel';
import { Hero3 } from '@components/Home';
import DesignerCard from '@components/Home/DesignerCard';
import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import OutputGallery from '@components/Home/OutputGallery';
import { PricingData } from '@components/Pricing/PricingTypes';
import Carousel, { position } from '@components/Shared/Carousel';
import Button from '@components/Shared/Form/Button';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import Pricing from '@components/Shared/PricingData';
import SEOWrapper from '@components/Shared/SEO/SEOWrapper';
import TopBarMobile from '@components/Shared/TopBarMobile';
import { Disclosure } from '@headlessui/react';
import { ArrowRightIcon, CheckIcon, ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline';
import TeamData from '@mocks/DesignTeamData';
import { blurredBgImage, blurredBgProduct, homePagePoster } from '@public/images/bg-base-64';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary, imageKit, oldSpacejoyUrl, pinterestConfig } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import faqs from '@utils/Mocks/HomepageFAQs';
import { default as Testimonials } from '@utils/Mocks/HomeTestimonials';
import SpjShoppingAdvantage from '@utils/Mocks/WhySpacejoy';
import { HomePageSEO } from '@utils/SEO'; // can also have jsonLD config
import useWindowSize from '@utils/useWindowSize';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DynamicFeaturedWithNoSSR = dynamic(() => import('@components/Home/Featured'), { ssr: false });
const features = [
  'We are your single point of contact',
  "We'll place and manage your orders across brands",
  'Track your orders from any brand under one roof',
  "It's easy to return and cancel one or more products",
];

const responsive = {
  // dots: true,
  // arrows: false,
  // slidesToShow: 1.5,
  // className: 'with-space',
};
export const Home = ({ isMobile, pricingData }): JSX.Element => {
  const router = useRouter();
  const { data } = useFirebaseContext();
  const isBroadcastVisible = data?.broadcastV2?.broadcaststripVisible;

  const { width } = useWindowSize();
  const showTopNavTags = useMemo(() => width <= 992, [width]);
  const isScreenMedium = useMemo(() => width < 768, [width]);

  useEffect(() => {
    (async () => {
      const storiesRes = await fetcher({
        endPoint: `${publicRoutes.customerStoriesList}`,
        method: 'GET',
      });
      console.log({ storiesRes, route: process.env.NEXT_PUBLIC_API_GATEWAY + publicRoutes.customerStoriesList });
    })();
  }, []);

  return (
    <>
      <SEOWrapper seoProps={HomePageSEO.HomeSEO} />
      <Layout>
        <Head>
          <title key="title">Spacejoy: The Best Online Interior Design Service For Your Home</title>
          <meta
            key="description"
            name="description"
            content="Design a home you'll love with Spacejoy's online home interior design services. Work 1:1 with top home interior designers and transform any space in just 7 days!"
          />
          <meta
            key="keywords"
            name="keywords"
            content="home interior, online interior design, home interior decor, room design online, home design online, interior design services, design my room, virtual interior design, design your room, online interior design services, online design services, design your home, online interior decorator, virtual interior design services, design your room online, home design services, online interior designers, home decor services"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org/',
                '@type': 'WebSite',
                name: 'Spacejoy',
                url: 'https://www.spacejoy.com/',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://www.spacejoy.com/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              }),
            }}
          />
          <link rel="canonical" href="https://www.spacejoy.com" />
          <base href="/" />
        </Head>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          {showTopNavTags && (
            <div className={`px-4 ${isBroadcastVisible ? 'relative top-6 ' : ''}`}>
              <TopBarMobile />
            </div>
          )}
          <Hero3 isMobile={isMobile} />
          <div className="container block px-4 mx-auto mt-12 mt-16 mb-6 sm:mt-32 sm:mb-12 lg:hidden">
            <HomeSectionTitle className="text-center capitalize">
              <HomeSectionTitle.MainTitle>
                <span className="capitalize">Bring your vision to life</span>
                <br />
                <span className="capitalize">in three simple steps</span>
              </HomeSectionTitle.MainTitle>
            </HomeSectionTitle>
            <div className="mt-12">
              <div className="grid grid-cols-1 text-center step">
                <div className="h-[40px] w-[40px] bg-[#FFC1AD] font-bold rounded-full flex items-center justify-center mx-auto mb-2">
                  1
                </div>
                <div className="col-span-3">
                  <h2 className="text-xl text-center capitalize">Share your vision</h2>
                  <p className="mt-2 text-center">Upload photos of your home and tell us your needs.</p>
                </div>
              </div>
            </div>
            <div className="my-auto text-center">
              <Image
                height="200"
                width="200"
                alt="path"
                src={`${imageKit.baseDeliveryUrl}/v1652948829/Vector_2_xztpty.svg`}
                className="rotate-270"
              />
            </div>
            <div className="">
              <div className="grid grid-cols-1 text-center step">
                <div className="h-[40px] w-[40px] bg-[#FFC1AD] font-bold rounded-full flex items-center justify-center mx-auto mb-2">
                  2
                </div>
                <div className="col-span-3">
                  <h2 className="text-xl text-center capitalize">Get a personalized design</h2>
                  <p className="mt-2 text-center">
                    Consult 1:1 with a professional designer to create spaces that match your vision.
                  </p>
                </div>
              </div>
            </div>
            <div className="my-auto mt-4 text-center">
              <Image
                height="200"
                width="200"
                alt="path"
                src={`${imageKit.baseDeliveryUrl}/v1652948828/Vector_1_mxl10d.svg`}
                className="rotate-90"
              />
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-1 text-center step">
                <div className="h-[40px] w-[40px] bg-[#FFC1AD] font-bold rounded-full flex items-center justify-center mx-auto mb-2">
                  3
                </div>
                <div className="col-span-3">
                  <h2 className="text-xl text-center capitalize">Shop your favorites</h2>
                  <p className="mt-2 text-center">
                    Get a comprehensive shopping list of all the products curated just for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container hidden px-4 mx-auto mt-16 mb-6 xl:px-20 lg:mt-28 xl:mt-36 sm:mb-12 lg:block">
            <div className="w-3/4 mx-auto">
              <HomeSectionTitle className="text-center">
                <HomeSectionTitle.MainTitle>
                  <span className="">Bring your vision to life</span>
                  <br />
                  <span className="">in three simple steps</span>
                </HomeSectionTitle.MainTitle>
              </HomeSectionTitle>
            </div>
            <div className="w-full xl:w-3/4 bg-white flex justify-between h-[500px] mt-12 mx-auto bg-vector bg-contain bg-no-repeat bg-center grid grid-cols-4">
              <div className="flex items-center justify-center col-span-2">
                <div className="flex max-w-[370px] py-2 bg-white translate-y-[40px]">
                  <div className="basis-1/4">
                    <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#FFC1AD] font-bold">
                      1
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="mb-2 text-2xl font-bold">Share your vision</p>
                    <p>Upload photos of your home and tell us your needs.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center col-span-2">
                <div className="flex items-center justify-center col-span-2">
                  <div className="flex max-w-[370px] py-2 bg-white">
                    <div className="basis-1/4">
                      <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#FFC1AD] font-bold">
                        2
                      </div>
                    </div>
                    <div className="ml-2">
                      <p className="mb-2 text-2xl font-bold">Get a personalized design</p>
                      <p>Consult 1:1 with a professional designer to create spaces that match your vision.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-center col-span-4">
                <div className="flex items-center justify-center col-span-2 ">
                  <div className="flex max-w-[370px] py-2 bg-white translate-y-[48px]">
                    <div className="basis-1/4">
                      <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#FFC1AD] font-bold ">
                        3
                      </div>
                    </div>
                    <div className="ml-2">
                      <p className="mb-2 text-2xl font-bold">Shop your favorites</p>
                      <p>Get a comprehensive shopping list of all the products curated just for you.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Start */}
          {pinterestConfig.enable === true && (
            <div className="container px-4 mx-auto mt-16 my-28 xl:my-40 xl:px-20">
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
                    <h3 className="ml-2 text-2xl text-red-400">Connect Now!</h3>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 col-span-2 bg-red-400 rounded-full justify-self-end">
                    <ArrowRightIcon className="inline w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
            </div>
          )}

          <div className="container px-4 mx-auto mt-16 mb-6 xl:px-20 sm:mt-32 sm:mb-12">
            <video width="400" controls autoPlay className="w-full aspect-video" muted poster={homePagePoster}>
              <source
                src="https://res.cloudinary.com/spacejoy/video/upload/v1655115548/Comp_1_bumvd8.mp4"
                type="video/webm"
              />
              Your browser does not support HTML video.
            </video>
          </div>
          {/* Section Start */}
          <div className="container px-4 mx-auto mt-16 mb-6 xl:px-20 sm:mt-32 sm:mb-12">
            <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-x-8 xl:space-x-32">
              <div className="flex-1 mt-6 sm:mt-0">
                <HomeSectionTitle className="text-left">
                  <HomeSectionTitle.MainTitle>
                    7 days to a beautiful room.
                    <br />
                    <span className="text-[#F5296E]">Get paired with a designer.</span>
                  </HomeSectionTitle.MainTitle>
                  {isMobile !== 'true' && (
                    <HomeSectionTitle.Description align="left" isMaxWidthHalf={false}>
                      Let our experts design a space you&apos;ll love with products you can shop right away on Spacejoy!
                    </HomeSectionTitle.Description>
                  )}
                </HomeSectionTitle>
                {!isScreenMedium && (
                  <Link href={`/quiz/start-quiz`} passHref>
                    <a rel="noopener noreferrer">
                      <button
                        type="button"
                        className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                      >
                        Hire a Designer
                      </button>
                    </a>
                  </Link>
                )}
              </div>
              <div className="relative w-full mx-auto md:w-1/2">
                <Carousel
                  centerPadding="0%"
                  centerMode
                  customButtons={false}
                  buttons={false}
                  position={position.bottom}
                >
                  {TeamData.map((item) => (
                    <div key={item.lastName}>
                      <div className="relative aspect-[3/4] sm:aspect-[1] md:aspect-[3/4] lg:aspect-[1] rounded-3xl">
                        {/* /w_800 */}
                        <Image
                          src={`${imageKit.baseDeliveryUrl}${item.bg}`}
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
              {isScreenMedium && (
                <div className="text-center">
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
                </div>
              )}
            </div>
          </div>

          <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
            <Pricing data={pricingData || []} />
            <div className="flex justify-center mt-4 text-center">
              <Link href="/pricing" passHref>
                <button className="flex items-center px-6 py-3 text-white bg-gray-900 rounded-lg group">
                  <span>Pricing</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 text-white transition-transform transform group-hover:translate-x-2" />
                </button>
              </Link>
            </div>
          </div>
          <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
            <div className="w-3/4 mx-auto">
              <HomeSectionTitle className="text-center">
                <HomeSectionTitle.MainTitle>
                  <span>Create a stunning home with quality products</span>
                </HomeSectionTitle.MainTitle>
              </HomeSectionTitle>
            </div>
            <div className="relative mt-12 border rounded-lg pg">
              <Image
                src="https://ik.imagekit.io/spacejoy/spacejoy/image/upload/tr:w-1920,q-100/Beige_Paper_Texture_Bath_Body.png"
                alt="shop with us"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                quality={100}
              />
            </div>
            <Link href="https://store.spacejoy.com/" passHref>
              <a target="_blank" rel="noopener noreferrer">
                <button className="flex items-center px-6 py-3 mx-auto mt-4 text-white bg-gray-900 rounded-lg group">
                  <span>Shop Now</span>
                </button>
              </a>
            </Link>
          </div>
          <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
            <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>
                <p>Get raving reviews from friends and family</p>
              </HomeSectionTitle.MainTitle>

              <HomeSectionTitle.Description align="center">
                We&apos;ll take care of the heavylifting so you can sit back and enjoy the compliments
              </HomeSectionTitle.Description>
            </HomeSectionTitle>
            <div className="mt-12">
              {
                <Slider imageCount={10} slidesToShow={1} withNav={false} responsive={responsive} arrows={false}>
                  {Testimonials?.map((item) => {
                    return <DesignerCard data={item} key={item?.id} />;
                  })}
                </Slider>
              }
            </div>
          </div>
          {/* <div className="container px-4 mx-auto mt-16 ">
            <div className="w-3/4 mx-auto mb-6 sm:mt-32 sm:mb-12">
              <HomeSectionTitle className="text-center">
                <HomeSectionTitle.MainTitle>
                  <span>It&apos;s a joy to shop on Spacejoy</span>
                </HomeSectionTitle.MainTitle>

                <HomeSectionTitle.Description align="center">
                  Our concierge team will ensure it’s a hassle free shopping experience
                </HomeSectionTitle.Description>
              </HomeSectionTitle>
            </div>
            <div className="grid grid-cols-1 mt-12 md:grid-cols-2">
              <div className="relative p-golden">
                <Image
                  src={`${imageKit.baseDeliveryUrl}/v1652950083/Customer_care_image_gk1x5y.png`}
                  layout="fill"
                  objectFit="cover"
                  alt="Customer Care"
                  className="rounded-t-xl md:rounded-l-xl md:rounded-tr-sm"
                />
              </div>
              <div
                className="bg-[#FEF7F3] rounded-b-xl md:rounded-r-xl leading-10 p-12 text-lg flex
               items-center "
              >
                <div>
                  {features?.map((item) => {
                    return (
                      <p className="flex items-center" key={item}>
                        <CheckIcon className="w-6 h-6 " />
                        <span className="ml-2">{item}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="mt-12 bg-gray-100">
            <div className="container p-8 px-4 mx-auto mt-16">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="px-4 lg:p-8">
                  <h2 className="text-2xl font-bold">
                    No spam! Only the latest deals and discounts delivered straight to your inbox
                  </h2>
                </div>
                <div className="inline-flex items-center px-4 lg:p-8">
                  <input type="text" className="inline-block w-1/2 h-12 text-sm" placeholder="Email Address" />
                  <LoginManager
                    ctaText={<button className="w-full text-white bg-gray-900">Sign Up</button>}
                    redirect="/"
                    styles="bg-gray-900 text-white p-4 w-1/2 rounded-md ml-2 flex text-sm h-12"
                  />
                </div>
                <div />
              </div>
            </div>
          </div> */}

          {/* Section Start */}
          <div className="container grid grid-cols-1 gap-4 px-4 mx-auto my-12 mt-16 sm:grid-cols-4 sm:gap-4 md:gap-5 lg:gap-8 lg:mt-32">
            <div className="col-span-1 sm:col-span-4">
              {data?.homepageV2?.hp1Link !== undefined && data?.cartBannerV2?.hp1Link !== '' ? (
                <Link href={data?.homepageV2?.hp1Link}>
                  <a target="_blank">
                    <div className="relative aspect-[77/18]">
                      <Image
                        src={`${imageKit.baseDeliveryUrl}/${data?.homepageV2?.hp1}`}
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
                    src={`${imageKit.baseDeliveryUrl}/${data?.homepageV2?.hp1}`}
                    alt="offers"
                    layout="fill"
                    className="object-contain rounded-xl"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              )}
            </div>
            {/* <div className="relative aspect-[287/215] col-span-1 rounded-xl">
              <Image
                src={`${imageKit.baseDeliveryUrl}/v1645766721/web/homepage-v3/Group_8homePageAffirm_dkndyv.svg`}
                alt="affirm"
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={blurredBgProduct}
                className="rounded-xl"
              />
            </div> */}
          </div>
          <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
            <div className="block mt-8 lg:hidden">
              <HomeSectionTitle.MainTitle>
                <p className="text-center">Get the Spacejoy advantage</p>
              </HomeSectionTitle.MainTitle>

              {SpjShoppingAdvantage?.map((item, index) => {
                return (
                  <Disclosure key={item?.id} defaultOpen={index === 0}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <span className="text-sm font-bold text-gray-900">{item?.title}</span>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2">
                          <Image height="40" width="40" src={item?.iconLink} alt={item?.title} />
                          <div className="mt-2 text-sm text-gray-700">{item?.content}</div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                );
              })}
            </div>

            <div className="hidden mb-6 lg:block sm:mt-32 sm:mb-12">
              <HomeSectionTitle className="text-center">
                <HomeSectionTitle.MainTitle>Get the Spacejoy advantage</HomeSectionTitle.MainTitle>
              </HomeSectionTitle>

              <div className="hidden my-8 mt-12 bg-white lg:grid lg:grid-cols-4 lg:gap-12">
                {SpjShoppingAdvantage?.map((item, index) => {
                  return (
                    <div key={item?.id}>
                      <Image height="40" width="40" src={item?.iconLink} alt={item?.title} />
                      <p className="mt-4 font-bold text-gray-900 text-md">{item?.title}</p>
                      <div className="mt-2 text-sm text-gray-700">{item?.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-gray-100">
            <div className="container px-4 py-16 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
              <div className="lg:grid lg:grid-cols-4 lg:gap-12">
                <div className="col-span-2">
                  <HomeSectionTitle className="text-center">
                    <HomeSectionTitle.MainTitle>
                      <span>Still have questions?</span>
                    </HomeSectionTitle.MainTitle>

                    <HomeSectionTitle.Description align="center">
                      <span />
                    </HomeSectionTitle.Description>
                  </HomeSectionTitle>
                  <p className=" text-[120px] md:text-[200px] text-gray-300 font-bold text-center">
                    <span className="tracking-widest ">FAQ</span>
                  </p>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-2">
                  <dl className="space-y-12 ">
                    {faqs.map((faq) => (
                      <Disclosure as="div" key={faq.question}>
                        {({ open }) => (
                          <div className="pb-4 border-b border-gray-500">
                            <dt className="text-sm ">
                              <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400 ">
                                <span className="text-lg font-bold text-gray-900 lg:text-md">{faq.question}</span>
                                <span className="flex items-center ml-6 h-7">
                                  <ChevronDownIcon
                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </dt>
                            <Disclosure.Panel as="dd" className="pr-12 mt-2 ">
                              <p className="text-base text-gray-500">{faq.answer}</p>
                            </Disclosure.Panel>
                          </div>
                        )}
                      </Disclosure>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Section Start */}
          <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
            <HomeSectionTitle className="text-center">
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
          <div className="mt-16 mb-6 sm:mt-32 sm:mb-12">
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

export async function getServerSideProps(ctx) {
  const isMobile = ctx?.req?.cookies['isMobile'] === 'true' ? true : false;

  const res = await fetcher({ endPoint: publicRoutes.pricingRoute, method: 'GET' });
  const {
    data: { list = [] },
  } = res;
  const pricingData: PricingData[] = list?.map((item) => {
    return {
      features: item?.includedFeatures?.slice(0, 4),
      excludedFeatures: item?.excludedFeatures,
      price: item?.price,
      salePrice: item?.salePrice,
      name: item?.slug,
      description: item?.description,
      savings: item?.savings,
      tags: item?.tags,
      slug: item?.slug,
    };
  });

  return {
    props: {
      isMobile,
      pricingData,
    },
  };
}
export default React.memo(Home);
