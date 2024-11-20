import BannersBentoGrid from '@components/Home/v3/BannersBentoGrid';
import BrandLogosCloud from '@components/Home/v3/BrandLogosCloud';
import OurServices from '@components/Home/v3/OurServices';
import Pricing from '@components/Home/v3/Pricing';
import Layout from '@components/Shared/Layout';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';

type Props = {};

const HomeV3 = (props: Props) => {
  return (
    <Layout>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <MaxWidthContainer>
          <BrandLogosCloud />
          <BannersBentoGrid />
        </MaxWidthContainer>
        <OurServices />
        <MaxWidthContainer className="pt-16">
          <Pricing />
        </MaxWidthContainer>
      </Layout.Body>
    </Layout>
  );
};

export default HomeV3;
