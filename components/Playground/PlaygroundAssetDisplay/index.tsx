import CollageProductList from '@components/Collages/CollageProductList';
import { useDesignSetAssetContext } from '@store/DesignSetAssetProvider';
import mainCategories from '@utils/constants/DesignSets/mainCategory';
import { priceToLocaleString } from '@utils/helpers';
import React from 'react';

const PlaygroundAssetDisplay = () => {
  const { groupedData } = useDesignSetAssetContext();

  return (
    <div className=" bode overflow-hidden  ">
      {mainCategories.slice(0, 1).map(({ id }) => {
        const groupData = groupedData?.[id];

        return (
          groupData && (
            <div key={id} className="col-span-12 border-2 border-gray-300 bg-gray-100 px-8 rounded-b-xl mb-8 pt-8">
              <CollageProductList assets={groupedData?.[id]?.assets} />
            </div>
          )
        );
      })}
      <div className="border-2 border-gray-300 bg-gray-100 px-8  divide-y rounded-xl overflow-hidden">
        {mainCategories.slice(1, 3).map(({ id, name }) => {
          const groupData = groupedData?.[id];

          return (
            groupData && (
              <div key={id} className="col-span-12  ">
                <div className="flex justify-between py-8">
                  <h3 className="text-2xl font-bold">{name}</h3>
                  <span className="text-2xl font-bold">{priceToLocaleString(groupedData?.[id]?.price)}</span>
                </div>
                <CollageProductList assets={groupedData?.[id]?.assets} />
              </div>
            )
          );
        })}
        {groupedData?.['addOn'] && (
          <div className="col-span-12">
            <div className="flex justify-between py-8">
              <h3 className="text-2xl font-bold">Complete the look</h3>

              <span className="text-2xl font-bold">{priceToLocaleString(groupedData?.['addOn']?.price)}</span>
            </div>

            <CollageProductList assets={groupedData?.['addOn']?.assets} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaygroundAssetDisplay;
