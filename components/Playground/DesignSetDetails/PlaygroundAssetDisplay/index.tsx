import CollageProductList from '@components/Collages/CollageProductList';
import { useDesignSetAssetContext } from '@store/DesignSetAssetProvider';
import mainCategories from '@utils/constants/DesignSets/mainCategory';
import { priceToLocaleString } from '@utils/helpers';
import React from 'react';

const PlaygroundAssetDisplay = ({ collageId }) => {
  const { groupedData } = useDesignSetAssetContext();

  return (
    <div className="overflow-hidden bode">
      {mainCategories.slice(0, 1).map(({ id }) => {
        const groupData = groupedData?.[id];

        return (
          groupData && (
            <div key={id} className="col-span-12 px-8 pt-8 mb-8 bg-gray-100 border-2 border-gray-300 rounded-b-xl">
              <CollageProductList assets={groupedData?.[id]?.assets} collageId={collageId} />
            </div>
          )
        );
      })}
      <div className="px-8 overflow-hidden bg-gray-100 border-2 border-gray-300 divide-y rounded-xl">
        {mainCategories.slice(1, 3).map(({ id, name }) => {
          const groupData = groupedData?.[id];

          return (
            groupData?.assets?.length > 0 &&
            groupData?.price && (
              <div key={id} className="col-span-12 ">
                <div className="flex justify-between py-8">
                  <h3 className="text-2xl font-bold">{name}</h3>
                  <span className="text-2xl font-bold">{priceToLocaleString(groupData?.price)}</span>
                </div>
                <CollageProductList assets={groupData?.assets} collageId={collageId} />
              </div>
            )
          );
        })}
        {groupedData?.['addOn']?.assets?.length > 0 && groupedData?.['addOn']?.price && (
          <div className="col-span-12">
            <div className="flex justify-between py-8">
              <h3 className="text-2xl font-bold">Complete the look</h3>

              <span className="text-2xl font-bold">{priceToLocaleString(groupedData?.['addOn']?.price)}</span>
            </div>

            <CollageProductList assets={groupedData?.['addOn']?.assets} collageId={collageId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaygroundAssetDisplay;
