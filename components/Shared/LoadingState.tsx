import loadingLottie from '@public/lotties/loading.json';
import React from 'react';
import LottieAnimation from './LottieAnimation';

const LoadingState = (): JSX.Element => {
  return (
    <div className="container mx-auto px-4">
      <div className="w-1/3 mx-auto h-80 flex items-center">
        <LottieAnimation animationData={loadingLottie} height={130} />
      </div>
    </div>
  );
};

export default React.memo(LoadingState);
