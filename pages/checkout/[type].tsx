import CartSummaryDimmer from '@components/Cart/CartSummaryDimmer';
import CartSummary from '@components/Cart/Summary';
import CustomGiftCard from '@components/Checkout/CustomGiftCard';
import Layout from '@components/Shared/Layout';
import Success from '@components/Shared/Success';
import UserAddresses from '@components/User/Addresses';
import { Disclosure, Transition } from '@headlessui/react';
import { MinusIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { useStore } from '@lib/store';
import fetcher from '@utils/fetcher';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
  const [currentPaymentMode, setCurrentPaymentMode] = useState(paymentMethods[0]?.id);
  const [couponCode, setCouponCode] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [giftCards, setGiftCards] = useState([]);
  const [showGiftCardInput, setShowGiftCardInput] = useState<boolean>(false);

  const { cart: cartData, updateCart } = useStore(
    (store) => ({
      cart: store.cart,
      updateCart: store.updateCart,
    }),
    shallow
  );
  const removeCoupon = async (couponId, type) => {
    const { statusCode, data } = await fetcher({ endPoint: `/v1/cartCoupons/${couponId}`, method: 'DELETE' });
    if (statusCode <= 301) {
      updateCart(data);
      setShowGiftCardInput(false);
      toast.success(`Removed ${type} successfully`);
    } else {
      toast.error(`Error while removing ${type}`);
    }
  };

  const handlePaymentMode = (e) => {
    setCurrentPaymentMode(e?.target?.value);
  };
  const handleCouponChange = ({ target }) => {
    setCouponCode(target.value);
  };
  const handleChange = ({ target }) => {
    setOrderNote(target.value);
  };
  const giftCardSuccess = (successData) => {
    updateCart(successData);
    toast.success('Gift card applied Successfully!');
  };
  const giftCardError = () => {
    toast.error(`Error occurred while applying gift card.`);
  };

  useEffect(() => {
    setGiftCards(cartData?.invoiceData?.discount?.giftCards);
  }, [cartData?.invoiceData?.discount?.giftCards]);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const postOrderActions = (orderPlacedValue) => {
    setOrderPlaced(orderPlacedValue);
    if (orderPlacedValue) {
      updateCart({
        cartItems: {},
        invoiceData: {},
      });
    }
  };

  return (
    <>
      <Head>
        <title>Secure Checkout | Spacejoy</title>
      </Head>
      <Layout>
        {/* <Layout.Banner />  */}
        <Layout.Header />
        <Layout.Body>
          <div className="bg-gray-50">
            {!orderPlaced && cartData?.count > 0 && (
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
                            <div className="flex flex-col">
                              <h2 className="text-lg font-medium text-gray-900">
                                2. Have a promo/coupon code from your favorite brand?
                              </h2>
                              <p className="text-xs text-gray-400">
                                We&apos;ll apply it at the time of placing your order (Subject to coupon code validity)
                              </p>
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
                                  className="checkout-textarea w-full mt-4 min-h-[70px] text-sm rounded-md"
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
                            <div className="flex flex-col">
                              <h2 className="text-lg font-medium text-gray-900">3. Instructions</h2>
                              <p className="text-xs text-gray-400">
                                If you have any comments or instructions for our order fulfillment team
                              </p>
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
                                  className="checkout-textarea w-full mt-4 min-h-[70px] text-sm rounded-md"
                                  placeholder="Special Delivery Instructions, Expedited Delivery, White Glove Services, COI or anything else - whatever you need our special attention on, just let us know."
                                  value={orderNote}
                                  onChange={handleChange}
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
                            <div className="flex flex-col">
                              <h2 className="text-lg font-medium text-gray-900">4. Spacejoy Gift Card</h2>
                              <p className="text-xs text-gray-400">Do you have a Spacejoy Gift Card?</p>
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
                              {showGiftCardInput ? (
                                <>
                                  {cartData?.invoiceData?.discount?.giftCards?.length !== 0 && (
                                    <div className="flex flex-row flex-wrap mt-2">
                                      {giftCards.map((item) => (
                                        <div
                                          className="py-[6px] px-4 mr-[0.8rem] mb-1 border-[1px] border-gray-400 rounded-full bg-gray-200 flex items-center"
                                          key={item._id}
                                        >
                                          <p className="text-sm">{item.code.toUpperCase()}</p>
                                          <button
                                            className="w-4 h-4 ml-2 text-gray-900 transition duration-200 hover:text-red-500"
                                            onClick={() => {
                                              removeCoupon(item?._id, 'gift card');
                                            }}
                                          >
                                            <XIcon />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  <CustomGiftCard
                                    setShowGiftCardInput={setShowGiftCardInput}
                                    onSuccess={giftCardSuccess}
                                    onError={giftCardError}
                                  />
                                  <button
                                    onClick={() => setShowGiftCardInput(!showGiftCardInput)}
                                    className="px-5 py-2 mt-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  {giftCards?.length === 0 ? (
                                    <button
                                      onClick={() => setShowGiftCardInput(!showGiftCardInput)}
                                      className="px-5 py-2 mt-4 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                                    >
                                      Add Gift Card
                                    </button>
                                  ) : (
                                    <>
                                      <div className="flex flex-row flex-wrap mt-2">
                                        {giftCards?.map((item) => (
                                          <div
                                            className="py-[6px] px-4 mr-[0.8rem] mb-[0.8rem] border-[1px] border-gray-400 rounded-full bg-gray-200 flex items-center"
                                            key={item._id}
                                          >
                                            <p className="text-sm">{item.code.toUpperCase()}</p>
                                            <button
                                              className="w-4 h-4 ml-2 text-gray-900 transition duration-200 hover:text-red-500"
                                              onClick={() => {
                                                removeCoupon(item?._id, 'gift card');
                                              }}
                                            >
                                              <XIcon />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                      <button
                                        onClick={() => setShowGiftCardInput(!showGiftCardInput)}
                                        className="px-5 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                                      >
                                        Add Another Gift Card?
                                      </button>
                                    </>
                                  )}
                                </>
                              )}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>

                    {/* Payment */}
                    <div className="pt-4 mt-10 border-t border-gray-300">
                      <h2 className="text-lg font-medium text-gray-900">5. Payment</h2>

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

                              <label
                                htmlFor={paymentMethod.id}
                                className="block ml-3 text-sm font-medium text-gray-700"
                              >
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
                            cb={postOrderActions}
                          />
                        ) : (
                          <Affirm cb={postOrderActions} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order summary */}
                  <div className="sticky mt-10 top-20 lg:mt-0">
                    {Object.keys(cartData?.invoiceData)?.length === 0 ? (
                      <CartSummaryDimmer noBtn />
                    ) : (
                      <CartSummary giftCards={giftCards} setShowGiftCardInput={setShowGiftCardInput} noBtn />
                    )}
                  </div>
                </div>
              </div>
            )}
            {orderPlaced && <Success title="Order Placed Successfully" message="" />}
          </div>
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
};

export default React.memo(Checkout);
