import { BrandDeals } from '@utils/Mocks/EcommercePageData';
import React from 'react';
import Link from 'next/link';
import BrandCard from './BrandCard';
import { PushEvent } from '@utils/analyticsLogger';
import SectionHeading from './SectionHeading';

const BrandsToShop = ({ mobile }) => {
  return (
    <div>
      <SectionHeading title="Huge discounts on top brands" />
      <div className="grid max-w-screen-xl grid-cols-2 gap-4 mx-auto md:grid-cols-3 lg:grid-cols-4">
        {BrandDeals.map((brand, index) => (
          <Link
            key={brand.id}
            href={{
              pathname: `/shop`,
              query: {
                retailer: `${brand.name}`,
                discount: [`${brand.discount.start}`, `${brand.discount.upto}`].join('::'),
              },
            }}
            passHref
          >
            <a
              target={!mobile ? '_blank' : ''}
              onClick={() => {
                PushEvent({
                  category: 'Shop Brand Offers',
                  action: `Go to ${brand.name} List Page | ${brand.offer}% OFF`,
                  label: `Shop Now`,
                });
              }}
            >
              <BrandCard data={brand} index={index} />
            </a>
          </Link>
        ))}
      </div>

      <div className="w-full pt-6 mx-auto text-center">
        <Link href="/shop" passHref>
          <a target={!mobile ? '_blank' : null}>
            <button
              type="button"
              className="px-4 py-3 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
            >
              Explore All
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BrandsToShop;
