import Coupons from '@components/Coupons';
import Drawer from '@components/Shared/Drawer';
import { XCircleIcon } from '@heroicons/react/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import useCoupons from '@hooks/useCoupons';
import { useStore } from '@lib/store';
import fetcher from '@utils/fetcher';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import shallow from 'zustand/shallow';
import GiftCardSummary from './GiftCardSummary';

interface CartSummaryInterface {
  giftCards?: { code: string; discount: number; type: string; _id: string }[];
  setShowGiftCardInput?: (boolean) => void;
  noBtn?: boolean;
}

const CartSummary: React.FC<CartSummaryInterface> = ({ giftCards, noBtn, setShowGiftCardInput }) => {
  const { cart, updateCart } = useStore(
    (store) => ({
      cart: store.cart,
      updateCart: store.updateCart,
    }),
    shallow
  );
  const [couponLoader, setCouponLoader] = useState(false);
  const [giftCardLoader, setGiftCardLoader] = useState(false);

  const removeCoupon = async (couponId, type) => {
    if (type === 'coupon') {
      setCouponLoader(true);
    } else {
      setGiftCardLoader(true);
    }
    try {
      const { statusCode, data } = await fetcher({ endPoint: `/v1/cartCoupons/${couponId}`, method: 'DELETE' });
      if (statusCode <= 301) {
        updateCart(data);
        toast.success(`Removed coupon successfully`);
      } else {
        toast.error(`Error while removing coupon`);
      }
    } catch {
    } finally {
      setCouponLoader(false);
      setGiftCardLoader(false);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const { loading, coupons } = useCoupons('product');

  const couponSuccess = (successData) => {
    setIsOpen(false);
    updateCart(successData);
    toast.success('Coupon Applied Successfully!');
  };
  const couponError = () => {
    setIsOpen(false);
    toast.error(`Error occurred while applying coupon.`);
  };

  const isCouponApplied = cart?.invoiceData?.discount?.coupons.length ? true : false;

  //todo remove log

  return (
    <section className="sticky top-24">
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      {!isCouponApplied ? (
        <button
          type="button"
          className="w-full px-4 py-3 text-base font-medium text-gray-900 bg-gray-50 border border-gray-900 rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 my-4 hover:text-white"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Apply Coupons
        </button>
      ) : null}

      <dl className="mt-6 space-y-4">
        {cart?.invoiceData?.productTotal ? (
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">Est. Product Total</dt>
            <dd className="text-sm font-medium text-gray-900">${cart?.invoiceData?.productTotal}</dd>
          </div>
        ) : null}

        {cart?.invoiceData?.shippingCharge ? (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <dt className="flex items-center text-sm text-gray-600">
              <span>Shipping estimate</span>
              <a href="#" className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Learn more about how shipping is calculated</span>
                <QuestionMarkCircleIcon className="w-5 h-5" aria-hidden="true" />
              </a>
            </dt>
            <dd className="text-sm font-medium text-gray-900">${cart?.invoiceData?.shippingCharge}</dd>
          </div>
        ) : null}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <dt className="flex text-sm text-gray-600">
            <span>Tax estimate</span>
            <a href="#" className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Learn more about how tax is calculated</span>
              <QuestionMarkCircleIcon className="w-5 h-5" aria-hidden="true" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">
            {cart?.invoiceData?.tax ? cart.invoiceData?.tax : 'TBD'}
          </dd>
        </div>
        {cart?.invoiceData?.discount && cart?.invoiceData?.discount?.total > 0 ? (
          <div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <dt className="text-sm text-gray-600">You save</dt>
              <dd className="text-sm font-medium text-gray-900">- ${cart?.invoiceData?.discount?.total}</dd>
            </div>
            {cart?.invoiceData?.discount &&
            cart?.invoiceData?.discount?.couponDiscount &&
            cart?.invoiceData?.discount?.couponDiscount > 0 &&
            cart?.invoiceData?.discount?.coupons?.length > 0 ? (
              <ul className="px-4">
                {cart?.invoiceData?.discount?.coupons?.map((coupon) => {
                  return (
                    <li className="flex items-center justify-between pt-4 text-xs" key={coupon?.code}>
                      <dt className="flex items-center text-sm text-gray-600">
                        <span>{coupon?.code}</span>
                        {couponLoader ? (
                          <svg
                            className="w-4 h-4 ml-2 text-white animate-spin"
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
                        ) : (
                          <XCircleIcon
                            className="w-4 h-4 ml-2 cursor-pointer"
                            onClick={() => {
                              removeCoupon(coupon?._id, 'coupon');
                            }}
                          />
                        )}
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${cart?.invoiceData?.discount?.couponDiscount}
                      </dd>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        ) : null}

        {cart?.invoiceData?.discount?.total !== 0 &&
          !!cart?.invoiceData?.discount?.type &&
          cart?.invoiceData?.discount?.giftCards?.length && (
            <GiftCardSummary giftCardLoader={giftCardLoader} removeCoupon={removeCoupon} giftCards={giftCards} />
          )}

        {cart?.invoiceData?.total ? (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <dt className="text-base font-medium text-gray-900">
              <strong>Order total</strong>
            </dt>
            <dd className="text-base font-medium text-gray-900">
              <strong>${cart?.invoiceData?.total}</strong>
            </dd>
          </div>
        ) : null}
      </dl>

      {noBtn ? null : (
        <div className="mt-6">
          <Link href="/checkout/store" passHref>
            <button
              type="button"
              className="w-full px-4 py-3 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
            >
              Checkout
            </button>
          </Link>
        </div>
      )}
      <>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Spacejoy Offers" description="">
          <Coupons list={coupons} loading={loading} onSuccess={couponSuccess} onError={couponError} />
        </Drawer>
      </>
    </section>
  );
};

export default React.memo(CartSummary);
