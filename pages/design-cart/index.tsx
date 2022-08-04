import { PricingData } from '@components/Pricing/PricingTypes';
import DesignCart from '@components/Quiz/design-cart';
import Layout from '@components/Shared/Layout';

import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { IndexPageMeta } from '@utils/meta';
import Head from 'next/head';
import Link from 'next/link';
import React, {useEffect, useState, useMemo} from 'react';
import { toast } from 'react-toastify';
import Success from '@components/Shared/Success';
import { company, oldSpacejoyUrl } from '@utils/config';

const Index = ({ cartData, pricingData }): JSX.Element => {

  const [cart, setCart] = useState(cartData);
  const [orderPlaced, setOrderPlaced] = useState(false);


  useEffect(() => {
    setCart(cartData);
  }, [cartData])

  const randomToken = useMemo(() => {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5);
  }, []);
  
  const makeZeroPayment = async () => {
    // payment code goes here
    const payload = {
      token: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? randomToken : 'tok_br',
      data: {
        type: 'stripe',
      },
    };
    const {statusCode}  = await fetcher({endPoint: '/v1/subscriptionOrders/checkout', method: 'POST', body: {...payload}});
    if (statusCode < 301) {
      setOrderPlaced(true);
    } else {
      toast.error('An error occurred during payment. PLease try again');
    }
  }

  
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
        {orderPlaced ? (
              <Success
                title="Woohoo! Your order was placed successfully"
                message={
                  <div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${oldSpacejoyUrl}/dashboard`}
                      className="inline-block px-4 py-2 mb-2 text-black border border-black rounded-lg"
                    >
                      <span className="">View Design Orders</span>
                    </a>
                  </div>
                }
              />
            ): (
              <>
               <div className="container p-4 mx-auto">
                  <DesignCart data={cart} pricingData={pricingData} updateCart={(newCart) => {setCart(newCart)}}/>
                </div>
                <footer className="flex sticky bottom-0 justify-end container p-4 mx-auto bg-white">

                  {
                    cart?.invoiceData?.total ? (
                      <Link href="/checkout/design" passHref>
                    <button className="py-2 px-4 rounded-md text-white bg-gray-900">Make Payment</button>
                  </Link>
                    ) : (
                      <button className="py-2 px-4 rounded-md text-white bg-gray-900" onClick={async () => await makeZeroPayment()}>Make Payment</button>
                    )
                  }

                  
                </footer>
              
              </>
            )}
         
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
