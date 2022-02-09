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
        const currentVerticalQuery = ((router?.query?.vertical || '') as string).split('::');

        if (currentVerticalQuery?.indexOf(item?.name) > -1) {
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
  }, [router?.query?.subcategory, router?.query?.vertical, router?.query?.retailer, shopFilters, router?.query?.price]);

  const updateFilter = (itemId, type, removeKeys = []) => {
    const chosenFilterObject = filters[type]?.filter((item) => item?._id === itemId);
    const filtersOfType = ((router?.query[type] || '') as string).split('::');

    const currentFiltersOfSameType = filtersOfType?.length === 1 && !filtersOfType[0]?.length ? [] : filtersOfType;
    const index = currentFiltersOfSameType.indexOf(chosenFilterObject[0]?.name);
    if (index > -1) {
      currentFiltersOfSameType.splice(index, 1);
    } else {
      currentFiltersOfSameType.push(chosenFilterObject[0]?.name);
    }

    const queryType = type === 'subCategory' ? 'subcategory' : type;

    const updatedQueryParam = {
      [queryType]: currentFiltersOfSameType.join('::'),
    };
    const finalQuery = { ...router?.query, ...updatedQueryParam };

    const filterFields = ['category', 'subcategory', 'price', 'vertical', 'page', 'retailer'];
    removeKeys.map((key) => delete finalQuery[key]);

    const updated = Object.keys(finalQuery)?.reduce((acc, curr) => {
      if (finalQuery[curr]?.length && filterFields?.indexOf(curr) > -1) {
        acc[curr] = finalQuery[curr];
      }

      return acc;
    }, {});

    router.push(
      {
        query: { ...updated },
        pathname: '/shop',
      },
      undefined,
      { shallow: true }
    );
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
