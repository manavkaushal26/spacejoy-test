import CartSummary from '@components/Cart/Summary';
import Layout from '@components/Shared/Layout';
import UserAddresses from '@components/User/Addresses';
import { useStore } from '@lib/store';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Disclosure, Transition } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import CartSummaryDimmer from '@components/Cart/CartSummaryDimmer';

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
  const [couponCode, setCouponCode] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const handlePaymentMode = (e) => {
    setCurrentPaymentMode(e?.target?.value);
  };
  const handleCouponChange = ({ target }) => {
    setCouponCode(target.value);
  };
  const handleChange = ({ target }) => {
    setOrderNote(target.value);
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
            <div className="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Checkout</h2>

              <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                  <div className="pt-4 border-t border-gray-300">
                    <UserAddresses />
                  </div>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full pt-4 mt-10 text-left border-t border-gray-300 rounded-sm">
                          <div className="flex">
                            <h2 className="text-lg font-medium text-gray-900">
                              2. Have a promo/coupon code from your favorite brand?
                            </h2>
                          </div>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel>
                            <div>
                              <legend className="sr-only">Brand Promo/Coupon Code</legend>
                              <textarea
                                className="checkout-textarea w-full mt-4 min-h-[70px] text-sm"
                                placeholder="Enter brand name and coupon code. Your card will be charged once the offer is successfully redeemed"
                                value={couponCode}
                                onChange={handleCouponChange}
                              />
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full pt-4 mt-10 text-left border-t border-gray-300 rounded-sm">
                          <div className="flex">
                            <h2 className="text-lg font-medium text-gray-900">3. Instructions</h2>
                          </div>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel>
                            <div>
                              <legend className="sr-only">Instructions</legend>
                              <textarea
                                className="checkout-textarea w-full mt-4 min-h-[70px] text-sm"
                                placeholder="Enter brand name and coupon code. Your card will be charged once the offer is successfully redeemed"
                                value={orderNote}
                                onChange={handleChange}
                              />
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>

                  {/* Payment */}
                  <div className="pt-4 mt-10 border-t border-gray-300">
                    <h2 className="text-lg font-medium text-gray-900">4. Payment</h2>

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
                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                onChange={handlePaymentMode}
                              />
                            ) : (
                              <input
                                id={paymentMethod.id}
                                name="payment-type"
                                type="radio"
                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                onChange={handlePaymentMode}
                                value={paymentMethod.id}
                              />
                            )}

                            <label htmlFor={paymentMethod.id} className="block ml-3 text-sm font-medium text-gray-700">
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
                          commentCouponCode={couponCode}
                          data={orderNote}
                          hideCardCapture={cartData?.invoiceData?.total <= 0}
                        />
                      ) : (
                        <Affirm cb={() => {}} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="sticky mt-10 top-20 lg:mt-0">
                {Object.keys(cartData?.invoiceData)?.length === 0 ? <CartSummaryDimmer noBtn/> :  <CartSummary noBtn/>}
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
