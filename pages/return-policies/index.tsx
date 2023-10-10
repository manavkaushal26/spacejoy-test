import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { brandsReturnPolicies } from '@utils/Mocks/BrandReturnPolicies';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useRouter } from 'next/router';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { newSpacejoyStoreUrl } from '@utils/config';

type Props = {};

const ReturnPoliciesPage = (props: Props) => {
  const router = useRouter();

  return (
    <Layout>
      <NextSeo title="Spacejoy | Brand Return Policies" />
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="container px-4 pt-8 mx-auto antialiased">
          <h1 className="mb-4 text-2xl">Select a brand to read its Return Policy</h1>
          <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-4">
            {brandsReturnPolicies.map((brand) => (
              <div
                key={brand.id}
                className="p-4 mt-2 text-lg duration-300 bg-white border border-gray-100 rounded-md shadow cursor-pointer group hover:shadow-lg hover:bg-red-100/50"
                onClick={() => router.push(`/return-policies/${brand.slug}`)}
              >
                <h4 className="flex items-center font-medium">
                  <span>{brand.name}</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 text-gray-800 duration-300 group-hover:ml-4" />
                </h4>
              </div>
            ))}
          </div>
        </div>
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      permanent: false,
      destination: newSpacejoyStoreUrl + '/pages/return-policies',
    },
  };
}

export default ReturnPoliciesPage;
