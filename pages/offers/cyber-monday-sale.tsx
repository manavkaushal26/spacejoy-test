import { Offers } from '@components/BlackFridaySale/Offers';
import { SalesBanner } from '@components/BlackFridaySale/SalesBanner';
import Shopping from '@components/BlackFridaySale/Shopping';
import { Showcase } from '@components/BlackFridaySale/Showcase';
import MaxWidthContainer from '@components/MaxWidthContainer';
import Layout from '@components/Shared/Layout';
import { newSpacejoyStoreUrl } from '@utils/config';
import { BlackFridayPageMeta } from '@utils/meta';
import Head from 'next/head';

type Props = {};

const CyberMondaySale = (props: Props) => {
  return (
    <>
      <Head>
        {BlackFridayPageMeta}
        <title key="title">Cyber Monday Sale | Online Interior Design Service</title>
      </Head>
      <Layout>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          <MaxWidthContainer className="pt-4 md:!pt-0">
            <SalesBanner
              desktopBanner="/v1733146037/spj-v2/cyber-monday-sale/Get_upto_50_off_on_all_our_Boutique_Brands_2_y4s1zx.png"
              mobileBanner=""
            />
          </MaxWidthContainer>
          <MaxWidthContainer>
            <Offers
              image1={{
                href: newSpacejoyStoreUrl,
                src: '/v1733146036/spj-v2/cyber-monday-sale/Shop_for_3000_or_more_Get_20_off_your_cart_8_wn01cy.png',
                alt: 'Cyber Monday Sale Banner 1',
              }}
              image2={{
                href: newSpacejoyStoreUrl + '/collections/cyber-monday-doorbuster-deals-50-off-msrp',
                src: '/v1733146037/spj-v2/cyber-monday-sale/Shop_for_3000_or_more_Get_20_off_your_cart_7_saizak.png',
                alt: 'Cyber Monday Sale Banner 2',
              }}
              image3={{
                href: newSpacejoyStoreUrl,
                src: '/v1733146036/spj-v2/cyber-monday-sale/Shop_for_3000_or_more_Get_20_off_your_cart_6_viqcaw.png',
                alt: 'Cyber Monday Sale Banner 3',
              }}
              packageHighlightBackground="bg-cyber-monday-design"
              sale="cyber-monday"
            />
          </MaxWidthContainer>
          <Shopping lastCardBackground="bg-cyber-monday" />
          <MaxWidthContainer>
            <Showcase saleName="Cyber Monday" code="CYBERMONDAY35" />
          </MaxWidthContainer>
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
};

export default CyberMondaySale;
