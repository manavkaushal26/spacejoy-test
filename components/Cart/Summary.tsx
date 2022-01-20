import { XCircleIcon } from '@heroicons/react/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { useStore } from '@lib/store';
import fetcher from '@utils/fetcher';
import Link from 'next/link';
import React from 'react';
import shallow from 'zustand/shallow';

const CartSummary = () => {
  const { cart, updateCart } = useStore(
    (store) => ({
      cart: store.cart,
      updateCart: store.updateCart,
    }),
    shallow
  );
  const removeCoupon = async (couponId) => {
    const { statusCode, data } = await fetcher({ endPoint: `/v1/cartCoupons/${couponId}`, method: 'DELETE' });
    if (statusCode <= 301) {
      updateCart(data);
    }
  };

  return (
    <section>
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        {cart?.invoiceData?.productTotal ? (
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">Est. Product Total</dt>
            <dd className="text-sm font-medium text-gray-900">${cart?.invoiceData?.productTotal}</dd>
          </div>
        ) : null}

        {cart?.invoiceData?.shippingCharge ? (
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="flex items-center text-sm text-gray-600">
              <span>Shipping estimate</span>
              <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Learn more about how shipping is calculated</span>
                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </dt>
            <dd className="text-sm font-medium text-gray-900">${cart?.invoiceData?.shippingCharge}</dd>
          </div>
        ) : null}

        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="flex text-sm text-gray-600">
            <span>Tax estimate</span>
            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Learn more about how tax is calculated</span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </dt>
          <dd className="text-sm font-medium text-gray-900">
            {cart?.invoiceData?.tax ? cart.invoiceData?.tax : 'TBD'}
          </dd>
        </div>
        {cart?.invoiceData?.discount && cart?.invoiceData?.discount?.total > 0 ? (
          <div>
            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
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
                    <li className="pt-4 flex items-center justify-between text-xs" key={coupon?.code}>
                      <dt className="text-sm text-gray-600 flex items-center">
                        <span>{coupon?.code}</span>
                        <XCircleIcon
                          className="h-4 w-4 ml-2 cursor-pointer"
                          onClick={() => removeCoupon(coupon?._id)}
                        />
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">${cart?.invoiceData?.discount?.total}</dd>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        ) : null}
        {cart?.invoiceData?.total ? (
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="text-base font-medium text-gray-900">Order total</dt>
            <dd className="text-base font-medium text-gray-900">${cart?.invoiceData?.total}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-6">
        <Link href="/checkout/store" passHref>
          <button
            type="button"
            className="w-full bg-gray-900 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
          >
            Checkout
          </button>
        </Link>
      </div>
    </section>
  );
};

export default React.memo(CartSummary);
