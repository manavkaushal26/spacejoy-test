import { AssetType } from '@components/Collection/AssetType';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary } from '@utils/config';
import { priceToLocaleString } from '@utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

type GenericObj = { _id: string; name: string };

type ProductCardType = {
  product: Partial<AssetType> & { retailer: GenericObj | string };
  showViewDetails?: boolean;
  collageId?: string;
  pageName?: string;
};

const ProductCard = ({ product, showViewDetails, collageId, pageName }: ProductCardType) => {
  const itemStatus = useMemo(() => {
    if (product?.status === 'discontinued') {
      return 'Discontinued';
    }
    if (!product?.inStock) {
      return 'Out of Stock';
    }

    return undefined;
  }, [product]);

  return (
    <div>
      <Link href={`/product-view/${product?._id}${pageName ? `?ref=${pageName}` : ''}`}>
        <a
          target="_blank"
          onClick={() => {
            PushEvent({
              category: `Click on Product`,
              action: `Go to PDP Page${collageId ? ' | did: ' + collageId : ''} | pid: ${product?._id}`,
              label: 'View Product',
            });
          }}
        >
          <div
            className={`bg-white p-4 ${
              showViewDetails ? 'pb-8' : ''
            } rounded-lg h-full hover:z-30 hover:scale-[1.02] relative transition hover:shadow-xl`}
          >
            {product?.msrp && product?.msrp > 0 && product?.msrp > product?.price ? (
              <>
                <div className="absolute z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5296E] text-white">
                    SALE
                  </span>
                </div>
              </>
            ) : null}

            <div className="relative w-full mb-2 aspect-w-1 aspect-h-1">
              <Image
                src={
                  product?.cdn
                    ? `${cloudinary.baseDeliveryURL}/c_scale,w_400/${product?.cdn}`
                    : product?.imageUrl || blurredBgProduct
                }
                // src={`${cloudinary.baseDeliveryURL}/c_scale,w_400/${product?.cdn}`}
                alt={product?.name}
                className="object-contain object-center w-full h-full"
                layout="fill"
                placeholder="blur"
                blurDataURL={blurredBgProduct}
              />
              {itemStatus && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span className="text-2xl font-bold text-white">{itemStatus}</span>
                </div>
              )}
            </div>
            <small className="mt-4 text-xs text-gray-500">
              {(product?.retailer as GenericObj)?.name || product?.retailer}
            </small>

            <h3 className="text-gray-700 text-md overflow-ellipsis line-clamp-2">{product?.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              <span>{priceToLocaleString(product?.displayPrice || product?.price)}</span>
              {product?.msrp && product?.msrp > 0 && product?.msrp > product?.price && (
                <>
                  <small className="inline-block ml-2 text-sm text-gray-500 line-through">
                    {priceToLocaleString(product?.msrp)}
                  </small>
                  <small className="text-xs text-[#F5296E] inline-block ml-2">
                    {(((product.msrp - product.price) / product.msrp) * 100).toFixed(0)}% OFF
                  </small>
                </>
              )}
            </p>
            {showViewDetails && (
              <div className="absolute bg-gradient-to-r from-gray-200 to-white bottom-0 left-0 w-full py-1 text-sm font-bold text-center text-gray-600 border-t border-b">
                Shop Now
              </div>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};
export default React.memo(ProductCard);
