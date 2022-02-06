import RoomSelectionList from '@components/RoomSelection/RoomSelectionList';
import Layout from '@components/Shared/Layout';
import topCollages from '@utils/Mocks/topCollages';
import Head from 'next/head';
import React from 'react';

const RoomSelect = (props) => {
  return (
    <Layout>
      <Head>
        <title>Interior-Designs | Spacejoy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Header />
      <Layout.Body>
        <RoomSelectionList feedData={topCollages} />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default RoomSelect;
