import ImageContainer from '@components/Pinterest/Search/ImageContainer';
import PinterestBoardsList from '@components/Pinterest/Search/PinterestBoardsList';
import PinterestSearchHeader from '@components/Pinterest/Search/PinterestSearchHeader';
import SearchBox from '@components/Pinterest/Search/SearchBox';
import FindYourInspirationContextProvider from '@components/Pinterest/usePinterestSearchContext';
import Layout from '@components/Shared/Layout';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

interface RoomSelectProps {
  searchQuery: string;
  boardId: string;
}

const RoomSelect: NextPage<RoomSelectProps> = ({ searchQuery }) => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title key="title">Connect Pinterest. Let's bring your home decor ideas to life</title>
        <meta
          key="description"
          name="description"
          content={`Pinterest board filled with interior design & home decor ideas? Connect it to discover products from your pins. Create that Pinterest-ready living room easily!`}
        />
        <meta
          key="keywords"
          name="keywords"
          content="apartment ideas pinterest, pinterest home decor ideas, pinterest interior design, pinterest living room"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <FindYourInspirationContextProvider searchQuery={searchQuery}>
          <div className="container px-4 mx-auto mb-8">
            <PinterestSearchHeader />
            <div className="grid items-stretch grid-cols-3 grid-rows-2 gap-8 mb-8 lg:grid-cols-3 lg:grid-rows-1">
              <SearchBox />
              <ImageContainer />
            </div>
            <PinterestBoardsList />
          </div>
        </FindYourInspirationContextProvider>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<RoomSelectProps> = async (ctx) => {
  const { query } = ctx;
  const { imgSrc = '', searchQuery = '', boardId = '' } = query;

  return {
    props: { imgSrc: imgSrc as string, searchQuery: searchQuery as string, boardId: boardId as string },
  };
};

export default RoomSelect;
