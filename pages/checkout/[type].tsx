import CartSummary from '@components/Cart/Summary';
import Layout from '@components/Shared/Layout';
import UserAddresses from '@components/User/Addresses';
import { useStore } from '@lib/store';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useState } from 'react';
import shallow from 'zustand/shallow';

const Payment = dynamic(() => import('@components/Payment'), { ssr: false });
const Affirm = dynamic(() => import('@components/Payment/AffirmPayment'), {
  ssr: false,
});

const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'affirm', title: 'Affirm' },
];

const Checkout = () => {
  const { cart: cartData } = useStore(
    (store) => ({
      cart: store.cart,
    }),
    shallow
  );
  const [currentPaymentMode, setCurrentPaymentMode] = useState(paymentMethods[0]?.id);
  const handlePaymentMode = (e) => {
    setCurrentPaymentMode(e?.target?.value);
  };

  return (
    <>
      <Head>
        <title>Secure Checkout | Spacejoy</title>
      </Head>
      <Layout>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          <div className="bg-gray-50">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Checkout</h2>

              <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                  <div>
                    <UserAddresses />
                  </div>

                  {/* Payment */}
                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                    <fieldset className="mt-4">
                      <legend className="sr-only">Payment type</legend>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                        {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                          <div key={paymentMethod.id} className="flex items-center">
                            {paymentMethodIdx === 0 ? (
                              <input
                                id={paymentMethod.id}
                                name="payment-type"
                                value={paymentMethod.id}
                                type="radio"
                                defaultChecked
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                onChange={handlePaymentMode}
                              />
                            ) : (
                              <input
                                id={paymentMethod.id}
                                name="payment-type"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                onChange={handlePaymentMode}
                                value={paymentMethod.id}
                              />
                            )}

                            <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                              {paymentMethod.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    <div className="mt-6 ">
                      {currentPaymentMode === 'credit-card' ? (
                        <Payment
                          checkoutFlow="store"
                          commentCouponCode={''}
                          hideCardCapture={cartData?.invoiceData?.total <= 0}
                        />
                      ) : (
                        <Affirm cb={() => {}} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="mt-10 lg:mt-0 sticky top-0">
                  <CartSummary />
                </div>
              </div>
            </div>
          </div>
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
};

export default React.memo(Checkout);
