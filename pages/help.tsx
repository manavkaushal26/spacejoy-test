import Help from '@components/Help';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import Head from 'next/head';
import React from 'react';

export const search = (): JSX.Element => (
  <Layout>
    <Head>
      <title key="title">FAQs | Spacejoy</title>
      <meta
        key="description"
        name="description"
        content={`Have doubts about product purchase, designs orders, or Sapcejoy? These Frequently Asked Questions will help clear most of your doubts.`}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout.Banner /> 
    <Layout.Header />
    <Layout.Body>
      <Help />
      <PreFooter />
    </Layout.Body>
    <Layout.Footer />
  </Layout>
);

export default search;
