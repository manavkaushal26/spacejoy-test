/* eslint-disable @next/next/no-img-element */

import { AssetType } from '@components/Collection/AssetType';
import AffirmCard from '@components/Shared/AffirmCards/AffirmCard';
import ProductCard from '@components/Shop/ProductCard';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { cloudinary } from '@utils/config';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { blurredBgProduct } from '@public/images/bg-base-64';
import Cookies from 'js-cookie';

const CollageProductList: React.FC<{
  assets: AssetType[];
  collageId?: string;
  showAffirmCard?: boolean;
  showBannerCard?: boolean;
  showAppointmentCard?: boolean;
}> = ({ assets = [], collageId, showAffirmCard = false, showBannerCard = false, showAppointmentCard = false }) => {
  const { data } = useFirebaseContext();
  const isMobile = Cookies.get('isMobile') === 'true' ? true : false;

  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-1 pb-8 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset, idx) => {
            return (
              <>
                {showAffirmCard && idx == 3 && (
                  <AffirmCard imgUrl="https://res.cloudinary.com/spacejoy/image/upload/v1646728697/web/homepage-v3/Card_yu5azf.svg" />
                )}
                {showAppointmentCard && idx === 2 && (
                  <Link href="https://form.typeform.com/to/V1SWVv3c">
                    <a target="_blank">
                      <div className="container rounded-lg w-full h-full relative">
                        {isMobile ?
                          <Image
                            src="https://res.cloudinary.com/spacejoy/image/upload/v1648120223/web/webengagebanners/Talk-to-a-designer-Mobile_muki6n.gif"
                            alt="affirm"
                            layout="fill"
                            className="object-cover object-center rounded-2xl"
                            placeholder="blur"
                            blurDataURL={blurredBgProduct}
                          /> 
                          :
                          <Image
                            src="https://res.cloudinary.com/spacejoy/image/upload/v1648116369/web/webengagebanners/Talk-to-a-designer-1_r6mufm.gif"
                            alt="affirm"
                            layout="fill"
                            className="object-contain object-center rounded-2xl"
                            placeholder="blur"
                            blurDataURL={blurredBgProduct}
                          />
                        }
                      </div>
                    </a>
                  </Link>
                )}
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
          {showAffirmCard && assets.length <= 3 && (
            <AffirmCard imgUrl="https://res.cloudinary.com/spacejoy/image/upload/v1646728697/web/homepage-v3/Card_yu5azf.svg" />
          )}
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
