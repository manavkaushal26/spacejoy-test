import React from 'react';
import Link from 'next/link';
import BrandCard from './BrandCard';
import { PushEvent } from '@utils/analyticsLogger';
import SectionHeading from './SectionHeading';
import { SpacejoyPicksData } from '@utils/Mocks/EcommercePageData';

const SpacejoyPicks = ({ mobile }) => {
  const data = mobile ? SpacejoyPicksData.slice(0, 4) : SpacejoyPicksData;

  return (
    <div className="container max-w-7xl px-4 mx-auto">
      <SectionHeading title="Spacejoy Picks" />
      <div className="grid grid-cols-2 gap-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
        {data.map((brand, index) => (
          <Link
            key={brand.id}
            href={{
              pathname: `/shop`,
              query: {
                retailer: `${brand.name}`,
              },
            }}
            passHref
          >
            <a
              target={!mobile ? '_blank' : ''}
              onClick={() => {
                PushEvent({
                  category: 'Spacejoy Picks',
                  action: `Go to ${brand.name} List Page`,
                  label: `Shop Now`,
                });
              }}
            >
              <BrandCard data={brand} section="spacejoy picks" />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpacejoyPicks;
