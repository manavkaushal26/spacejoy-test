import { ExternalLinkIcon, SwitchHorizontalIcon } from '@heroicons/react/outline';
import { blurredProduct } from '@public/images/bg-base-64';
import { oldSpacejoyUrl } from '@utils/config';
import { priceToLocaleString } from '@utils/helpers';
import AssetType from '@utils/types/AssetType';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useMemo, useState } from 'react';
import { DataBusContext } from 'store';

interface ProductCardInterface {
  product: AssetType;
  isDraggable: boolean;
  hasSwap?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  withShopNow: boolean;
}

const ProductCard: React.FC<ProductCardInterface> = ({
  product,
  isDraggable,
  hasSwap: isSwappable,
  onClick,
  withShopNow,
}) => {
  const { setBusData } = useContext(DataBusContext);
  const productThumbnail = product?.cdn || product?.imageUrl || 'v1623166775/Untitled-1-12_iah06e.jpg';
  const [isVisible, setVisible] = useState(false);

  const hideOverlay = () => {
    setVisible(false);
  };
  const showOverlay = () => {
    setVisible(true);
  };
  const hoverProps = {
    ...(isSwappable && { onMouseEnter: showOverlay, onMouseLeave: hideOverlay }),
  };

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
    <div
      title={product?.name}
      className={`relative group bg-white h-full rounded-sm overflow-hidden flex flex-col ${
        isDraggable ? 'cursor-move' : 'cursor-pointer'
      } ${itemStatus && 'cursor-default'}`}
      {...hoverProps}
      draggable={isDraggable ? 'true' : 'false'}
      {...(!itemStatus && {
        onClick: onClick,
        onDragStart: () =>
          setBusData({
            id: product._id,
            data: {
              ...product,
              vertical: product?.vertical || '',
              dimension: {
                height: product?.height,
                width: product?.width,
                depth: product?.depth,
              },
              price: product?.price,
              id: product?._id,
              x: 0,
              y: 0,
              retailer: product?.retailer,
            },
            type: 'asset',
          }),
      })}
    >
      {isSwappable && isVisible && !itemStatus && (
        <div className="absolute inset-0 z-20 flex items-center justify-center w-full h-full bg-white bg-opacity-75">
          <p className="flex items-center">
            <SwitchHorizontalIcon className="w-4 h-4 mr-2" />
            Swap
          </p>
        </div>
      )}
      {product?.msrp && product?.msrp > 0 && product?.msrp > product?.price ? (
        <>
          <div className="absolute z-10 top-2 left-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5296E] text-white">
              SALE
            </span>
          </div>
        </>
      ) : null}

      {itemStatus && (
        <div className="inset-0 absolute flex z-30 justify-center items-center bg-black/40">
          <span className="text-white font-bold text-xl">{itemStatus}</span>
        </div>
      )}

      <div className="absolute inset-x-0 top-0 z-10 px-4 py-1 transition transform -translate-y-12 bg-gray-100 rounded-sm shadow-xs group-hover:translate-y-0">
        <p className="text-xs leading-4 text-center text-gray-500">
          {`${((product?.height || 0) * 12)?.toFixed(2).toString()}" x 
          ${((product?.width || 0) * 12)?.toFixed(2).toString()}" x 
          ${((product?.depth || 0) * 12)?.toFixed(2).toString()}"`}
        </p>
      </div>
      <div className="p-4 aspect-square flex-1 relative">
        <Image
          src={`https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_300,ar_1,c_pad/${productThumbnail}`}
          alt={product?.name}
          layout="fill"
          objectFit="contain"
          blurDataURL={blurredProduct}
          placeholder="blur"
        />
      </div>
      <div className="px-4">
        <small className="text-xs text-gray-500 capitalize">{product?.retailer}</small>
        <p className="h-10 text-sm line-clamp-2">{product?.name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="mt-1 text-sm font-medium text-gray-900">
            <span className="font-bold">
              {priceToLocaleString(parseFloat(product?.displayPrice) || product?.price)}
            </span>
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
          {!withShopNow && (
            <Link
              href={{
                pathname: `${oldSpacejoyUrl}/product-view/${product?._id}`,
                query: { ref: 'visual-board' },
              }}
              passHref
            >
              <a
                target="_blank"
                className="text-gray-500 transition transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                rel="noreferrer"
              >
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </Link>
          )}
        </div>
        {withShopNow && (
          <div className="my-1">
            <span>
              <Link
                href={{
                  pathname: `${oldSpacejoyUrl}/product-view/${product?._id}`,
                  query: { ref: 'visual-board' },
                }}
                passHref
              >
                <a
                  className="inline-block px-3 py-1 text-sm text-center transition-shadow bg-white border border-black rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-lg hover:opacity-60"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See Details
                </a>
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
