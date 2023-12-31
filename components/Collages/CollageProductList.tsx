/* eslint-disable @next/next/no-img-element */

import { AssetType } from '@components/Collection/AssetType';
import AffirmCard from '@components/Shared/AffirmCards/AffirmCard';
import ProductCard from '@components/Shop/ProductCard';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { imageKit } from '@utils/config';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
                  <AffirmCard imgUrl={`${imageKit.baseDeliveryUrl}/v1646728697/web/homepage-v3/Card_yu5azf.svg`} />
                )}
                {showAppointmentCard && idx === 2 && (
                  <Link href="/quiz/start-quiz">
                    <a target="_blank">
                      <div className="container relative w-full h-full rounded-lg">
                        {isMobile ? (
                          <Image
                            src={`${imageKit.baseDeliveryUrl}/v1650456436/web/homepage-v3/Home-in-just-7-days-Mobile_bwsdxy.gif`}
                            alt="appointment"
                            layout="fill"
                            className="object-cover object-center rounded-2xl"
                            placeholder="blur"
                            blurDataURL={blurredBgProduct}
                          />
                        ) : (
                          <Image
                            src={`${imageKit.baseDeliveryUrl}/v1650456436/web/homepage-v3/Home-in-just-7-days-Card_hjgdii.gif`}
                            alt="appointment"
                            layout="fill"
                            className="object-contain object-center rounded-2xl"
                            placeholder="blur"
                            blurDataURL={blurredBgProduct}
                          />
                        )}
                      </div>
                    </a>
                  </Link>
                )}
                <ProductCard
                  showViewDetails={false}
                  product={asset}
                  key={asset?._id}
                  collageId={collageId}
                  pageName="design-sets"
                />
              </>
            );
          })}
          {showAffirmCard && assets.length <= 3 && (
            <AffirmCard imgUrl={`${imageKit.baseDeliveryUrl}/v1646728697/web/homepage-v3/Card_yu5azf.svg`} />
          )}
          {showBannerCard && data?.designViewV2?.visible && (
            <div className="container relative w-full h-full rounded-lg">
              {data?.designViewV2?.link !== undefined && data?.designViewV2?.link !== '' ? (
                <Link href={data?.designViewV2?.link}>
                  <a>
                    <Image
                      src={`${imageKit.baseDeliveryUrl}/${data?.designViewV2?.cdn}`}
                      alt="designViewBanner"
                      layout="fill"
                      objectFit="contain"
                    />
                  </a>
                </Link>
              ) : (
                <Image
                  src={`${imageKit.baseDeliveryUrl}/${data?.designViewV2?.cdn}`}
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
