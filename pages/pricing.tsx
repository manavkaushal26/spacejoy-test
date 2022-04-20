import Packages from '@components/Pricing/Packages';
import PricingPageDescription from '@components/Pricing/PricingPageDescription';
import { PricingData } from '@components/Pricing/PricingTypes';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import SEOWrapper from '@components/Shared/SEO/SEOWrapper';
import data from '@mocks/FeaturedData';
import { cloudinary, company } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { PricingPageMeta } from '@utils/meta';
import { PricingPageSEO } from '@utils/SEO';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import PackagesAdvantages from '../components/Pricing/PackagesAdvantages';

const DynamicMindBlowingWithNoSSR = dynamic(() => import('@components/Pricing/MindBlowing'), { ssr: false });

export const pricing = ({ pricingData }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const seoTitle = `Online Interior Design Packages Starting at ${pricingData[0]?.price?.value} on ${company.product} | Start a Project`;
  const seoObject = {
    ...PricingPageSEO.PricingSEO,
    title: seoTitle,
    openGraph: {
      ...PricingPageSEO.PricingSEO.openGraph,
      title: seoTitle,
    },
  };

  return (
    <>
      <SEOWrapper seoProps={seoObject} />
      <Layout>
        <Head>
        {PricingPageMeta}
				<title key="title">
					Online Interior Design Packages Starting at ${pricingData[0]?.salePrice.value} on {company.product} | Start a Project
				</title>
				<meta
					key="description"
					name="description"
					content={`${company.product}'s online interior design packages are suited to fit every need and budget. Pick a package and work with one of expert designers to design your room online`}
				/>
				<meta
					key="og-title"
					property="og:title"
					content={`Online Interior Design Packages Starting at ${pricingData[0]?.salePrice.value} on ${company.product} | Start a Project`}
				/>
				<meta
					key="og-description"
					property="og:description"
					content={`${company.product}'s online interior design packages are suited to fit every need and budget. Pick a package and work with one of expert designers to design your room online`}
				/>
				<meta key="og-url" property="og:url" content="https://www.spacejoy.com/pricing" />
				<meta
					key="og-image"
					property="og:image"
					content={`${cloudinary.baseDeliveryURL}/image/upload/c_scale,q_auto,w_600/v1593540199/web/seo/pricing_page_x3ni4v.jpg`}
				/>
				<meta key="og-image-width" property="og:image:width" content="600" />
				<meta key="og-image-height" property="og:image:height" content="400" />
				<meta
					key="twitter-title"
					name="twitter:title"
					content={`Online Interior Design Packages Starting at ${pricingData[0]?.salePrice.value} on ${company.product} | Start a Project`}
				/>
				<meta
					key="twitter-description"
					name="twitter:description"
					content={`${company.product}'s online interior design packages are suited to fit every need and budget. Pick a package and work with one of expert designers to design your room online`}
				/>
				<meta
					key="twitter-image"
					name="twitter:image"
					content="https://res.cloudinary.com/spacejoy/image/upload/c_scale,q_auto,w_600/v1593540199/web/seo/pricing_page_x3ni4v.jpg"
				/>
        </Head>
        <Layout.Banner /> 
        <Layout.Header />
        <Layout.Body>
          {/* <DynamicMindBlowingWithNoSSR /> */}
          <Packages pricingData={pricingData} />
        <PackagesAdvantages />
        <PricingPageDescription/>
          <PreFooter />
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetcher({ endPoint: publicRoutes.pricingRoute, method: 'GET' });
  const {
    data: { list = [] },
  } = res;
  const pricingData: PricingData[] = list.map((item) => {
    return {
      features: item?.includedFeatures,
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
      pricingData,
    },
    revalidate: 10,
  };
};

export default pricing;