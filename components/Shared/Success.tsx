import errorLottie from '@public/lotties/success.json';
import React from 'react';
import LottieAnimation from './LottieAnimation';
import SectionTitle from './SectionTitle';

const SuccessState = ({ title, message }: { title: string; message: string }): JSX.Element => {
  return (
    <div className="container mx-auto px-4">
      <div className="w-1/3 mx-auto">
        <LottieAnimation animationData={errorLottie} />
      </div>
      <SectionTitle title="Success" feature={`${title}`} description={message} />
    </div>
  );
};

export default React.memo(SuccessState);
