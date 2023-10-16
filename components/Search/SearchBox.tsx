import CollageCardDimmer from '@components/Collages/CollageCardDimmer';
import CollectionCardDimmer from '@components/Collection/CollectionCardDimmer';
import DesignCard from '@components/InteriorDesigns/DesignCard';
import DesignSetCardV2 from '@components/RoomSelection/DesignSetCardV2';
import EmptyState from '@components/Shared/EmptyState';
import ProductCard from '@components/Shop/ProductCard';
import ProductCardDimmer from '@components/Shop/ProductCardDimmer';
import { Tab } from '@headlessui/react';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import useKeyPress from '@hooks/useKeyPress';
import { useShopFilterContext } from '@store/ShopFilterContext';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled, { keyframes } from 'styled-components';

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
  &.entry {
    opacity: 0;
    transform: translateY(5px);
    animation: ${entry} 0.25s forwards;
  }
`;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SearchBox: React.FC = () => {
  const enterPress = useKeyPress('Enter');
  const escPress = useKeyPress('Escape');

  const [searchString, setSearchString] = useState('');
  const [lastSearchString, setLastSearchString] = useState('');
  const [searchType, setSearchType] = useState<'products' | 'design-ideas'>('products');
  const [isFetchingDesigns, setIsFetchingDesigns] = useState(false);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [isFetchingDesignIdeas, setIsFetchingDesignIdeas] = useState(false);

  const {
    filters: { retailer: preferredRetailers = [] },
  } = useShopFilterContext();

  const preferredRetailerNames =
    preferredRetailers?.map((item) => {
      return item?.name;
    }) || [];

  const router = useRouter();

  const goBack = useCallback(() => router.back(), [router]);

  useEffect(() => {
    if (escPress) goBack();
  }, [escPress, goBack]);

  const clear = () => setSearchString('');

  //================================================PAGINATION============================================================
  const perPageDesigns = 30;
  const perPageProducts = 30;
  const perPageDesignIdeas = 30;
  //===========================================================/PRODUCTS\=============================================
  const payloadProducts = {
    filters: {
      category: [],
      retailer: [],
      price: [1, 5000],
      status: 'active',
      depth: [],
      vertical: [],
      height: [],
      width: [],
      subcategory: [],
      shoppable: true,
    },
    searchText: '',
    skipVal: 0,
    wildcard: false,
  };

  const [productsResults, setProductsResults] = useState([]);
  const [pageOffsetProducts, setPageOffsetProducts] = useState(0);
  const [pageCountProducts, setPageCountProducts] = useState(0);
  const [apiErrorProducts, setApiErrorProducts] = useState(null);

  const handlePageChangeProducts = (event) => {
    setPageOffsetProducts(event.selected);
  };
  //=====================================================DESIGN-SETS====================================================
  const payloadDesigns = {
    filters: {
      category: true,
      isActive: true,
      retailer: [],
      price: ['1', '500000'],
      subcategory: [],
      tags: [],
      themes: [],
      products: [],
    },
    searchText: '',
    wildcard: false,
  };
  const [designsResults, setDesignsResults] = useState([]);
  const [pageOffsetDesigns, setPageOffsetDesigns] = useState(0);
  const [pageCountDesigns, setPageCountDesigns] = useState(0);
  const [apiErrorDesigns, setApiErrorDesigns] = useState(null);

  const [designIdeasResults, setDesignIdeasResults] = useState([]);
  const [pageOffsetDesignIdeas, setPageOffsetDesignIdeas] = useState(0);
  const [pageCountDesignIdeas, setPageCountDesignIdeas] = useState(0);
  const [apiErrorDesignIdeas, setApiErrorDesignIdeas] = useState(null);

  useEffect(() => {
    if (lastSearchString !== searchString) {
      setPageOffsetDesigns(0);
      setPageOffsetProducts(0);
      setPageOffsetDesignIdeas(0);
      setLastSearchString(searchString);
    }

    async function fetchDesignsData() {
      const endPoint = `${publicRoutes.designSetSearch}?skip=${
        pageOffsetDesigns * perPageDesigns
      }&limit=${perPageDesigns}`;
      setIsFetchingDesigns(true);
      const response = await fetcher({
        endPoint,
        method: 'POST',
        body: { ...payloadDesigns, searchText: searchString },
      });
      setIsFetchingDesigns(false);
      if (response.statusCode > 300) {
        setApiErrorDesigns(response.message);
        setDesignsResults([]);
        setPageCountDesigns(0);

        return;
      }
      const newPageCount = response?.data?.count / perPageDesigns;
      setDesignsResults(response.data?.data);
      setPageCountDesigns(newPageCount);
    }

    async function fetchDesignIdeasData(keywords) {
      const endPoint = `${publicRoutes.searchResultsRoute}?skip=${
        pageOffsetDesignIdeas * perPageDesignIdeas
      }&limit=${perPageDesignIdeas}`;
      setIsFetchingDesignIdeas(true);
      const response = await fetcher({
        endPoint,
        method: 'POST',
        body: { keywords },
      });
      setIsFetchingDesignIdeas(false);
      if (response.statusCode > 300) {
        setApiErrorDesignIdeas(response.message);
        setDesignIdeasResults([]);
        setPageCountDesignIdeas(0);

        return;
      }
      const newPageCount = response?.data?.total / perPageDesignIdeas;
      setDesignIdeasResults(response.data?.hits);
      setPageCountDesignIdeas(newPageCount);
    }

    async function fetchProductsData() {
      const endPoint = `${publicRoutes.productSearch}?skip=${
        pageOffsetProducts * perPageProducts
      }&limit=${perPageProducts}`;
      setIsFetchingProducts(true);
      const response = await fetcher({
        endPoint,
        method: 'POST',
        body: { ...payloadProducts, searchText: searchString },
      });
      setIsFetchingProducts(false);
      if (response.statusCode > 300) {
        setApiErrorProducts(response.message);
        setProductsResults([]);
        setPageCountProducts(0);

        return;
      }
      const newPageCount = response?.data?.total / perPageProducts;
      setProductsResults(response.data?.hits);
      setPageCountProducts(newPageCount);
    }
    switch (searchType) {
      // case 'design-sets':
      //   fetchDesignsData();
      //   break;
      case 'design-ideas':
        const keywords = searchString?.split(' ');
        fetchDesignIdeasData(keywords);
        break;
      case 'products':
        fetchProductsData();
        break;
      default:
        fetchProductsData();
    }
  }, [pageOffsetDesigns, pageOffsetDesignIdeas, pageOffsetProducts, enterPress, searchType]);

  const handlePageChangeDesigns = (event) => {
    setPageOffsetDesigns(event.selected);
  };

  const handlePageChangeDesignIdeas = (event) => {
    setPageOffsetDesignIdeas(event.selected);
  };
  //============================================================================================================
  const onChangeSearchText = (e) => {
    setSearchString(e?.target?.value);
  };

  return (
    <div className="relative bg-gray-100 min-h-free">
      <div className="relative flex px-4 py-5 mx-auto space-x-4 align-middle md:max-w-3xl xl:max-w-3xl sm:px-6 lg:pt-8 lg:px-8">
        <AnimateBox className="shadow-lg entry grow">
          <div className="relative">
            <div className="absolute inset-y-0 flex items-center justify-center left-6">
              <SearchIcon className="w-4 h-4 text-gray-900" />
            </div>
            <input
              autoFocus
              onChange={(e) => {
                onChangeSearchText(e);
              }}
              type="text"
              name="first_name"
              id="first_name"
              autoComplete="off"
              placeholder="Start Typing to View Products and Designs sets"
              value={searchString}
              className="block w-full py-5 capitalize border border-gray-100 shadow-sm outline-none pl-14 pr-28 caret-yellow-500 focus:shadow-lg focus:ring-transparent focus:border-gray-100 rounded-xl"
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center justify-center w-16 text-center text-gray-500 border border-gray-100 hover:text-yellow-500 bg-gray-50 rounded-xl focus:ring-1 focus:ring-gray-600 focus:outline-none"
              onClick={clear}
            >
              <span className="text-xs">clear</span>
            </button>
          </div>
        </AnimateBox>
        <button
          className="w-16 h-16 text-center text-gray-400 hover:text-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 focus:outline-none"
          onClick={goBack}
        >
          <XIcon className="inline w-8 h-8" />
        </button>
      </div>

      <div className="relative mx-5">
        <Tab.Group
          defaultIndex={0}
          onChange={(index) => {
            switch (index) {
              case 0:
                setSearchType('products');
                break;
              // case 1:
              //   setSearchType('design-sets');
              //   break;
              case 1:
                setSearchType('design-ideas');
                break;
              default:
                setSearchType('products');
                break;
            }
          }}
        >
          <Tab.List className="flex justify-center mt-4 rounded-xl">
            <div className="bg-white rounded-xl p-1 border border-[#9CA3AF] space-x-2">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'py-2 text-sm leading-5 font-medium rounded-lg w-fit px-2 sm:px-8',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-white ring-opacity-60',
                    selected ? 'bg-black text-white shadow' : 'text-black bg-gray-100'
                  )
                }
              >
                Products
              </Tab>
              {/* <Tab
                className={({ selected }) =>
                  classNames(
                    'py-2 text-sm leading-5 font-medium rounded-lg w-fit px-2 sm:px-8',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-white ring-opacity-60',
                    selected ? 'bg-black text-white shadow' : 'text-black bg-gray-100'
                  )
                }
              >
                Design Sets
              </Tab> */}
              <Tab
                className={({ selected }) =>
                  classNames(
                    'py-2 text-sm leading-5 font-medium rounded-lg w-fit px-2 sm:px-8',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-white ring-opacity-60',
                    selected ? 'bg-black text-white shadow' : 'text-black bg-gray-100'
                  )
                }
              >
                Design Ideas
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels className="mt-5">
            <Tab.Panel className={classNames('bg-gray-100 rounded-xl py-3')}>
              <div className="pb-4">
                {!isFetchingProducts && !productsResults?.length ? (
                  <div className="col-span-12">
                    <EmptyState title="No matching products found" message="" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4 lg:gap-2 xl:grid-cols-5 xl:gap-3">
                    {isFetchingProducts && (
                      <>
                        {[...Array(internalPages?.Shop?.DEFAULT_PAGE_SIZE)].map((_d, _i) => {
                          return <ProductCardDimmer key={_i} />;
                        })}
                      </>
                    )}
                    {productsResults?.map(
                      (searchItem) =>
                        searchItem?.inStock &&
                        searchItem?.status !== 'discontinued' &&
                        preferredRetailerNames?.includes(searchItem?.retailer) && (
                          <ProductCard product={searchItem} key={searchItem._id} />
                        )
                    )}
                  </div>
                )}
              </div>
              <div className="my-4">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCountProducts}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChangeProducts}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  forcePage={pageOffsetProducts}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel className={classNames('bg-gray-100 rounded-xl p-3')}>
              <div className="container pb-40 mx-auto sm:px-4">
                {!designsResults?.length && !isFetchingDesigns ? (
                  <div className="col-span-12">
                    <EmptyState title="No matching design sets found" message="" />
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 xl:grid-cols-3 xl:gap-2">
                    {isFetchingDesigns && (
                      <>
                        {[...new Array(internalPages.Collages.DEFAULT_PAGE_SIZE)].map((_d, i) => {
                          return (
                            <div key={_d}>
                              <CollageCardDimmer />
                            </div>
                          );
                        })}
                      </>
                    )}
                    {designsResults?.map((searchItem) => (
                      <DesignSetCardV2
                        designData={searchItem}
                        large={false}
                        isMobile
                        key={searchItem?._id}
                        pageRef="Search Page"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="my-4">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCountDesigns}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChangeDesigns}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  forcePage={pageOffsetDesigns}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel className={classNames('bg-gray-100 rounded-xl p-3')}>
              <div className="container pb-40 mx-auto sm:px-4">
                {!designIdeasResults?.length && !isFetchingDesignIdeas ? (
                  <div className="col-span-12">
                    <EmptyState title="No matching design ideas found" message="" />
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 xl:grid-cols-3 xl:gap-2">
                    {isFetchingDesignIdeas && (
                      <>
                        {[...new Array(internalPages.Collages.DEFAULT_PAGE_SIZE)].map((_d, i) => {
                          return (
                            <div key={_d}>
                              <CollectionCardDimmer />
                            </div>
                          );
                        })}
                      </>
                    )}
                    {designIdeasResults?.map((searchItem) => (
                      <DesignCard cardData={searchItem?.design} key={searchItem?.design?._id} />
                    ))}
                  </div>
                )}
              </div>
              <div className="my-4">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCountDesignIdeas}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChangeDesignIdeas}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  forcePage={pageOffsetDesignIdeas}
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default SearchBox;
