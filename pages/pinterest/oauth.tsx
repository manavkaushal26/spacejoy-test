import Layout from '@components/Shared/Layout';
import LottieAnimation from '@components/Shared/LottieAnimation';
import PinterestSearch from '@public/lotties/pinterest-loading.json';
import { company } from '@utils/config';
import fetcher from '@utils/fetcher';
import { reactLocalStorage } from '@utils/helpers';
import { logoutPinterest } from '@utils/pinterestUtils';
import cookie from 'js-cookie';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Pinterestoauth = ({ code }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const pinterestToken = cookie.get('pinterest_access_token');

    const pinterestRefreshToken = cookie.get('pinterest_refresh_token');

    const fetchPinterestUser = async (accessToken) => {
      const data = await fetcher({
        endPoint: `/api/pinterest/get_user/${accessToken}`,
        hasBaseUrl: true,
        method: 'GET',
      });
      if (data?.data?.code === 2) {
        setError(true);
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
        await reactLocalStorage.setObject('pinterest_user', data.data);
        router.push({ pathname: '/pinterest/dashboard' });
      }
    };

    const fetchAccessToken = async () => {
      logoutPinterest();
      const response = await fetcher({
        endPoint: `/api/pinterest/token/${code}`,
        hasBaseUrl: true,
        method: 'GET',
      });
      console.log(response);
      if (response.data?.access_token) {
        cookie.set('pinterest_access_token', response.data?.access_token, {
          expires: response?.data?.expires_in / (60 * 60 * 24),
        });
        cookie.set('pinterest_refresh_token', response.data?.refresh_token, {
          expires: response?.data?.refresh_token / (60 * 60 * 24),
        });
        await fetchPinterestUser(response?.data?.access_token);
      } else {
        setError(true);
        setLoading(false);
      }
    };

    const refreshAccessToken = async (refreshToken) => {
      const response = await fetcher({
        endPoint: `/api/pinterest/refresh_token/${refreshToken}`,
        hasBaseUrl: true,
        method: 'GET',
      });
      if (response.data?.access_token) {
        cookie.set('pinterest_access_token', response.data?.access_token, {
          expires: response?.data?.expires_in / (60 * 60 * 24),
        });
        await fetchPinterestUser(response?.data?.access_token);
      } else {
        setError(true);
        setLoading(false);
      }
    };

    if (code) {
      fetchAccessToken();
    } else if (pinterestToken) {
      fetchPinterestUser(pinterestToken);
    } else if (pinterestRefreshToken) {
      refreshAccessToken(pinterestRefreshToken);
    } else {
      router.push({ pathname: '/pinterest/search' });
    }
  }, [code]);

  return (
    <Layout>
      <Head>
        <title key="title">Pinterest | {company.product}</title>
      </Head>
      <Layout.Header />
      <Layout.Body>
        <div className="container mx-auto flex flex-col justify-center	items-center min-h-screen">
          <LottieAnimation animationData={PinterestSearch} width={200} speed={2.5} />
          {error ? (
            <div>
              Failed to login.{' '}
              <Link href="/pinterest/search">
                <a>Retry again</a>
              </Link>
            </div>
          ) : (
            <div>{!success && loading ? 'Logging in to Pinterest...' : 'Logged in '}</div>
          )}
          <div>Do not refresh this page. You will be redirected automatically</div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{ code: string }> = async ({
  req,
  query: { code = undefined },
}) => {
  const isServer = !!req;

  return { props: { code: (code as string) || '' } };
};

export default Pinterestoauth;
