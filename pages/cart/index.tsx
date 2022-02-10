import CartItemDimmer from '@components/Cart/CartItemDimmer';
import CartSummaryDimmer from '@components/Cart/CartSummaryDimmer';
import CartSummary from '@components/Cart/Summary';
import EmptyState from '@components/Shared/EmptyState';
import Layout from '@components/Shared/Layout';
import LoadingState from '@components/Shared/LoadingState';
import { QuestionMarkCircleIcon, TruckIcon, XIcon } from '@heroicons/react/solid';
import useCoupons from '@hooks/useCoupons';
import { useStore } from '@lib/store';
import { blurredBgProduct } from '@public/images/bg-base-64';
import { cloudinary } from '@utils/config';
import fetcher from '@utils/fetcher';
import { priceToLocaleString } from '@utils/helpers';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
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
  const { modifyCart, updateCart, setLoading } = useStore(
    (store) => ({
      modifyCart: store.modifyCart,
      updateCart: store.updateCart,
      setLoading: store.setLoading,
    }),
    shallow
  );
  const removeItem = async () => {
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
        updateCart(data);
        toast.success('Removed item successfully!');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error in removing item');
    } finally {
      setLoading(false);
    }
  };
  const updateCartItemQty = async (quantity) => {
    try {
      setLoading(true);
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
        updateCart(data);
        toast.success('Updated quantity successfully!');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error in updating quantity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <li key={product._id} className="grid grid-cols-12 py-6 sm:py-10">
      <div className="col-span-3 mb-2 aspect-w-1 aspect-h-1">
        <Image
          // src={product?.imageUrl}
          src={`${cloudinary.baseDeliveryURL}/w_400,ar_1,c_pad/${product?.cdn}`}
          alt={product?.name}
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={blurredBgProduct}
        />
      </div>

      <div className="ml-4 col-span-9 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm capitalize">
                <a
                  href={`/product-view/${product._id}`}
                  className="capitalize font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.name}
                </a>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              {product.dimension ? (
                <p className="my-4 border-l border-gray-200 text-gray-500 flex text-xs">
                  <span className="inline-block  text-sm text-gray-700 text-xs">{`${(
                    product?.dimension?.width * 12
                  ).toFixed(2)}"W X ${(product?.dimension?.depth * 12).toFixed(2)}"D X ${(
                    product?.dimension?.height * 12
                  ).toFixed(2)}"H`}</span>
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {priceToLocaleString(product.displayPrice || product.price)}
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
                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                onClick={removeItem}
              >
                <span className="sr-only">Remove</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
          <TruckIcon className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />{' '}
          <span>Shipping Method: {retailer?.shippingMethod}</span>
        </p>
      </div>
    </li>
  );
};

export default function Cart() {
  const { cart, updateCart, loading } = useStore(
    (store) => ({
      cart: store.cart,
      updateCart: store.updateCart,
      loading: store.loading,
    }),
    shallow
  );
  const { coupons: { coupons = [] } = [] } = useCoupons('retailer');

  return (
    <>
      <Head>
        <title>Cart | Spacejoy</title>
      </Head>
      <Layout>
        {/* <Layout.Banner />  */}
        <Layout.Header />
        <Layout.Body>
          <div className="bg-white">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Your Shopping Cart</h1>
              {Object.keys(cart?.cartItems)?.length === 0 && (
                <>{loading ? null : <EmptyState title="No items found" message={''} />}</>
              )}
              <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                  <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                  </h2>

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
                          <p className="font-bold capitalize">{cart?.cartItems[cItem]?.name}</p>
                          <p className="text-sm">
                            <span className="font-bold">Estimated Shipping:</span> $
                            {cart?.cartItems[cItem]?.shippingCharge}
                          </p>
                        </div>
                        {offerItem?.length ? (
                          <section className="group cursor-pointer relative text-center flex items-center text-sm">
                            <span>
                              Save {offerItem[0]?.discount} {offerItem[0]?.discountType === 'percent' ? '%' : '$'}
                            </span>
                            <QuestionMarkCircleIcon
                              className="group w-4 h-4 cursor-pointer relative inline-block ml-1"
                              aria-hidden="true"
                            />
                            <div className="opacity-0  bg-black text-white text-center text-xs rounded-lg p-2 absolute z-10 group-hover:opacity-100 bottom-full  pointer-events-none w-28">
                              {offerItem[0]?.discountType === 'percent' ? (
                                <span>{`Get ${offerItem[0]?.discount}% off on a minimum purchase of $${offerItem[0]?.constraints?.minAmount} from ${offerItem[0]?.retailer?.name}. Max discount $${offerItem[0]?.maxDiscount}`}</span>
                              ) : (
                                <span>{`Save $${offerItem[0]?.discount} on a minimum purchase of $${offerItem[0]?.constraints?.minAmount} from ${offerItem[0]?.retailer?.name}.`}</span>
                              )}
                              <svg
                                className="absolute text-black h-2 w-full left-0 top-full"
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
                    className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 sticky top-20"
                  >
                    <CartSummary />
                  </section>
                )}
              </form>
            </div>
          </div>
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
