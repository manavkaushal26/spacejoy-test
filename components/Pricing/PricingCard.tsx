import { InformationCircleIcon } from '@heroicons/react/outline';
import { PricingDataType } from '@utils/constants/staticPricingData';
import Link from 'next/link';
import React from 'react';
import HtmlParser from 'react-html-parser';
import { Tooltip } from 'react-tooltip';

interface PricingCardInterface {
  pricingItem: PricingDataType;
}
const recommendedPackageName = 'bliss';

const PricingCard: React.FC<PricingCardInterface> = ({ pricingItem }) => {
  return (
    <div className="relative">
      {pricingItem?.name === recommendedPackageName && (
        <div className="bg-white px-4 absolute -right-14 top-12 w-52 text-sm text-center text-[#F5296E] rotate-45">
          <div className="uppercase ">Recommended</div>
        </div>
      )}
      <div
        className={`${
          pricingItem?.name === recommendedPackageName ? 'bg-[#FEF2EF] ' : 'bg-[#E9ECEE]'
        } border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-300`}
        key={pricingItem?.name}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold leading-6 text-gray-900 capitalize">{pricingItem?.name}</h2>
          <p className="mt-2 text-sm text-gray-500">{pricingItem?.description}</p>
          <p className="mt-8">
            <span className="text-base font-medium">Original Price: </span>
            <span className="text-lg font-extrabold text-gray-900 line-through">${pricingItem?.price.value}</span>
            <span className="text-base font-medium text-gray-500 line-through">/room</span>
          </p>
          <p className="">
            <span className="text-xl font-medium">Deal Price: </span>
            <span className="text-2xl font-extrabold text-gray-900">${pricingItem?.salePrice.value}</span>
            <span className="text-xl font-medium text-gray-500">/room</span>
          </p>
          <p className="mt-4 text-sm text-gray-500">
            {pricingItem?.saleDescription ? pricingItem.saleDescription : 'Additional offers available at checkout'}
          </p>
          <Link href={`/quiz/start-quiz`}>
            <a className="block w-full py-4 mt-8 text-sm text-center text-white capitalize bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-900">
              Buy {pricingItem?.name}
            </a>
          </Link>
        </div>
        <div className="px-6 pt-6 pb-8">
          <h3 className="text-xs font-semibold tracking-wide text-gray-900 uppercase">What&apos;s included</h3>
          <ul className="mt-6 space-y-4">
            {pricingItem?.features.map((feature) => (
              <li className="flex items-center space-x-2" key={feature?._id}>
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-500 w-fit">{HtmlParser(feature?.label)}</span>
                {feature?.helpText ? (
                  <>
                    <div data-tooltip-id={feature._id}>
                      <InformationCircleIcon className="inline-block w-4 h-4 text-gray-500 duration-200 hover:text-gray-800" />
                    </div>
                    <Tooltip
                      id={feature._id}
                      place="bottom"
                      content={feature.helpText}
                      className="max-w-[250px] z-[100] !text-xs shadow-lg !text-gray-600"
                      variant="light"
                    />
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        {pricingItem?.excludedFeatures.length > 0 && (
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-xs font-medium tracking-wide text-gray-900 uppercase">What&apos;s excluded</h3>
            <ul className="mt-6 space-y-4">
              {pricingItem?.excludedFeatures.map((feature) => (
                <li className="flex space-x-3" key={feature?._id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 w-5 h-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm text-gray-500">{feature?.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
