import { AssetType } from '@components/Collection/AssetType';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary } from '@utils/config';
import { priceToLocaleString } from '@utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import SVGLoader from '@components/Shared/SVGLoader';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useStore } from '@lib/store';
import shallow from 'zustand/shallow';
import fetcher from '@utils/fetcher';

type GenericObj = { _id: string; name: string };

type ProductCardType = {
  product: Partial<AssetType> & { retailer: GenericObj | string };
  showViewDetails?: boolean;
  collageId?: string;
  pageName?: string;
};

const ProductCard = ({ product, showViewDetails, collageId, pageName }: ProductCardType) => {
  const [addingToCart, isAddingToCart] = useState(false);
  const [localProductQuantity, setLocalProductQuantity] = useState(1);
  const incrementQty = (e) => {
    e.preventDefault();
    setLocalProductQuantity((localProductQuantity) => (localProductQuantity + 1 >= 20 ? 20 : localProductQuantity + 1));
  };
  const decrementQty = (e) => {
    e.preventDefault();
    setLocalProductQuantity(localProductQuantity ? (localProductQuantity - 1 === 0 ? 1 : localProductQuantity - 1) : 0);
  };
  const { updateCart, cart, modifyCart } = useStore(
    (store) => ({
      updateCart: store.updateCart,
      cart: store.cart,
      modifyCart: store.modifyCart,
    }),
    shallow
  );

  const addToCart = async (e) => {
    e.preventDefault();
    const isUserAuthenticated = Cookies.get('token') ? true : false;

    isAddingToCart(true);
    const {
      _id,
      retailer: { _id: brand },
    } = product;
    const { cartItems } = cart;
    const quantity =
      !cartItems[brand] || !cartItems[brand].products[product._id]
        ? localProductQuantity
        : cartItems[brand].products[product._id]?.quantity + localProductQuantity;

    if (!isUserAuthenticated) {
      modifyCart(product, quantity, 'update');
      setLocalProductQuantity(1);
      toast.success(
        <span>
          Yay!
          <br />
          Item added to bag successfully
        </span>
      );
      isAddingToCart(false);
    } else {
      try {
        const { data: cartRes, statusCode } = await fetcher({
          endPoint: '/v1/cart',
          method: 'POST',
          body: {
            items: [
              {
                productId: product?._id,
                quantity,
                projectId: '',
                designId: '',
              },
            ],
          },
        });
        if (statusCode < 301) {
          updateCart(cartRes);
          toast.success(
            <span>
              Yay!
              <br />
              Item added to bag successfully
            </span>
          );
          setLocalProductQuantity(1);
        } else {
          if (statusCode === 403) {
            throw new Error('unauthorized');
          } else {
            throw new Error('error');
          }
        }
      } catch (e) {
        if (e?.message === 'unauthorized') {
          toast.error(
            <span>
              Hey there!
              <br />
              Sign in to add items to your bag
            </span>
          );
        } else {
          toast.error(
            <span>
              Oops.
              <br />
              Item could not be added to bag. Please try again
            </span>
          );
        }
      } finally {
        isAddingToCart(false);
      }
    }
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
         <div className='flex flex-col bg-white justify-between rounded-lg h-full hover:z-30 hover:scale-[1.02] relative transition hover:shadow-xl'>
         <div
            className={` p-4 ${
              showViewDetails ? 'p-4' : ''
            } `}
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

            <h3 className="text-gray-700 text-base min-h-[40px] overflow-ellipsis line-clamp-2">{product?.name}</h3>
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
          </div>
          {showViewDetails && !itemStatus && (
            <div className="flex border-t sm:flex-row sm:justify-between sm:align-middle sm:p-4">
              <div className="flex space-x-4 sm:flex-col-1">
                <button
                  type="button"
                  className="text-base font-medium text-gray-900 bg-gray-50 group hover:shadow-lg rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400 focus:outline-none"
                  onClick={(e) => decrementQty(e)}
                >
                  <MinusSmIcon className="w-6 h-6" />
                </button>
                <p className="px-2 py-3">{localProductQuantity}</p>
                <button
                  type="button"
                  className="text-base font-medium text-gray-900 bg-gray-50 group hover:shadow-lg rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400 focus:outline-none"
                  onClick={(e) => incrementQty(e)}
                >
                  <PlusSmIcon className="w-6 h-6" />
                </button>
              </div>
              <button
                type="button"
                className="px-4 text-base font-medium text-white bg-gray-900 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                onClick={(e) => addToCart(e)}
                disabled={addingToCart ? true : false}
              >
                {addingToCart ? <SVGLoader /> : <span>Add to bag</span>}
              </button>
            </div>
          )}</div>
          {/* {showViewDetails && (
              <div className="absolute bg-gradient-to-r from-gray-200 to-white bottom-0 left-0 w-full py-1 text-sm font-bold text-center text-gray-600 border-t border-b">
                Shop Now
              </div>
            )} */}
        </a>
      </Link>
    </div>
  );
};
export default React.memo(ProductCard);
