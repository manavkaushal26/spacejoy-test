import { GiftIcon, XCircleIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/store';
import { priceToLocaleString } from '@utils/helpers';
import React from 'react';
import shallow from 'zustand/shallow';

interface GiftCardSummary {
  giftCardLoader: boolean;
  giftCards?: { code: string; discount: number; type: string; _id: string }[];
  removeCoupon: () => void;
}

const GiftCardSummary = ({ giftCardLoader, removeCoupon, giftCards }) => {
  const { cart } = useStore(
    (store) => ({
      cart: store.cart,
    }),
    shallow
  );

  return (
    <>
      <div className="relative p-4 rounded-lg bg-red-100/50">
        {giftCardLoader && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full rounded-lg bg-black/30">
            <svg
              className="w-4 h-4 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="black" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        <div className="flex items-center text-red-500">
          <GiftIcon className="w-5 h-5 mr-2" />
          Gift Card{giftCards?.length > 1 ? 's' : ''} Applied
        </div>

        {giftCards?.map((giftCard) => (
          <>
            <div className="flex items-center justify-between my-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                {giftCard?.code?.toUpperCase()}
                <button
                  className="w-4 h-4 ml-2 text-gray-600 transition duration-200 hover:text-red-500"
                  onClick={() => {
                    removeCoupon(giftCard?._id, 'Gift card');
                  }}
                >
                  <XCircleIcon className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
              <div>- {priceToLocaleString(giftCard?.discount)}</div>
            </div>
          </>
        ))}

        <div className="my-2 border-t border-gray-300" />

        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <span className="font-semibold">Total Gift Card Balance Used:</span>
          <span>- {priceToLocaleString(cart?.invoiceData?.discount?.giftCardDiscount)}</span>
        </div>
      </div>
    </>
  );
};

export default GiftCardSummary;
