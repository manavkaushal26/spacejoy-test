import { Hero3 } from '@components/Home';
import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import OutputGallery from '@components/Home/OutputGallery';
import Carousel, { position } from '@components/Shared/Carousel';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import SEOWrapper from '@components/Shared/SEO/SEOWrapper';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import TeamData from '@mocks/DesignTeamData';
import { blurredBgImage, blurredBgProduct } from '@public/images/bg-base-64';
import { oldSpacejoyUrl } from '@utils/config';
import TestimonialData from '@utils/Mocks/Testimonials';
import { HomePageSEO } from '@utils/SEO'; // can also have jsonLD config
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const DynamicFeaturedWithNoSSR = dynamic(() => import('@components/Home/Featured'), { ssr: false });

export const Home = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <SEOWrapper seoProps={HomePageSEO.HomeSEO} />
      <Layout>
        {/* <Layout.Banner />  */}
        <Layout.Header />
        <Layout.Body>
          <Hero3 />
          <div className="mt-32 mb-12">
            <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>Shop curated furniture & decor sets</HomeSectionTitle.MainTitle>
              <HomeSectionTitle.Description align="center">
                Choose from thousands of sets perfect for your style, space and budget.
              </HomeSectionTitle.Description>
            </HomeSectionTitle>
          </div>

          {/* Section Start */}
          <div className="container px-4 mx-auto mb-10">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-2 row-span-2">
                <div className="bg-gray-100 aspect-w-3 aspect-h-4 rounded-xl">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1643956818/web/homepage-v3/Website_design_set_5_aswpri.png"
                    alt="image 1"
                    className="object-cover object-center w-full h-full rounded-xl"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="rounded-xl">
                <div className="bg-gray-100 aspect-w-3 aspect-h-4 rounded-xl">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1644042480/web/homepage-v3/Website-design-set-8_adkesj.jpg"
                    alt="image 1"
                    className="object-cover object-center w-full h-full rounded-xl"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="rounded-xl">
                <div className="bg-gray-100 aspect-w-3 aspect-h-4 rounded-xl">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1644042485/web/homepage-v3/Website_design_set_7_gumghq.jpg"
                    alt="image 1"
                    className="object-cover object-center w-full h-full rounded-xl"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="rounded-xl">
                <div className="bg-gray-100 aspect-w-3 aspect-h-4 rounded-xl">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1644042492/web/homepage-v3/Website-design-set-92_wymkdg.jpg"
                    alt="image 1"
                    className="object-cover object-center w-full h-full rounded-xl"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <button className="rounded-xl" onClick={() => (location.href = '/room-select')}>
                <div className="relative bg-orange-300 aspect-w-3 aspect-h-4 rounded-xl">
                  <div className="flex flex-col items-end justify-between p-8">
                    <div className="flex items-center justify-center bg-white rounded-full h-14 w-14">
                      <ArrowRightIcon className="inline w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-5xl leading-snug text-orange-800">Explore Sets</h3>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          {/* Section Start */}
          <div className="container px-20 mx-auto my-40">
            <div className="flex">
              <div className="w-3/4">
                <HomeSectionTitle className="text-left">
                  <HomeSectionTitle.MainTitle>
                    From Pinterest to <span className="text-[#F5296E]">your home</span>
                  </HomeSectionTitle.MainTitle>
                  <HomeSectionTitle.Description align="left">
                    Inspiration tucked away in Pinterest Boards? Connect and shop everything you love from your pins.
                  </HomeSectionTitle.Description>
                </HomeSectionTitle>
              </div>
              <button
                className="grid items-center w-1/4 h-32 grid-cols-10 p-4 border border-red-400 rounded-xl"
                onClick={() => (location.href = '/pinterest/search')}
              >
                <div className="col-span-2 justify-self-start">
                  <span className="sr-only">Pinterest</span>
                  <svg className="text-red-400 h-11 w-11" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
                    <path d="M256.05 32c-123.7 0-224 100.3-224 224 0 91.7 55.2 170.5 134.1 205.2-.6-15.6-.1-34.4 3.9-51.4l28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58 20.4 0 30.2 15.3 30.2 33.6 0 20.5-13.1 51.1-19.8 79.5-5.6 23.8 11.9 43.1 35.4 43.1 42.4 0 71-54.5 71-119.1 0-49.1-33.1-85.8-93.2-85.8-67.9 0-110.3 50.7-110.3 107.3 0 19.5 5.8 33.3 14.8 43.9 4.1 4.9 4.7 6.9 3.2 12.5l-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6-31.3-12.8-45.9-47-45.9-85.6 0-63.6 53.7-139.9 160.1-139.9 85.5 0 141.8 61.9 141.8 128.3 0 87.9-48.9 153.5-120.9 153.5-24.2 0-46.9-13.1-54.7-27.9l-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.13 225.13 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32z" />
                  </svg>
                </div>
                <h3 className="col-span-6 mt-4 text-2xl text-red-400 justify-self-center">Connect Now!</h3>
                <div className="flex items-center justify-center w-10 h-10 col-span-2 bg-red-400 rounded-full justify-self-end">
                  <ArrowRightIcon className="inline w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
          {/* Section Start */}
          <div className="container px-20 mx-auto my-40">
            <div className="flex items-center justify-between">
              <div className="relative w-1/2 mr-32">
                <Carousel centerPadding="0%" centerMode customButtons position={position.bottom}>
                  {TeamData.map((item) => (
                    <div key={item.lastName}>
                      <div className="aspect-w-1 aspect-h-1 rounded-3xl">
                        <Image
                          src={`https://res.cloudinary.com/spacejoy/w_800/${item.bg}`}
                          alt="image 1"
                          className="object-cover object-center w-full h-full rounded-3xl"
                          layout="fill"
                          placeholder="blur"
                          blurDataURL={blurredBgImage}
                        />
                        <div className="top-auto flex items-end justify-center bottom-28">
                          <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-50">
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
              <div className="flex-1">
                <HomeSectionTitle className="text-left">
                  <HomeSectionTitle.MainTitle>
                    Want us to do the heavy lifting? <br />{' '}
                    <span className="text-[#F5296E]">Get paired with a Designer!</span>
                  </HomeSectionTitle.MainTitle>
                  <HomeSectionTitle.Description align="left" isMaxWidthHalf={false}>
                    In just 7 days, get 3D Designs of your actual room with products you can shop right away on
                    Spacejoy!
                  </HomeSectionTitle.Description>
                </HomeSectionTitle>
                <Link href={`${oldSpacejoyUrl}/pricing`}>
                  <a target="_blank" rel="noopener noreferrer">
                    <button
                      type="button"
                      className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                    >
                      Hire a Designer
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {/* Section Start */}
          <div className="mt-32 mb-12">
            <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>
                Shop all things home in <span className="text-[#F5296E]">one place</span>
              </HomeSectionTitle.MainTitle>
              <HomeSectionTitle.Description align="center">
                Discover thousands of products from all your favorite brands in a single click!
              </HomeSectionTitle.Description>
            </HomeSectionTitle>
          </div>
          <div className="container px-4 mx-auto mb-20">
            <div className="flex space-x-8">
              <div
                className="flex-1 p-8 bg-violet-100 rounded-xl hover:cursor-pointer"
                onClick={() => (location.href = '/shop?subcategory=Sofas')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl">Sofas</h3>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                    <ArrowRightIcon className="inline w-4 h-4" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1644386536/spj-v2/sofas_m12dj0.png"
                    alt="sofas"
                    className="object-contain object-center w-full h-full"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div
                className="flex-1 p-8 bg-red-100 rounded-xl hover:cursor-pointer"
                onClick={() => (location.href = '/shop?subcategory=Chairs')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl">Chairs</h3>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                    <ArrowRightIcon className="inline w-4 h-4" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1644386525/spj-v2/chairs_ycetok.png"
                    alt="chairs"
                    className="object-contain object-center w-full h-full"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div
                className="flex-1 p-8 bg-blue-100 rounded-xl hover:cursor-pointer"
                // onClick={() => (location.href = '/shop?subcategory=Beds')}
                onClick={() => (location.href = '/shop?subcategory=Tables&vertical=Coffee+Tables')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl">Coffee Tables</h3>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                    <ArrowRightIcon className="inline w-4 h-4" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1644386529/spj-v2/coffee_tables_vltvlc.png"
                    alt="coffee tables"
                    className="object-contain object-center w-full h-full"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div
                className="flex-1 p-8 bg-teal-100 rounded-xl hover:cursor-pointer"
                onClick={() => (location.href = '/shop?subcategory=Beds')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl">Beds</h3>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                    <ArrowRightIcon className="inline w-4 h-4" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/w_800/v1644386383/spj-v2/Beds_qrwweq.png"
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
                onClick={() => (location.href = '/shop')}
              >
                Explore All
              </button>
            </div>
          </div>
          <div className="container px-4 mx-auto mb-40">
            <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>
                <span className="text-[#F5296E]">Why</span> Spacejoy?
              </HomeSectionTitle.MainTitle>
              <HomeSectionTitle.Description align="center">Hear it from our customers</HomeSectionTitle.Description>
            </HomeSectionTitle>
            <div className="mt-8">
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
          <div className="mt-32 mb-12">
            <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>Beautiful spaces await you</HomeSectionTitle.MainTitle>
              <HomeSectionTitle.Description align="center">
                From a corner to a whole room, see how our customers are transforming their homes
              </HomeSectionTitle.Description>
            </HomeSectionTitle>
          </div>
          <OutputGallery />
          {/* Section Start */}
          <div className="mt-32 mb-12">
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
