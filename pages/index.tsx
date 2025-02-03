import SpacejoyAdvantage from '@components/Home/SpacejoyAdvantage';
import BannersBentoGrid from '@components/Home/v3/BannersBentoGrid';
import BeautifulSpaces from '@components/Home/v3/BeautifulSpaces';
import BrandLogosCloud from '@components/Home/v3/BrandLogosCloud';
import Designers from '@components/Home/v3/Designers';
import Faqs from '@components/Home/v3/Faqs';
import Featured from '@components/Home/v3/Featured';
import { Hero } from '@components/Home/v3/Hero';
import LookBook from '@components/Home/v3/LookBook';
import OurServices from '@components/Home/v3/OurServices';
import Pricing from '@components/Home/v3/Pricing';
import Shopping from '@components/Home/v3/Shopping';
import Testimonials from '@components/Home/v3/Testimonials';
import Video from '@components/Home/v3/Video';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import SEOWrapper from '@components/Shared/SEO/SEOWrapper';
import { HomePageSEO } from '@utils/SEO';

const HomeV3 = () => {
  return (
    <Layout>
      <SEOWrapper seoProps={HomePageSEO.HomeSEO} />
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <Hero />
        <Designers />
        <OurServices />
        <Pricing />
        <BeautifulSpaces />
        <Video />
        <BrandLogosCloud />
        <Shopping />
        <LookBook />
        <Testimonials />
        <SpacejoyAdvantage />
        <BannersBentoGrid />
        <Featured />
        <Faqs />
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default HomeV3;
