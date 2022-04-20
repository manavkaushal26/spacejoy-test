import CreateRoomBtn from '@components/Shared/CreateListBtn';
import EmptyState from '@components/Shared/EmptyState';
import Layout from '@components/Shared/Layout';
import StickyFooter from '@components/Shared/StickyFooter';
import { fetchWishList } from '@components/Shared/WishListBtn';
import RoomCard from '@components/Wishlist/RoomCard';
import fetcher from '@utils/fetcher';
import Head from 'next/head';
import React, { useState } from 'react';

interface WishlistItem {
  _id: string;
  name: string;
  thumbnail?: string;
  createdAt: string;
}
interface ComponentInterface {
  data: Array<WishlistItem>;
}

const WishList: React.FC<ComponentInterface> = ({ data }) => {
  const [listData, setData] = useState(data);

  const updatedRoomCollection = async () => {
    const [data, err] = await fetchWishList();
    if (data) {
      setData(data);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Your Wishlist | Spacejoy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4 hidden lg:block">
            <CreateRoomBtn cb={updatedRoomCollection} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {listData && listData?.length ? (
              <>
                {listData?.map((item) => (
                  <RoomCard room={item} key={item?._id} />
                ))}
              </>
            ) : (
              <div className="col-span-12">
                <EmptyState title="You have no wishlists saved" message="Create a room to get started" />
              </div>
            )}
          </div>
        </div>
        <div className="block lg:hidden">
          <StickyFooter show>
            <div className="px-4 py-2">
              <CreateRoomBtn cb={updatedRoomCollection} />
            </div>
          </StickyFooter>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  // get Wishlists for user
  const endPoint = '/v1/wishlist';
  const userToken = ctx?.req?.cookies['token'];

  const { data, statusCode } = await fetcher({ endPoint, method: 'GET', serverToken: userToken });
  if (statusCode < 300) {
    return {
      props: {
        data,
      },
    };
  }

  return {
    props: {
      notFound: true,
    },
  };
};

export default React.memo(WishList);
