import BannersBentoGrid from '@components/Home/v3/BannersBentoGrid';
import BrandLogosCloud from '@components/Home/v3/BrandLogosCloud';
import { Hero } from '@components/Home/v3/Hero';
import LookBook from '@components/Home/v3/LookBook';
import OurServices from '@components/Home/v3/OurServices';
import Pricing from '@components/Home/v3/Pricing';
import Video from '@components/Home/v3/Video';
import Layout from '@components/Shared/Layout';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import SEOWrapper from '@components/Shared/SEO/SEOWrapper';
import { HomePageSEO } from '@utils/SEO';

type Props = {};

const HomeV3 = (props: Props) => {
  return (
    <Layout>
      <SEOWrapper seoProps={HomePageSEO.HomeSEO} />
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <Hero />
        <MaxWidthContainer>
          <BrandLogosCloud />
          <BannersBentoGrid />
        </MaxWidthContainer>
        <OurServices />
        <Video />
        <MaxWidthContainer>
          <Pricing />
        </MaxWidthContainer>
        <MaxWidthContainer className="pt-0">
          <LookBook />
        </MaxWidthContainer>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default HomeV3;
