import EmptyState from '@components/Shared/EmptyState';
import Layout from '@components/Shared/Layout';
import Login from '@components/Shared/LoginManager';
import Head from 'next/head';
import React from 'react';

interface ComponentInterface {
  title: string;
}

const UnAuthorised: React.FC<ComponentInterface> = ({ title }) => {
  const redirectUrl = title ? title.toLocaleLowerCase() : '/';

  return (
    <Layout>
      <Head>
        <title>Login to continue | Spacejoy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <EmptyState
          title="You are not Authorized to view this page"
          message={`Please login to view this page`}
          showButton={false}
        />
        <div className="flex justify-center -mt-20 mb-20">
          <Login redirect={redirectUrl} ctaText={<span>Login</span>} />
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const redirectPath = ctx.req.cookies['redirect_path'] || '/';

  return {
    props: {
      title: redirectPath === 'cart' ? 'Cart' : '',
    },
  };
};

export default React.memo(UnAuthorised);
