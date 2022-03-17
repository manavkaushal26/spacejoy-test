import { oldSpacejoyUrl } from '@utils/config';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react';

export const TabOffers = () => {
  const mobile = Cookies.get('isMobile') === 'true' ? true : false;

  return (
    <div className={`flex flex-row font-normal ${mobile ? 'space-x-2' : 'space-x-5'}`}>
      <div className="flex flex-col justify-end h-full p-4 cursor-pointer bg-gray-100 hover:underline">
        <Link href={`/shop`} passHref>
          <a rel="noreferrer">
            <h5 className="text-sm">All Products</h5>
          </a>
        </Link>
      </div>
      <div className="flex flex-col justify-end h-full p-4 cursor-pointer bg-gray-100 hover:underline">
        <Link href={`/shop-furniture-decor`} passHref>
          <a rel="noreferrer">
            <div>
              <h5 className="text-sm">All Offers</h5>
            </div>
          </a>
        </Link>
      </div>
      <div className="flex flex-col justify-end h-full p-4 cursor-pointer bg-gray-100 hover:underline">
        <Link href={`${oldSpacejoyUrl}/trending-items`} passHref>
          <a target={mobile ? '' : '_blank'} rel="noreferrer">
            <div>
              <h5 className="text-sm">Hot Deals</h5>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
