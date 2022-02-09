import Layout from '@components/Shared/Layout';
import DesignTeam from '@components/Team/DesignTeam';
import Head from 'next/head';
import React from 'react';

export const search = (): JSX.Element => (
  <Layout>
    <Head>
      <title>Team | Spacejoy</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout.Header />
    <Layout.Body>
      <DesignTeam />
    </Layout.Body>
    <Layout.Footer />
  </Layout>
);

export default search;
