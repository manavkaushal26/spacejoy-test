import { AssetType } from '@components/Collection/AssetType';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { cloudinary } from '@utils/config';
import { priceToLocaleString } from '@utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

type GenericObj = { _id: string; name: string };

type ProductCardType = {
  product: Partial<AssetType> & { retailer: GenericObj | string };
};

const ProductCard = ({ product }: ProductCardType) => {
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
      <Link href={`/product-view/${product?._id}`}>
        <a target="_blank">
          <div className="bg-white p-4 2xl:p-8 rounded-lg h-full relative">
            {product?.msrp && product?.msrp > 0 && product?.msrp > product?.price ? (
              <>
                <div className="absolute z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5296E] text-white">
                    SALE
                  </span>
                </div>
              </>
            ) : null}

            <div className="w-full mb-2 relative aspect-w-1 aspect-h-1">
              <Image
                src={
                  product?.cdn
                    ? `${cloudinary.baseDeliveryURL}/c_scale,w_400/${product?.cdn}`
                    : product?.imageUrl || blurredBgProduct
                }
                // src={`${cloudinary.baseDeliveryURL}/c_scale,w_400/${product?.cdn}`}
                alt={product?.name}
                className="w-full h-full object-center object-contain"
                layout="fill"
                placeholder="blur"
                blurDataURL={blurredBgProduct}
              />
              {itemStatus && (
                <div className="inset-0 absolute flex justify-center items-center bg-black/40">
                  <span className="text-white font-bold text-2xl">{itemStatus}</span>
                </div>
              )}
            </div>
            <small className="mt-4 text-xs text-gray-500">
              {(product?.retailer as GenericObj)?.name || product?.retailer}
            </small>

            <h3 className="text-md text-gray-700 overflow-ellipsis line-clamp-2">{product?.name}</h3>
            <p className="text-lg font-medium text-gray-900 mt-1">
              <span>{priceToLocaleString(product?.displayPrice || product?.price)}</span>
              {product?.msrp && product?.msrp > 0 && product?.msrp > product?.price && (
                <>
                  <small className="text-sm text-gray-500 line-through inline-block ml-2">
                    {priceToLocaleString(product?.msrp)}
                  </small>
                  <small className="text-xs text-[#F5296E] inline-block ml-2">
                    {(((product.msrp - product.price) / product.msrp) * 100).toFixed(0)}% OFF
                  </small>
                </>
              )}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default React.memo(ProductCard);
