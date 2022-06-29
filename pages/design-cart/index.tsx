import { PricingData } from '@components/Pricing/PricingTypes';
import DesignCart from '@components/Quiz/design-cart';
import Layout from '@components/Shared/Layout';
import { company } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { IndexPageMeta } from '@utils/meta';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Index = ({ cartData, pricingData }): JSX.Element => {
  return (
    <>
      <Head>
        {IndexPageMeta}
        <title key="title">Design Cart | {company.product}</title>
        <link rel="canonical" href="https://www.spacejoy.com/design-cart" />
      </Head>
      <Layout>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          <div className="container p-4 mx-auto">
            <DesignCart data={cartData} pricingData={pricingData} />
          </div>
          <footer className="flex sticky bottom-0 justify-end container p-4 mx-auto bg-white">
            <Link href="/checkout/design" passHref>
              <button className="py-2 px-4 rounded-md text-white bg-gray-900">Make Payment</button>
            </Link>
          </footer>
        </Layout.Body>

        <Layout.Footer />
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const endPoint = '/v1/subscriptionCarts';
  const userToken = ctx?.req?.cookies['token'];

  // const userToken =
  //   'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTg4M2IzYWZkNzBhYTFiODAwYjE1YSIsIl9pZCI6IjVkYTg4M2IzYWZkNzBhYTFiODAwYjE1YSIsIm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5Ac3BhY2Vqb3kuY29tIiwicm9sZSI6Im93bmVyIiwiY3JlZGl0cyI6MCwic3RhdHVzIjoiYWN0aXZlIiwidG5jIjpmYWxzZSwicGhvbmUiOm51bGwsInRyaWFsRXhoYXVzdGVkIjpmYWxzZSwiaWF0IjoxNjU0MDAyNDY2LCJleHAiOjE2NjI2NDI0NjZ9.X_QWeU-RxwOlrNE5ytbdwoEa4k8fh2do9L0ecOdA6FA';

  try {
    return await Promise.all([
      fetcher({ endPoint: publicRoutes.pricingRoute, method: 'GET' }),
      fetcher({ endPoint, method: 'GET', serverToken: userToken }),
      // fetcher({ endPoint: '/coupon/listings', method: 'GET' }),
    ])
      .then((data) => {
        const [pricingData, cartData] = data;
        
        const pricing: PricingData[] = pricingData?.data?.list.map((item) => {
          return {
            features: item?.includedFeatures,
            excludedFeatures: item?.excludedFeatures,
            price: item?.price,
            salePrice: item?.salePrice,
            name: item?.slug,
            description: item?.description,
            savings: item?.savings,
            tags: item?.tags,
            slug: item?.slug,
          };
        });
        if (cartData?.statusCode < 301 && pricingData?.statusCode < 301) {
          return {
            props: {
              pricingData: pricing,
              cartData: cartData?.data,
              // coupons: couponData?.data,
            },
          };
        }
        else {
          throw new Error();
        }
        
      })
      .catch((e) => {
        
        throw new Error();
      });
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Index;
