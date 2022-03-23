import fetcher from '@utils/fetcher';
import AssetType from '@utils/types/AssetType';
import AssetStatus from '@utils/types/AssetType/StatusEnum';
import React, { useContext, useEffect, useState } from 'react';
import { PlaygroundAssetsContext } from './PlaygroundAssets';
import { SelectedIdContext } from './SelectedId';

export const assetStoreInitialState = {
  status: AssetStatus.active,
  retailer: [],
  price: [0, 50000],
  height: [0, 360],
  width: [0, 360],
  depth: [0, 360],
  wildcard: false,
  category: [],
  subCategory: [],
  verticals: [],
  preferredRetailer: true,
};

interface RecommendationsContext {
  setFilters: (filterValues: typeof assetStoreInitialState) => void;
  isItemLoaded: (index: any) => boolean;
  loadMoreItems: (startIndex: number, endIndex: number) => Promise<void>;
  hasNextPage: boolean;
  data: AssetType[];
  count: number;
  filter: typeof assetStoreInitialState;
  resetFilters: () => void;
  loading: boolean;
}

export const RecommendationsListContext = React.createContext<RecommendationsContext>({
  setFilters: () => false,
  isItemLoaded: () => false,
  loadMoreItems: async () => {
    return;
  },
  hasNextPage: true,
  data: [],
  count: 1000,
  filter: assetStoreInitialState,
  resetFilters: () => {
    return;
  },
  loading: false,
});

export const convertToFeet = (value: number): number => {
  return parseFloat((value / 12).toFixed(8));
};

const RecommendationsListContextProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AssetType[]>([]);
  const [filter, setFilter] = useState(assetStoreInitialState);

  const [count, setCount] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [selectedId] = useContext(SelectedIdContext);
  const { currentVerticalForRecommendations, updateCurrentVerticalForRecommendation } =
    useContext(PlaygroundAssetsContext);
  const verticalRef = React.useRef(null);
  useEffect(() => {
    if (!currentVerticalForRecommendations || !selectedId) {
      setData([]);
      setHasNextPage(false);
      setCount(0);
    } else if (currentVerticalForRecommendations && selectedId) {
      if (verticalRef?.current !== currentVerticalForRecommendations) {
        // setFilters({ ...assetStoreInitialState, verticals: [currentVerticalForRecommendations] });

        setCount(50);
        setData([]);
        setHasNextPage(true);
        loadMoreItems(0, 50);
        verticalRef.current = currentVerticalForRecommendations;
      }
    }
  }, [currentVerticalForRecommendations, selectedId]);
  useEffect(() => {
    if (!selectedId) {
      updateCurrentVerticalForRecommendation('');
      verticalRef.current = '';
    }
  }, [selectedId]);

  const loadMoreItems = async (startIndex: number, endIndex: number): Promise<void> => {
    // if (loading || !selectedId) {
    //   return;
    // }

    setLoading(true);
    // const endPoint = `/v1/assets/search?skip=${startIndex}&limit=${endIndex - startIndex + 1}`;
    // const body = {
    //   searchText: '',
    //   sort: 'createdAt',
    //   wildcard: filter?.wildcard,
    //   filters: {
    //     retailer: filter.retailer,
    //     category: filter.category,
    //     subcategory: filter.subCategory,
    //     vertical: filter.verticals,
    //     price: filter.price,
    //     depth: filter.depth.map(convertToFeet),
    //     width: filter.width.map(convertToFeet),
    //     height: filter.height.map(convertToFeet),
    //     status: 'active',
    //     spriteAvailable: true,
    //   },
    //   projectId: 'randomString',
    //   spriteAvailable: true,
    // };
    const endPoint = 'https://recomender.spacejoy.com/v1/productalternatives/predict';
    const body = {
      asset_id: currentVerticalForRecommendations,
      canvasAvailability: true,
    };

    const resData = await fetcher({
      endPoint,
      method: 'POST',
      body: body,
      hasBaseUrl: true,
    });
    const copyData = [...data];
    if (resData.statusCode <= 300) {
      // const responseData = resData?.data?.hits || [];
      const responseData = resData?.data?.topSimilarAssets || [];

      setCount((resData?.data?.total || 10) as number);

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

  // useEffect(() => {
  //   const resetData = () => {
  //     setCount(50);
  //     setData([]);
  //     setHasNextPage(true);
  //     loadMoreItems(0, 50);
  //   };
  //   if (filter?.verticals?.length) {
  //     resetData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filter?.verticals]);

  const setFilters = (filterValues) => {
    setFilter({
      ...filter,
      ...filterValues,
    });
  };

  const resetFilters = () => {
    setFilter(assetStoreInitialState);
  };

  const isItemLoaded = (index: number): boolean => {
    return !!data[index];
  };

  return (
    <RecommendationsListContext.Provider
      value={{
        setFilters,
        resetFilters,
        isItemLoaded,
        loadMoreItems,
        hasNextPage,
        data,
        count,
        filter,
        loading,
      }}
    >
      {children}
    </RecommendationsListContext.Provider>
  );
};

export const useRecommendationsListContext = (): RecommendationsContext => {
  return React.useContext(RecommendationsListContext);
};

export default RecommendationsListContextProvider;
