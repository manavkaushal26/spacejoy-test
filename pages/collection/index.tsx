import CollectionList from '@components/Collection/CollectionList';
import { CollectionListInterface } from '@components/Collection/interface';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { GetStaticProps } from 'next';
import React from 'react';

const collection: React.FC<CollectionListInterface> = ({ feedData }) => {
  return (
    <Layout>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="container max-w-screen-xl px-4 mx-auto xl:p-0">
          <CollectionList feedData={feedData} />
          <PreFooter />
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<CollectionListInterface> = async () => {
  const additionalParamsCollections = `?limit=${internalPages.Collection.DEFAULT_PAGE_SIZE}`;
  const res = await fetcher({
    endPoint: `${publicRoutes.collectionFeedV2}${additionalParamsCollections}`,
    method: 'GET',
  });

  const { data: { hits: mainList = [] } = {} } = res;

  return {
    props: {
      feedData: { list: mainList, count: 500 },
    },
    revalidate: false, //TODO: Recheck the doc Data Fetching
  };
};

export default React.memo(collection);
