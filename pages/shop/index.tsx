import AffirmCard from '@components/Shared/AffirmCards/AffirmCard';
import EmptyState from '@components/Shared/EmptyState';
import FilterDrawer from '@components/Shared/Filters/FilterDrawer';
import Layout from '@components/Shared/Layout';
import Pagination from '@components/Shared/Pagination';
import ProductCard from '@components/Shop/ProductCard';
import ProductCardDimmer from '@components/Shop/ProductCardDimmer';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, HomeIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline';
import usePagination from '@hooks/usePagination';
import { useFirebaseContext } from '@store/FirebaseContextProvider';
import { useShopFilterContext } from '@store/ShopFilterContext';
import { cloudinary, internalPages } from '@utils/config';
import { defaultFilters, fetchAssetList } from '@utils/shop/helpers';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const ProductList = ({ list }) => {
  const { data } = useFirebaseContext();

  return (
    <>
      {list?.length ? (
        <>
          {list?.map((item, idx) => {
            if ((idx === 12 || idx === 21) && idx !== 0 && data?.injectBannerV2?.visible) {
              return data?.injectBannerV2?.link !== undefined && data?.injectBannerV2?.link !== '' ? (
                <div className="col-span-1">
                  <Link href={data?.injectBannerV2?.link}>
                    <a>
                      <div className="relative aspect-w-7 aspect-h-9">
                        <Image
                          src={`${cloudinary.baseDeliveryURL}/${data?.injectBannerV2?.cdn}`}
                          alt="injectBanner"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="relative aspect-w-3 aspect-h-1 col-span-3">
                  <Image
                    src={`${cloudinary.baseDeliveryURL}/${data?.injectBannerV2?.cdn}`}
                    alt="injectBanner"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              );
            }

            return (
              <>
                {idx === 4 && (
                  <AffirmCard imgUrl="https://res.cloudinary.com/spacejoy/image/upload/v1645792556/web/homepage-v3/Card_tjadyd.svg" />
                )}
                <ProductCard product={item} key={item._id} pageName="shop" />
              </>
            );
          })}
        </>
      ) : (
        <div className="relative h-full col-span-5 bg-white rounded">
          <div className="sticky top-0 ">
            <EmptyState title="No matching products found" message="Try changing the filters" />
          </div>
        </div>
      )}
    </>
  );
};

const priceRangeOptions = [
  { label: '$1 to $99', min: 1, max: 99, selected: false },
  { label: '$100 to $499', min: 100, max: 499, selected: false },
  { label: '$500 to $1999', min: 500, max: 1999, selected: false },
  { label: '$2000 and more', min: 2000, max: 5000, selected: false },
];

export const Shop = ({ initialFilters, assetsList, searchText = '', alternatives }): JSX.Element => {
  const [currentFilters, setCurrentFilters] = useState({ ...defaultFilters, ...initialFilters });
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = Cookies.get('isMobile');
  const [error, setError] = useState(false);
  const shopPageTopRef = useRef<HTMLDivElement>();
  const [priceRange, setPriceRange] = useState(priceRangeOptions);
  const [minMaxPrice, setMinMaxPrice] = useState([1, 5000]);

  const handleOnPriceRangeChange = (position) => {
    const updatedCheckedPriceRange = priceRange.map((item, index) =>
      index === position
        ? item.selected
          ? { ...item, selected: false }
          : { ...item, selected: true }
        : { ...item, selected: false }
    );

    setPriceRange(updatedCheckedPriceRange);

    const checkedRanges = updatedCheckedPriceRange.filter((item) => item.selected);
    if (checkedRanges && checkedRanges.length > 0) {
      const getMinRange = checkedRanges.reduce((prev, curr) => (curr.min < prev.min ? curr : prev), checkedRanges[0]);
      const getMaxRange = checkedRanges.reduce((prev, curr) => (curr.max > prev.max ? curr : prev), checkedRanges[0]);
      addArrayQueryParam({ name: 'price', min: getMinRange.min, max: getMaxRange.max });
    } else {
      addArrayQueryParam({ name: 'price', remove: true });
    }
  };

  const onButtonClick = () => {
    if (shopPageTopRef.current) {
      shopPageTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (alternatives) {
      setError(true);
    }
  }, [alternatives]);

  useEffect(() => {
    if (error) {
      toast.error(
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold">We are sorry</p>
          <p className="message-body text-sm text-gray-600 text-justify">
            The product you were looking for is not available but we&apos;ve got similar products!
          </p>
        </div>
      );
    }
  }, [error]);

  const { currentRenderList, buttons, isFetching } = usePagination(
    {
      url: '/v1/assets/search',
      method: 'POST',
      payload: {
        filters: { ...currentFilters },
        searchText: searchText,
        projectId: 'randomText',
        sort: 'createdAt',
        wildcard: false,
      },
    },
    assetsList?.list,
    assetsList?.count,
    internalPages?.Shop?.NUM_OF_BUTTONS,
    internalPages?.Shop?.DEFAULT_PAGE_SIZE,
    'hits',
    initialFilters,
    { onButtonClick: onButtonClick }
  );
  const {
    filters: { retailer: retailerList = [], subCategory, vertical, price },
    updateFilter,
    addArrayQueryParam,
  } = useShopFilterContext();
  const [min = 1, max = 5000] = price;

  const router = useRouter();

  const lastQueryItems = React.useRef(Object.keys(router?.query));

  const verticalList = useMemo(() => {
    const selectedSubCategories = subCategory?.filter((item) => item?.selected);
    if (selectedSubCategories?.length) {
      return vertical?.filter(
        (item) => item?.subcategory === selectedSubCategories[selectedSubCategories?.length - 1]?._id
      );
    } else {
      return [];
    }
  }, [subCategory, vertical]);

  useEffect(() => {
    const queryItems = Object.keys(router?.query);
    if (queryItems?.length) {
      lastQueryItems.current = queryItems;
      const appliedFilters = queryItems?.reduce((acc, currValue) => {
        acc[currValue] = (router?.query[currValue] as string).split('::');

        return acc;
      }, {});
      setCurrentFilters({ ...defaultFilters, ...appliedFilters });
    } else {
      if (lastQueryItems?.current?.length) {
        setCurrentFilters({ ...defaultFilters });
      }
    }
  }, [router?.query]);

  const onSaleChecked = (e) => {
    const { checked } = e.target;
    if (checked) {
      addArrayQueryParam({ name: 'discount', min: 10, max: 100 });
    } else {
      addArrayQueryParam({ name: 'discount', remove: true });
    }
  };

  return (
    <Layout>
      <Head>
        <title>Spacejoy: The best online furniture and home decor store</title>
        <meta
          key="description"
          name="description"
          content={`Shopping furniture and decor for your home? Try Spacejoy. Modern, mid-century, boho, industrial, we have products of all styles from 500+ brands. And you'll always get great discounts with our furniture sale!`}
        />
        <meta
          key="keywords"
          name="keywords"
          content="best online furniture stores, online discount furniture stores, furniture sale, best home decor store"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="min-h-screen bg-gray-100" ref={shopPageTopRef}>
          <div className="container p-4 mx-auto">
            {isMobile !== 'true' && (
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
            )}

            {/* //TODO: Create separate component */}
            {isMobile === 'true' && (
              <FilterDrawer isOpen={isOpen} setIsOpen={setIsOpen} onClearCallback={() => {}} clearBtn={false}>
                {verticalList?.length !== 0 && (
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left rounded-sm">
                          <h3 className="text-gray-700">Category</h3>
                          {open ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <div className="my-5 space-y-2">
                            {verticalList?.map((vertical) => {
                              return (
                                <div
                                  className="flex items-center cursor-pointer"
                                  key={vertical?._id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateFilter(vertical?._id, 'vertical');
                                  }}
                                >
                                  <input
                                    id={`filter-category-${vertical?._id}`}
                                    name={`filter-category-${vertical?.name}`}
                                    value={vertical?.name}
                                    type="checkbox"
                                    className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                                    checked={vertical?.selected}
                                    readOnly
                                  />
                                  <label
                                    htmlFor={`filter-category-${vertical?._id}`}
                                    className="ml-3 text-sm text-gray-900 cursor-pointer"
                                  >
                                    {vertical?.name}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full border-0 py-4 text-left rounded-sm">
                        <h3 className="text-gray-700">Price</h3>
                        <span className="flex items-center ml-6">
                          {open ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
                        </span>
                      </Disclosure.Button>

                      <Disclosure.Panel>
                        {priceRange.map((range, index) => {
                          return (
                            <button
                              className="flex items-center mb-4"
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                handleOnPriceRangeChange(index);
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={range.selected}
                                // onChange={() => handleOnPriceRangeChange(index)}
                                className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                                readOnly
                              />
                              <label className="mt-0 ml-3 text-sm text-gray-900 cursor-pointer">
                                <span className="font-medium">{range.label}</span>
                              </label>
                            </button>
                          );
                        })}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left rounded-sm">
                        <h3 className="text-gray-700">Offers</h3>
                        <span className="flex items-center ml-6">
                          {open ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
                        </span>
                      </Disclosure.Button>

                      <Disclosure.Panel>
                        <div className="flex items-center my-5">
                          <input
                            type="checkbox"
                            checked={currentFilters?.discount?.[0] > 0}
                            onChange={onSaleChecked}
                            className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                          />
                          <label className="mt-0 ml-3 text-sm text-gray-900 cursor-pointer">
                            <span className="font-medium">On Sale</span>
                          </label>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {retailerList?.length !== 0 && (
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 text-left rounded-sm">
                          <h3 className="text-gray-700">Brands</h3>
                          <span className="flex items-center ml-6">
                            {open ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
                          </span>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <div className="my-5 space-y-2">
                            {retailerList?.map((retailer) => {
                              return (
                                <div
                                  className="flex items-center cursor-pointer"
                                  key={retailer?._id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateFilter(retailer?._id, 'retailer');
                                  }}
                                >
                                  <input
                                    id={`filter-category-${retailer?._id}`}
                                    name={`filter-category-${retailer?.name}`}
                                    value={retailer?._id}
                                    type="checkbox"
                                    className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                                    checked={retailer?.selected}
                                    readOnly
                                  />
                                  <label
                                    htmlFor={`filter-category-${retailer?._id}`}
                                    className="ml-3 text-sm text-gray-900 capitalize cursor-pointer"
                                  >
                                    {retailer?.name}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}
              </FilterDrawer>
            )}
            <div className="grid grid-cols-4 lg:grid-cols-5 gap-8">
              <div className="col-span-1 p-4 bg-white rounded-lg hidden lg:block">
                <form className="hidden lg:block">
                  {verticalList?.length !== 0 && (
                    <Disclosure defaultOpen>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex items-center justify-between w-full py-2 mb-2 text-left rounded-sm">
                            <h3 className="text-gray-700">Category</h3>
                            {open ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
                          </Disclosure.Button>
                          <Disclosure.Panel className="mb-8">
                            <div className="space-y-2">
                              {verticalList?.map((vertical) => {
                                return (
                                  <div
                                    className="flex items-center cursor-pointer"
                                    key={vertical?._id}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      updateFilter(vertical?._id, 'vertical');
                                    }}
                                  >
                                    <input
                                      id={`filter-category-${vertical?._id}`}
                                      name={`filter-category-${vertical?.name}`}
                                      value={vertical?.name}
                                      type="checkbox"
                                      className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                                      checked={vertical?.selected}
                                      readOnly
                                    />
                                    <label
                                      htmlFor={`filter-category-${vertical?._id}`}
                                      className="ml-3 text-sm text-gray-900 cursor-pointer"
                                    >
                                      {vertical?.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-2 mb-2 text-left rounded-sm">
                          <h3 className="text-gray-700">Price</h3>
                          <span className="flex items-center ml-6">
                            {open ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
                          </span>
                        </Disclosure.Button>

                        <Disclosure.Panel>
                          {priceRange.map((range, index) => {
                            return (
                              <button
                                className="flex items-center mb-4"
                                key={index}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleOnPriceRangeChange(index);
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={range.selected}
                                  // onChange={() => handleOnPriceRangeChange(index)}
                                  className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                                  readOnly
                                />
                                <label className="mt-0 ml-3 text-sm text-gray-900 cursor-pointer">
                                  <span className="font-medium">{range.label}</span>
                                </label>
                              </button>
                            );
                          })}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-2 mb-2 text-left rounded-sm">
                          <h3 className="text-gray-700">Offers</h3>
                          <span className="flex items-center ml-6">
                            {open ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
                          </span>
                        </Disclosure.Button>

                        <Disclosure.Panel>
                          <div className="flex items-center mb-4">
                            <input
                              type="checkbox"
                              checked={currentFilters?.discount?.[0] > 0}
                              onChange={onSaleChecked}
                              className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                            />
                            <label className="mt-0 ml-3 text-sm text-gray-900 cursor-pointer">
                              <span className="font-medium">On Sale</span>
                            </label>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {retailerList?.length !== 0 && (
                    <Disclosure defaultOpen>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex items-center justify-between w-full py-2 mb-2 text-left rounded-sm">
                            <h3 className="text-gray-700">Brands</h3>
                            <span className="flex items-center ml-6">
                              {open ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel>
                            <div className="space-y-2">
                              {retailerList?.map((retailer) => {
                                return (
                                  <div
                                    className="flex items-center cursor-pointer"
                                    key={retailer?._id}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      updateFilter(retailer?._id, 'retailer');
                                    }}
                                  >
                                    <input
                                      id={`filter-category-${retailer?._id}`}
                                      name={`filter-category-${retailer?.name}`}
                                      value={retailer?._id}
                                      type="checkbox"
                                      className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
                                      checked={retailer?.selected}
                                      readOnly
                                    />
                                    <label
                                      htmlFor={`filter-category-${retailer?._id}`}
                                      className="ml-3 text-sm text-gray-900 capitalize cursor-pointer"
                                    >
                                      {retailer?.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </form>
              </div>
              <div className="col-span-4 rounded">
                {isMobile === 'true' && (
                  <div className="sticky top-20 z-20 mb-4">
                    <div className=" bg-gray-100 py-1 flex w-full justify-end">
                      <button
                        onClick={() => setIsOpen(true)}
                        className="flex w-1/4 items-center  justify-center space-x-2 p-2 text-base font-medium text-white bg-black shadow-xs cursor-not-allowed group hover:shadow-md rounded-md focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                          />
                        </svg>
                        <span className="whitespace-nowrap text-ellipsis">Filters</span>
                      </button>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 xl:grid-cols-3 2xl:grid-cols-3">
                  {isFetching ? (
                    <>
                      {[...Array(internalPages?.Shop?.DEFAULT_PAGE_SIZE)].map((_d, _i) => {
                        return <ProductCardDimmer key={_i} />;
                      })}
                    </>
                  ) : (
                    <ProductList list={currentRenderList} />
                  )}
                </div>
              </div>
            </div>
            <div className="text-center my-14">
              <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <Pagination buttonList={buttons} />
              </nav>
            </div>
          </div>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const { query = {} } = context || {};

  const { category = '', subcategory = '', vertical = '', ...otherFilters } = query;
  let redirectPath = '';

  if (subcategory?.length) {
    redirectPath = !vertical?.length
      ? `/${subcategory?.split('::')[0]}`
      : `/${subcategory?.split('::')[0]}/${vertical?.split('::')[0]}`;
  } else if (category.length) {
    redirectPath = `/${category?.split('::')[0]}`;
  }

  if (redirectPath) {
    let str;

    for (let key in otherFilters) {
      str = `${str || ''}${str || ''.length ? '&' : ''}${key}=${otherFilters[key]}`;
    }

    return {
      redirect: {
        destination: `/${redirectPath?.toLowerCase()}${str?.length ? `?${str?.toLowerCase()}` : ''}`,
        permanent: false,
      },
    };
  } else {
    //TODO: Add page number support
    const payload: any = Object.keys(query).reduce((acc, item) => {
      if (item !== 'page') {
        if (item === 'searchText') {
          acc[item] = query[item];
        } else {
          acc[item] = query[item].split('::');
        }
      }

      return acc;
    }, {});
    const { subcategory = [], category = [], vertical = [], ...otherFilters } = payload;
    const allFilters = { ...defaultFilters, ...payload };
    const assetsList = await fetchAssetList({ filters: { ...allFilters } }, context);

    return {
      props: {
        initialFilters: payload,
        assetsList,
        alternatives: !!query?.alternatives,
      },
    };
  }
}
export default React.memo(Shop);
