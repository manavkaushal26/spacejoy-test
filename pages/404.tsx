import ErrorState from '@components/Shared/ErrorState';
import Layout from '@components/Shared/Layout';
import { company } from '@utils/config';
import { IndexPageMeta } from '@utils/meta';
import Head from 'next/head';
import React from 'react';

const PageNotFound: React.FC = () => {
  return (
    <Layout>
      <Head>
      {IndexPageMeta}
				<title key="title">
					404 | {company.product}
				</title>
      </Head>
      <Layout.Banner /> 
      <Layout.Header />
      <Layout.Body>
        <ErrorState status={404} />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default PageNotFound;
