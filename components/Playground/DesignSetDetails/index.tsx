import { useDesignSetAssetContext } from '@store/DesignSetAssetProvider';
import mainCategories from '@utils/constants/DesignSets/mainCategory';
import { priceToLocaleString } from '@utils/helpers';
import React, { useMemo } from 'react';
import PlaygroundAssetDisplay from './PlaygroundAssetDisplay';

const DesignSetDetails = ({ correctedCollageName, collageData }) => {
  const { groupedData } = useDesignSetAssetContext();

  const furnitureGroupData = groupedData?.[mainCategories[0]?.id];
  const priceOfSet = useMemo(() => {
    return mainCategories.reduce((acc, curr) => {
      if (!acc) {
        return groupedData?.[curr?.id]?.price;
      }

      return acc;
    }, 0);
  }, []);

  return (
    <div className="my-8 ">
      <div className="grid items-center grid-cols-12 gap-8 px-8 py-16 overflow-hidden border-t-2 border-gray-300 border-x-2 rounded-x-xl rounded-t-xl">
        <div className="col-span-9 xs:col-span-2">
          <h1 className="text-3xl capitalize ">{correctedCollageName}</h1>
          {!!collageData?.description && <p className="mt-6 text-lg">{collageData?.description}</p>}
        </div>
        <div className="flex flex-col items-end justify-center col-span-3 rounded-xl">
          <h2 className="text-3xl">{priceToLocaleString(priceOfSet)}</h2>
          {/* <a
      href="#assets"
      className="px-5 py-2 m-2 text-xl text-white bg-gray-900 border border-gray-900 rounded-lg hover:bg-gray-700"
    >
      Shop Set
    </a> */}
        </div>
      </div>
      <PlaygroundAssetDisplay collageId={collageData?._id} />
    </div>
  );
};

export default DesignSetDetails;
