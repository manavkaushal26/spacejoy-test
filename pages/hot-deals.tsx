import TrendingItems from '@components/EcommercePage/TrendingItems';
import Layout from '@components/Shared/Layout';
import { cloudinary, company } from '@utils/config';
import Head from 'next/head';
import React from 'react';

const HotDeals = () => {
  return (
    <Layout>
      <Head>
        <title key="title">
          Online Interior Design Services - Design Your Home Interior Online With {company.product}
        </title>

        <meta
          key="description"
          name="description"
          content={`${company.product} is an online interior design service provider that designs any room in your home online in 3D. Get best interior design & home decor ideas from our design experts`}
        />

        <meta
          key="og-title"
          property="og:title"
          content={`Online Interior Design Services - Design Your Home Interior Online With ${company.product}`}
        />
        <meta
          key="og-description"
          property="og:description"
          content={`${company.product} is an online interior design service provider that designs any room in your home online in 3D. Get best interior design & home decor ideas from our design experts`}
        />
        <meta key="og-url" property="og:url" content="https://www.spacejoy.com/hot-deals" />

        <meta
          key="twitter-title"
          name="twitter:title"
          content={`Online Interior Design Services - Design Your Home Interior Online With ${company.product}`}
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={`${company.product} is an online interior design service provider that designs any room in your home online in 3D. Get best interior design & home decor ideas from our design experts`}
        />

        <link rel="canonical" href="https://www.spacejoy.com" />
        <base href="/" />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <TrendingItems page />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default HotDeals;
