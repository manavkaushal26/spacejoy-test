import CollageProductList from '@components/Collages/CollageProductList';
import { useDesignSetAssetContext } from '@store/DesignSetAssetProvider';
import mainCategories from '@utils/constants/DesignSets/mainCategory';
import { priceToLocaleString } from '@utils/helpers';
import React from 'react';

const PlaygroundAssetDisplay = ({ collageId }) => {
  const { groupedData } = useDesignSetAssetContext();

  return (
    <div className="overflow-hidden bode">
      
      <div className="px-0 lg:px-8 overflow-hidden bg-gray-100 sm:border-2 border-gray-300 divide-y rounded-b-xl">
        {mainCategories.slice(1, 2).map(({ id, name }) => {
          const groupData = groupedData?.[id];

          return (
            groupData?.assets?.length > 0 &&
            groupData?.price && (
              <div key={id} className="col-span-12 ">
                <div className="flex justify-center sm:justify-between my-4 py-4 bg-gray-300 rounded-md sm:bg-inherit sm:rounded-none sm:my-0 sm:py-8">
                  <h3 className="text-xl sm:text-2xl font-bold">{name}</h3>
                  {/* <span className="text-2xl font-bold">{priceToLocaleString(groupData?.price)}</span> */}
                </div>
                <CollageProductList assets={groupData?.assets} collageId={collageId} showAffirmCard showBannerCard/>
              </div>
            )
          );
        })}
        {groupedData?.['addOn']?.assets?.length > 0 && groupedData?.['addOn']?.price && (
          <div className="col-span-12">
            <div className="flex justify-center sm:justify-between my-4 py-4 bg-gray-300 rounded-md sm:bg-inherit sm:rounded-none  sm:my-0 sm:py-8">
              <h3 className="text-xl sm:text-2xl font-bold">Decor</h3>

              {/* <span className="text-2xl font-bold">{priceToLocaleString(groupedData?.['addOn']?.price)}</span> */}
            </div>

            <CollageProductList assets={groupedData?.['addOn']?.assets} collageId={collageId} />
          </div>
        )}
        {mainCategories.slice(2, 3).map(({ id, name }) => {
          const groupData = groupedData?.[id];

          return (
            groupData?.assets?.length > 0 &&
            groupData?.price && (
              <div key={id} className="col-span-12 ">
                <div className="flex justify-center sm:justify-between my-4 py-4 bg-gray-300 rounded-md sm:bg-inherit sm:rounded-none  sm:my-0 sm:py-8">
                  <h3 className="text-xl sm:text-2xl font-bold">{name}</h3>
                  {/* <span className="text-2xl font-bold">{priceToLocaleString(groupData?.price)}</span> */}
                </div>
                <CollageProductList assets={groupData?.assets} collageId={collageId} />
              </div>
            )
          );
        })}
        {mainCategories.slice(0, 1).map(({ id }) => {
        const groupData = groupedData?.[id];

        return (
          groupData && (
            <div key={id} className="col-span-12 ">
              <div className="flex justify-center sm:justify-between my-4 py-4 bg-gray-300 rounded-md sm:bg-inherit sm:rounded-none  sm:my-0 sm:py-8">
                  <h3 className="text-xl sm:text-2xl font-bold">Furniture</h3>
                </div>
              <CollageProductList assets={groupedData?.[id]?.assets} collageId={collageId}/>
            </div>
          )
        );
      })}
      </div>
      
    </div>
  );
};

export default PlaygroundAssetDisplay;
