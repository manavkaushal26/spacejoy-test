import { blurredBgProduct } from '@public/images/bg-base-64';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ProductCardType = {
  product: {
    _id: string;
    imageUrl: string;
    retailer: string;
    name: string;
    displayPrice?: string;
    price: number;
    msrp: number;
    slug?: string;
    cdn?: string;
  };
};

const ProductCard = ({ product }: ProductCardType) => (
  <div>
    <Link href={`/product-view/${product?._id}`}>
      <a target="_blank">
        <div className="bg-white p-4 2xl:p-8 rounded-lg h-full">
          <div className="w-full mb-2 aspect-w-1 aspect-h-1">
            <Image
              src={product?.imageUrl}
              // src={`${cloudinary.baseDeliveryURL}/c_scale,w_400/${product?.cdn}`}
              alt={product?.name}
              className="w-full h-full object-center object-contain"
              layout="fill"
              placeholder="blur"
              blurDataURL={blurredBgProduct}
            />
          </div>
          <small className="mt-4 text-xs text-gray-500">{product?.retailer}</small>
          <h3 className="text-md text-gray-700 overflow-ellipsis line-clamp-2">{product?.name}</h3>
          <p className="text-lg font-medium text-gray-900 mt-1">
            <span>${product?.displayPrice || product?.price}</span>
            {product?.msrp && product?.msrp > 0 && product?.msrp > product?.price && (
              <small className="text-sm text-gray-500 line-through inline-block ml-2">${product?.msrp}</small>
            )}
          </p>
        </div>
      </a>
    </Link>
  </div>
);
export default React.memo(ProductCard);
