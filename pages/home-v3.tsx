import SpacejoyAdvantage from '@components/Home/SpacejoyAdvantage';
import BannersBentoGrid from '@components/Home/v3/BannersBentoGrid';
import BeautifulSpaces from '@components/Home/v3/BeautifulSpaces';
import BrandLogosCloud from '@components/Home/v3/BrandLogosCloud';
import Designers from '@components/Home/v3/Designers';
import { Hero } from '@components/Home/v3/Hero';
import LookBook from '@components/Home/v3/LookBook';
import OurServices from '@components/Home/v3/OurServices';
import Pricing from '@components/Home/v3/Pricing';
import Shopping from '@components/Home/v3/Shopping';
import Testimonials from '@components/Home/v3/Testimonials';
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
          <BannersBentoGrid />
        </MaxWidthContainer>
        <OurServices type="carousel" />
        <Video />
        <MaxWidthContainer>
          <Pricing />
        </MaxWidthContainer>
        <BrandLogosCloud />
        <MaxWidthContainer>
          <LookBook />
        </MaxWidthContainer>
        <MaxWidthContainer className="pt-0">
          <Testimonials />
        </MaxWidthContainer>
        <SpacejoyAdvantage />
        <BeautifulSpaces />
        <Shopping />
        <MaxWidthContainer>
          <Designers />
        </MaxWidthContainer>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default HomeV3;
