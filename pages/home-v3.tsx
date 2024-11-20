import { Button } from '@components/Button';
import ShinyButton from '@components/Button/ShinyButton';
import BaseCard from '@components/Cards/BaseCard';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import BannersBentoGrid from '@components/Home/v3/BannersBentoGrid';
import BrandLogosCloud from '@components/Home/v3/BrandLogosCloud';
import OurServices from '@components/Home/v3/OurServices';
import Layout from '@components/Shared/Layout';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { staticPricingData } from '@utils/constants/staticPricingData';
import { classNames } from '@utils/helpers';
import HtmlParser from 'react-html-parser';

type Props = {};

const HomeV3 = (props: Props) => {
  return (
    <Layout>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <MaxWidthContainer>
          <Button variant="default" size="sm">
            Test
          </Button>
          <BrandLogosCloud />
          <BannersBentoGrid />
        </MaxWidthContainer>
        <OurServices />
        <MaxWidthContainer className="pt-16">
          <SectionHeading
            preText="Designs Starting at $49"
            title="Transparent Pricing"
            subTitle="An investment in a home you’ll love for years to come"
            center
          />
          <div className="w-full max-w-5xl mx-auto mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {staticPricingData.map((item) => {
                const isBliss = item.name.toLowerCase() === 'bliss';
                const recommendedPackage = item.tags.includes('recommended');

                return (
                  <BaseCard
                    key={item.name}
                    className={classNames('flex flex-col gap-4', { '': isBliss })}
                    gradientBorder={isBliss}
                  >
                    <h3 className="capitalize text-spj-red/75">{item.name}</h3>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl">
                      ${item.salePrice.value}
                      <small className="text-base text-gray-500 sm:text-2xl md:text-2xl"> / room</small>
                    </h2>
                    <p className="text-gray-500">{HtmlParser(item.saleDescription)}</p>
                    <div className="h-px bg-gray-300" />
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                      <p>{HtmlParser(item.summary)}</p>
                    </div>
                    {recommendedPackage && (
                      <span className="px-4 py-2 mx-auto text-sm italic font-semibold text-center rounded-full bg-spj-red/10 text-spj-red w-fit">
                        Recommended
                      </span>
                    )}
                  </BaseCard>
                );
              })}
            </div>
            <div>
              <ShinyButton href="/pricing" className="mx-auto mt-10">
                See Pricing
              </ShinyButton>
            </div>
          </div>
        </MaxWidthContainer>
      </Layout.Body>
    </Layout>
  );
};

export default HomeV3;
