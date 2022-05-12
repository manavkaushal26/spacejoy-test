import { BrandPartners } from '@utils/Mocks/EcommercePageData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SectionHeading from './SectionHeading';

const FreeShipping = ({ mobile }) => {
  return (
    <div className="container max-w-7xl px-4 mx-auto">
      <SectionHeading title="Free shipping on your favorites. Enjoy!" />
      <div className="grid max-w-screen-xl grid-cols-2 gap-4 mx-auto mb-16 sm:grid-cols-3">
        {BrandPartners.map((brand) => (
          <Link key={brand.id} href={brand.href}>
            <a target={!mobile ? '_blank' : ''}>
              <div className="relative text-center bg-[#8da4a9] rounded-xl shadow-md hover:shadow-lg transition duration-200">
                <Image src={brand.logo} alt={brand.name} className="w-1/4 mx-auto sm:w-1/2" width={180} height={115} />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FreeShipping;
