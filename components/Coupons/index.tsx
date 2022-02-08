import CartItemDimmer from '@components/Cart/CartItemDimmer';
import { CheckCircleIcon, QuestionMarkCircleIcon, TagIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/store';
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
                className="h-12 w-full pl-4 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                placeholder="Enter Coupon code"
                value={currentCoupon}
                onChange={(e) => {
                  setCurrentCoupon(e?.target?.value);
                }}
              />
              <div className="absolute top-2 right-2">
                <button
                  className="h-8 w-20 text-white text-xs rounded-lg bg-gray-900 text-center flex justify-center items-center"
                  onClick={() => applyCoupon(currentCoupon)}
                >
                  {applyingCoupon ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    <h3 className="space-y-2 mt-4">Spacejoy Offers</h3>
                    {offers?.map((couponItem) => {
                      return (
                        <div
                          key={couponItem?._id}
                          className="mt-4 border-gray-300 relative bg-white border rounded-lg shadow-sm p-4  cursor-pointer focus:outline-none"
                        >
                          <div className="inline-block">
                            <div className="border border-dashed border-gray-900 inline-block items-center justify-center p-1 flex">
                              <TagIcon className="h-4 w-4" />{' '}
                              <span className="inline-block ml-2">{couponItem?.code?.toUpperCase()}</span>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-gray-900 mt-2">{couponItem?.title}</p>
                          <p className="text-sm  text-gray-900 mt-1">{couponItem?.description}</p>
                          <button
                            className="h-8 w-20 text-gray-900 text-xs rounded-xs bg-white border border-gray-900 mt-4 "
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
                    <h3 className="space-y-2 mt-4">Spacejoy Brand Offers (Auto-appplied on your cart)</h3>
                    <p className="text-gray-500 text-sm">Brought to you exclusively by Spacejoy</p>
                    <ul className="mt-4 bg-gray-200 p-2 rounded-sm">
                      {offers?.map((offer, index) => {
                        return (
                          <li
                            key={offer?._id}
                            className={`flex items-center justify-between mt-2 text-sm ${index !== 0 ? 'mt-2' : ''} ${
                              retailersInCart?.indexOf(offer?.retailer?._id) > -1 ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            <section className="flex items-center">
                              <section className="group cursor-pointer relative  text-center">
                                <QuestionMarkCircleIcon
                                  className="group w-5 h-5 cursor-pointer relative inline-block"
                                  aria-hidden="true"
                                />
                                <div className="opacity-0  bg-black text-white text-center text-xs rounded-lg p-2 absolute z-10 group-hover:opacity-100 bottom-full  pointer-events-none w-28">
                                  {offer?.discountType === 'percent' ? (
                                    <span>{`Get ${offer?.discount}% off on a minimum purchase of $${offer?.constraints?.minAmount} from ${offer?.retailer?.name}. Max discount $${offer?.maxDiscount}`}</span>
                                  ) : (
                                    <span>{`Save $${offer?.discount} on a minimum purchase of $${offer?.constraints?.minAmount} from ${offer?.retailer?.name}.`}</span>
                                  )}
                                  <svg
                                    className="absolute text-black h-2 w-full left-0 top-full"
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
                                  className="group w-5 h-5  relative inline-block ml-2 text-green-500"
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
                                <TagIcon className="h-4 w-4" />{' '}
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
