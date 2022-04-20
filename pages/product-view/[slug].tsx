import Carousel from '@components/Carousel';
import { renderMetaSection } from '@components/ProductView/MetaDetails/useMetaRenderSwitch';
import ProductDesignSet from '@components/ProductView/ProductDesignSet';
import Reviews from '@components/ProductView/Reviews';
import SimilarProducts from '@components/ProductView/SimilarProducts';
import DeliveryTimeline from '@components/Shared/DeliverTimeline';
import DiscountTag from '@components/Shared/DiscountTag';
import Layout from '@components/Shared/Layout';
import LottieAnimation from '@components/Shared/LottieAnimation';
import StickyFooter from '@components/Shared/StickyFooter';
import SVGLoader from '@components/Shared/SVGLoader';
import WishListBtn from '@components/Shared/WishListBtn';
import { Disclosure, Tab } from '@headlessui/react';
import {
  ChevronRightIcon,
  ExternalLinkIcon,
  EyeIcon,
  HomeIcon,
  MinusIcon,
  MinusSmIcon,
  PlusIcon,
  PlusSmIcon,
} from '@heroicons/react/outline';
import useBoolean from '@hooks/useBoolean';
import { useStore } from '@lib/store';
import { blurredBgProduct } from '@public/images/bg-base-64';
import offerLottie from '@public/lotties/offer.json';
import { useSession } from '@store/AuthProvider';
import { PushEvent } from '@utils/analyticsLogger';
import { cloudinary } from '@utils/config';
import fetcher from '@utils/fetcher';
import { fetchBrandOffers, getCouponsList } from '@utils/fetchOffers';
import { priceToLocaleString } from '@utils/helpers';
import SpjShoppingAdvantage from '@utils/Mocks/Shopping';
import spacejoyPromiseData from '@utils/Mocks/spacejoyPromises';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ReactScroll from 'react-scroll';
import StarRatings from 'react-star-ratings';
import styled, { keyframes } from 'styled-components';
import shallow from 'zustand/shallow';
const AffirmPrice = dynamic(() => import('@components/Shared/AffirmPrice'), { ssr: false });

const zoomProps = {
  width: 700,
  zoomLensStyle: 'opacity: 0.4;background-color: #4c4c81;',
  offset: { vertical: 0, horizontal: 10 },
};
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

const ProductView = ({ product, isMobile, currentlyViewing }): JSX.Element => {
  const { value, setValue, setTrue, setFalse, toggle } = useBoolean(false);
  const [couponList, setCouponList] = useState([]);
  const [retailerOffers, setRetailerOffers] = useState([]);
  const [showCartFooter, setCartFooter] = useState(false);
  const gaClickRef = useRef({});

  const addToCartBtnRef = React.useCallback((node) => {
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

  const { session } = useSession();
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
    if (discount === 0 || discount < 0) {
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
    return [...(product?.productImages || [])];
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
    PushEvent({
      category: 'PDP Page - Add to Bag',
      action: `Click on Add to Bag | ${product._id}}`,
      label: `Add to Bag`,
    });
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
      toast.success(
        <span>
          Yay!
          <br />
          Item added to bag successfully
        </span>
      );
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
          toast.success(
            <span>
              Yay!
              <br />
              Item added to bag successfully
            </span>
          );
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
          toast.error(
            <span>
              Hey there!
              <br />
              Sign in to add items to your bag
            </span>
          );
        } else {
          toast.error(
            <span>
              Oops.
              <br />
              Item could not be added to bag. Please try again
            </span>
          );
        }
      } finally {
        isAddingToCart(false);
      }
    }
  };

  const productFeaturesList = useMemo(() => {
    const metaArray = [];
    const descriptionObject = {
      id: 1,
      title: 'Product Description',
      content: (
        <>
          {product?.metDetails?.description ? (
            <>
              {product?.metaDetails?.description?.map((item, index) => {
                return (
                  <div key={`desc-${index}`} className="mt-4 text-sm prose text-gray-700">
                    {renderMetaSection(item)}
                  </div>
                );
              })}
            </>
          ) : (
            <div>{product?.description}</div>
          )}
        </>
      ),
    };
    metaArray.push(descriptionObject);
    if (product?.metaDetails?.care) {
      const careObject = {
        id: 2,
        title: 'Care',
        content: (
          <>
            {product?.metaDetails?.care?.map((item, index) => {
              return (
                <div key={`ship-${index}`} className="mt-4 text-sm prose text-gray-700">
                  {renderMetaSection(item)}
                </div>
              );
            })}
          </>
        ),
      };
      metaArray?.push(careObject);
    }
    if (product?.metaDetails?.specification) {
      const careObject = {
        id: 3,
        title: 'Product Specifications',
        content: (
          <>
            {product?.metaDetails?.specification?.map((item, index) => {
              return (
                <div key={`ship-${index}`} className="mt-4 text-sm prose text-gray-700">
                  {renderMetaSection(item)}
                </div>
              );
            })}
          </>
        ),
      };
      metaArray?.push(careObject);
    }

    return metaArray;
  }, [product]);

  useEffect(() => {
    getCouponsList(setCouponList);
    fetchBrandOffers(setRetailerOffers, product?.retailer?._id);
  }, []);

  const handleClick = (open, productId: string, sectionName: string) => {
    if (!open) {
      if (!gaClickRef?.current?.[sectionName]) {
        gaClickRef.current[sectionName] = true;
        PushEvent({
          category: `PDP Page - ${sectionName}`,
          action: `Expand the selection | ${productId}`,
          label: `${sectionName}`,
        });
      }
    }
  };

  const metaDescriptionColors =
    product?.colors && product?.colors?.length && product?.colors[0].toLowerCase() !== 'n/a'
      ? product?.colors?.join(',')
      : '';

  return (
    <Layout>
      <Head>
        <title>{product?.name}</title>
        <meta
          key="description"
          name="description"
          content={`Buy ${product?.name} from ${product?.retailer?.name} | Spacejoy`}
        />
        <meta
          key="keywords"
          name="keywords"
          content={`${product?.retailer?.name}, ${metaDescriptionColors} + ${product?.meta?.vertical?.name}, ${product?.retailer?.name} + ${product?.meta?.subcategory?.name} , ${product?.retailer?.name} + ${product?.meta?.vertical?.name}, ${product?.meta?.vertical?.name}, Buy ${product?.meta?.vertical?.name}`}
        />
        <base href="/" />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="bg-white">
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
              <div className="mt-3 lg:hidden">
                <div className="flex space-x-2">
                  <small className="text-sm tracking-tight text-gray-500">{product?.retailer?.name}</small>
                  {session?.user && session?.user?.role !== 'customer' && (
                    <a target="_blank" rel="noreferrer" href={product.retailLink}>
                      <ExternalLinkIcon className="w-4 h-4 text-gray-500 transition duration-200 hover:text-indigo-500" />
                    </a>
                  )}
                </div>

                <h1 className="mt-1 text-xl sm:text-3xl font-extrabold tracking-tight text-gray-900 ">
                  {product?.name}
                  {discountPercent && discountPercent?.length ? <DiscountTag /> : null}
                </h1>
                <h2 className="sr-only">Product information</h2>
                <p className="text-xl sm:text-3xl text-gray-900 my-4">
                  {priceToLocaleString(product?.displayPrice)}
                  {product?.msrp && parseFloat(product?.msrp) > 0 && parseFloat(product?.msrp) > product?.price && (
                    <>
                      <small className="inline-block ml-2 text-sm text-gray-500 line-through">
                        {priceToLocaleString(product?.msrp)}
                      </small>
                      <small className="inline-block ml-2 text-md text-gray-500 text-[#F5296E]">
                        {discountPercent}
                      </small>
                    </>
                  )}
                </p>
                {product?.metaDetails?.rating ? (
                  <div>
                    <StarRatings
                      rating={product?.metaDetails?.rating}
                      starRatedColor="black"
                      numberOfStars={5}
                      starDimension="16px"
                      starSpacing="3px"
                      name="rating"
                    />
                    <span className="ml-4">{product?.metaDetails?.rating.toFixed(2)}</span>
                  </div>
                ) : null}
                {product?.metaDetails?.reviews && product?.metaDetails?.reviews?.length ? (
                  <ReactScroll.Link
                    to="reviewsSection"
                    spy={true}
                    smooth={true}
                    className="my-4 text-sm underline underline-offset-2 hover:cursor-pointer hover:text-gray-500"
                  >
                    See reviews
                  </ReactScroll.Link>
                ) : null}

                <div className="mt-2 flex">
                  <EyeIcon className="h-6 w-6 text-red-500" />
                  <span className="text-sm ml-1">Currently viewing: </span>
                  <span className="text-sm ml-1">{currentlyViewing} </span>
                </div>
              </div>
              <div className="top-0 lg:sticky z-10 w-full relative mt-8">
                <Carousel imageCount={productImages?.length || 0} withLightBox withNav>
                  {productImages?.map((productImage) => {
                    return (
                      <div key={productImage}>
                        <Image
                          src={`${cloudinary.baseDeliveryURL}/f_auto,q_auto,w_1000/${productImage?.cdn}`}
                          alt=""
                          className="w-full object-contain object-center sm:rounded-lg w-full"
                          width="450"
                          height="450"
                          layout="responsive"
                          placeholder="blur"
                          objectFit="contain"
                          blurDataURL={blurredBgProduct}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <div className="absolute z-10 px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0" id="magnifyPortal" />
              <div className="mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                <div className="hidden lg:block">
                  <div className="flex space-x-2">
                    <small className="text-sm tracking-tight text-gray-500">{product?.retailer?.name}</small>
                    {session?.user && session?.user?.role !== 'customer' && (
                      <a target="_blank" rel="noreferrer" href={product.retailLink}>
                        <ExternalLinkIcon className="w-4 h-4 text-gray-500 transition duration-200 hover:text-indigo-500" />
                      </a>
                    )}
                  </div>
                  <h1 className="mt-1 sm:text-3xl text-xl font-extrabold tracking-tight text-gray-900">
                    {product?.name}
                    {discountPercent && discountPercent?.length ? <DiscountTag /> : null}
                  </h1>
                  <div className="mt-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="sm:text-3xl text-xl text-gray-900">
                      {priceToLocaleString(product?.displayPrice)}
                      {product?.msrp && parseFloat(product?.msrp) > 0 && parseFloat(product?.msrp) > product?.price && (
                        <>
                          <small className="inline-block ml-2 text-sm text-gray-500 line-through">
                            {priceToLocaleString(product?.msrp)}
                          </small>
                          <small className="inline-block ml-2 text-md text-gray-500 text-[#F5296E]">
                            {discountPercent}
                          </small>
                        </>
                      )}
                    </p>
                    {product?.metaDetails?.rating ? (
                      <div className="flex">
                        <StarRatings
                          rating={product?.metaDetails?.rating}
                          starRatedColor="black"
                          numberOfStars={5}
                          starDimension="16px"
                          starSpacing="3px"
                          name="rating"
                        />
                        <span className="ml-4">{product?.metaDetails?.rating.toFixed(2)}</span>
                        {product?.metaDetails?.reviews && product?.metaDetails?.reviews?.length ? (
                          <ReactScroll.Link
                            to="reviewsSection"
                            spy={true}
                            smooth={true}
                            className="ml-4 text-sm underline underline-offset-2 hover:cursor-pointer hover:text-gray-500"
                          >
                            See reviews
                          </ReactScroll.Link>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="mt-2 flex">
                      <EyeIcon className="h-6 w-6 text-red-500" />
                      <span className="text-sm ml-1">Currently viewing: </span>
                      <span className="text-sm ml-1">{currentlyViewing} </span>
                    </div>
                  </div>
                </div>
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
                        className="px-12 py-3 text-base font-medium text-white bg-gray-500 shadow-xs cursor-not-allowed group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                        disabled={true}
                      >
                        <span>{itemStatus}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex my-8 space-x-4 sm:flex-col-1 addToCart" ref={addToCartBtnRef}>
                      <button
                        type="button"
                        className="px-3 py-3 text-base font-medium text-gray-900 bg-white group hover:shadow-lg rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400 focus:outline-none border border-gray-500"
                        onClick={decrementQty}
                      >
                        <MinusSmIcon className="w-6 h-6" />
                      </button>
                      <p className="px-2 py-3">{localProductQuantity}</p>
                      <button
                        type="button"
                        className="px-3 py-3 text-base font-medium text-gray-900 bg-white group hover:shadow-lg rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400 focus:outline-none border border-gray-500"
                        onClick={incrementQty}
                      >
                        <PlusSmIcon className="w-6 h-6" />
                      </button>
                      <button
                        type="button"
                        className="w-full md:w-auto p-0 md:px-12 py-3 text-base font-medium text-white bg-gray-900 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                        onClick={addToCart}
                        disabled={addingToCart ? true : false}
                      >
                        {addingToCart ? <SVGLoader /> : <span>Add to bag</span>}
                      </button>
                      <WishListBtn type="Asset" documentId={product?._id} />
                    </div>
                  )}
                </form>
                {product?.price && !itemStatus ? (
                  <div className="my-2 lg:my-0 text-sm text-gray-700 text-center lg:text-left">
                    <AffirmPrice totalAmount={product?.price} flow="product" affirmType="as-low-as" />
                  </div>
                ) : null}
                <div className="bg-gray-100 -mx-4 p-4 lg:mx-0">
                  <h2>Product Information</h2>
                  <div className="mt-3">
                    <span className="text-sm font-bold">Name: </span>
                    <span className="text-sm">&nbsp;{product?.name}</span>
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
                </div>
                {/* <div className="mt-3">
                  <h3 className="sr-only">Description</h3>
                  <div className="text-sm">
                    <p className={`${!value && 'line-clamp-3'} text-gray-700`}>{product?.description}</p>
                    <button className="my-0.5 text-gray-500" onClick={toggle}>
                      {!value ? '... read more' : 'hide'}
                    </button>
                  </div>
                </div> */}

                <Disclosure defaultOpen>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                        <span className="text-sm font-bold text-gray-900">{spacejoyPromiseData[0]?.title}</span>
                        {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-4">
                        <Image
                          src={spacejoyPromiseData[0]?.img}
                          height="80"
                          width="80"
                          alt="Spacejoy Price Match Guarantee"
                          className="mt-4"
                        />
                        <div className="mt-4 text-sm text-gray-700">{spacejoyPromiseData[0]?.description}</div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <div className="block lg:hidden">
                  {productFeaturesList?.map((feature) => {
                    return (
                      <Disclosure key={feature?.id}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                              <span className="text-sm font-bold text-gray-900">{feature?.title}</span>
                              {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                            </Disclosure.Button>
                            <Disclosure.Panel>
                              <div className="mt-4 text-sm text-gray-700">{feature?.content}</div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    );
                  })}
                </div>

                {finalArrayOfOffers.length !== 0 && (
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm"
                          onClickCapture={() => handleClick(open, product?._id, 'Available Offers')}
                        >
                          <div className="flex">
                            <span className="mr-2 text-sm font-bold text-gray-900">Available Offers</span>
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
                        <Disclosure.Button
                          className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm"
                          onClickCapture={() => handleClick(open, product?._id, 'Shipping Policy')}
                        >
                          <span className="text-sm font-bold text-gray-900">Shipping Policy</span>
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
                        <Disclosure.Button
                          className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm"
                          onClickCapture={() => handleClick(open, product?._id, 'Return Policy')}
                        >
                          <span className="text-sm font-bold text-gray-900">Return Policy</span>
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
          <div className="border-t border-gray-300 hidden lg:block container mx-auto py-8 my-8 px-32">
            {
              <Tab.Group>
                <Tab.List className={`grid grid-cols-3 border-b-2 justify-cente`}>
                  {productFeaturesList.map((promise) => (
                    <Tab
                      key={promise.id}
                      className={({ selected }) => (selected ? 'border-b-2 border-b-black focus:outline-none' : 'py-2')}
                    >
                      {promise?.title}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="mt-4">
                  {productFeaturesList.map((promise) => (
                    <Tab.Panel key={promise.id}>
                      <div className=" mx-auto">
                        <h3 className="mt-2 mb-1">{promise.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-600">{promise.content}</p>
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            }
          </div>
          <div className="container px-4 mx-auto overflow-hidden">
            <ProductDesignSet productIds={[product?._id]} />
            <div className="">
              <SimilarProducts productId={product?._id} />
            </div>

            <div className="mt-8 block lg:hidden">
              <h2 className="text-2xl tracking-wide border-b border-gray-300 pb-2">Why buy from Spacejoy?</h2>
              {SpjShoppingAdvantage?.map((item, index) => {
                return (
                  <Disclosure key={item?.id} defaultOpen={index === 0}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left border-b border-gray-300 rounded-sm">
                          <span className="text-sm font-bold text-gray-900">{item?.title}</span>
                          {open ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2">
                          <Image height="40" width="40" src={item?.iconLink} alt={item?.title} />
                          <div className="mt-2 text-sm text-gray-700">{item?.content}</div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                );
              })}
            </div>

            <div className="my-12 hidden lg:block">
              <h2 className="text-2xl tracking-wide  pb-2">Why buy from Spacejoy?</h2>
              <div className="my-8 hidden lg:grid lg:grid-cols-4 lg:gap-12 bg-white ">
                {SpjShoppingAdvantage?.map((item, index) => {
                  return (
                    <div key={item?.id}>
                      <Image height="40" width="40" src={item?.iconLink} alt={item?.title} />
                      <p className="text-md font-bold text-gray-900 mt-4">{item?.title}</p>
                      <div className="mt-2 text-sm text-gray-700">{item?.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {product?.metaDetails?.reviews && product?.metaDetails?.reviews?.length ? (
              <div id="reviewsSection" className="bg-gray-100 py-8 -mx-4 px-4 lg:px-28 lg:-mx-28 xl:-mx-32 xl:p-32">
                <Reviews rating={product?.metaDetails?.rating} reviews={product?.metaDetails?.reviews} />
              </div>
            ) : null}
          </div>
        </div>

        <StickyFooter show={!showCartFooter}>
          <div className="flex  space-x-4 sm:flex-col-1 addToCart px-4 my-2">
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
              className="w-full md:w-auto p-0 md:px-12 py-3 text-base font-medium text-white bg-gray-900 shadow-xs group hover:shadow-md rounded-xl focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
              onClick={addToCart}
              disabled={addingToCart ? true : false}
            >
              {addingToCart ? <SVGLoader /> : <span>Add to bag</span>}
            </button>
          </div>
        </StickyFooter>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

// const getAllProducts = async () => {
//   return {
//     products: [
//       { slug: '6141bab5f39452001c11d319' },
//       { slug: '61b4bc69e2f1a100374c62a9' },
//       { slug: '61b4a65ab9c243001c2eb35f' },
//       { slug: '61b37d7f8aa921001d8c7e3c' },
//     ],
//   };
// };

// export async function getStaticPaths() {
//   // get all product paths
//   const { products } = await getAllProducts();
//   const paths = products.map((product) => ({
//     params: { slug: product?.slug },
//   }));

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }

export const getServerSideProps = async ({ params, res, req }) => {
  const { slug } = params;
  const { cookies: { isMobile = 'false' } = {} } = req;
  // const response = await fetcher({ endPoint: `/v1/assets/getAssetBySlug?slug=${slug}`, method: 'GET' });
  const response = await fetcher({ endPoint: `/v2/asset/${slug}`, method: 'GET' });
  res.setHeader('Cache-Control', 'no-store');
  const { data, statusCode } = response;

  if (statusCode <= 300) {
    const { retailer: { preferred = false } = {} } = data;
    if (!preferred) {
      const {
        meta: {
          subcategory: { name: subCategoryName },
        },
      } = data;

      return {
        redirect: {
          destination: `/shop?subcategory=${subCategoryName}&alternatives=true`,
          permanent: false,
        },
      };
    }
    const currentlyViewing = Math.floor(Math.random() * (80 - 10 + 10) + 10);

    return {
      props: { product: data, revalidate: 1, isMobile: isMobile === 'true' ? true : false, currentlyViewing },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default React.memo(ProductView);
