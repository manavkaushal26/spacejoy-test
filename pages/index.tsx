import { Hero3 } from '@components/Home';
import SaleBanner from '@components/Home/SaleBanner';
import { PricingData } from '@components/Pricing/PricingTypes';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import Pricing from '@components/Shared/PricingData';
import SEOWrapper from '@components/Shared/SEO/SEOWrapper';
import TopBarMobile from '@components/Shared/TopBarMobile';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { blurredBgProduct, homePagePoster } from '@public/images/bg-base-64';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { cloudinary } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { HomePageSEO } from '@utils/SEO'; // can also have jsonLD config
import useWindowSize from '@utils/useWindowSize';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

// const features = [
//   'We are your single point of contact',
//   "We'll place and manage your orders across brands",
//   'Track your orders from any brand under one roof',
//   "It's easy to return and cancel one or more products",
// ];

const DynamicVision = dynamic(() => import('@components/Home/Vision'), { ssr: false });
const DynamicFeaturedWithNoSSR = dynamic(() => import('@components/Home/Featured'), { ssr: false });
const DynamicVideoGuide = dynamic(() => import('@components/Home/VideoGuide'), { ssr: false });
const DynamicDesignerTeam = dynamic(() => import('@components/Home/DesignerTeam'), { ssr: false });
const DynamicHomeCTABanner = dynamic(() => import('@components/Home/HomeCTABanner'), { ssr: false });
const DynamicHomeTestimonials = dynamic(() => import('@components/Home/HomeTestimonials'), { ssr: false });
const DynamicSpacejoyAdvantage = dynamic(() => import('@components/Home/SpacejoyAdvantage'), { ssr: false });
const DynamicHomeGallery = dynamic(() => import('@components/Home/HomeGallery'), { ssr: false });
const DynamicHomeFAQs = dynamic(() => import('@components/Home/HomeFAQs'), { ssr: false });

const saleBannerConfig = {
  visible: false,
  href: 'https://store.spacejoy.com',
  src: 'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_100/w_1920,e_sharpen/v1730305620/spj-v2/strip_8_nip0jq.png',
};

export const Home = ({ isMobile, pricingData }): JSX.Element => {
  const { width } = useWindowSize();
  const { data } = useFirebaseContext();
  const isBroadcastVisible = data?.broadcastV2?.broadcaststripVisible;
  const showTopNavTags = useMemo(() => width <= 992, [width]);

  return (
    <>
      <SEOWrapper seoProps={HomePageSEO.HomeSEO} />
      <Layout>
        {/* <Head>
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
        </Head> */}
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          {showTopNavTags && (
            <div className={`px-4 ${isBroadcastVisible ? 'relative top-6 ' : ''}`}>
              <TopBarMobile />
            </div>
          )}
          <Hero3 isMobile={isMobile} />
          {saleBannerConfig.visible && <SaleBanner href={saleBannerConfig.href} src={saleBannerConfig.src} />}
          <DynamicVision />
          <DynamicVideoGuide homePagePoster={homePagePoster} />
          <DynamicDesignerTeam isMobile={isMobile} />
          <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
            <Pricing variant="new" data={pricingData || []} />
            <div className="flex justify-center mt-6 text-center">
              <Link href="/pricing" passHref>
                <button className="flex items-center px-6 py-3 text-white bg-gray-900 rounded-lg group">
                  <span>See Pricing</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 text-white transition-transform transform group-hover:translate-x-2" />
                </button>
              </Link>
            </div>
          </div>
          <DynamicHomeCTABanner />
          <DynamicHomeTestimonials />
          <div className="container grid grid-cols-1 gap-4 px-4 mx-auto my-12 mt-16 sm:grid-cols-4 sm:gap-4 md:gap-5 lg:gap-8 lg:mt-32">
            <div className="col-span-1 sm:col-span-4">
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
          </div>
          <DynamicSpacejoyAdvantage />
          <div className="mt-16 mb-6 sm:mt-32 sm:mb-12">
            <DynamicFeaturedWithNoSSR />
          </div>
          <DynamicHomeGallery isMobile={isMobile} />
          <DynamicHomeFAQs />
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
