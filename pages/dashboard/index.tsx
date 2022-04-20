import EmptyState from '@components/Shared/EmptyState';
import Layout from '@components/Shared/Layout';
import { company } from '@utils/config';
import { IndexPageMeta } from '@utils/meta';
import Head from 'next/head';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Head>
      {IndexPageMeta}
				<title key="title">Dashboard | {company.product}</title>
				{/* <link rel="canonical" href={`https://www.spacejoy.com/dashboard/${pid}`} /> */}
      </Head>
      <Layout.Banner /> 
      <Layout.Header />
      <Layout.Body>
        <EmptyState title="Coming Soon" message="Hold On" />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default Dashboard;
