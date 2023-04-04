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
import { cloudinary, company, internalPages } from '@utils/config';
import fetcher from '@utils/fetcher';
import { convertUrlPathToFilter, titleCase } from '@utils/helpers';
import { SpacejoyMeta } from '@utils/SEO/metaInfo.config';
import { defaultFilters, fetchAllFilters, fetchAssetList } from '@utils/shop/helpers';
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
          {list?.map((item) => {
            
            return (
              <>
                {/* {idx === 4 && (
                  <AffirmCard imgUrl="https://res.cloudinary.com/spacejoy/image/upload/v1645792556/web/homepage-v3/Card_tjadyd.svg" />
                )} */}
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

const getRanges = (min, max) => {
  const diff = max - min;
  const stepSize = Math.floor(diff / 4);
  const values = [];
  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      values.push({ min: min, max: min + stepSize, selected: false, label: `$${min} to $${min + stepSize}` });
    } else {
      values.push({
        min: i * stepSize,
        max: i * stepSize + stepSize,
        label: `$${i * stepSize} to $${i * stepSize + stepSize}`,
        selected: false,
      });
    }
  }

  return values;
};

export const Shop = ({ initialFilters, assetsList, searchText = '', alternatives, metaInfo }): JSX.Element => {
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

  const {
    filters: { retailer: retailerList = [], subCategory, vertical, price, category },
    updateFilter,
    addArrayQueryParam,
    filters,
  } = useShopFilterContext();

  const [min = 1, max = 5000] = price;

  const router = useRouter();
  const { shopParams = [] } = router?.query;

  const lastQueryItems = React.useRef(Object.keys(router?.query));

  const verticalList = useMemo(() => {
    const selectedSubCategories = subCategory?.filter((item) => item?.name?.toLowerCase() === currentFilters?.mix);

    if (selectedSubCategories?.length) {
      return vertical?.filter(
        (item) => item?.subcategory === selectedSubCategories[selectedSubCategories?.length - 1]?._id
      );
    } else {
      return [];
    }
  }, [subCategory, vertical, currentFilters?.mix]);

  //fetch price filters for category/subcategory
  useEffect(() => {
    const catSubCat = shopParams && shopParams?.length ? convertUrlPathToFilter(shopParams[0]) : '';
    const verticalName = shopParams && shopParams?.length > 1 ? convertUrlPathToFilter(shopParams[1]) : '';

    const type = category?.some((item) => item?.name?.toLowerCase() === catSubCat.toLowerCase())
      ? 'category'
      : 'subCategory';

    const queryId = filters[type]?.filter((item) => item?.name?.toLowerCase() === catSubCat.toLowerCase())[0]?._id;

    let verticalId = '';

    const verticalObj = vertical?.filter((item) => item?.name?.toLowerCase() === verticalName?.toLowerCase());

    if (verticalObj?.length) {
      verticalId = verticalObj[0]?._id;
    }

    const payload = {
      ...(type === 'category' ? { category: [queryId], subCategory: [] } : { category: [], subCategory: [queryId] }),
      ...(verticalName && verticalId ? { vertical: [verticalId] } : { vertical: [] }),
    };

    //get price map
    (async () => {
      const { data, statusCode } = await fetcher({
        endPoint: 'https://fn.spacejoy.com/v1/filter',
        method: 'POST',
        body: { ...payload },
        hasBaseUrl: true,
      });
      const { price: { min = 0, max = 0 } = {} } = data;
      const ranges = getRanges(min, max);

      const { price = '0::0' } = router?.query;
      const [minPrice, maxPrice] = (price as string)?.split('::');
      const updatedPriceRange = ranges?.map((item) => {
        if (item?.min === parseInt(minPrice) && item?.max === parseInt(maxPrice)) {
          return { ...item, selected: true };
        }

        return { ...item };
      });

      setPriceRange(updatedPriceRange);
    })();
  }, [router?.query, category, filters, subCategory, vertical]);

  useEffect(() => {
    const queryItems = Object.keys(router?.query);
    if (queryItems?.length) {
      lastQueryItems.current = queryItems;
      const appliedFilters = queryItems?.reduce((acc, currValue) => {
        if (typeof router?.query[currValue] === 'string') {
          acc[currValue] = (convertUrlPathToFilter(router?.query[currValue]) as string).split('::');
        } else {
          acc['mix'] = router?.query[currValue]?.length ? convertUrlPathToFilter(router?.query[currValue][0]) : '';
          if (router?.query[currValue]?.length > 1) {
            acc['vertical'] = [convertUrlPathToFilter(router?.query[currValue][1])];
          }
        }

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

  const catSubCat = shopParams && shopParams?.length ? convertUrlPathToFilter(shopParams[0]) : '';
  const verticalName = shopParams && shopParams?.length > 1 ? convertUrlPathToFilter(shopParams[1]) : '';
  const catTitle = `${catSubCat?.length ? `${catSubCat} |` : ''}`;
  const verticalTitle = `${verticalName?.length ? `${verticalName} |` : ''}`;

  if (shopParams?.length < 2) {
    // metaInfo = SpacejoyMeta.find((item) => item.url === `/${catSubCat}`) || {};
    metaInfo.title ? metaInfo.title : (metaInfo.title = `${catTitle} Spacejoy`);
  } else {
    metaInfo.title = `${verticalTitle} ${catTitle} Spacejoy`;
  }

  return (
    <Layout>
      <Head>
        <title>{titleCase(metaInfo?.title || 'Spacejoy: The best online furniture and home decor store')}</title>
        {/* Primary Meta Tags  */}
        <meta
          name="title"
          content={titleCase(metaInfo?.title || 'Spacejoy: The best online furniture and home decor store')}
        />
        <meta
          key="description"
          name="description"
          content={
            metaInfo?.description ||
            "Shopping furniture and decor for your home? Try Spacejoy. Modern, mid-century, boho, industrial, we have products of all styles from 500+ brands. And you'll always get great discounts with our furniture sale!"
          }
        />
        <meta
          key="keywords"
          name="keywords"
          content={
            metaInfo?.keywords ||
            'best online furniture stores, online discount furniture stores, furniture sale, best home decor store'
          }
        />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta key="og-url" property="og:url" content={metaInfo?.metaUrl} />
        <meta
          key="og-title"
          property="og:title"
          content={titleCase(metaInfo?.title || 'Spacejoy: The best online furniture and home decor store')}
        />
        <meta
          key="og-description"
          property="og:description"
          content={
            metaInfo?.description ||
            "Shopping furniture and decor for your home? Try Spacejoy. Modern, mid-century, boho, industrial, we have products of all styles from 500+ brands. And you'll always get great discounts with our furniture sale!"
          }
        />
        <meta key="og-image" property="og:image" content={metaInfo?.image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaInfo?.metaUrl} />
        <meta
          property="twitter:title"
          content={titleCase(metaInfo?.title || 'Spacejoy: The best online furniture and home decor store')}
        />
        <meta
          property="twitter:description"
          content={
            metaInfo?.description ||
            "Shopping furniture and decor for your home? Try Spacejoy. Modern, mid-century, boho, industrial, we have products of all styles from 500+ brands. And you'll always get great discounts with our furniture sale!"
          }
        />
        <meta property="twitter:image" content={metaInfo?.image} />

        <link
          rel="canonical"
          href={metaInfo?.metaUrl ? metaInfo.metaUrl.split('?')[0] : `${company.url}${router.asPath.split('?')[0]}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <base href="/" />
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
                                className="w-4 h-4 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-white"
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
  // get category and subcategory
  const { query: { shopParams = [], ...otherParams } = {}, resolvedUrl } = context || {};

  //TODO: Add page number support
  const payload = Object.keys(otherParams).reduce((acc, item) => {
    if (item !== 'page') {
      if (item === 'searchText') {
        acc[item] = otherParams[item];
      } else {
        acc[item] = otherParams[item].split('::');
      }
    }

    return acc;
  }, {});

  const allFilters = {
    ...defaultFilters,
    ...payload,
    ...(shopParams && shopParams?.length > 1 && { vertical: [shopParams[1]] }),
    ...(shopParams && shopParams?.length && { mix: shopParams[0] }),
  };

  const response = await fetchAllFilters(false);
  const categories = [...(response?.categoryTree || [])]
    .filter((item) => item.isPublic)
    .map((item) => {
      return { ...item, type: 'category' };
    });

  const assetsList: any = await fetchAssetList({ filters: { ...allFilters } }, context);

  // MetaInfo Code
  let metaInfo: any = {};
  const catSubCat = shopParams && shopParams?.length ? convertUrlPathToFilter(shopParams[0]) : '';

  const isValidSub = categories.filter(c => c.name.toLowerCase() === catSubCat.toLowerCase());
  if(isValidSub.length === 0){
    return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
        props:{},
      };
  }

  const verticalName = shopParams && shopParams?.length > 1 ? convertUrlPathToFilter(shopParams[1]) : '';
  const catTitle = `${catSubCat?.length ? `${catSubCat} |` : ''}`;
  const verticalTitle = `${verticalName?.length ? `${verticalName} |` : ''}`;
  const type = categories?.some((item) => item?.name?.toLowerCase() === catSubCat.toLowerCase())
    ? 'category'
    : 'subCategory';

  // case 1 --> if shopParams.length < 2
  if (shopParams?.length < 2) {
    // case1.a --> { shopParams: [ 'category'/'subCategory' ] }
    metaInfo = SpacejoyMeta.find((item) => item.url === `/${shopParams[0]}`) || {};
    metaInfo.image = `${cloudinary.baseDeliveryURL}/${assetsList?.list[0]?.cdn}`;
    metaInfo.metaUrl = `${company.url}${resolvedUrl}`;
  } else {
    // case2 --> if shopParams.length > 2
    // case2.a --> { shopParams: [ 'category', 'vertical' ] }
    if (type === 'category') {
      metaInfo = SpacejoyMeta.find((item) => item?.name?.toLowerCase() === catSubCat) || {};
      metaInfo.title = `${verticalTitle} ${catTitle} Spacejoy`;
      metaInfo.description = `${
        metaInfo?.verticalDescription?.prefix ? metaInfo?.verticalDescription?.prefix : ''
      } ${verticalName} ${metaInfo?.verticalDescription?.suffix ? metaInfo?.verticalDescription?.suffix : ''}`;
      metaInfo.image = `${cloudinary.baseDeliveryURL}/${assetsList?.list[0]?.cdn}`;
      metaInfo.metaUrl = `${company.url}${resolvedUrl}`;
    } else {
      // case2.b --> { shopParams: [ 'subCategory', 'vertical' ] }
      const temp: any = categories?.filter((item) =>
        item.subCategories.some((data) => data?.name?.toLowerCase() === catSubCat)
      );
      metaInfo = SpacejoyMeta.find((item) => item?.name === temp[0]?.name) || {};
      metaInfo.title = `${verticalTitle} ${catTitle} Spacejoy`;
      metaInfo.description = `${
        metaInfo?.verticalDescription?.prefix ? metaInfo?.verticalDescription?.prefix : ''
      } ${verticalName} ${metaInfo?.verticalDescription?.suffix ? metaInfo?.verticalDescription?.suffix : ''}`;
      metaInfo.image = `${cloudinary.baseDeliveryURL}/${assetsList?.list[0]?.cdn}`;
      metaInfo.metaUrl = `${company.url}${resolvedUrl}`;
    }
  }

  return {
    props: {
      initialFilters: {
        ...payload,
        ...(shopParams && shopParams?.length && { mix: shopParams[0] }),
        ...(shopParams && shopParams?.length > 1 && { vertical: [shopParams[1]] }),
      },
      assetsList,
      alternatives: !!otherParams?.alternatives,
      metaInfo,
    },
  };
}
export default React.memo(Shop);
