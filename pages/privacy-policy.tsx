import PrivacyPolicy from '@components/Policies/PrivacyPolicy';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import Head from 'next/head';
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title key="title">Privacy Policy | Spacejoy</title>
        <meta
          key="description"
          name="description"
          content="We at Spacejoy respect the privacy of your personal information and, as such, make every effort to ensure your information is protected and remains private. Read our privacy policy for details."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Banner /> 
      <Layout.Header />
      <Layout.Body>
        <PrivacyPolicy />
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default Privacy;
