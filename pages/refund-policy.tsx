import RefundContent from '@components/Policies/RefundContent';
import Layout from '@components/Shared/Layout';
import Head from 'next/head';
import React from 'react';

const Terms: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title key="title">Refund Policy | Spacejoy</title>
        <meta
          key="description"
          name="description"
          content={`Not happy with your order? Read about the Spacejoy Refund Policy that allows you to shop for products and designs hassle-free.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Banner /> 
      <Layout.Header />
      <Layout.Body>
        <RefundContent />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default Terms;
