import ImageWithProducts from '@components/Pinterest/FindProducts/ImageWithProducts';
import UseSearchProductsWithImageProvider from '@components/Pinterest/FindProducts/UseSearchProductsFromImageProvider';
import Layout from '@components/Shared/Layout';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

interface FindProductsProps {
  searchQuery: string;
  imgSrc: string;
  boardId?: number;
}

const FindProducts: NextPage<FindProductsProps> = ({ searchQuery, imgSrc, boardId }) => {
  return (
    <Layout>
      <Head>
        <title>Pinterest | Spacejoy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Header />
      <Layout.Body>
        <div className="container mx-auto px-4">
          <UseSearchProductsWithImageProvider imgSrc={imgSrc} searchQuery={searchQuery}>
            {/* <SearchBox /> */}
            <ImageWithProducts imgSrc={imgSrc} />
          </UseSearchProductsWithImageProvider>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { imgSrc, searchQuery, boardId } = query;

  return {
    props: { imgSrc, searchQuery: (searchQuery as string) || '', boardId: (boardId as number) || null },
  };
};

export default FindProducts;
