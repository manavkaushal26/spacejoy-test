import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import SpjShoppingAdvantage from '@utils/Mocks/WhySpacejoy';
import Image from 'next/image';

type Props = {};

const SpacejoyAdvantage = (props: Props) => {
  return (
    <div className="bg-[#fff1f2]/50 bg-pattern">
      <MaxWidthContainer className="py-12 mt-12 sm:py-16 sm:mt-20">
        <SectionHeading title="Why Trust Spacejoy?" center noMargin />
        <div className="block mt-10 lg:hidden">
          {SpjShoppingAdvantage?.map((item, index) => {
            return (
              <Disclosure key={item?.id} defaultOpen={index === 0}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                      <span className="text-sm font-bold text-gray-900">{item?.title}</span>
                      {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2">
                      <Image height="40" width="40" src={item?.iconLink} alt={item?.title} />
                      <div className="mt-2 text-sm text-gray-700">{item?.content}</div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          })}
        </div>
        <div className="hidden mx-auto mt-10 max-w-7xl lg:block">
          <div className="grid grid-cols-4 gap-8">
            {SpjShoppingAdvantage?.map((item, index) => {
              return (
                <div key={item?.id} className="text-center group">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto transition-all duration-200 bg-white border border-gray-100 shadow-md group-hover:shadow-lg rounded-xl">
                    <Image src={item?.iconLink} alt={item?.title} width="40" height="40" />
                  </div>
                  <p className="mt-6 text-lg font-bold">{item?.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item?.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default SpacejoyAdvantage;
