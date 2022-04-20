import ErrorState from '@components/Shared/ErrorState';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { company } from '@utils/config';
import { IndexPageMeta } from '@utils/meta';
import Head from 'next/head';
import React from 'react';

const Error = ({ statusCode }: { statusCode: number }): JSX.Element => {
  return (
    <Layout>
      <Head>
      {IndexPageMeta}
					<title key="title">
						{statusCode} | {company.product}
					</title>
      </Head>
      <Layout.Banner /> 
      <Layout.Header />
      <Layout.Body>
        <ErrorState status={statusCode} />
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
