import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { brandsReturnPolicies } from '@utils/Mocks/BrandReturnPolicies';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/outline';

type Props = {};

const BrandReturnPolicyPage = (props: Props) => {
  const router = useRouter();
  const { query } = router;
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const brandData = brandsReturnPolicies.find((brand) => brand.slug === query.slug);
    if (brandData) {
      setData(brandData);
    } else {
      setError('Brand could not be recognized');
    }
  }, []);

  return (
    <Layout>
      <NextSeo title="Spacejoy | Brand Return Policies" />
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="container px-4 pt-8 mx-auto antialiased sm:px-8">
          <div className="flex items-center gap-x-4">
            <div
              className="p-1 duration-300 border border-gray-800 rounded-lg cursor-pointer hover:shadow-lg"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </div>
            <h1 className="text-4xl">{data?.name} Return Policy</h1>
          </div>
          <div className="my-8 ">
            {data?.children.map((block) => (
              <div key={block.title} className="mt-4 text-justify">
                <h3 className="text-lg">{block.title}</h3>
                <p className="mt-1 text-base">{block.body}</p>
              </div>
            ))}
          </div>
          <div>
            <p>
              <span className="font-semibold text-red-600">Notification of Changes:</span> Information on our website is
              subject to modification without prior notice. Please check our Terms and Conditions for updates and
              changes.
            </p>
          </div>
        </div>
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default BrandReturnPolicyPage;
