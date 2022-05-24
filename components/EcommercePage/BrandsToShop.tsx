import { BrandDeals } from '@utils/Mocks/EcommercePageData';
import React from 'react';
import Link from 'next/link';
import BrandCard from './BrandCard';
import { PushEvent } from '@utils/analyticsLogger';
import SectionHeading from './SectionHeading';

const BrandsToShop = ({ mobile }) => {
  const data = mobile ? BrandDeals.slice(0, 4) : BrandDeals;

  return (
    <div className="container max-w-7xl px-4 mx-auto">
      <SectionHeading title="Discounts on top brands" />
      <div className="grid grid-cols-2 gap-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
        {data.map((brand, index) => (
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
              <BrandCard data={brand} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandsToShop;
