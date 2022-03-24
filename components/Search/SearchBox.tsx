import CollageCardDimmer from '@components/Collages/CollageCardDimmer';
import DesignCard from '@components/InteriorDesigns/DesignCard';
import DesignSetCardV2 from '@components/RoomSelection/DesignSetCardV2';
import EmptyState from '@components/Shared/EmptyState';
import ProductCard from '@components/Shop/ProductCard';
import ProductCardDimmer from '@components/Shop/ProductCardDimmer';
import { Tab } from '@headlessui/react';
import { RefreshIcon, SearchIcon, XIcon } from '@heroicons/react/outline';
import useKeyPress from '@hooks/useKeyPress';
import useSearch from '@hooks/useSearch';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants';
import fetcher from '@utils/fetcher';
import TopSearches from '@utils/Mocks/TopSearches';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Tween } from 'react-gsap';
import ReactPaginate from 'react-paginate';
import styled, { keyframes } from 'styled-components';
import ListItem from './ListItem';

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
  const [searchType, setSearchType] = useState<'products' | 'design-sets'>('products');
  const [isFetchingDesigns, setIsFetchingDesigns] = useState(false);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  const router = useRouter();

  const goBack = useCallback(() => router.back(), [router]);

  useEffect(() => {
    if (escPress) goBack();
  }, [escPress, goBack]);

  const clear = () => setSearchString('');

  //================================================PAGINATION============================================================
  const perPageDesigns = 21;
  const perPageProducts = 20;
  //===========================================================/PRODUCTS\=============================================
  const payloadProducts = {
    filters: {
      category: [],
      retailer: [],
      price: [1, 50000],
      status: 'active',
      depth: [],
      vertical: [],
      height: [],
      width: [],
      subcategory: [],
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

  useEffect(() => {
    if(lastSearchString !== searchString){
      setPageOffsetDesigns(0);
      setPageOffsetProducts(0);
      setLastSearchString(searchString);
    }
    

    async function fetchDesignsData() {
      const endPoint = `${publicRoutes.designSetSearch}?skip=${pageOffsetDesigns * perPageDesigns}&limit=${perPageDesigns}`;
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
    async function fetchProductsData() {
      const endPoint = `${publicRoutes.productSearch}?skip=${pageOffsetProducts * perPageProducts}&limit=${perPageProducts}`;
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
    searchType === 'design-sets' ? fetchDesignsData() : fetchProductsData();
  }, [pageOffsetDesigns, pageOffsetProducts, enterPress, searchType]);

  const handlePageChangeDesigns = (event) => {
    setPageOffsetDesigns(event.selected);
  };
  //============================================================================================================
  const onChangeSearchText = (e) => {
    setSearchString(e?.target?.value);
  }

  return (
    <div className="relative min-h-free bg-gray-100">
      <div className="relative md:max-w-3xl xl:max-w-3xl mx-auto py-5 px-4 sm:px-6 lg:pt-8 lg:px-8 flex space-x-4 align-middle">
        <AnimateBox className="entry grow shadow-lg">
          <div className="relative">
            <div className="absolute left-6 inset-y-0 flex justify-center items-center">
              <SearchIcon className="w-4 h-4 text-gray-900" />
            </div>
            <input
              autoFocus
              onChange={(e) => {onChangeSearchText(e)}}
              type="text"
              name="first_name"
              id="first_name"
              autoComplete="off"
              placeholder="Start Typing to View Products and Designs sets"
              value={searchString}
              className="py-5 pl-14 pr-28 outline-none block w-full caret-yellow-500 shadow-sm focus:shadow-lg focus:ring-transparent border border-gray-100 focus:border-gray-100 rounded-xl capitalize"
            />
            <button
              className="absolute right-0 inset-y-0 text-gray-500 hover:text-yellow-500 w-16 bg-gray-50 flex justify-center text-center items-center border border-gray-100 rounded-xl focus:ring-1 focus:ring-gray-600 focus:outline-none"
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
              case 1:
                setSearchType('design-sets');
                break;
              default:
                setSearchType('products');
                break;
            }
          }}
        >
          <Tab.List className="flex rounded-xl justify-center mt-4">
            <div className="bg-white rounded-xl p-1 border border-[#9CA3AF] space-x-2">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'py-2 text-sm leading-5 font-medium rounded-lg w-fit px-8',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-white ring-opacity-60',
                    selected ? 'bg-black text-white shadow' : 'text-black bg-gray-100'
                  )
                }
              >
                Products
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'py-2 text-sm leading-5 font-medium rounded-lg w-fit px-8',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-white ring-opacity-60',
                    selected ? 'bg-black text-white shadow' : 'text-black bg-gray-100'
                  )
                }
              >
                Design Sets
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels className="mt-5">
            <Tab.Panel className={classNames('bg-gray-100 rounded-xl py-3')}>
              <div className="pb-4">
              
                {!isFetchingProducts && !productsResults?.length ? (
                  <div className="col-span-12">
                    <EmptyState title="No matching design sets found" message="" />
                  </div>
                ) : (
                  <div className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-2 xl:grid-cols-5 xl:gap-3 grid">
                    {isFetchingProducts && (
                    <>
                      {[...Array(internalPages?.Shop?.DEFAULT_PAGE_SIZE)].map((_d, _i) => {
                        return <ProductCardDimmer key={_i} />;
                      })}
                    </>)}
                    {productsResults?.map((searchItem) => (
                      searchItem?.inStock && searchItem?.status !== "discontinued" &&
                      <ProductCard product={searchItem} key={searchItem._id} />
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
                  pageCount={pageCountProducts}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChangeProducts}
                  containerClassName={'pagination'}
                  // subContainerClassName={"pages pagination"}
                  activeClassName={'active'}
                  forcePage={pageOffsetProducts}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel className={classNames('bg-gray-100 rounded-xl p-3')}>
              <div className="container mx-auto sm:px-4 pb-40">
              {isFetchingDesigns && (
              <>
                {[...new Array(internalPages.Collages.DEFAULT_PAGE_SIZE)].map((_d, i) => {
                
                  return (
                    <div key={_d} className={`relative col-span-2 row-span-1`}>
                      <CollageCardDimmer />
                    </div>
                  );
                })}
              </>
            )}
                {!designsResults?.length ? (
                  <div className="col-span-12">
                    <EmptyState title="No matching design sets found" message="" />
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-2 xl:grid-cols-3 xl:gap-2">
                    {designsResults?.map((searchItem) => (
                      <DesignSetCardV2 designData={searchItem} large={false} isMobile key={searchItem?._id} />
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
                  // subContainerClassName={"pages pagination"}
                  activeClassName={'active'}
                  forcePage={pageOffsetDesigns}
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
