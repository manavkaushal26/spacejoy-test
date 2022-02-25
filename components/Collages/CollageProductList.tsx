/* eslint-disable @next/next/no-img-element */

import { AssetType } from '@components/Collection/AssetType';
import AffirmCard from '@components/Shared/AffirmCards/AffirmCard';
import ProductCard from '@components/Shop/ProductCard';
import React from 'react';

const CollageProductList: React.FC<{ assets: AssetType[]; collageId?: string; showAffirmCard?:boolean }> = ({ assets = [], collageId, showAffirmCard=false }) => {
  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-1 pb-8 lg:grid-cols-3 xl:grid-cols-5">
          {assets.map((asset, idx) => {
            return (
              <>
              {showAffirmCard && idx==3 && <AffirmCard imgUrl="https://res.cloudinary.com/spacejoy/image/upload/v1645764975/web/homepage-v3/Group_8shopAffirm_kmopay.svg" />}
              <ProductCard
                showViewDetails={true}
                product={asset}
                key={asset?._id}
                collageId={collageId}
                pageName="design-sets"
              />
              </>
            );
          })}
          {showAffirmCard && assets.length<=3 && <AffirmCard imgUrl="https://res.cloudinary.com/spacejoy/image/upload/v1645764975/web/homepage-v3/Group_8shopAffirm_kmopay.svg" />}
        </div>
      </div>
    </div>
  );
};

export default CollageProductList;
