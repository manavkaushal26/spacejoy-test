import { XCircleIcon } from '@heroicons/react/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { useStore } from '@lib/store';
import fetcher from '@utils/fetcher';
import Link from 'next/link';
import React from 'react';
import shallow from 'zustand/shallow';

interface CartSummaryInterface {
  noBtn?: boolean;
}

const CartSummary: React.FC<CartSummaryInterface> = ({ noBtn }) => {
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
                        <XCircleIcon
                          className="w-4 h-4 ml-2 cursor-pointer"
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
    </section>
  );
};

export default React.memo(CartSummary);
