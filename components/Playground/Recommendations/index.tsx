import React from 'react';
import RecommendationsView from './RecommendationsListView';

const RecommendationsPanel = () => {
  return (
    <div className="store-panel relative flex flex-col h-full">
      <div className="relative h-16 py-4 px-4 flex justify-between items-center z-10">
        <p className="text-gray-900">Try Alternatives</p>
      </div>
      <div className="h-full flex-grow">
        <RecommendationsView />
      </div>
    </div>
  );
};

export default RecommendationsPanel;
