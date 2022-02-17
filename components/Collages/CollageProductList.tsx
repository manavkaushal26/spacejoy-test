/* eslint-disable @next/next/no-img-element */

import { AssetType } from '@components/Collection/AssetType';
import ProductCard from '@components/Shop/ProductCard';
import React from 'react';

const CollageProductList: React.FC<{ assets: AssetType[]; collageId?: string }> = ({ assets = [], collageId }) => {
  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-1 pb-8 lg:grid-cols-3 xl:grid-cols-5">
          {assets.map((asset) => {
            return (
              <ProductCard
                showViewDetails={true}
                product={asset}
                key={asset?._id}
                collageId={collageId}
                pageName="design-sets"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollageProductList;
