import CartItemDimmer from '@components/Cart/CartItemDimmer';
import { TagIcon } from '@heroicons/react/outline';
import fetcher from '@utils/fetcher';
import React, { useState } from 'react';

const Coupons = ({ list, loading, onSuccess, onError }) => {
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
          {list?.map((couponItem) => {
            return (
              <>
                <div
                  key={couponItem?._id}
                  className="mt-4 border-gray-300 relative bg-white border rounded-lg shadow-sm p-4  cursor-pointer focus:outline-none"
                >
                  <div className="inline-block">
                    <div className="border border-dashed border-gray-900 inline-block items-center justify-center p-1">
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
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default React.memo(Coupons);
