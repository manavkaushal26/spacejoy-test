import { useDesignSetAssetContext } from '@store/DesignSetAssetProvider';
import mainCategories from '@utils/constants/DesignSets/mainCategory';
import { priceToLocaleString } from '@utils/helpers';
import React from 'react';
import PlaygroundAssetDisplay from './PlaygroundAssetDisplay';

const DesignSetDetails = ({ correctedCollageName, collageData }) => {
  const { groupedData } = useDesignSetAssetContext();

  const furnitureGroupData = groupedData?.[mainCategories[0]?.id];

  return (
    <div className="my-8 ">
      <div className="grid border-x-2 border-t-2 border-gray-300 rounded-x-xl rounded-t-xl overflow-hidden  items-center grid-cols-12 gap-8 py-16 px-8">
        <div className="col-span-9 xs:col-span-2">
          <h1 className=" text-3xl capitalize">{correctedCollageName}</h1>
          {!!collageData?.description && <p className="text-lg mt-6">{collageData?.description}</p>}
        </div>
        <div className="flex col-span-3 flex-col items-end justify-center  rounded-xl">
          <h2 className="text-3xl">{priceToLocaleString(furnitureGroupData?.price)}</h2>
          {/* <a
      href="#assets"
      className="px-5 py-2 m-2 text-xl text-white bg-gray-900 border border-gray-900 rounded-lg hover:bg-gray-700"
    >
      Shop Set
    </a> */}
        </div>
      </div>
      <PlaygroundAssetDisplay />
    </div>
  );
};

export default DesignSetDetails;
