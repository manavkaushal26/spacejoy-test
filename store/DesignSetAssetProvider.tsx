import { AssetType } from '@components/Collection/AssetType';
import mainCategories from '@utils/constants/DesignSets/mainCategory';
import { onlyUnique } from '@utils/helpers';
import React, { useEffect, useState } from 'react';

const DesignSetAssetContext = React.createContext({
  assets: {},
  groupedData: {},
  replaceProduct: (newProductId: string, oldProductId: string, productData: AssetType) => {},
});

interface DesignSetAssetProviderProps {
  initialAssets: Record<string, AssetType>;
  initialGroupedData: Record<string, { assets: AssetType[]; price: number }>;
}

const DesignSetAssetProvider: React.FC<DesignSetAssetProviderProps> = ({
  children,
  initialAssets = {},
  initialGroupedData,
}) => {
  const [assets, setAssets] = useState<Record<string, AssetType>>(initialAssets);

  const [groupedData, setGroupedData] = useState(initialGroupedData);

  const [initialLoad, setInitalLoad] = useState(true);

  const replaceProduct = (newProductId: string, oldProductId: string, productData: AssetType) => {
    if (newProductId !== oldProductId) {
      const newAssets = { ...assets };

      newAssets[newProductId] = productData;
      delete newAssets[oldProductId];
      setAssets(newAssets);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setInitalLoad(false);
    } else {
      const uniqueAssetList =
        Object.keys(assets)
          ?.filter(onlyUnique)
          .filter((key) => key !== 'price') || [];

      const mainCategoryList = mainCategories.map((value) => value.id);

      const groupedAssetList = uniqueAssetList.reduce((acc, assetId) => {
        const asset = assets[assetId];
        const category = asset?.meta?.category?._id;
        const isMainCategory = mainCategoryList.includes(category);
        const categoryEntry = acc[isMainCategory ? category : 'addOn'] || { assets: [], price: 0 };
        categoryEntry.assets.push(asset);
        categoryEntry.price += asset?.price;
        acc[isMainCategory ? category : 'addOn'] = categoryEntry;

        return acc;
      }, {});
      setGroupedData(groupedAssetList);
    }
  }, [assets]);

  return (
    <DesignSetAssetContext.Provider value={{ assets, groupedData, replaceProduct }}>
      {children}
    </DesignSetAssetContext.Provider>
  );
};

export const useDesignSetAssetContext = () => {
  const context = React.useContext(DesignSetAssetContext);
  if (!context) {
    throw new Error('useDesignSetAssetContext must be used within a DesignSetAssetProvider');
  }

  return context;
};

export default DesignSetAssetProvider;
