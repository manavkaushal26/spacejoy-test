import SectionHeading from '@components/EcommercePage/SectionHeading';
import MaxWidthContainer from '@components/Shared/MaxWidthContainer';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import SpjShoppingAdvantage from '@utils/Mocks/WhySpacejoy';
import Image from 'next/image';

type Props = {};

const SpacejoyAdvantage = (props: Props) => {
  return (
    <div className="bg-gray-500/5">
      <MaxWidthContainer className="!py-16">
        <SectionHeading title="Get the Spacejoy advantage" center noMargin />
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
        <div className="hidden mt-10 lg:block">
          <div className="grid grid-cols-4 gap-8 my-8 mt-12">
            {SpjShoppingAdvantage?.map((item, index) => {
              return (
                <div key={item?.id} className="p-6 bg-white rounded-xl">
                  <Image height="50" width="50" src={item?.iconLink} alt={item?.title} />
                  <p className="mt-4 font-bold">{item?.title}</p>
                  <div className="mt-2 text-sm text-zinc-500">{item?.content}</div>
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
