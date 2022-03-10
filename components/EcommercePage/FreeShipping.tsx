import { BrandPartners } from '@utils/Mocks/EcommercePageData';
import Image from 'next/image';
import React from 'react';
import SectionHeading from './SectionHeading';

const FreeShipping = () => {
  return (
    <div>
      <SectionHeading title="Free shipping on your favorites. Enjoy!" />
      <div className="grid max-w-screen-xl grid-cols-2 gap-4 mx-auto mb-16 sm:grid-cols-3">
        {BrandPartners.map((brand) => (
          <div key={brand.id} className="relative text-center bg-[#8da4a9] rounded-xl">
            <Image src={brand.logo} alt={brand.name} className="w-1/4 mx-auto sm:w-1/2" width={180} height={115} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeShipping;
