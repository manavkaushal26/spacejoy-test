import { AssetType } from '@components/Collection/AssetType';
import fetcher from '@utils/fetcher';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

const host = 'https://pinteresting.spacejoy.com';

const bbEndPoint = `${host}/detectBB`;

const multiAssetEndpoint = '/v1/assets/getAssetsDetail';

export interface BoxShape {
  similarAssetIds: string[];
  productCategory: string;
  queryProductUrl: string;
  boundingBoxCoordinates: number[][];
}

interface UniqueBoxShape extends BoxShape {
  unique: boolean;
}

interface BoundingBoxShape {
  results: BoxShape[];
  queryImageSize: [number, number];
}

interface useSearchProductsWithImageType {
  imgSrc: string;
  searchQuery: string;
}

interface UseSearchProductsWithImageTypeContext {
  loading: {
    findingProducts: boolean;
    loadingProducts: boolean;
  };
  boundingBoxData: BoundingBoxShape;
  setSelectedBox: Dispatch<SetStateAction<BoxShape>>;
  selectedBox: BoxShape;
  products: AssetType[];
  repeatMarkedCategories: UniqueBoxShape[];
  searchQuery: string;
  categoryHues: Record<string, number>;
}

const SearchProductsWithImageContext = createContext<UseSearchProductsWithImageTypeContext>({
  loading: {
    findingProducts: false,
    loadingProducts: false,
  },
  boundingBoxData: {
    results: [],
    queryImageSize: [undefined, undefined],
  },
  setSelectedBox: () => {
    return;
  },
  selectedBox: {
    similarAssetIds: [],
    productCategory: '',
    queryProductUrl: '',
    boundingBoxCoordinates: [[]],
  },
  products: [],
  repeatMarkedCategories: [],
  searchQuery: '',
  categoryHues: {},
});

const UseSearchProductsWithImageProvider: React.FC<useSearchProductsWithImageType> = ({
  imgSrc,
  children,
  searchQuery,
}) => {
  const [loading, setLoading] = useState({
    findingProducts: false,
    loadingProducts: false,
  });

  const [boundingBoxData, setBoundingBoxData] = useState<BoundingBoxShape>({
    results: [],
    queryImageSize: [undefined, undefined],
  });
  const [selectedBox, setSelectedBox] = useState<BoxShape>(null);

  const [products, setProducts] = useState<AssetType[]>([]);
  const getBoundingBoxes = async () => {
    setLoading({
      findingProducts: true,
      loadingProducts: false,
    });
    const apiEndpoint = `${bbEndPoint}?image_url=${imgSrc}`;
    try {
      const response = await fetcher({ hasBaseUrl: true, endPoint: apiEndpoint, method: 'GET' });
      setBoundingBoxData(response?.data);
      setLoading({
        findingProducts: false,
        loadingProducts: false,
      });
    } catch (e) {
      setLoading({
        findingProducts: false,
        loadingProducts: false,
      });
      // console.log(e);
    }
  };

  const getAssetData = async (assetIdList) => {
    setLoading({
      findingProducts: false,
      loadingProducts: true,
    });
    const endPoint = multiAssetEndpoint;

    const response = await fetcher({
      endPoint,
      method: 'POST',
      body: {
        assets: assetIdList,
        fields: [
          'price',
          'dimension',
          'currency',
          'retailer',
          '_id',
          'meta',
          'name',
          'cdn',
          'retailLink',
          'retailerId',
          'inStock',
          'spriteAvailable',
        ],
      },
    });
    if (response.statusCode <= 300) {
      setProducts(response?.data);
    }
    setLoading({
      findingProducts: false,
      loadingProducts: false,
    });
  };

  const repeatMarkedCategories: UniqueBoxShape[] = useMemo(() => {
    const addedCategories = [];

    return (boundingBoxData?.results || [])
      ?.filter((box) => box.similarAssetIds.length > 0)
      ?.reduce((acc: UniqueBoxShape[], data) => {
        if (!addedCategories.includes(data?.productCategory)) {
          addedCategories.push(data?.productCategory);
          const uniqueKeyAddedObj = { ...data, unique: true };

          return [...acc, uniqueKeyAddedObj];
        }
        const uniqeuKeyAddedObj = { ...data, unique: false };

        return [...acc, uniqeuKeyAddedObj];
      }, []);

    // console.log(`boundingBoxData`, boundingBoxData);
  }, [boundingBoxData?.results]);

  const categoryHues = useMemo(() => {
    // generate colors for each category
    const colors = repeatMarkedCategories.reduce((acc, data) => {
      if (!acc?.[data?.productCategory]) {
        const hue = Math.floor(Math.random() * 256);

        return {
          ...acc,
          [data?.productCategory]: hue,
        };
      }

      return { ...acc };
    }, {});
    setSelectedBox(repeatMarkedCategories[0]);

    return colors;
  }, [repeatMarkedCategories]);

  useEffect(() => {
    if (selectedBox?.similarAssetIds?.length) getAssetData(selectedBox?.similarAssetIds?.slice(0, 79));
  }, [selectedBox?.similarAssetIds]);

  useEffect(() => {
    if (imgSrc) getBoundingBoxes();
  }, [imgSrc]);

  return (
    <SearchProductsWithImageContext.Provider
      value={{
        loading,
        boundingBoxData,
        setSelectedBox,
        selectedBox,
        products,
        repeatMarkedCategories,
        searchQuery,
        categoryHues,
      }}
    >
      {children}
    </SearchProductsWithImageContext.Provider>
  );
};

export const useSearchProductsWithImageContext = (): UseSearchProductsWithImageTypeContext => {
  return useContext(SearchProductsWithImageContext);
};

export default UseSearchProductsWithImageProvider;
