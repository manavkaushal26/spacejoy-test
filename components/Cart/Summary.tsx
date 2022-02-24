import Coupons from '@components/Coupons';
import Drawer from '@components/Shared/Drawer';
import Login from '@components/Shared/LoginManager';
import { XCircleIcon } from '@heroicons/react/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import useCoupons from '@hooks/useCoupons';
import { useStore } from '@lib/store';
import { PushEvent } from '@utils/analyticsLogger';
import fetcher from '@utils/fetcher';
import { priceToLocaleString } from '@utils/helpers';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import shallow from 'zustand/shallow';
import GiftCardSummary from './GiftCardSummary';

interface CartSummaryInterface {
  giftCards?: { code: string; discount: number; type: string; _id: string }[];
  setShowGiftCardInput?: (boolean) => void;
  noBtn?: boolean;
  page?: string;
  source?: string;
}

const AffirmPrice = dynamic(() => import('@components/Shared/AffirmPrice'), { ssr: false });

const CartSummary: React.FC<CartSummaryInterface> = ({ giftCards, noBtn, page, source }) => {
  const { cart, updateCart } = useStore(
    (store) => ({
      cart: store.cart,
      updateCart: store.updateCart,
    }),
    shallow
  );
  const [couponLoader, setCouponLoader] = useState(false);
  const [giftCardLoader, setGiftCardLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { loading, coupons } = useCoupons('');

  const removeCoupon = async (couponId, type) => {
    if (type === 'Coupon') {
      setCouponLoader(true);
    } else {
      setGiftCardLoader(true);
    }
    try {
      const { statusCode, data } = await fetcher({ endPoint: `/v1/cartCoupons/${couponId}`, method: 'DELETE' });
      if (statusCode <= 301) {
        updateCart(data);
        toast.success(
          <span>
            Success!
            <br />
            {`${type}`} discount removed from this order
          </span>
        );
      } else {
        toast.error(
          <span>
            Uh-oh!
            <br />
            {`${type}`} code not be removed. Please try again
          </span>
        );
      }
    } catch {
    } finally {
      setCouponLoader(false);
      setGiftCardLoader(false);
    }
  };

  const couponSuccess = (successData) => {
    setIsOpen(false);
    updateCart(successData);
    toast.success(
      <span>
        Yay!
        <br />
        Coupon Applied Successfully
      </span>
    );
  };
  const couponError = () => {
    setIsOpen(false);
    toast.error(
      <span>
        Oops.
        <br />
        Coupon could not be applied to this order
      </span>
    );
  };

  const isCouponApplied = cart?.invoiceData?.discount?.coupons.length ? true : false;
  const router = useRouter();
  const affirmFlow = router.pathname === '/cart' ? 'cart' : 'checkout';
  const isUserAuthenticated = Cookies.get('token') ? true : false;

  return (
    <section className="sticky top-24">
      {isUserAuthenticated ? (
        <>
          <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
            Order summary
          </h2>
          {!isCouponApplied ? (
            <button
              type="button"
              className="w-full px-4 py-3 my-4 text-base font-medium text-gray-900 border border-gray-900 rounded-md shadow-sm bg-gray-50 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 hover:text-white"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Apply Coupons
            </button>
          ) : null}

          {/* //todo loader here when cart updates */}

          <dl className="mt-6 space-y-4">
            {cart?.invoiceData?.productTotal ? (
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Est. Product Total</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {priceToLocaleString(cart?.invoiceData?.productTotal)}
                </dd>
              </div>
            ) : null}

            {cart?.invoiceData?.shippingCharge ? (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <div className="relative text-center cursor-pointer group">
                    <QuestionMarkCircleIcon
                      className="relative inline-block w-5 h-5 cursor-pointer group"
                      aria-hidden="true"
                    />
                    <div className="absolute z-10 p-2 text-xs text-center text-white bg-black rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 bottom-full">
                      Standard shipping charges applied.
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
                  </div>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {priceToLocaleString(cart?.invoiceData?.shippingCharge)}
                </dd>
              </div>
            ) : null}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                {/* <a href="#" className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Learn more about how tax is calculated</span>
              <QuestionMarkCircleIcon className="w-5 h-5" aria-hidden="true" />
            </a> */}
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {cart?.invoiceData?.tax ? priceToLocaleString(cart.invoiceData?.tax) : 'TBD'}
              </dd>
            </div>
            {cart?.invoiceData?.discount && cart?.invoiceData?.discount?.total > 0 ? (
              <div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center">
                    <dt className="text-sm text-gray-600">You save</dt>
                    <section className="relative text-center cursor-pointer group">
                      <QuestionMarkCircleIcon
                        className="relative inline-block w-4 h-4 text-gray-600 cursor-pointer group"
                        aria-hidden="true"
                      />
                      <div className="absolute z-10 p-2 text-xs text-center text-white bg-black rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 bottom-full w-28">
                        Max applicable <strong>coupon</strong> discount is $400
                        <svg
                          className="absolute left-0 w-full h-2 text-black top-full"
                          x="0px"
                          y="0px"
                          viewBox="0 0 255 255"
                          xmlSpace="preserve"
                        />
                      </div>
                    </section>
                  </div>

                  <dd className="text-sm font-medium text-gray-900">
                    - {priceToLocaleString(cart?.invoiceData?.discount?.total)}
                  </dd>
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
                                  removeCoupon(coupon?._id, 'Coupon');
                                }}
                              />
                            )}
                          </dt>
                          <dd className="text-sm font-medium text-gray-900">
                            -{priceToLocaleString(cart?.invoiceData?.discount?.couponDiscount)}
                          </dd>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
                {cart?.invoiceData?.discount?.offerDiscount && cart?.invoiceData?.discount?.offerDiscount > 0 ? (
                  <ul className="px-4">
                    <li className="flex items-center justify-between pt-4 text-xs">
                      <dt className="flex items-center text-sm text-gray-600">Brand offers</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        -{priceToLocaleString(cart?.invoiceData?.discount?.offerDiscount)}
                      </dd>
                    </li>
                  </ul>
                ) : null}
              </div>
            ) : null}

            {cart?.invoiceData?.discount?.total !== 0 &&
              !!cart?.invoiceData?.discount?.type &&
              cart?.invoiceData?.discount?.giftCards?.length &&
              page === 'checkout' && (
                <GiftCardSummary giftCardLoader={giftCardLoader} removeCoupon={removeCoupon} giftCards={giftCards} />
              )}

            {cart?.invoiceData?.total ? (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="text-base font-medium text-gray-900">
                  <strong>Order total</strong>
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  <strong>{priceToLocaleString(cart?.invoiceData?.total)}</strong>
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-4 text-xs">
            <AffirmPrice totalAmount={cart?.invoiceData?.total} affirmType="as-low-as" flow={affirmFlow} />
          </div>

          <p className="mt-8 text-xs text-gray-500">
            *Have a promo/coupon code from your favorite brand? Apply it during checkout
          </p>

          {noBtn ? null : (
            <div className="mt-6">
              <Link href={`/checkout/store${source ? `?ref=${source}` : ''}`} passHref>
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
              <Coupons loading={loading} onSuccess={couponSuccess} onError={couponError} coupons={coupons} />
            </Drawer>
          </>
        </>
      ) : (
        <div className="mt-6 text-center">
          <Login
            ctaText="Please sign up/sign in to checkout"
            styles="w-full px-4 py-3 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
          />
        </div>
      )}
    </section>
  );
};

export default React.memo(CartSummary);
