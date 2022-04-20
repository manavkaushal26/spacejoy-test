import DesignSetCardV2 from '@components/RoomSelection/DesignSetCardV2';
import EmptyState from '@components/Shared/EmptyState';
import Layout from '@components/Shared/Layout';
import ProductCard from '@components/Shop/ProductCard';
import { Tab } from '@headlessui/react';
import { PushEvent } from '@utils/analyticsLogger';
import fetcher from '@utils/fetcher';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
  const [wishlistItemsData, setWishlistItemsData] = useState([]);

  useEffect(() => {
    setWishlistItemsData(data);
  }, [data]);

  const assetsData = useMemo(() => {
    return wishlistItemsData.filter((item) => item?.type === 'Asset');
  }, [wishlistItemsData]);

  const designSetsData = useMemo(() => {
    return wishlistItemsData.filter((item) => item?.type === 'Collage');
  }, [wishlistItemsData]);
  const analytics = (type, id) => {
    PushEvent({
      category: `${type} clicked from wishlist `,
      action: `${type} clicked from wishlist | ${id}`,
      label: `Wishlist item clicked`,
    });
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
        <div className="container px-4 mx-auto my-4 py-4">
          <Tab.Group defaultIndex={0}>
            <Tab.List className="flex rounded-xl justify-center mt-4">
              <div className="bg-white rounded-xl p-1 border border-[#9CA3AF] space-x-2">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'py-2 text-sm leading-5 font-medium rounded-lg w-fit px-8',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-white ring-opacity-60',
                      selected ? 'bg-black text-white shadow' : 'text-black bg-gray-100'
                    )
                  }
                >
                  Products
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'py-2 text-sm leading-5 font-medium rounded-lg w-fit px-8',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-white ring-opacity-60',
                      selected ? 'bg-black text-white shadow' : 'text-black bg-gray-100'
                    )
                  }
                >
                  Designs
                </Tab>
              </div>
            </Tab.List>

            <Tab.Panel>
              {assetsData?.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
                  {assetsData?.map((asset) => (
                    <div key={asset?._id} onClick={() => analytics('product', asset?._id)}>
                      <ProductCard product={asset?.document} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <EmptyState title="You have no products in your wishlist" message="" />
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {designSetsData?.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                  {designSetsData?.map((design) => (
                    <div key={design?._id} onClick={() => analytics('design_set', design?._id)}>
                      <DesignSetCardV2 designData={design?.document} isMobile={true} large={false} pageRef="Wishlist" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <EmptyState title="You have no design sets in your wishlist" message="" />
                </div>
              )}
            </Tab.Panel>
          </Tab.Group>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx?.params;
  const endPoint = `/v1/wishlist-items/${id}`;
  const userToken = ctx?.req?.cookies['token'];

  const { data, statusCode } = await fetcher({ endPoint, method: 'GET', serverToken: userToken });
  console.log('data', data);
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
