import Help from '@components/Help';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { company, cloudinary, imageKit } from '@utils/config';
import { HelpPageMeta } from '@utils/meta';
import Head from 'next/head';
import React from 'react';

export const search = (): JSX.Element => (
  <Layout>
    <Head>
      {HelpPageMeta}
      <title key="title">
        Got Questions on how Online Interior Design works? Find answers to all your queries on {company.product}
      </title>
      <meta
        key="description"
        name="description"
        content={`Common questions related to online interior design service answered on ${company.product} Help Center - Customer support, payment, features, services, shopping and more`}
      />
      <meta
        key="og-title"
        property="og:title"
        content={`Got Questions on how Online Interior Design works? Find answers to all your queries on ${company.product}`}
      />
      <meta
        key="og-description"
        property="og:description"
        content={`Common questions related to online interior design service answered on ${company.product} Help Center - Customer support, payment, features, services, shopping and more`}
      />
      <meta key="og-url" property="og:url" content="https://www.spacejoy.com/help" />
      {/* /image/upload/c_scale,q_auto,w_600 */}
      <meta
        key="og-image"
        property="og:image"
        content={`${imageKit.baseDeliveryUrl}/v1593540159/web/seo/help_page_ujzm7k.jpg`}
      />
      <meta key="og-image-width" property="og:image:width" content="600" />
      <meta key="og-image-height" property="og:image:height" content="452" />
      <meta
        key="twitter-title"
        name="twitter:title"
        content={`Got Questions on how Online Interior Design works? Find answers to all your queries on ${company.product}`}
      />
      <meta
        key="twitter-description"
        name="twitter:description"
        content={`Common questions related to online interior design service answered on ${company.product} Help Center - Customer support, payment, features, services, shopping and more`}
      />
      <meta
        key="twitter-image"
        name="twitter:image"
        content={`${imageKit.baseDeliveryUrl}/image/upload/c_scale,q_auto,w_600/v1593540159/web/seo/help_page_ujzm7k.jpg`}
      />
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
