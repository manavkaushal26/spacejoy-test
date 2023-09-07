import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { brandsReturnPolicies } from '@utils/Mocks/BrandReturnPolicies';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useRouter } from 'next/router';

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
          <h1 className="mb-4 text-2xl">Select brand to read its Return Policy</h1>
          {brandsReturnPolicies.map((brand) => (
            <h4
              key={brand.id}
              className="mt-2 text-lg cursor-pointer w-fit hover:underline"
              onClick={() => router.push(`/return-policies/${brand.slug}`)}
            >
              {brand.name}
            </h4>
          ))}
        </div>
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default ReturnPoliciesPage;
