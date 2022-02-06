// import { PushEvent } from '@utils/analyticsLogger';
import publicRoutes from '@utils/constants/api/publicRoutes';
import fetcher from '@utils/fetcher';
import React, { useEffect, useState } from 'react';

const fetchSubCatData = async (categoryId) => {
  const subCatRes = await fetcher({ endPoint: `/v1/collageCategories/${categoryId}/subCategories`, method: 'GET' });
  const { data, statusCode } = subCatRes;
  if (statusCode < 300) {
    return {
      data,
      categoryId,
    };
  } else {
    throw new Error();
  }
};

export interface CollageType {
  price?: number;
  _id: string;
  description: string;
  background?: string;
  isActive?: boolean;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  meta: {
    view: {
      _id: string;
      translation: {
        x: number;
        y: number;
      };
      id: string;
      product: string;
      imgSrc: string;
      rotation?: string;
      playgroundScale: {
        height: number;
        width: number;
      };
      scale: {
        height: number;
        width: number;
      };
    }[];
  };
}

interface SubCat {
  category: string;
  subCategory: {
    _id: string;
    name: string;
  };
  isActive: boolean;
  _id: string;
  updatedAt: string;
  createdAt: string;
}
interface SubCatInterface {
  [categoryId: string]: Array<SubCat>;
}

interface CollageCategoryType {
  _id: string;
  name: string;
  slug: string;
  selected?: boolean;
}

export interface RoomSubCategory {
  categoryId: string;
  data: {
    category: string;
    createdAt: string;
    isActive: boolean;
    subCategory: {
      _id: string;
      name: string;
    };
    updatedAt: string;
    _id: string;
  };
}

interface CollageContext {
  isItemLoaded: (index: any) => boolean;
  loadMoreItems: (startIndex: number, endIndex: number) => Promise<void>;
  hasNextPage: boolean;
  data: CollageType[];
  count: number;
  setData: React.Dispatch<React.SetStateAction<CollageType[]>>;
  setCurrentSubCat: React.Dispatch<React.SetStateAction<string>>;
  setActiveCollages: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCollageCategory: React.Dispatch<React.SetStateAction<string>>;
  isActiveCollages: boolean;
  collageCategories: CollageCategoryType[];
  updateCategorySelections: (id: string) => void;
  collageSubCategories: SubCatInterface;
  currentView: string;
  setCurrentView: (viewName: string) => void;
}

export const CollageListContext = React.createContext<CollageContext>({
  setActiveCollages: () => {
    return;
  },
  setCurrentCollageCategory: () => {
    return;
  },
  setCurrentSubCat: () => {
    return;
  },
  isActiveCollages: false,
  isItemLoaded: () => false,
  loadMoreItems: async () => {
    return;
  },
  hasNextPage: true,
  data: [],
  count: 1000,
  setData: () => {
    return;
  },
  collageCategories: [{ _id: '', name: '', slug: '' }],
  updateCategorySelections: () => {
    return;
  },
  collageSubCategories: {},
  currentView: 'grouped',
  setCurrentView: () => {
    return;
  },
});

interface Filter {
  price: Array<string>;
  isActive: boolean;
  category?: Array<string>;
}
interface FilterInterface {
  searchText: string;
  sort: string;
  wildcard: boolean;
  filters: Filter;
}
export const defaultFilters: FilterInterface = {
  filters: {
    price: ['1', '500000'],
    isActive: true,
  },
  searchText: '',
  sort: 'createdAt',
  wildcard: true,
};

const CollageListContextProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CollageType[]>([]);
  const [count, setCount] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isActiveCollages, setActiveCollages] = useState(false);
  const [collageCategories, setCollageCategories] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [collageSubCategories, setSubCategories] = useState({});
  const [currentView, setCurrentView] = useState('grouped');
  const [currentSubCat, setCurrentSubCat] = useState('');
  const [currentCollageCategory, setCurrentCollageCategory] = useState('');

  const updateCategorySelections = (categoryId) => {
    const clickedCategory = '';
    const updatedSelections = [...collageCategories].map((category) => {
      if (category?._id === categoryId) {
        return { ...category, selected: true };
      }

      return { ...category, selected: false };
    });
    // PushEvent({
    //   category: `Filter Design Set`,
    //   action: `Filter Design Set | ${clickedCategory}`,
    //   label: 'Edit Design Set',
    // });
    setCollageCategories(updatedSelections);
  };
  useEffect(() => {
    (async () => {
      const categoryRes = await fetcher({ endPoint: publicRoutes?.collageCategoryRoute, method: 'GET' });
      const { data, statusCode } = categoryRes;
      if (statusCode < 301) {
        const filtered = data?.map((item) => {
          if (!currentCollageCategory) {
            if (item?.name?.toLowerCase() === 'living room') {
              return { _id: item?._id, name: item?.name, slug: item?.slug, selected: true };
            }

            return { _id: item?._id, name: item?.name, slug: item?.slug, selected: false };
          } else {
            if (item?._id === currentCollageCategory) {
              return { _id: item?._id, name: item?.name, slug: item?.slug, selected: true };
            }

            return { _id: item?._id, name: item?.name, slug: item?.slug, selected: false };
          }
        });
        const selectedIndex = filtered?.findIndex((item) => item?.selected);
        const removed = filtered.splice(selectedIndex, 1);
        filtered.unshift(removed[0]);
        setCollageCategories(filtered);
        Promise.all(filtered.map((collage) => fetchSubCatData(collage?._id))).then((subCatData) => {
          const obj = {};
          subCatData.forEach((item: RoomSubCategory) => {
            obj[item?.categoryId] = item?.data;
          });
          setSubCategories(obj);
        });
      }
    })();
  }, [currentCollageCategory]);

  // fetch collage categories and subCategories

  const loadMoreItems = async (startIndex: number, endIndex: number): Promise<void> => {
    if (loading) {
      return;
    }
    setLoading(true);
    const endPoint = `/v1/collages/search?skip=${startIndex}&limit=${endIndex - startIndex + 1}`;
    const resData = await fetcher({
      endPoint,
      method: 'POST',
      body: filters,
    });
    const copyData = [...data];
    if (resData.statusCode <= 300) {
      const responseData = resData?.data?.data || [];
      setCount(resData?.data?.count as number);
      for (let i = startIndex, j = 0; i <= endIndex; i += 1, j += 1) {
        copyData[i] = responseData[j];
      }
      setData(
        copyData.filter((copy) => {
          return copy;
        })
      );
      if (copyData.length < count) {
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setCount(50);
    setData([]);
    setHasNextPage(true);
    loadMoreItems(0, 50);
  }, [filters]);

  useEffect(() => {
    const selectedCategories = collageCategories.filter((item) => item?.selected);
    if (currentView === 'list') {
      if (selectedCategories?.length && currentSubCat?.length) {
        const categoryQuery = selectedCategories.map((item) => item?.name.toLowerCase());
        const updatedFilters = {
          ...filters,
          filters: {
            ...filters?.filters,
            category: categoryQuery,
            subCategory: [currentSubCat],
          },
        };
        setFilters(updatedFilters);
      } else {
        const updatedFilters = { ...filters };
        if (updatedFilters?.filters?.category) {
          delete updatedFilters.filters.category;
        }
        setFilters(updatedFilters);
      }
    }
  }, [collageCategories, currentView, currentSubCat]);

  const isItemLoaded = (index: number): boolean => {
    return !!data[index];
  };

  return (
    <CollageListContext.Provider
      value={{
        isItemLoaded,
        loadMoreItems,
        hasNextPage,
        data,
        count,
        setData,
        isActiveCollages,
        setActiveCollages,
        collageCategories,
        updateCategorySelections,
        collageSubCategories,
        currentView,
        setCurrentView,
        setCurrentSubCat,
        setCurrentCollageCategory,
      }}
    >
      {children}
    </CollageListContext.Provider>
  );
};

export const useCollageListContext = (): CollageContext => {
  return React.useContext(CollageListContext);
};

export default CollageListContextProvider;
