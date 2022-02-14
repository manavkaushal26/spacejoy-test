import ProductDesignSet from '@components/ProductView/ProductDesignSet';
import SimilarProducts from '@components/ProductView/SimilarProducts';
import DeliveryTimeline from '@components/Shared/DeliverTimeline';
import Layout from '@components/Shared/Layout';
import LottieAnimation from '@components/Shared/LottieAnimation';
import SVGLoader from '@components/Shared/SVGLoader';
import { Disclosure, Tab } from '@headlessui/react';
import { ChevronRightIcon, HomeIcon, MinusIcon, MinusSmIcon, PlusIcon, PlusSmIcon } from '@heroicons/react/outline';
import useBoolean from '@hooks/useBoolean';
import { useStore } from '@lib/store';
import { blurredBgProduct } from '@public/images/bg-base-64';
import offerLottie from '@public/lotties/offer.json';
import { cloudinary } from '@utils/config';
import fetcher from '@utils/fetcher';
import { fetchBrandOffers, getCouponsList } from '@utils/fetchOffers';
import { priceToLocaleString } from '@utils/helpers';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import styled, { keyframes } from 'styled-components';
import shallow from 'zustand/shallow';

const AffirmPrice = dynamic(() => import('@components/Shared/AffirmPrice'), { ssr: false });
const entry = keyframes`
	from { 
		opacity: 0;
	}
	to {
opacity: 1;
transform: translateY(0px);
	}
`;
const AnimateBox = styled.div`
  opacity: 0;
  animation: ${entry} 0.8s forwards;
  transform: translateY(20px);
  animation-delay: 0ms;
`;
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const renderFeatureSection = (description) => {
  const { type = '' } = description;
  switch (type) {
    case 'visualOverview':
      return (
        <ul role="list">
          {description?.value?.map((item) => {
            return (
              <li key={item?.image} className="flex items-center">
                <Image src={item?.image} height="40" width="40" alt={item?.title} />
                <span className="font-bold">{item?.title}</span>
              </li>
            );
          })}
        </ul>
      );
    case 'string':
      return (
        <ul role="list">
          <li>{description?.value}</li>
        </ul>
      );
    case 'array[string]':
      return (
        <ul role="list">
          {description?.title && description?.value?.length ? <h3>{description?.title}</h3> : null}
          {description?.value?.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      );
    default:
      return null;
  }
};

const ProductView = ({ product }): JSX.Element => {
  const { value, setValue, setTrue, setFalse, toggle } = useBoolean(false);
  const [couponList, setCouponList] = useState([]);
  const [retailerOffers, setRetailerOffers] = useState([]);

  const itemStatus = useMemo(() => {
    if (product?.status === 'discontinued') {
      return 'Discontinued';
    }
    if (!product?.inStock) {
      return 'Out of Stock';
    }

    return undefined;
  }, [product]);

  const discountPercent = useMemo(() => {
    const discount =
      ((parseFloat(product?.msrp || product?.price) - product?.price) * 100) / (product?.msrp || product?.price);
    if (discount === 0) {
      return '';
    } else if (discount < 1 && discount > 0) {
      return `${discount.toFixed(2)}% Off`;
    } else {
      return `${discount.toFixed(0)}% Off`;
    }
  }, [product?.price, product?.msrp]);

  const finalArrayOfOffers = useMemo(() => {
    return couponList.concat(retailerOffers);
  }, [couponList, retailerOffers]);

  const productImages = useMemo(() => {
    return [...(product?.productImages || []), ...(product?.renderImages || [])];
  }, [product]);

  const [localProductQuantity, setLocalProductQuantity] = useState(1);

  const incrementQty = () => {
    setLocalProductQuantity((localProductQuantity) => (localProductQuantity + 1 >= 20 ? 20 : localProductQuantity + 1));
  };
  const decrementQty = () => {
    setLocalProductQuantity(localProductQuantity ? (localProductQuantity - 1 === 0 ? 1 : localProductQuantity - 1) : 0);
  };

  const { updateCart, cart, modifyCart } = useStore(
    (store) => ({
      updateCart: store.updateCart,
      cart: store.cart,
      modifyCart: store.modifyCart,
    }),
    shallow
  );

  const [addingToCart, isAddingToCart] = useState(false);

  const addToCart = async () => {
    const isUserAuthenticated = Cookies.get('token') ? true : false;

    isAddingToCart(true);

    const {
      _id,
      retailer: { _id: brand },
    } = product;
    const { cartItems } = cart;
    const quantity =
      !cartItems[brand] || !cartItems[brand].products[product._id]
        ? localProductQuantity
        : cartItems[brand].products[product._id]?.quantity + localProductQuantity;

    if (!isUserAuthenticated) {
      modifyCart(product, quantity, 'update');
      setLocalProductQuantity(1);
      toast.success('Item added to bag!');
      isAddingToCart(false);
    } else {
      try {
        const { data: cartRes, statusCode } = await fetcher({
          endPoint: '/v1/cart',
          method: 'POST',
          body: {
            items: [
              {
                productId: product?._id,
                quantity,
                projectId: '',
                designId: '',
              },
            ],
          },
        });
        if (statusCode < 301) {
          updateCart(cartRes);
          toast.success('Item added to bag!');
          setLocalProductQuantity(1);
        } else {
          if (statusCode === 403) {
            throw new Error('unauthorized');
          } else {
            throw new Error('error');
          }
        }
      } catch (e) {
        if (e?.message === 'unauthorized') {
          toast.error('Please Sign In to add items to bag');
        } else {
          toast.error('An error occurred while adding to bag');
        }
      } finally {
        isAddingToCart(false);
      }
    }
  };

  useEffect(() => {
    getCouponsList(setCouponList);
    fetchBrandOffers(setRetailerOffers, product?.retailer?._id);
  }, []);

  return (
    <Layout>
      <Head>
        <title>{product?.name} | Spacejoy</title>
        <base href="/" />
      </Head>
      {/* <Layout.Banner />  */}
      <Layout.Header />
      <Layout.Body>
        <div className="bg-gray-100">
          <div className="container p-4 mx-auto">
            <nav className="flex mb-4" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-4">
                <li>
                  <div>
                    <Link href="/">
                      <a className="text-gray-400 hover:text-gray-500">
                        <HomeIcon className="w-4 h-4" />
                        <span className="sr-only">Home</span>
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                    <Link href="/shop">
                      <a className="ml-2 text-xs font-medium text-gray-500 hover:text-gray-700">Shop</a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                    <a
                      href="#"
                      className="ml-2 text-xs font-medium text-gray-500 hover:text-gray-700"
                      aria-current="page"
                    >
                      Listing
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start ">
              <div className="sticky top-0 ">
                <Tab.Group as="div" className="flex flex-row space-x-4">
                  <div className="hidden mt-6  mx-auto sm:block lg:max-w-none">
                    <Tab.List className="flex flex-col">
                      {productImages.map((image, idx) => (
                        <Tab
                          key={idx}
                          className="relative my-2 w-12 h-12 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                        >
                          {({ selected }) => (
                            <>
                              <span className="absolute inset-0 rounded-md overflow-hidden">
                                <Image
                                  src={`${cloudinary.baseDeliveryURL}/f_auto,q_auto,e_trim,w_400/${image?.cdn}`}
                                  alt="Angled front view with bag zipped and handles upright."
                                  className="object-contain object-center sm:rounded-lg"
                                  layout="fill"
                                  placeholder="blur"
                                  objectFit="contain"
                                  blurDataURL={blurredBgProduct}
                                />
                              </span>
                              <span
                                className={classNames(
                                  selected ? 'ring-black' : 'ring-transparent',
                                  'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels className="w-full aspect-w-1 aspect-h-1 grow">
                    {productImages.map((image, idx) => (
                      <Tab.Panel key={idx}>
                        <Image
                          src={`${cloudinary.baseDeliveryURL}/f_auto,q_auto,e_trim,w_1600/${image?.cdn}`}
                          alt="Angled front view with bag zipped and handles upright."
                          className="object-contain object-center sm:rounded-lg"
                          layout="fill"
                          placeholder="blur"
                          objectFit="contain"
                          blurDataURL={blurredBgProduct}
                        />
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </div>
              <div className=" absolute z-10 px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0" id="magnifyPortal" />
              <div className="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                <small className="text-sm tracking-tight text-gray-500">{product?.retailer?.name}</small>
                <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900">{product?.name}</h1>
                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl text-gray-900">
                    {priceToLocaleString(product?.displayPrice)}
                    {product?.msrp && parseFloat(product?.msrp) > 0 && parseFloat(product?.msrp) > product?.price && (
                      <><small className="inline-block ml-2 text-sm text-gray-500 line-through">
                        {priceToLocaleString(product?.msrp)}
                      </small><small className="inline-block ml-2 text-md text-gray-500 text-[#F5296E]">{discountPercent}</small></>
                    )}
                    
                  </p>
                </div>
                {/* <div className="mt-3">
                  <h3 className="sr-only">Reviews</h3>
                  {product?.metaDetails ? (
                    <div className="flex items-center">
                      <StarRatings
                        rating={product?.metaDetails?.rating}
                        starRatedColor="black"
                        numberOfStars={5}
                        name="productRating"
                        starDimension="20px"
                        starSpacing="5px"
                        isAggregateRating
                      />
                      <p className="sr-only">{product?.metaDetails?.rating} out of 5 stars</p>
                      <div className="flex ml-4">
                        <ReactScroll.Link
                          to="reviewsSection"
                          spy={true}
                          smooth={true}
                          className="text-sm hover:cursor-pointer hover:text-red-500"
                        >
                          See top reviews
                        </ReactScroll.Link>
                      </div>
                    </div>
                  ) : null}
                </div> */}
                <div className="mt-3">
                  <h3 className="sr-only">Description</h3>
                  <div className="text-sm">
                    <p className={`${!value && 'line-clamp-3'} text-gray-700`}>{product?.description}</p>
                    <button className="my-0.5 text-gray-500" onClick={toggle}>
                      {!value ? '... read more' : 'hide'}
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-sm font-bold">Dimensions: </span>
                  <span className="inline-block ml-2 text-sm text-gray-700">{`${(
                    product?.dimension?.width * 12
                  ).toFixed(2)}"W X ${(product?.dimension?.depth * 12).toFixed(2)}"D X ${(
                    product?.dimension?.height * 12
                  ).toFixed(2)}"H`}</span>
                </div>
                {product?.material && product?.material?.toLowerCase() !== 'n/a' ? (
                  <div className="mt-3">
                    <span className="text-sm font-bold">Material: </span>
                    <span className="inline-block ml-2 text-sm text-gray-700 capitalize">{product?.material}</span>
                  </div>
                ) : null}
                {product?.colors && product?.colors?.length && product?.colors[0].toLowerCase() !== 'n/a' ? (
                  <div className="mt-3">
                    <span className="text-sm font-bold text-gray-900">Color:</span>
                    <span className="inline-block ml-2 text-sm text-gray-700">
                      {product?.colors?.map((color, index) => {
                        return (
                          <span className="text-sm capitalize" key={color}>
                            {color}
                            {index === product?.colors?.length - 1 ? '' : ', '}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                ) : null}

                {!itemStatus && (
                  <div className="my-4">
                    <DeliveryTimeline productId={product?._id} />
                  </div>
                )}

                <form className="my-4">
                  {itemStatus ? (
                    <div className="flex my-8 space-x-4 sm:flex-col-1">
                      <button
                        type="button"
                        className="px-12 py-3 text-base font-medium text-white cursor-not-allowed bg-gray-500 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                        disabled={true}
                      >
                        <span>{itemStatus}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex my-8 space-x-4 sm:flex-col-1">
                      <button
                        type="button"
                        className="px-3 py-3 text-base font-medium text-gray-900 bg-white group hover:shadow-lg rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400 focus:outline-none"
                        onClick={decrementQty}
                      >
                        <MinusSmIcon className="w-6 h-6" />
                      </button>
                      <p className="px-2 py-3">{localProductQuantity}</p>
                      <button
                        type="button"
                        className="px-3 py-3 text-base font-medium text-gray-900 bg-white group hover:shadow-lg rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400 focus:outline-none"
                        onClick={incrementQty}
                      >
                        <PlusSmIcon className="w-6 h-6" />
                      </button>
                      <button
                        type="button"
                        className="px-12 py-3 text-base font-medium text-white bg-gray-900 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                        onClick={addToCart}
                        disabled={addingToCart ? true : false}
                      >
                        {addingToCart ? <SVGLoader /> : <span>Add to bag</span>}
                      </button>
                      {/* <button
                      type="button"
                      className="px-3 py-3 text-base font-medium text-gray-900 bg-white group hover:shadow-lg rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400 focus:outline-none"
                    >
                      <HeartIcon className="w-6 h-6" />
                      <span className="sr-only">Add to favorites</span>
                    </button> */}
                    </div>
                  )}
                </form>
                {product?.price && !itemStatus ? (
                  <div className="my-6 text-sm text-gray-700">
                    <AffirmPrice totalAmount={product?.price} flow="product" affirmType="as-low-as" />
                  </div>
                ) : null}

                {finalArrayOfOffers.length !== 0 && (
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <div className="flex">
                            <span className="mr-2 text-sm text-gray-900 font-bold">Available Offers</span>
                            <LottieAnimation animationData={offerLottie} height={20} width={20} />
                          </div>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <div className="mt-4 text-base prose text-gray-700">
                            <ul role="list">
                              {retailerOffers?.map((offer) => {
                                return (
                                  <li key={offer._id}>
                                    Get <strong>{offer.discount}% off</strong> on a minimum purchase of $
                                    {offer.constraints.minAmount} from {offer.retailer.name}. Max discount $
                                    {offer.maxDiscount}
                                  </li>
                                );
                              })}
                              {couponList.map((coupon) => {
                                return (
                                  <li key={coupon._id}>
                                    Use coupon code <strong>{coupon?.code?.toUpperCase()}</strong> to get{' '}
                                    {coupon?.title}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}
                {/* {product?.metaDetails?.description ? (
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <span className="text-sm text-gray-900">Product Description</span>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          {product?.metaDetails?.description?.map((item, index) => {
                            return (
                              <div key={`desc-${index}`} className="mt-4 text-sm prose text-gray-700">
                                {renderMetaSection(item)}
                              </div>
                            );
                          })}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  product?.meta &&
                  product?.meta?.descriptions?.length && (
                    <Disclosure defaultOpen>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                            <span className="text-sm text-gray-900">Product Description</span>
                            {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                          </Disclosure.Button>
                          <Disclosure.Panel>
                            {product?.meta?.descriptions?.map((item, index) => {
                              return (
                                <div key={`desc-${index}`} className="mt-4 text-sm prose text-gray-700">
                                  {renderFeatureSection(item)}
                                </div>
                              );
                            })}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )} */}

                {/* {product?.metaDetails?.specification ? (
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <span className="text-sm text-gray-900">Specifications</span>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          {product?.metaDetails?.specification?.map((item, index) => {
                            return (
                              <div key={`ship-${index}`} className="mt-4 text-sm prose text-gray-700">
                                {renderMetaSection(item)}
                              </div>
                            );
                          })}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : null} */}

                {/* {product?.metaDetails?.care ? (
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <span className="text-sm text-gray-900">Care</span>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          {product?.metaDetails?.care?.map((item, index) => {
                            return (
                              <div key={`ship-${index}`} className="mt-4 text-sm prose text-gray-700">
                                {renderMetaSection(item)}
                              </div>
                            );
                          })}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : null} */}

                {product?.retailer?.shippingPolicy && (
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <span className="text-sm text-gray-900 font-bold">Shipping Policy</span>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <div className="mt-4 text-sm text-gray-700">{product?.retailer?.shippingPolicy}</div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}

                {/* {product?.metaDetails?.shipping ? (
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <span className="text-sm text-gray-900">Shipping Policy</span>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          {product?.metaDetails?.shipping?.map((item, index) => {
                            return (
                              <div key={`ship-${index}`} className="mt-4 text-sm prose text-gray-700">
                                {renderMetaSection(item)}
                              </div>
                            );
                          })}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  product?.retailer?.shippingPolicy && (
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                            <span className="text-sm text-gray-900">Shipping Policy</span>
                            {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                          </Disclosure.Button>
                          <Disclosure.Panel>
                            <div className="mt-4 text-sm text-gray-700">{product?.retailer?.shippingPolicy}</div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )} */}

                {product?.retailer?.returnPolicy && (
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <span className="text-sm text-gray-900 font-bold">Return Policy</span>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <div className="mt-4 text-sm text-gray-700">{product?.retailer?.returnPolicy}</div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}

                {/* {product?.metaDetails?.returnPolicy ? (
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <span className="text-sm text-gray-900">Return Policy</span>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          {product?.metaDetails?.returnPolicy?.map((item, index) => {
                            return (
                              <div key={`return-${index}`} className="mt-4 text-sm prose text-gray-700">
                                {renderMetaSection(item)}
                              </div>
                            );
                          })}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  product?.retailer?.returnPolicy && (
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                            <span className="text-sm text-gray-900">Return Policy</span>
                            {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                          </Disclosure.Button>
                          <Disclosure.Panel>
                            <div className="mt-4 text-sm text-gray-700">{product?.retailer?.returnPolicy}</div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )} */}
              </div>
            </div>
          </div>
          <div className="container px-4 mx-auto">
            <SimilarProducts productId={product?._id} />
            <ProductDesignSet productIds={[product?._id]} />
            {/* {product?.metaDetails ? (
              <div id="reviewsSection">
                <Reviews rating={product?.metaDetails?.rating} reviews={product?.metaDetails?.reviews} />
              </div>
            ) : null} */}
          </div>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

const getAllProducts = async () => {
  return {
    products: [
      { slug: '6141bab5f39452001c11d319' },
      { slug: '61b4bc69e2f1a100374c62a9' },
      { slug: '61b4a65ab9c243001c2eb35f' },
      { slug: '61b37d7f8aa921001d8c7e3c' },
    ],
  };
};

export async function getStaticPaths() {
  // get all product paths
  const { products } = await getAllProducts();
  const paths = products.map((product) => ({
    params: { slug: product?.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params, res }) => {
  const { slug } = params;
  // const response = await fetcher({ endPoint: `/v1/assets/getAssetBySlug?slug=${slug}`, method: 'GET' });
  const response = await fetcher({ endPoint: `/v2/asset/${slug}`, method: 'GET' });

  const { data, statusCode } = response;

  const { retailer: { preferred = false } = {} } = data;
  if (!preferred) {
    const {
      meta: {
        category: { name: categoryName },
        subcategory: { name: subCategoryName },
      },
    } = data;

    return {
      redirect: {
        destination: `/shop?subcategory=${subCategoryName}&alternatives=true`,
        permanent: true,
      },
    };
  }

  return statusCode < 300 ? { props: { product: data }, revalidate: 10 } : { notFound: true };
};

export default ProductView;
