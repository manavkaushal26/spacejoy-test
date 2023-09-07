import EmptyState from '@components/Shared/EmptyState';
import { PlaygroundAssetsContext } from '@store/PlaygroundAssets';
import { useRecommendationsListContext } from '@store/RecommendationsList';
import { SelectedIdContext } from '@store/SelectedId';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import ProductCard from '../ProductCard';

const DesignCardRow: React.FC<{
  columnIndex: number;
  rowIndex: number;
  isScrolling?: boolean;
  style: CSSProperties;
}> = ({ columnIndex, rowIndex, style, isScrolling }) => {
  const { data } = useRecommendationsListContext();
  const productData = data?.[rowIndex * 2 + columnIndex];
  const { fetchProductReplacement, PlaygroundAssets } = useContext(PlaygroundAssetsContext);
  const [selectedId] = useContext(SelectedIdContext);

  // const productSwapGA = (newProductId) => {
  // const selectedProductArray = PlaygroundAssets.filter((item) => item?.id === selectedId);
  // if (selectedProductArray?.length) {
  //   const currentlySelectedProduct = selectedProductArray[0];
  //   const { assetId = '' } = currentlySelectedProduct;
  // PushEvent({
  //   category: 'Main Menu - Swapper View',
  //   action: `Product Swapped | ${assetId} > ${newProductId}`,
  //   label: 'Edit Design Set',
  // });
  // }
  // };

  return (
    <div className="overflow-hidden h-full w-full pb-1 px-1 odd:pr-0.5 even:pl-0.5" style={style}>
      {productData && !isScrolling ? (
        <ProductCard
          product={productData}
          isDraggable={false}
          hasSwap
          withShopNow={false}
          onClick={() => {
            fetchProductReplacement(productData?._id, productData);
            // PushEvent({
            //   category: `Product Swapped`,
            //   action: `Product Swapped | {{current assetid}} > {{new assetid}}`,
            //   label: 'Engage with Design Set',
            // });

            // productSwapGA(productData?._id);
          }}
        />
      ) : (
        <div className="w-full h-full p-4 bg-white">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-100 rounded" />
            <div className="w-16 h-2 mt-2 bg-gray-100 rounded" />
            <div className="h-8 mt-2 bg-gray-100 rounded" />
            <div className="w-10 h-3 mt-4 bg-gray-100 rounded " />
          </div>
        </div>
      )}
    </div>
  );
};

const RecommendationsListView: React.FC = () => {
  const { isItemLoaded, loadMoreItems, count } = useRecommendationsListContext();
  const [rowHeight] = useState(280);
  const gridRef = React.createRef<Grid<any>>();

  const { data, loading } = useRecommendationsListContext();

  useEffect(() => {
    if (data?.length === 0 && loading) {
      gridRef.current?.scrollToItem({
        columnIndex: 0,
        rowIndex: 0,
      });
    }
  }, [gridRef, data?.length, loading]);

  return !loading && data?.length === 0 ? (
    <div className="px-2 mt-8">
      <EmptyState
        title="Select any product from the canvas to swap!"
        message=""
        // assetPath={`${imageKit.baseDeliveryUrl}/v1634637463/Icon_-_select_p8nfvu.svg`}
      />
    </div>
  ) : (
    <AutoSizer>
      {({ width, height }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          loadMoreItems={loadMoreItems}
          itemCount={count}
          minimumBatchSize={2}
        >
          {({ onItemsRendered }) => {
            return (
              <Grid
                height={height}
                width={width}
                onItemsRendered={({
                  visibleRowStartIndex,
                  visibleRowStopIndex,
                  overscanRowStopIndex,
                  overscanRowStartIndex,
                }) => {
                  onItemsRendered({
                    overscanStartIndex: overscanRowStartIndex * 2,
                    overscanStopIndex: overscanRowStopIndex * 2,
                    visibleStartIndex: visibleRowStartIndex * 2,
                    visibleStopIndex: visibleRowStopIndex * 2,
                  });
                }}
                ref={gridRef}
                rowCount={Math.ceil(count / 2)}
                columnCount={2}
                columnWidth={width / 2}
                rowHeight={rowHeight}
              >
                {DesignCardRow}
              </Grid>
            );
          }}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default React.memo(RecommendationsListView);
