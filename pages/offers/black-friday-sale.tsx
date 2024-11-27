import { Offers } from '@components/BlackFridaySale/Offers';
import { SalesBanner } from '@components/BlackFridaySale/SalesBanner';
import Shopping from '@components/BlackFridaySale/Shopping';
import { Showcase } from '@components/BlackFridaySale/Showcase';
import MaxWidthContainer from '@components/MaxWidthContainer';
import Layout from '@components/Shared/Layout';
import { BlackFridayPageMeta } from '@utils/meta';
import Head from 'next/head';
import React from 'react';

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
            <SalesBanner />
          </MaxWidthContainer>
          <MaxWidthContainer>
            <Offers />
          </MaxWidthContainer>
          <Shopping />
          <MaxWidthContainer>
            <Showcase />
          </MaxWidthContainer>
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
};

export default BlackFridaySalePage;
