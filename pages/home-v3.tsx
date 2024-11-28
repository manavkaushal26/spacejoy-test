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
        <BannersBentoGrid />
        <OurServices type="carousel" />
        <Video />
        <Pricing />
        <BrandLogosCloud />
        <LookBook />
        <Testimonials />
        <SpacejoyAdvantage />
        <BeautifulSpaces />
        <Shopping />
        <Designers />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default HomeV3;
