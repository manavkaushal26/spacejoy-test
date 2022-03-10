/* eslint-disable @next/next/no-img-element */

import { AssetType } from '@components/Collection/AssetType';
import AffirmCard from '@components/Shared/AffirmCards/AffirmCard';
import ProductCard from '@components/Shop/ProductCard';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { cloudinary } from '@utils/config';
import { useFirebaseContext } from '@store/FirebaseContextProvider';

const CollageProductList: React.FC<{ assets: AssetType[]; collageId?: string; showAffirmCard?:boolean, showBannerCard?:boolean }> = ({ assets = [], collageId, showAffirmCard=false, showBannerCard=false }) => {
  
  const { data } = useFirebaseContext();
  
  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-1 pb-8 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset, idx) => {
            return (
              <>
              {showAffirmCard && idx==3 && <AffirmCard imgUrl="https://res.cloudinary.com/spacejoy/image/upload/v1646728697/web/homepage-v3/Card_yu5azf.svg" />}
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
          {showAffirmCard && assets.length<=3 && <AffirmCard imgUrl="https://res.cloudinary.com/spacejoy/image/upload/v1646728697/web/homepage-v3/Card_yu5azf.svg" />}
          {showBannerCard && data?.designViewV2?.visible && (
                    <div className="container rounded-lg w-full h-full relative">
                      {data?.designViewV2?.link !== undefined && data?.designViewV2?.link !== '' ? (
                        <Link href={data?.designViewV2?.link}>
                          <a>
                              <Image
                                src={`${cloudinary.baseDeliveryURL}/${data?.designViewV2?.cdn}`}
                                alt="designViewBanner"
                                layout="fill"
                                objectFit="contain"
                              />
                          </a>
                        </Link>
                      ) : (
                          <Image
                            src={`${cloudinary.baseDeliveryURL}/${data?.designViewV2?.cdn}`}
                            alt="designViewBanner"
                            layout="fill"
                            objectFit="contain"
                          />
                      )}
                    </div>
                  )}
        </div>
      </div>
    </div>
  );
};

export default CollageProductList;
