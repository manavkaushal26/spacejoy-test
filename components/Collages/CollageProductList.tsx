/* eslint-disable @next/next/no-img-element */

import { AssetType } from '@components/Collection/AssetType';
import ProductCard from '@components/Shop/ProductCard';
import React from 'react';

const CollageProductList: React.FC<{ assets: AssetType[] }> = ({ assets = [] }) => {
  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-1  lg:grid-cols-3 xl:grid-cols-5 pb-8">
          {assets.map((asset) => {
            return <ProductCard showViewDetails={true} product={asset} key={asset?._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CollageProductList;
