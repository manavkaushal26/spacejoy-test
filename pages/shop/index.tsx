import EmptyState from '@components/Shared/EmptyState';
import InputRange from '@components/Shared/InputRange';
import Layout from '@components/Shared/Layout';
import Pagination from '@components/Shared/Pagination';
import ProductCard from '@components/Shop/ProductCard';
import ProductCardDimmer from '@components/Shop/ProductCardDimmer';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, HomeIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline';
import usePagination from '@hooks/usePagination';
import { useShopFilterContext } from '@store/ShopFilterContext';
import { internalPages } from '@utils/config';
import { defaultFilters, fetchAssetList } from '@utils/shop/helpers';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const ProductList = ({ list }) => {
  return (
    <>
      {list?.length ? (
        <>
          {list?.map((item) => (
            <ProductCard product={item} key={item._id} pageName="shop" />
          ))}
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

export const Shop = ({ initialFilters, assetsList, searchText = '', alternatives }): JSX.Element => {
  const [currentFilters, setCurrentFilters] = useState({ ...defaultFilters, ...initialFilters });
  const [error, setError] = useState(false);
  const shopPageTopRef = useRef<HTMLDivElement>();

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
      {/* <Layout.Banner />  */}
      <Layout.Header />
      <Layout.Body>
        <div className="min-h-screen bg-gray-100" ref={shopPageTopRef}>
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
            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-1 p-4 bg-white rounded-lg">
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
                          <div className="my-8 mt-4 space-y-2">
                            <InputRange
                              min={min}
                              max={max}
                              onChangeCallback={(data) => {
                                addArrayQueryParam({ name: 'price', ...data });
                              }}
                            />
                          </div>
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
                <div className="grid grid-cols-3 gap-1 xl:grid-cols-4 2xl:grid-cols-4">
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
  //TODO: Add page number support
  const payload = Object.keys(query).reduce((acc, item) => {
    if (item !== 'page') {
      if (item === 'searchText') {
        acc[item] = query[item];
      } else {
        acc[item] = query[item].split('::');
      }
    }

    return acc;
  }, {});
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
export default React.memo(Shop);
