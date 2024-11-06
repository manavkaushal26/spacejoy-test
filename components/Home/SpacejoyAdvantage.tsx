import HomeSectionTitle from '@components/Home/Hero/HomeSectionTitle';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import SpjShoppingAdvantage from '@utils/Mocks/WhySpacejoy';
import Image from 'next/image';

type Props = {};

const SpacejoyAdvantage = (props: Props) => {
  return (
    <div className="container px-4 mx-auto mt-16 mb-6 sm:mt-32 sm:mb-12">
      <div className="block mt-8 lg:hidden">
        <HomeSectionTitle.MainTitle>
          <p className="text-center">Get the Spacejoy advantage</p>
        </HomeSectionTitle.MainTitle>

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

      <div className="hidden mb-6 lg:block sm:mt-32 sm:mb-12">
        <HomeSectionTitle className="text-center">
          <HomeSectionTitle.MainTitle>Get the Spacejoy advantage</HomeSectionTitle.MainTitle>
        </HomeSectionTitle>

        <div className="hidden my-8 mt-12 bg-white lg:grid lg:grid-cols-4 lg:gap-12">
          {SpjShoppingAdvantage?.map((item, index) => {
            return (
              <div key={item?.id}>
                <Image height="40" width="40" src={item?.iconLink} alt={item?.title} />
                <p className="mt-4 font-bold text-gray-900 text-md">{item?.title}</p>
                <div className="mt-2 text-sm text-gray-700">{item?.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpacejoyAdvantage;
