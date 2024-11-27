import { Offers } from '@components/BlackFridaySale/Offers';
import { ProductHighlight } from '@components/BlackFridaySale/ProductHighlight';
import { Showcase } from '@components/BlackFridaySale/Showcase';

import { Brands } from '@components/BlackFridaySale/Brands';
import { SalesBanner } from '@components/BlackFridaySale/SalesBanner';
import MaxWidthContainer from '@components/MaxWidthContainer';
import Layout from '@components/Shared/Layout';
import React from 'react';

const BlackFridaySale: React.FC = () => {
  return (
    <Layout>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <MaxWidthContainer>
          <SalesBanner />
        </MaxWidthContainer>
        <MaxWidthContainer>
          <Offers />
        </MaxWidthContainer>
        <MaxWidthContainer>
          <Brands />
        </MaxWidthContainer>
        <MaxWidthContainer>
          <Showcase />
        </MaxWidthContainer>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default BlackFridaySale;
