import BaseCard from '@components/Cards/BaseCard';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import BannersBentoGrid from '@components/Home/v3/BannersBentoGrid';
import BrandLogosCloud from '@components/Home/v3/BrandLogosCloud';
import OurServices from '@components/Home/v3/OurServices';
import Pricing from '@components/Home/v3/Pricing';
import ImageWithDots from '@components/Shared/ImageWithDots';
import Layout from '@components/Shared/Layout';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import SEOWrapper from '@components/Shared/SEO/SEOWrapper';
import { HomePageSEO } from '@utils/SEO';

type Props = {};

const HomeV3 = (props: Props) => {
  const dots = [
    { x: 18, y: 42, label: 'Lamp' },
    { x: 86, y: 40, label: 'Wall Painting' },
    { x: 56, y: 85, label: 'Ottoman' },
  ];

  return (
    <Layout>
      <SEOWrapper seoProps={HomePageSEO.HomeSEO} />
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <MaxWidthContainer>
          <BrandLogosCloud />
          <BannersBentoGrid />
        </MaxWidthContainer>
        <OurServices />
        <MaxWidthContainer>
          <Pricing />
        </MaxWidthContainer>
        <MaxWidthContainer className="pt-0">
          <SectionHeading
            preText=""
            title="Spacejoy Picks"
            subTitle="Draw inspiration from rooms designed for happy customers"
            center
          />
          <div className="w-full mt-10">
            <BaseCard className="!p-0" containerClassName="rounded-3xl" disabledHoverShadow>
              <ImageWithDots
                src="https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_1502,h_628/v1728071399/server/production/server/designs/render/670046e58d8448000d55c067.jpg"
                alt="Example"
                dots={dots}
              />
            </BaseCard>
          </div>
        </MaxWidthContainer>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default HomeV3;
