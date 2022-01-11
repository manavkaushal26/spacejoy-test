import { Hero3 } from '@components/Home';
import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import OutputGallery from '@components/Home/OutputGallery';
import Layout from '@components/Shared/Layout';
import SEOWrapper from '@components/Shared/SEO/SEOWrapper';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { HomePageSEO } from '@utils/SEO'; // can also have jsonLD config
import Image from 'next/image';
import React from 'react';

export const Home = (): JSX.Element => {
  return (
    <>
      <SEOWrapper seoProps={HomePageSEO.HomeSEO} />
      <Layout>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          <Hero3 />
          <div className="mt-32 mb-12">
            <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>
                Shop Design Sets - your shortcut to a stunning home.
              </HomeSectionTitle.MainTitle>
              <HomeSectionTitle.Description align="center">
                Transform any space with our furniture & decor pairings curated to look good in your space.
              </HomeSectionTitle.Description>
            </HomeSectionTitle>
          </div>
          {/* Section Start */}
          <div className="container mx-auto px-4 mb-10">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-2 row-span-2">
                <div className="aspect-w-3 aspect-h-4 rounded-xl bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1616594266774-769089710d76?auto=format&fit=crop&w=1480&q=80"
                    alt="image 1"
                    className="w-full h-full object-center object-cover rounded-xl"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="rounded-xl">
                <div className="aspect-w-3 aspect-h-4 rounded-xl bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1630699295261-8bf3238d394c?auto=format&fit=crop&w=2340&q=80"
                    alt="image 1"
                    className="w-full h-full object-center object-cover rounded-xl"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="rounded-xl">
                <div className="aspect-w-3 aspect-h-4 rounded-xl bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1617806265182-7b3f847f0b75?auto=format&fit=crop&w=1480&q=80"
                    alt="image 1"
                    className="w-full h-full object-center object-cover rounded-xl"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="rounded-xl">
                <div className="aspect-w-3 aspect-h-4 rounded-xl bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1616593871468-2a9452218369?auto=format&fit=crop&w=1480&q=80"
                    alt="image 1"
                    className="w-full h-full object-center object-cover rounded-xl"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="rounded-xl">
                <div className="relative aspect-w-3 aspect-h-4 rounded-xl bg-orange-300">
                  <div className="p-8 flex flex-col justify-between items-end">
                    <div className="bg-white rounded-full h-14 w-14 flex justify-center items-center">
                      <ArrowRightIcon className="w-6 h-6 inline" />
                    </div>
                    <div>
                      <h3 className="text-5xl leading-snug text-orange-800">Explore Sets</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Section Start */}
          <div className="container mx-auto px-20 my-40">
            <div className="flex">
              <div className="w-3/4">
                <HomeSectionTitle className="text-left">
                  <HomeSectionTitle.MainTitle>
                    From Pinterest to <span className="text-red-500">your home</span>
                  </HomeSectionTitle.MainTitle>
                  <HomeSectionTitle.Description align="left">
                    Have inspiration tucked away in your Pinterest Boards? Connect it to discover and shop everything
                    you love from your pins.
                  </HomeSectionTitle.Description>
                </HomeSectionTitle>
              </div>
              <div className="w-1/4 rounded-xl border border-red-400 p-4 h-32">
                <div className="flex justify-between">
                  <div>
                    <span className="sr-only">Pinterest</span>
                    <svg
                      className="h-11 w-11 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path d="M256.05 32c-123.7 0-224 100.3-224 224 0 91.7 55.2 170.5 134.1 205.2-.6-15.6-.1-34.4 3.9-51.4l28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58 20.4 0 30.2 15.3 30.2 33.6 0 20.5-13.1 51.1-19.8 79.5-5.6 23.8 11.9 43.1 35.4 43.1 42.4 0 71-54.5 71-119.1 0-49.1-33.1-85.8-93.2-85.8-67.9 0-110.3 50.7-110.3 107.3 0 19.5 5.8 33.3 14.8 43.9 4.1 4.9 4.7 6.9 3.2 12.5l-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6-31.3-12.8-45.9-47-45.9-85.6 0-63.6 53.7-139.9 160.1-139.9 85.5 0 141.8 61.9 141.8 128.3 0 87.9-48.9 153.5-120.9 153.5-24.2 0-46.9-13.1-54.7-27.9l-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.13 225.13 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32z" />
                    </svg>
                  </div>
                  <div className="bg-red-400 rounded-full h-10 w-10 flex justify-center items-center">
                    <ArrowRightIcon className="w-4 h-4 inline text-white" />
                  </div>
                </div>
                <h3 className="text-red-400 text-2xl mt-4">Connect Now!</h3>
              </div>
            </div>
          </div>
          {/* Section Start */}
          <div className="container mx-auto px-20 my-40">
            <div className="flex justify-between items-center">
              <div className="w-1/2 mr-32">
                <div className="aspect-w-1 aspect-h-1 rounded-xl bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1611175140153-bfd26338ff0d?auto=format&fit=crop&w=1000&q=80"
                    alt="image 1"
                    className="w-full h-full object-center object-cover rounded-xl"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="flex-1">
                <HomeSectionTitle className="text-left">
                  <HomeSectionTitle.MainTitle>
                    Want us to do the heavy lifting? <br />{' '}
                    <span className="text-red-500">Get paired with a Designer!</span>
                  </HomeSectionTitle.MainTitle>
                  <HomeSectionTitle.Description align="left">
                    Get 3D Designs of your actual room with product recommendations you can shop right away - Within 7
                    days
                  </HomeSectionTitle.Description>
                </HomeSectionTitle>
                <button
                  type="button"
                  className="group overflow-hidden shadow-sm hover:shadow-lg text-lg text-white py-4 xl:py-6 px-4 xl:px-10 mt-4 rounded-xl bg-gray-900 tracking-wide focus:ml-0.5 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                >
                  Hire a Designer
                </button>
              </div>
            </div>
          </div>
          {/* Section Start */}
          <div className="mt-32 mb-12">
            <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>Beautiful room designs await you.</HomeSectionTitle.MainTitle>
              <HomeSectionTitle.Description align="center">
                Hire our experts to do what they do best - design a home you&apos;ll love!
              </HomeSectionTitle.Description>
            </HomeSectionTitle>
          </div>
          <OutputGallery />
          {/* Section Start */}
          <div className="mt-32 mb-12">
            <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>
                Shop all things home in <span className="text-red-500">one place.</span>
              </HomeSectionTitle.MainTitle>
              <HomeSectionTitle.Description align="center">
                Hire our experts to do what they do best - design a home you&apos;ll love!
              </HomeSectionTitle.Description>
            </HomeSectionTitle>
          </div>
          <div className="container mx-auto px-4 mb-20">
            <div className="flex space-x-8">
              <div className="bg-violet-100 flex-1 rounded-xl p-8">
                <div className="flex justify-between items-center mb-40">
                  <div>
                    <h3 className="text-xl">Sectional Sofas</h3>
                  </div>
                  <div className="bg-white rounded-full h-10 w-10 flex justify-center items-center">
                    <ArrowRightIcon className="w-4 h-4 inline" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1581590997/web/Spacejoy_Sofa_qbyblt.png"
                    alt="image 1"
                    className="w-full h-full object-center object-contain"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="bg-blue-100 flex-1 rounded-xl p-8">
                <div className="flex justify-between items-center mb-40">
                  <div>
                    <h3 className="text-xl">Sofa</h3>
                  </div>
                  <div className="bg-white rounded-full h-10 w-10 flex justify-center items-center">
                    <ArrowRightIcon className="w-4 h-4 inline" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1581590997/web/Spacejoy_Sofa_qbyblt.png"
                    alt="image 1"
                    className="w-full h-full object-center object-contain"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
              <div className="bg-teal-100 flex-1 rounded-xl p-8">
                <div className="flex justify-between items-center mb-40">
                  <div>
                    <h3 className="text-xl">Side Table</h3>
                  </div>
                  <div className="bg-white rounded-full h-10 w-10 flex justify-center items-center">
                    <ArrowRightIcon className="w-4 h-4 inline" />
                  </div>
                </div>
                <div className="aspect-w-2 aspect-h-1">
                  <Image
                    src="https://res.cloudinary.com/spacejoy/image/upload/v1581590997/web/Spacejoy_Sofa_qbyblt.png"
                    alt="image 1"
                    className="w-full h-full object-center object-contain"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurredBgProduct}
                  />
                </div>
              </div>
            </div>
          </div>
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
};

export default React.memo(Home);
