import CartItemDimmer from '@components/Cart/CartItemDimmer';
import { CheckCircleIcon, QuestionMarkCircleIcon, TagIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/store';
import { PushEvent } from '@utils/analyticsLogger';
import fetcher from '@utils/fetcher';
import React, { useMemo, useState } from 'react';
import shallow from 'zustand/shallow';

const Coupons = ({ coupons, loading, onSuccess, onError }) => {
  const { cart } = useStore(
    (store) => ({
      cart: store.cart,
    }),
    shallow
  );

  const retailersInCart = useMemo(() => {
    const { cartItems = {} } = cart;

    return Object.keys(cartItems);
  }, [cart]);

  const [currentCoupon, setCurrentCoupon] = useState('');
  const [applyingCoupon, setApplyCoupon] = useState(false);

  const applyCoupon = async (couponCode) => {
    try {
      setApplyCoupon(true);
      const res = await fetcher({
        endPoint: '/v1/cartCoupons',
        method: 'POST',
        body: { coupon: couponCode, isGiftCard: false },
      });
      const { data, statusCode } = res;

      if (statusCode > 301) {
        throw new Error(data);
      } else {
        PushEvent({
          category: 'Checkout - Apply Coupon In Modal',
          action: `Apply Coupon Success | ${couponCode}`,
          label: 'Apply',
        });
        onSuccess(data);
      }
    } catch (e) {
      onError();
    } finally {
      setApplyCoupon(false);
    }
  };

  return (
    <>
      {loading ? (
        <>
          {[...new Array(5)]?.map((_d, _i) => {
            return (
              <div key={_i}>
                <CartItemDimmer />
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div>
            <div className="relative mt-8">
              <input
                type="text"
                className="z-0 w-full h-12 pl-4 pr-20 rounded-lg focus:shadow focus:outline-none"
                placeholder="Enter Coupon code"
                value={currentCoupon}
                onChange={(e) => {
                  setCurrentCoupon(e?.target?.value);
                }}
              />
              <div className="absolute top-2 right-2">
                <button
                  className="flex items-center justify-center w-20 h-8 text-xs text-center text-white bg-gray-900 rounded-lg"
                  onClick={() => applyCoupon(currentCoupon)}
                >
                  {applyingCoupon ? (
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <span>APPLY</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          {Object?.keys(coupons)?.map((couponType) => {
            const { coupons: offers = [] } = coupons[couponType];
            if (couponType === 'product') {
              return (
                <>
                  <div>
                    <h3 className="mt-4 space-y-2">Spacejoy Offers</h3>
                    {offers?.map((couponItem) => {
                      return (
                        <div
                          key={couponItem?._id}
                          className="relative p-4 mt-4 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none"
                        >
                          <div className="inline-block">
                            <div className="flex items-center justify-center inline-block p-1 border border-gray-900 border-dashed">
                              <TagIcon className="w-4 h-4" />{' '}
                              <span className="inline-block ml-2">{couponItem?.code?.toUpperCase()}</span>
                            </div>
                          </div>
                          <p className="mt-2 text-sm font-bold text-gray-900">{couponItem?.title}</p>
                          <p className="mt-1 text-sm text-gray-900">{couponItem?.description}</p>
                          <button
                            className="w-20 h-8 mt-4 text-xs text-gray-900 bg-white border border-gray-900 rounded-xs "
                            onClick={() => applyCoupon(couponItem.code)}
                          >
                            Use
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            } else if (couponType === 'retailer') {
              return (
                <>
                  <div className="mt-8">
                    <h3 className="mt-4 space-y-2">Spacejoy Brand Offers (Auto-appplied on your cart)</h3>
                    <p className="text-sm text-gray-500">Brought to you exclusively by Spacejoy</p>
                    <ul className="p-2 mt-4 bg-gray-200 rounded-sm">
                      {offers?.map((offer, index) => {
                        return (
                          <li
                            key={offer?._id}
                            className={`flex items-center justify-between mt-2 text-sm ${index !== 0 ? 'mt-2' : ''} ${
                              retailersInCart?.indexOf(offer?.retailer?._id) > -1 ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            <section className="flex items-center">
                              <section className="relative text-center cursor-pointer group">
                                <QuestionMarkCircleIcon
                                  className="relative inline-block w-5 h-5 cursor-pointer group"
                                  aria-hidden="true"
                                />
                                <div className="absolute z-10 p-2 text-xs text-center text-white bg-black rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 bottom-full w-28">
                                  {offer?.discountType === 'percent' ? (
                                    <span>{`Get ${offer?.discount}% off on a minimum purchase of $${offer?.constraints?.minAmount} from ${offer?.retailer?.name}. Max discount $${offer?.maxDiscount}`}</span>
                                  ) : (
                                    <span>{`Save $${offer?.discount} on a minimum purchase of $${offer?.constraints?.minAmount} from ${offer?.retailer?.name}.`}</span>
                                  )}
                                  <svg
                                    className="absolute left-0 w-full h-2 text-black top-full"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 255 255"
                                    xmlSpace="preserve"
                                  >
                                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                                  </svg>
                                </div>
                              </section>

                              <span className="inline-block ml-2">{offer?.retailer?.name}</span>
                              {retailersInCart?.indexOf(offer?.retailer?._id) > -1 ? (
                                <CheckCircleIcon
                                  className="relative inline-block w-5 h-5 ml-2 text-green-500 group"
                                  aria-hidden="true"
                                />
                              ) : null}
                            </section>
                            <section>
                              <div
                                className={`border border-dashed ${
                                  retailersInCart?.indexOf(offer?.retailer?._id) > -1
                                    ? 'border-gray-900'
                                    : 'border-gray-400'
                                } inline-block items-center justify-center p-1 flex`}
                              >
                                <TagIcon className="w-4 h-4" />{' '}
                                <span className="inline-block ml-2">
                                  SAVE {offer?.discount} {offer?.discountType === 'percent' ? '%' : ''}
                                </span>
                              </div>
                            </section>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              );
            }
          })}
        </>
      )}
    </>
  );
};

export default React.memo(Coupons);
