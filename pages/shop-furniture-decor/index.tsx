import Layout from '@components/Shared/Layout';
import { company, pinterestConfig } from '@utils/config';
import Head from 'next/head';
import React from 'react';
import BrandsToShop from '@components/EcommercePage/BrandsToShop';
import PinterestBanner from '@components/EcommercePage/PinterestBanner';
import HeroCarousel from '@components/EcommercePage/HeroCarousel';
import HotDeals from '@components/EcommercePage/HotDeals';
import NewCollection from '@components/EcommercePage/NewCollection';
import PriceStore from '@components/EcommercePage/PriceStore';
import TrendingItems from '@components/EcommercePage/TrendingItems';
import FeaturedCategories from '@components/EcommercePage/FeaturedCategories';
import TrendingStyles from '@components/EcommercePage/TrendingStyles';
import SubscribeForm from '@components/EcommercePage/SubscribeForm';
import Image from 'next/image';
import WhyShopWithSpacejoy from '@utils/Mocks/Shopping';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import MobileSidebar from '@components/Shared/HeaderMobile/SidebarMenu';
import AffirmBanner from '@components/EcommercePage/AffirmBanner';
import FreeShipping from '@components/EcommercePage/FreeShipping';
import ShopInjectBanner from '@components/EcommercePage/ShopInjectBanner';
import SpacejoyPicks from '@components/EcommercePage/SpacejoyPicks';

const Index = ({ isMobile }) => {
  return (
    <Layout>
      <Head>
        <title>Shop handpicked furniture & decor online at best prices on {company.product}.com</title>
        <meta
          key="description"
          name="description"
          content="Shop the best of furniture and decor products online, handpicked by experts. Buy now and save with best offers only on spacejoy.com. Widest collection of sofas, tables, chairs, rugs, pillows, lamps and more."
        />
        <meta
          name="keywords"
          key="keywords"
          content="Wayfair, Target, Article, ruggable, anthropologie, pottery barn, west elm, Williams and Sonama"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <HeroCarousel />
        <TrendingItems mobile={isMobile} />
        <NewCollection />
        <PriceStore />
        <BrandsToShop mobile={isMobile} />
        <SpacejoyPicks mobile={isMobile} />
        <FeaturedCategories mobile={isMobile} />
        {pinterestConfig.enable === true && <PinterestBanner />}
        <TrendingStyles mobile={isMobile} />
        {/* <SubscribeForm /> */}
        <AffirmBanner />
        <FreeShipping mobile={isMobile} />
        <ShopInjectBanner />
        <div className="container max-w-7xl px-4 mx-auto">
          <div className="mt-16 mb-16 block">
            <SectionHeading title="Why buy from spacejoy?" />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              {WhyShopWithSpacejoy?.map((item) => {
                return (
                  <div key={item?.id} className="space-y-1 my-2">
                    <Image height="40" width="40" src={item?.iconLink} alt={item?.title} />
                    <p className="text-md font-bold text-gray-900">{item?.title}</p>
                    <div className="mt-2 text-sm text-gray-700">{item?.content}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const mobile = ctx.req.cookies['isMobile'];

  return {
    props: {
      isMobile: mobile === 'true' ? true : false,
    },
  };
}

export default Index;
