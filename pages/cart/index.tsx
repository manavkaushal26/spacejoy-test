import CartItemDimmer from '@components/Cart/CartItemDimmer';
import CartSummaryDimmer from '@components/Cart/CartSummaryDimmer';
import EmptyCart from '@components/Cart/EmptyCart';
import CartSummary from '@components/Cart/Summary';
import Layout from '@components/Shared/Layout';
import LoginManager from '@components/Shared/LoginManager';
import StickyFooter from '@components/Shared/StickyFooter';
import { QuestionMarkCircleIcon, TruckIcon, XIcon } from '@heroicons/react/solid';
import useCoupons from '@hooks/useCoupons';
import { useStore } from '@lib/store';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary, company, imageKit } from '@utils/config';
import fetcher from '@utils/fetcher';
import { priceToLocaleString } from '@utils/helpers';
import { IndexPageMeta } from '@utils/meta';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import shallow from 'zustand/shallow';
interface CartItemInterface {
  key: number;
  retailer: {
    shippingMethod: string;
    _id: string;
  };

  // product: {
  //   _id: string;
  //   name: string;
  //   quantity: number;
  //   displayPrice?: string;
  //   price: number;
  //   cdn: string;
  //   dimension: {
  //     height: number;
  //     width: number;
  //     depth: number;
  //   };
  // };
  product: any;
}
const CartItem: React.FC<CartItemInterface> = ({ product, key, retailer }) => {
  const { modifyCart, updateCart, setLoading, removeProductFromCart } = useStore(
    (store) => ({
      modifyCart: store.modifyCart,
      updateCart: store.updateCart,
      setLoading: store.setLoading,
      removeProductFromCart: store.removeProductFromCart,
    }),
    shallow
  );

  const removeItem = async () => {
    const isUserAuthenticated = Cookies.get('token') ? true : false;
    if (!isUserAuthenticated) {
      removeProductFromCart(product?._id, retailer?._id);
      toast.success('Success! Item removed from cart');
    } else
      try {
        setLoading(true);
        const { statusCode, data } = await fetcher({
          endPoint: '/v1/cart',
          method: 'POST',
          body: {
            items: [
              {
                productId: product?._id,
                quantity: 0,
                designId: '',
                projectId: '',
              },
            ],
          },
        });
        if (statusCode < 301) {
          PushEvent({
            category: `Cart`,
            action: `Success! Product ${product?._id} removed from Cart!`,
            label: `Cart Update`,
          });
          updateCart(data);
          toast.success('Success! Item removed from cart');
        } else {
          throw new Error();
        }
      } catch {
        PushEvent({
          category: `Cart`,
          action: `Failed!! Product ${product?._id} not removed from Cart!`,
          label: `Cart Update`,
        });
        toast.error('Item could not be removed. Try again');
      } finally {
        setLoading(false);
      }
  };
  const updateCartItemQty = async (quantity) => {
    const isUserAuthenticated = Cookies.get('token') ? true : false;
    try {
      setLoading(true);

      if (!isUserAuthenticated) {
        modifyCart({ ...product, retailer: { ...retailer } }, quantity, '');
        toast.success('Cart updated successfully');
      } else {
        const { statusCode, data } = await fetcher({
          endPoint: '/v1/cart',
          method: 'POST',
          body: {
            items: [
              {
                productId: product?._id,
                quantity,
                designId: '',
                projectId: '',
              },
            ],
          },
        });
        if (statusCode < 301) {
          PushEvent({
            category: 'Cart',
            action: `Success! Cart Quantity of ${product?._id} Updated to ${quantity}`,
            label: `Cart Update`,
          });
          updateCart(data);
          toast.success('Cart updated successfully');
        } else {
          throw new Error();
        }
      }
    } catch (e) {
      PushEvent({
        category: 'Cart',
        action: `Failed!! Cart Quantity of ${product?._id} not Updated to ${quantity}`,
        label: `Cart Update`,
      });
      toast.error('Cart could not be updated. Please try again');
    } finally {
      setLoading(false);
    }
  };
  const isMobile = Cookies.get('isMobile') === 'true' ? true : false;
  const linkProps = {
    ...(!isMobile && { target: '_blank', rel: 'noreferrer' }),
  };

  return (
    <li key={product._id} className="grid grid-cols-12 py-6 group sm:py-10">
      <div className="col-span-3 mb-2 aspect-w-1 aspect-h-1">
        <Link key={product._id} href={`/product-view/${product._id}`} passHref>
          <a href={`/product-view/${product._id}`} {...linkProps}>
            {/* /w_400,ar_1,c_pad */}
            <Image
              // src={product?.imageUrl}
              src={`${imageKit.baseDeliveryUrl}/${product?.cdn}`}
              alt={product?.name}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
              blurDataURL={blurredBgProduct}
            />
          </a>
        </Link>
      </div>

      <div className="flex flex-col justify-between flex-1 col-span-9 ml-4 sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm capitalize group-hover:underline">
                <a
                  href={`/product-view/${product._id}`}
                  className="font-medium text-gray-700 capitalize hover:text-gray-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  {product.name}
                </a>
              </h3>
            </div>
            <div className="flex mt-1 text-sm">
              {product.dimension ? (
                <p className="flex my-4 text-xs text-gray-500 border-l border-gray-200">
                  <span className="inline-block text-xs text-sm text-gray-700">{`${(
                    product?.dimension?.width * 12
                  ).toFixed(2)}"W X ${(product?.dimension?.depth * 12).toFixed(2)}"D X ${(
                    product?.dimension?.height * 12
                  ).toFixed(2)}"H`}</span>
                </p>
              ) : null}
            </div>
            <p className="flex justify-between mt-1 text-sm font-medium text-gray-900 ">
              <span>{priceToLocaleString(product.displayPrice || product.price)}</span>
              {/* <span>
                <strong>Total:</strong> {priceToLocaleString((product?.price || 0) * (product?.quantity || 1))}
              </span> */}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label htmlFor={`quantity-${key}`} className="sr-only">
              Quantity, {product.name}
            </label>
            <select
              id={`quantity-${key}`}
              name={`quantity-${key}`}
              className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-indigo-500 sm:text-sm"
              value={product.quantity}
              onChange={(e) => updateCartItemQty(e?.target?.value)}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {[...new Array(20)].map((item, index) => {
                return (
                  <option value={index + 1} key={`option-${index}`}>
                    {index + 1}
                  </option>
                );
              })}
            </select>

            <div className="absolute top-0 right-0">
              <button
                type="button"
                className="inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeItem();
                }}
              >
                <span className="sr-only">Remove</span>
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {typeof retailer?.shippingMethod !== 'undefined' ? (
          <p className="flex mt-4 space-x-2 text-sm text-gray-700">
            <TruckIcon className="flex-shrink-0 w-5 h-5 text-gray-500" aria-hidden="true" />{' '}
            <span>Shipping Method: {retailer?.shippingMethod}</span>
          </p>
        ) : null}
      </div>
    </li>
  );
};

export default function Cart() {
  const [guestTotal, setGuestTotal] = useState(0);
  const { data } = useFirebaseContext();
  const isUserAuthenticated = Cookies.get('token') ? true : false;
  const router = useRouter();
  const [checkoutRefSource, setCheckoutRefSource] = useState<any>('');
  const { cart, updateCart, loading } = useStore(
    (store) => ({
      cart: store.cart,
      updateCart: store.updateCart,
      loading: store.loading,
    }),
    shallow
  );
  const calculateGuestTotal = () => {
    let sum = 0;
    Object.entries(cart?.cartItems).forEach((retailer) => {
      Object.entries(retailer[1]['products']).forEach((product) => {
        sum += product[1]['price'] * product[1]['quantity'];
      });
    });

    return sum;
  };
  useEffect(() => {
    !isUserAuthenticated && setGuestTotal(calculateGuestTotal);
  }, [cart, updateCart]);

  const [showCartFooter, setCartFooter] = useState(false);

  const elementRef = React.useCallback((node) => {
    if (node !== null) {
      if (typeof window !== 'undefined' && node) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries?.forEach((entry) => {
              if (entry?.target?.classList?.contains('addToCart')) {
                setCartFooter(entry?.isIntersecting);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '15px',
          }
        );
        observer?.observe(node);
      }
    }
  }, []);

  useEffect(() => {
    const isMobile = Cookies.get('isMobile') === 'true' ? true : false;
  }, []);
  useEffect(() => {
    const {
      query: { ref = '' },
    } = router;
    if (ref) {
      setCheckoutRefSource(ref);
    }
  }, [router]);

  const { coupons: { coupons = [] } = [] } = useCoupons('retailer');

  return (
    <>
      <Head>
        {IndexPageMeta}
        <title key="title">Cart | {company.product}</title>
        <link rel="canonical" href="https://www.spacejoy.com/cart" />
      </Head>
      <Layout>
        <Layout.Banner />
        <Layout.Header />
        <Layout.Body>
          <div className="bg-white">
            <div className="max-w-2xl px-4 pt-8 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
              {!loading && cart?.count !== 0 && (
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Your Shopping Cart</h1>
              )}
              {Object.keys(cart?.cartItems)?.length === 0 && <>{loading ? null : <EmptyCart />}</>}
              <form className="grid mt-4 lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                  <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                  </h2>
                  {Object.keys(cart?.cartItems)?.length !== 0 && (
                    <div className="hidden lg:block">
                      {data?.cartBannerV2?.visible &&
                        (data?.cartBannerV2?.link !== undefined && data?.cartBannerV2?.link !== '' ? (
                          <Link href={data?.cartBannerV2?.link}>
                            <a>
                              <div className="relative aspect-w-7 aspect-h-2">
                                <Image
                                  src={`${imageKit.baseDeliveryUrl}/w_600/${data?.cartBannerV2?.cdn}`}
                                  alt="cartBanner"
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </div>
                            </a>
                          </Link>
                        ) : (
                          <div className="relative aspect-w-7 aspect-h-2">
                            <Image
                              src={`${imageKit.baseDeliveryUrl}/w_600/${data?.cartBannerV2?.cdn}`}
                              alt="cartBanner"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        ))}
                    </div>
                  )}
                  {loading && (
                    <>
                      {[...new Array(18)].map((_d, _i) => {
                        return <CartItemDimmer key={_i} />;
                      })}
                    </>
                  )}
                  {Object.keys(cart?.cartItems)?.map((cItem) => {
                    const offerItem = (coupons || [])?.filter(
                      (item) => item?.retailer?._id === cart?.cartItems[cItem]?._id
                    );

                    return (
                      <div key={cItem} className="mt-8">
                        <div className="flex justify-between">
                          {/* <p className="font-bold capitalize">{cart?.cartItems[cItem]?.name}</p> */}
                          {typeof cart?.cartItems[cItem]?.shippingCharge !== 'undefined' ? (
                            <p className="text-sm">
                              <span className="font-bold">Estimated Shipping:</span> $
                              {cart?.cartItems[cItem]?.shippingCharge}
                            </p>
                          ) : null}
                        </div>
                        {offerItem?.length ? (
                          <section className="relative flex items-center text-sm text-center cursor-pointer group">
                            <span>
                              Save {offerItem[0]?.discount} {offerItem[0]?.discountType === 'percent' ? '%' : '$'}
                            </span>
                            <QuestionMarkCircleIcon
                              className="relative inline-block w-4 h-4 ml-1 cursor-pointer group"
                              aria-hidden="true"
                            />
                            <div className="absolute z-10 p-2 text-xs text-center text-white bg-black rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 bottom-full w-28">
                              {offerItem[0]?.discountType === 'percent' ? (
                                <span>{`Get ${offerItem[0]?.discount}% off on a minimum purchase of $${offerItem[0]?.constraints?.minAmount} from ${offerItem[0]?.retailer?.name}. Max discount $${offerItem[0]?.maxDiscount}`}</span>
                              ) : (
                                <span>{`Save $${offerItem[0]?.discount} on a minimum purchase of $${offerItem[0]?.constraints?.minAmount} from ${offerItem[0]?.retailer?.name}.`}</span>
                              )}
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
                          </section>
                        ) : null}
                        <ul role="list" className="border-b border-gray-200 divide-y divide-gray-200">
                          {Object.values(cart?.cartItems[cItem]?.products)?.map((product, productIdx) => {
                            return (
                              <CartItem
                                product={product}
                                key={productIdx}
                                retailer={{ _id: cItem, shippingMethod: cart?.cartItems[cItem]?.shippingMethod }}
                              />
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </section>

                {loading && <CartSummaryDimmer />}
                {!loading && cart?.count !== 0 && (
                  <section
                    aria-labelledby="summary-heading"
                    className="flex flex-col order-first space-y-4 lg:sticky lg:col-span-5 top-20 lg:order-last"
                  >
                    <div className="block lg:hidden">
                      {data?.cartBannerV2?.visible &&
                        (data?.cartBannerV2?.link !== undefined && data?.cartBannerV2?.link !== '' ? (
                          <Link href={data?.cartBannerV2?.link}>
                            <a>
                              <div className="relative aspect-w-7 aspect-h-2">
                                <Image
                                  src={`${imageKit.baseDeliveryUrl}/w_600/${data?.cartBannerV2?.cdn}`}
                                  alt="cartBanner"
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </div>
                            </a>
                          </Link>
                        ) : (
                          <div className="relative aspect-w-7 aspect-h-2">
                            <Image
                              src={`${imageKit.baseDeliveryUrl}/w_600/${data?.cartBannerV2?.cdn}`}
                              alt="cartBanner"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        ))}
                    </div>
                    {isUserAuthenticated ? (
                      <div className="px-4 py-6 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 addToCart" ref={elementRef}>
                        <CartSummary source={checkoutRefSource} />
                      </div>
                    ) : (
                      <>
                        <div className="px-4 py-6 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 addToCart">
                          <h2 className="pb-6 text-lg font-bold text-center text-gray-900">Order summary</h2>
                          <p className="flex justify-between">
                            <span className="font-medium ">Shopping Total:</span>
                            <span>&nbsp;&nbsp;&nbsp;${guestTotal}</span>
                          </p>
                        </div>
                        <LoginManager
                          ctaText={<span>Checkout</span>}
                          styles="w-full md:w-auto p-0 md:px-12 py-3 text-center text-base font-medium text-white bg-gray-900 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none hidden lg:block"
                        />
                      </>
                    )}
                  </section>
                )}
              </form>
            </div>
          </div>

          {cart?.count ? (
            <StickyFooter show={!showCartFooter}>
              <div className="flex px-4 my-2 space-x-4 sm:flex-col-1 addToCart">
                {isUserAuthenticated ? (
                  <>
                    <p>
                      <span className="font-bold">Est. Total:</span>
                      <span>&nbsp;&nbsp;&nbsp;${cart?.invoiceData?.total}</span>
                    </p>
                    <Link href="/checkout/store" passHref>
                      <button
                        type="button"
                        className="w-full p-0 py-3 text-base font-medium text-white bg-gray-900 shadow-xs md:w-auto md:px-12 group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                      >
                        Checkout
                      </button>
                    </Link>
                  </>
                ) : (
                  // <div className="text-center">
                  <>
                    <LoginManager
                      ctaText={<span>Checkout</span>}
                      styles="w-full md:w-auto p-0 md:px-12 py-3 text-center text-base font-medium text-white bg-gray-900 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                    />
                  </>
                  // </div>
                )}
              </div>
            </StickyFooter>
          ) : null}
        </Layout.Body>
        <Layout.Footer />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      data: {},
    },
  };
}
