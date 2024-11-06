import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import { Disclosure } from '@headlessui/react';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { classNames } from '@utils/helpers';
import faqs from '@utils/Mocks/HomepageFAQs';
import { useRouter } from 'next/router';

type Props = {};

const HomeFAQs = (props: Props) => {
  const router = useRouter();

  return (
    <div className="bg-gray-100">
      <div className="container px-4 py-16 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="col-span-2">
            <HomeSectionTitle className="text-center">
              <HomeSectionTitle.MainTitle>
                <span>Still have questions?</span>
              </HomeSectionTitle.MainTitle>

              <HomeSectionTitle.Description align="center">
                <span />
              </HomeSectionTitle.Description>
            </HomeSectionTitle>
            <p className=" text-[120px] md:text-[200px] text-gray-300 font-bold text-center">
              <span className="tracking-widest ">FAQ</span>
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={() => router.push('/help')}
                className="flex items-center px-6 py-3 mx-auto mt-6 text-white bg-gray-900 rounded-lg group"
              >
                <span>View All</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 text-white transition-transform transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-12 ">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question}>
                  {({ open }) => (
                    <div className="pb-4 border-b border-gray-500">
                      <dt className="text-sm ">
                        <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400 ">
                          <span className="text-lg font-bold text-gray-900 lg:text-md">{faq.question}</span>
                          <span className="flex items-center ml-6 h-7">
                            <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="pr-12 mt-2 ">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFAQs;
