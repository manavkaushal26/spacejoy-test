import ShinyButton from '@components/Button/ShinyButton';
import BaseCard from '@components/Cards/BaseCard';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { CheckCircleIcon, CurrencyDollarIcon } from '@heroicons/react/solid';
import { staticPricingData } from '@utils/constants/staticPricingData';
import { classNames, parseHtmlWithDOMParser } from '@utils/helpers';
import Link from 'next/link';

type Props = {};

const Pricing = (props: Props) => {
  return (
    <MaxWidthContainer className="pt-16 sm:pt-24">
      <SectionHeading
        // preText="Designs Starting at $49"
        preText={
          <div className="p-2 mx-auto rounded-full bg-gradient-to-b from-emerald-100 to-emerald-300 w-fit">
            <CurrencyDollarIcon className="w-8 h-8 text-emerald-500" />
          </div>
        }
        title="Transparent Pricing"
        subTitle="An investment in a home you’ll love for years to come"
        center
        noMargin
      />
      <div className="w-full max-w-5xl mx-auto mt-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {staticPricingData.map((item) => {
            const isBliss = item.name.toLowerCase() === 'bliss';
            const recommendedPackage = item.tags.includes('recommended');

            return (
              <Link key={item.name} href="/pricing" passHref>
                <a>
                  <BaseCard
                    className={classNames('flex flex-col gap-4 bg-gradient-to-br from-transparent to-[#fff1f2]')}
                    // gradientBorder={isBliss}
                  >
                    <div className="flex flex-col gap-2 md:gap-4">
                      <h3 className="capitalize text-spj-red/75">{item.name}</h3>
                      <h2 className="text-4xl md:text-5xl">
                        ${item.salePrice.value}
                        <small className="text-gray-500 md:text-2xl"> / room</small>
                      </h2>
                      {/* <div
                    className="text-gray-500"
                    dangerouslySetInnerHTML={{ __html: parseHtmlWithDOMParser(item.saleDescription) }}
                  /> */}
                    </div>

                    <div className="h-px bg-gray-300" />
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div dangerouslySetInnerHTML={{ __html: parseHtmlWithDOMParser(item.summary) }} />
                    </div>
                    {recommendedPackage && (
                      <span className="px-4 py-2 mx-auto text-sm italic font-semibold text-center rounded-full bg-spj-red/10 text-spj-red w-fit">
                        Recommended
                      </span>
                    )}
                  </BaseCard>
                </a>
              </Link>
            );
          })}
        </div>

        <ShinyButton href="/pricing" showArrow className="mx-auto mt-10">
          See Pricing
        </ShinyButton>
      </div>
    </MaxWidthContainer>
  );
};

export default Pricing;
