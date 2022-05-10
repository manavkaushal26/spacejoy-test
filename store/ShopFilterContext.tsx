import { convertFilterToUrlPath, convertUrlPathToFilter } from '@utils/helpers';
import { fetchAllFilters } from '@utils/shop/helpers';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const ShopFilterContext = createContext<Record<any, any>>({
  filters: {
    retailer: [{ _id: '', name: '', selected: false }],
    subCategory: [{ _id: '', selected: false, verticals: [{ _id: '' }] }],
    category: [{ _id: '', selected: false, subCategories: [{ _id: '' }] }],
    vertical: [{ _id: '', name: '', selected: false, subcategory: 'string' }],
    price: [0, 5000],
  },
  updateFilter: (id: string, type: string, removeKeys?: string[]) => {
    return;
  },
  addArrayQueryParam: ({}) => {
    return;
  },
});

interface RetailerType {
  _id: string;
  selected: boolean;
  name: string;
  preferred?: boolean;
}
interface SubcategoryType {
  _id: string;
  selected: boolean;
  verticals: Array<VerticalType>;
}
interface CategoryType {
  _id: string;
  selected: boolean;
  subCategories: Array<SubcategoryType>;
  isPublic: boolean;
}
interface VerticalType {
  _id: string;
  selected: boolean;
  subcategory: string;
  name: string;
}
interface FilterType {
  retailer: Array<RetailerType>;
  subCategory: Array<SubcategoryType>;
  category: Array<CategoryType>;
  vertical: Array<VerticalType>;
  price: Array<number>;
  discount?: Array<number>;
}
interface AssetFilterType {
  retailers: {
    list: Array<RetailerType>;
    count?: number;
  };
  categoryTree: Array<CategoryType>;
}

const ShopFilterContextProvider = ({ children }) => {
  const [shopFilters, setShopFilters] = useState<AssetFilterType>();
  const [filters, setFilters] = useState<FilterType>({
    retailer: [{ _id: '', name: '', selected: false }],
    subCategory: [{ _id: '', verticals: [{ _id: '', name: '', selected: false, subcategory: '' }], selected: false }],
    vertical: [{ _id: '', name: '', selected: false, subcategory: '' }],
    category: [
      {
        _id: '',
        selected: false,
        subCategories: [
          { _id: '', selected: false, verticals: [{ _id: '', name: '', selected: false, subcategory: '' }] },
        ],
        isPublic: true,
      },
    ],
    price: [0, 5000],
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const allFilters = await fetchAllFilters(false);

      setShopFilters(allFilters);
    })();
  }, []);

  useEffect(() => {
    const categories = [...(shopFilters?.categoryTree || [])]
      .filter((item) => item.isPublic)
      .map((item) => {
        return { ...item, type: 'category' };
      });

    const subCategories = [...(shopFilters?.categoryTree || [])]
      ?.reduce((acc, category) => {
        return [...acc, ...category?.subCategories];
      }, [])
      .map((item) => {
        const currentSubCatQuery = ((router?.query?.subcategory || '') as string).split('::');
        if (currentSubCatQuery?.indexOf(item?.name) > -1) {
          return { ...item, type: 'subCategory', selected: true };
        }

        return { ...item, type: 'subCategory', selected: false };
      });
    const verticals = [...subCategories]
      ?.reduce((acc, subCategory) => {
        return [...acc, ...subCategory?.verticals];
      }, [])
      .map((item) => {
        const currentVertical =
          router?.query?.shopParams && router?.query?.shopParams?.length > 1 ? router?.query?.shopParams[1] : '';

        if (convertUrlPathToFilter(currentVertical).toLowerCase() === item?.name?.toLowerCase()) {
          return { ...item, type: 'vertical', selected: true };
        }

        return { ...item, type: 'vertical', selected: false };
      });

    const retailers = shopFilters?.retailers?.list
      ?.filter((item) => item.preferred)
      .map((item) => {
        const currentRetailerQuery = ((router?.query?.retailer || '') as string).split('::');
        if (currentRetailerQuery?.indexOf(item?.name) > -1) {
          return { ...item, type: 'retailer', selected: true };
        }

        return { ...item, type: 'retailer', selected: false };
      });
    const priceQuery = router?.query?.price || '';

    const priceFilter = (priceQuery as string)?.split('::').map((item) => (item ? parseInt(item) : 0));

    setFilters({
      category: categories,
      subCategory: subCategories,
      vertical: verticals,
      retailer: retailers,
      price: priceFilter,
    });
  }, [
    router?.query?.subcategory,
    router?.query?.vertical,
    router?.query?.retailer,
    shopFilters,
    router?.query?.price,
    router?.query?.shopParams,
  ]);

  const updateFilter = (itemId, type, removeKeys = []) => {
    // selecting a new category or subcategory removes all query params and creates new url
    const filterOfType = filters[type];
    const chosenFilterObject = filterOfType?.filter((item) => item?._id === itemId);
    if (type === 'category' || type === 'subCategory') {
      const pathname =
        chosenFilterObject && chosenFilterObject.length
          ? `/${chosenFilterObject[0]?.name?.replace(/\s+/g, '-').replace(/\//g, '_')}`
          : '/shop';

      router.push(
        {
          query: {},
          pathname: pathname?.toLowerCase(),
        },
        undefined,
        { shallow: true }
      );
    } else if (type === 'retailer') {
      const updatedRetailerFilter = filterOfType?.map((item) => {
        if (item?._id === itemId) {
          return { ...item, selected: !item?.selected };
        }

        return { ...item };
      });
      const retailers = updatedRetailerFilter
        .filter((item) => item?.selected)
        ?.map((item) => item?.name)
        ?.join('::');

      const queryObj = { ...router?.query, retailer: retailers };
      if (!retailers) delete queryObj.retailer;
      router.push(
        {
          query: queryObj,
          pathname: router?.pathname,
        },
        undefined,
        { shallow: true }
      );
    } else if (type === 'vertical') {
      const updatedVerticalFilter = filterOfType?.map((item) => {
        if (item?._id === itemId) {
          return { ...item, selected: !item?.selected };
        }

        return { ...item, selected: false };
      });

      const verticals = updatedVerticalFilter.filter((item) => item?.selected)?.map((item) => item?.name);
      const verticalName = verticals[0];

      const pathname = verticals?.length
        ? `/${convertFilterToUrlPath(router?.query?.shopParams[0])}/${convertFilterToUrlPath(verticalName)}`
        : `/${convertFilterToUrlPath(router?.query?.shopParams[0])}`;
      router.push(
        {
          query: {},
          pathname: pathname?.toLowerCase(),
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const addArrayQueryParam = ({ name, min, max, remove }) => {
    const currentQueryParam = router?.query;
    let updatedQueryParam = {};
    if (remove) {
      updatedQueryParam = {
        ...currentQueryParam,
      };
      delete updatedQueryParam[name];
    } else {
      updatedQueryParam = {
        ...currentQueryParam,
        [name]: `${min}::${max}`,
      };
    }
    router.push(
      {
        query: updatedQueryParam,
        pathname: router?.pathname,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <ShopFilterContext.Provider
      value={{
        filters,
        updateFilter,
        addArrayQueryParam,
      }}
    >
      {children}
    </ShopFilterContext.Provider>
  );
};

export const useShopFilterContext = () => {
  return useContext(ShopFilterContext);
};

export default ShopFilterContextProvider;
