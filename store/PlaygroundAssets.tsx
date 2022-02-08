import { RoomImageList } from '@components/Playground/BgSelector';
import fetcher from '@utils/fetcher';
import AssetType from '@utils/types/AssetType';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NavSelectContext } from 'store/NavSelect';
import { useDesignSetAssetContext } from './DesignSetAssetProvider';
import { SelectedIdContext } from './SelectedId';

// ========================= TYPES =========================

export interface PlaygroundAssetType {
  background?: string;
  _id?: string;
  loaded?: boolean;
  type?: string;
  data?: Array<PlaygroundAssetType>;
  id: string;
  src?: string;
  x?: number;
  y?: number;
  height?: number;
  assetId?: string;
  width?: number;
  depth?: number;
  isDragging?: false;
  stitchedAssetImage?: string;
  count?: number;
  boxSize?: number;
  rotationValue?: string;
  productThumbnail?: string;
  dimension?: {
    height: number;
    width: number;
    depth?: number;
  };
  playgroundHeight?: number;
  playgroundWidth?: number;
  renderImages?: { cdn: string }[];
  price?: number;
  selected?: boolean;
  displayPrice?: string;
  retailer?: string;
  name?: string;
  vertical?: string;
  categoryId?: string;
}

interface PlaygroundAssetContextType {
  PlaygroundAssets: PlaygroundAssetType[];
  setPlaygroundAssets: React.Dispatch<React.SetStateAction<PlaygroundAssetType[]>>;
  deleteAsset: () => void;
  updateAsset: (data: PlaygroundAssetType) => void;
  moveAssetBehind: () => void;
  moveAssetForward: () => void;
  moveAssetTop: () => void;
  moveAssetLast: () => void;
  clearBoard: () => void;
  bg: {
    bgImgUrl: {
      value: string;
      type: string;
    };
    setBgImgUrl: (value: string, type: string) => void;
  };
  rotateAndSaveRotation: (selectedId: string, rotationValue: string) => void;
  getRotationValue: (selectedId: string) => number;
  isCollageActive: boolean;
  selectedCategoryId: string;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
  selectedSubCategoryId: string;
  setSelectedSubCategoryId: React.Dispatch<React.SetStateAction<string>>;
  setCollageActiveStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaygroundTotal: React.Dispatch<React.SetStateAction<number>>;
  playgroundTotal: number;
  activeCollages: Array<string>;
  setActiveCollages: React.Dispatch<React.SetStateAction<Array<string>>>;
  copyAsset: (selectedId: string) => void;
  unGroupAssets: () => void;
  updateCurrentVerticalForRecommendation: (selectedId: string) => void;
  currentVerticalForRecommendations: string;
  fetchProductReplacement: (assetId: string, product: AssetType) => Promise<void>;
  currentlySelectedProduct: (selectedId: string) => PlaygroundAssetType;
}

// ========================= TYPES =========================

const PlaygroundAssetsContext = React.createContext<PlaygroundAssetContextType>({
  activeCollages: [''],
  setActiveCollages: () => {
    return;
  },
  playgroundTotal: 0,
  setPlaygroundTotal: () => {
    return;
  },
  setCollageActiveStatus: () => {
    return;
  },
  setSelectedSubCategoryId: () => {
    return;
  },
  selectedSubCategoryId: '',
  setSelectedCategoryId: () => {
    return;
  },
  selectedCategoryId: '',
  isCollageActive: true,
  PlaygroundAssets: [],
  setPlaygroundAssets: () => {
    return;
  },
  deleteAsset: () => {
    return;
  },
  updateAsset: () => {
    return;
  },
  moveAssetBehind: () => {
    return;
  },
  moveAssetForward: () => {
    return;
  },
  moveAssetTop: () => {
    return;
  },
  moveAssetLast: () => {
    return;
  },
  clearBoard: () => {
    return;
  },
  bg: {
    bgImgUrl: {
      value: 'https://res.cloudinary.com/spacejoy/image/upload/v1633589614/spj-v2/DIY/room-bg/final_BR1_ioyrvq.jpg',
      type: 'bg-img',
    },
    setBgImgUrl: () => {
      return;
    },
  },
  rotateAndSaveRotation: () => {
    return;
  },
  getRotationValue: () => {
    return -1;
  },
  copyAsset: () => {
    return [];
  },
  unGroupAssets: () => {
    return;
  },
  updateCurrentVerticalForRecommendation: () => {
    return;
  },
  currentlySelectedProduct: () => {
    return { id: '' };
  },
  currentVerticalForRecommendations: '',
  fetchProductReplacement: (id, product) => {
    return new Promise(() => {
      return { id, product };
    });
  },
});

const initData: PlaygroundAssetType[] = [];

const PlaygroundAssetsContextProvider: React.FC = ({ children }) => {
  const [PlaygroundAssets, setPlaygroundAssets] = useState<PlaygroundAssetType[]>(initData);
  const [selectedId, setSelectedId] = useContext(SelectedIdContext);
  const [bgImgUrl, setBg] = useState({
    value: RoomImageList[27].url,
    type: 'bg-img',
  });
  const [playgroundTotal, setPlaygroundTotal] = useState(0);
  const [currentVerticalForRecommendations, setCurrentProductVertical] = useState('');
  const [activeDesignSetsAsString, setActiveDesignSetsAsString] = useState('');
  const [nav, setNav] = useContext(NavSelectContext);
  const { replaceProduct } = useDesignSetAssetContext();
  const [activeCollages, setActiveCollages] = useState([]);

  useEffect(() => {
    const activeDesignSets = activeCollages?.length ? activeCollages?.join(',') : 'null';
    setActiveDesignSetsAsString(activeDesignSets);
  }, [activeCollages]);

  const updateCurrentVerticalForRecommendation = (selectedId) => {
    // get current Product
    if (selectedId) {
      setNav('recommendations');
      const currentProduct = [...PlaygroundAssets].filter((item) => item?.id === selectedId)[0];
      const { vertical = '', assetId = '' } = currentProduct;
      setCurrentProductVertical(vertical);

      // PushEvent({
      //   category: 'Action Menu - Swap Products',
      //   action: `Click Swap Products | ${activeDesignSetsAsString} | ${assetId}`,
      //   label: 'Edit Design Set',
      // });
    } else {
      setCurrentProductVertical('');
    }
  };

  useEffect(() => {
    if (selectedId && nav === 'recommendations') {
      updateCurrentVerticalForRecommendation(selectedId);
    }
  }, [selectedId, nav]);

  const setBgImgUrl = (value, type) => {
    setBg({ value, type });
  };

  const getSelectedIndex = (id: string) => {
    for (let i = 0; i <= PlaygroundAssets.length; i++) {
      if (PlaygroundAssets[i]?.id === id) {
        return i;
      }
    }
  };
  React.useEffect(() => {
    const formatted = PlaygroundAssets?.map((item) => {
      if (item?.type === 'collage') {
        return item?.data;
      }

      return { ...item };
    });
    const mergedArray = [].concat(...(formatted || []));

    if (!mergedArray.length) {
      setPlaygroundTotal(0);
    } else {
      const currentPlaygroundTotal = mergedArray.reduce((acc, currValue) => {
        return parseFloat(acc) + parseFloat(currValue?.price);
      }, 0);
      setPlaygroundTotal(currentPlaygroundTotal);
    }
  }, [PlaygroundAssets]);

  const updateAsset = (data: PlaygroundAssetType) => {
    const tmpAssetList = [...PlaygroundAssets];
    tmpAssetList.splice(getSelectedIndex(data?.id), 1);
    tmpAssetList.splice(getSelectedIndex(selectedId) - 1, 0, data);
    setPlaygroundAssets(tmpAssetList);
  };

  const deleteAsset = () => {
    const tmpAssetList = [...PlaygroundAssets];

    const chosenAsset = PlaygroundAssets[getSelectedIndex(selectedId)];
    const { assetId = '' } = chosenAsset;
    tmpAssetList.splice(getSelectedIndex(selectedId), 1);
    setPlaygroundAssets(tmpAssetList);
    // PushEvent({
    //   category: 'Action Menu - Delete Product',
    //   action: `Select Delete Product | ${activeDesignSetsAsString} | ${assetId}`,
    //   label: 'Edit Design Set',
    // });
    setSelectedId('');
  };

  const moveAssetBehind = () => {
    const tmpAssetList = [...PlaygroundAssets];
    const tmpItem = tmpAssetList.splice(getSelectedIndex(selectedId), 1);
    tmpAssetList.splice(getSelectedIndex(selectedId) - 1, 0, tmpItem[0]);
    setPlaygroundAssets(tmpAssetList);
    // PushEvent({
    //   category: 'Action Menu - Move Backward',
    //   action: `Move Backward | ${activeDesignSetsAsString}`,
    //   label: 'Edit Design Set',
    // });
  };

  const moveAssetForward = () => {
    const tmpAssetList = [...PlaygroundAssets];
    const tmpItem = tmpAssetList.splice(getSelectedIndex(selectedId), 1);
    tmpAssetList.splice(getSelectedIndex(selectedId) + 1, 0, tmpItem[0]);
    setPlaygroundAssets(tmpAssetList);
    // PushEvent({
    //   category: 'Action Menu - Move Forward',
    //   action: `Move Forward | ${activeDesignSetsAsString}`,
    //   label: 'Edit Design Set',
    // });
  };

  const moveAssetTop = () => {
    const tmpAssetList = [...PlaygroundAssets];
    const tmpItem = tmpAssetList.splice(getSelectedIndex(selectedId), 1);
    tmpAssetList.push(tmpItem[0]);
    setPlaygroundAssets(tmpAssetList);
    // PushEvent({
    //   category: 'Action Menu - Move Up',
    //   action: `Move Up | ${activeDesignSetsAsString}`,
    //   label: 'Edit Design Set',
    // });
  };

  const moveAssetLast = () => {
    const tmpAssetList = [...PlaygroundAssets];
    const tmpItem = tmpAssetList.splice(getSelectedIndex(selectedId), 1);
    tmpAssetList.unshift(tmpItem[0]);
    setPlaygroundAssets(tmpAssetList);
    // PushEvent({
    //   category: 'Action Menu - Move Down',
    //   action: `Move Down | ${activeDesignSetsAsString}`,
    //   label: 'Edit Design Set',
    // });
  };

  const copyAsset = (selectedId) => {
    const selectedIndex = getSelectedIndex(selectedId);
    const selectedItem = [...PlaygroundAssets].filter((item) => item?.id === selectedId)[0];
    const newItem = {
      ...selectedItem,
      id: `in-playground-asset-${PlaygroundAssets.length}-${Math.random()}`,
      x: selectedItem?.x + 100 * Math.random(),
      y: selectedItem?.y + 100 * Math.random(),
    };
    const tmp = [...PlaygroundAssets];
    tmp.splice(selectedIndex + 1, 0, newItem);
    setPlaygroundAssets(tmp);
    // PushEvent({
    //   category: 'Action Menu - Duplicate',
    //   action: `Duplicate Product | ${activeDesignSetsAsString}`,
    //   label: 'Edit Design Set',
    // });
  };

  const clearBoard = () => {
    // PushEvent({
    //   category: 'Action Menu - Clear Canvas',
    //   action: `Select Clear Canvas | ${activeDesignSetsAsString} `,
    //   label: 'Edit Design Set',
    // });
    setPlaygroundAssets([]), setSelectedId('');
  };

  const fetchProductReplacement = async (assetId, productData) => {
    if (selectedId && selectedId.length) {
      try {
        const { data, statusCode } = await fetcher({ endPoint: `/v1/assets/${assetId}/stitchImages`, method: 'GET' });
        const { data: productInfo, statusCode: productFetchStatus } = await fetcher({
          endPoint: '/v1/assets/getAssetsDetail',
          body: {
            assets: [assetId],
            fields: ['price', 'name', 'renderImages', 'retailer', 'dimension', 'meta', 'imageUrl', 'cdn'],
          },
          method: 'POST',
        });
        if (statusCode < 300) {
          const { count, boxSize, image: { originalCdn = '' } = {} } = data;

          const updatedAssets = PlaygroundAssets.map((plAsset) => {
            if (selectedId === plAsset?.id) {
              if (productFetchStatus < 300) {
                replaceProduct(assetId, plAsset.assetId, productInfo[assetId]);
              }

              return {
                ...plAsset,
                ...productData,
                assetId: productData?._id,
                stitchedAssetImage: originalCdn,
                boxSize,
                count,
              };
            }

            return { ...plAsset };
          });
          setPlaygroundAssets(updatedAssets);
          toast.success('Product replaced successfully');
        } else {
          throw new Error();
        }
      } catch {
        toast('Error while swapping. Please try again ', { autoClose: false });
      }
    } else {
      toast('Please select a product to swap ', { autoClose: false });
    }
  };

  const rotateAndSaveRotation = (selectedId: string, rotationValue: string) => {
    const updatedAssets = [...PlaygroundAssets].map((asset) => {
      if (asset?.id === selectedId) {
        return { ...asset, rotationValue };
      }

      return { ...asset };
    });
    setPlaygroundAssets(updatedAssets);
    // PushEvent({
    //   category: 'Action Menu - Rotate',
    //   action: `Rotate Product | ${activeDesignSetsAsString}`,
    //   label: 'Edit Design Set',
    // });
  };

  const getRotationValue = (selectedId) => {
    let rotationValue = 0;
    PlaygroundAssets.forEach((item) => {
      if (item?.type === 'collage') {
        item?.data?.forEach((collageItem) => {
          if (collageItem?.id === selectedId) {
            rotationValue = parseInt(collageItem?.rotationValue, 10) || 0;
          }
        });
      } else if (item?.id === selectedId) {
        rotationValue = parseInt(item?.rotationValue, 10) || 0;
      }
    });

    return rotationValue;
  };
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [isCollageActive, setCollageActiveStatus] = useState(true);
  const unGroupAssets = () => {
    const formatted = PlaygroundAssets.map((item) => {
      if (item?.type === 'collage') {
        return item?.data;
      }

      return { ...item };
    });
    const mergedArray = [].concat(...formatted);
    setPlaygroundAssets(mergedArray);
    setSelectedId(mergedArray[0]?.id);
    // PushEvent({
    //   category: 'Action Menu - Ungroup',
    //   action: `Select Ungroup | ${activeDesignSetsAsString}`,
    //   label: 'Edit Design Set',
    // });
  };
  const currentlySelectedProduct = (selectedId) => {
    if (selectedId) {
      return PlaygroundAssets.filter((item) => item?.id === selectedId)[0];
    }

    return null;
  };

  return (
    <PlaygroundAssetsContext.Provider
      value={{
        PlaygroundAssets,
        setPlaygroundAssets,
        deleteAsset,
        updateAsset,
        moveAssetBehind,
        moveAssetForward,
        moveAssetTop,
        moveAssetLast,
        clearBoard,
        bg: { bgImgUrl, setBgImgUrl },
        rotateAndSaveRotation,
        getRotationValue,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedSubCategoryId,
        setSelectedSubCategoryId,
        isCollageActive,
        setCollageActiveStatus,
        playgroundTotal,
        setPlaygroundTotal,
        activeCollages,
        setActiveCollages,
        copyAsset,
        unGroupAssets,
        updateCurrentVerticalForRecommendation,
        currentVerticalForRecommendations,
        fetchProductReplacement,
        currentlySelectedProduct,
      }}
    >
      {children}
    </PlaygroundAssetsContext.Provider>
  );
};

export const usePlaygroundAssetsContext = (): PlaygroundAssetContextType => {
  return useContext(PlaygroundAssetsContext);
};

export { PlaygroundAssetsContext, PlaygroundAssetsContextProvider };
