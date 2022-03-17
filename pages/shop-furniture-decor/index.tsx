import HeroBanner from '@components/EcommercePage/HeroBanner';
import Layout from '@components/Shared/Layout';
import { company, oldSpacejoyUrl, pinterestConfig } from '@utils/config';
import Head from 'next/head';
import React from 'react';
// import ShopInjectBanner from '@components/EcommercePage/ShopInjectBanner';
import BrandsToShop from '@components/EcommercePage/BrandsToShop';
import CategoryToShop from '@components/EcommercePage/CategoryToShop';
import ShopBanner from '@components/EcommercePage/ShopReferralBanner';
import PinterestBanner from '@components/EcommercePage/PinterestBanner';
import FreeShipping from '@components/EcommercePage/FreeShipping';
import AffirmBanner from '@components/EcommercePage/AffirmBanner';
import Cookies from 'js-cookie';

const Index = () => {
  const mobile = Cookies.get('isMobile');

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
      <Layout.Header />
      <Layout.Body>
        <div className="container px-4 mx-auto xl:p-0">
          <HeroBanner linkTo="/shop" />
          <BrandsToShop mobile={mobile} />
          {pinterestConfig.enable === true && <PinterestBanner />}
          <CategoryToShop mobile={mobile} />
          {/* <ShopInjectBanner linkTo="/shop" /> */}
          <ShopBanner linkTo={`${oldSpacejoyUrl}/referrals`} shopInjectBanner={false} />
          <AffirmBanner />
          <FreeShipping />
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default Index;
