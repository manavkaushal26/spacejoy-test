import ShinyButton from '@components/Button/ShinyButton';
import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { classNames } from '@utils/helpers';
import faqs from '@utils/Mocks/HomepageFAQs';

type Props = {};

const Faqs = (props: Props) => {
  return (
    <div className="bg-gray-100 bg-pattern">
      <MaxWidthContainer>
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="col-span-2">
            {/* <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>
                <span>Still have questions?</span>
              </HomeSectionTitle.MainTitle>

              <HomeSectionTitle.Description align="center">
                <span />
              </HomeSectionTitle.Description>
            </HomeSectionTitle> */}
            <SectionHeading title="Still have questions?" center noMargin />
            {/* <p className="text-[120px] md:text-[200px] text-gray-300 font-bold text-center">
              <span className="tracking-widest ">FAQs</span>
            </p> */}
            <ShinyButton href="/help" className="w-full mt-5 lg:w-fit lg:mx-auto" showArrow showRing>
              View All
            </ShinyButton>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-6">
              {faqs.map((faq, idx) => (
                <Disclosure defaultOpen={idx === 0} as="div" key={faq.question}>
                  {({ open }) => (
                    <div className="pb-4 border-b border-gray-200">
                      <dt className="text-sm ">
                        <Disclosure.Button className="flex items-start justify-between w-full text-left">
                          <span className="text-lg font-semibold lg:text-md">
                            {idx + 1}. {faq.question}
                          </span>
                          <span className="flex items-center ml-6 h-7">
                            <ChevronDownIcon
                              className={classNames(
                                'text-gray-500 transition-all duration-200',
                                open ? 'rotate-180' : 'rotate-0',
                                'h-6 w-6 transform'
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Transition
                        enter="transition duration-200 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel as="dd" className="pr-12 mt-2 ">
                          <p className="text-base">{faq.answer}</p>
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default Faqs;
