import { Offers } from '@components/BlackFridaySale/Offers';
import { SalesBanner } from '@components/BlackFridaySale/SalesBanner';
import Shopping from '@components/BlackFridaySale/Shopping';
import { Showcase } from '@components/BlackFridaySale/Showcase';
import MaxWidthContainer from '@components/MaxWidthContainer';
import Layout from '@components/Shared/Layout';
import { newSpacejoyStoreUrl } from '@utils/config';
import { BlackFridayPageMeta } from '@utils/meta';
import Head from 'next/head';
import React from 'react';

// text-[#e6bc63]

const BlackFridaySalePage: React.FC = () => {
  return (
    <>
      <Head>
        {BlackFridayPageMeta}
        <title key="title">Black Friday Sale | Online Interior Design Service</title>
      </Head>
      <Layout>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          <MaxWidthContainer className="pt-4 md:!pt-0">
            <SalesBanner
              desktopBanner="/v1732688533/spj-v2/Black-Friday-sale/Get_upto_50_off_on_all_our_Boutique_Brands_1_2_1_tcsxyt.webp"
              mobileBanner="/v1732719268/spj-v2/Black-Friday-sale/Get_upto_50_off_on_all_our_Boutique_Brands_Poster_Portrait_nqv85n.webp"
            />
          </MaxWidthContainer>
          <MaxWidthContainer>
            <Offers
              image1={{
                href: newSpacejoyStoreUrl,
                src: '/v1732688582/spj-v2/Black-Friday-sale/Shop_for_-3000_or_more_Get_20_off_your_cart_4_dbt4lp.png',
                alt: 'Exclusive Brands',
              }}
              image2={{
                href: newSpacejoyStoreUrl + '/collections/black-friday-doorbuster-deals-50-off-msrp',
                src: '/v1732688602/spj-v2/Black-Friday-sale/Shop_for_-3000_or_more_Get_20_off_your_cart_3_xsya8j.png',
                alt: 'Doorbusters',
              }}
              image3={{
                href: newSpacejoyStoreUrl,
                src: '/v1732688570/spj-v2/Black-Friday-sale/Shop_for_-3000_or_more_Get_20_off_your_cart_zdxawu.png',
                alt: 'Shop More',
              }}
              packageHighlightBackground="bg-black-friday-design"
              sale="black-friday"
            />
          </MaxWidthContainer>
          <Shopping lastCardBackground="bg-black-friday" textColor="text-[#e6bc63]" />
          <MaxWidthContainer>
            <Showcase saleName="Black Friday" code="BLACKFRIDAY" />
          </MaxWidthContainer>
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
    props: {},
  };
};

export default BlackFridaySalePage;
