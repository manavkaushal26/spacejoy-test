import CookiesContent from '@components/Policies/CookiesContent';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { company } from '@utils/config';
import { CookiesPageMeta } from '@utils/meta';
import Head from 'next/head';
import React from 'react';

const CookiePolicy: React.FC = () => {
  return (
    <Layout>
      <Head>
				{CookiesPageMeta}
				<title key="title">Cookies | {company.product}</title>
				<meta key="og-title" property="og:title" content={`Cookies | ${company.product}`} />
				<meta key="og-description" property="og:description" content={`${company.description}`} />
				<meta key="og-url" property="og:url" content="https://www.spacejoy.com/cookies" />
				<meta key="twitter-title" name="twitter:title" content={`Cookies | ${company.product}`} />
				<meta key="twitter-description" name="twitter:description" content={`${company.product}`} />
			</Head>
      <Layout.Banner /> 
      <Layout.Header />
      <Layout.Body>
        <CookiesContent />
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default React.memo(CookiePolicy);
