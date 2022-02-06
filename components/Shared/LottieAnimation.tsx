import animation from '@public/lotties/empty.json';
import Lottie from 'lottie-react-web';
import React from 'react';

type LottieAnimationType = {
  height?: number;
  width?: number;
  animationData?: {};
  speed?: number;
};

const LottieAnimation: React.FC<LottieAnimationType> = ({ height, width, animationData, speed = 1 }) => (
  <Lottie
    height={height}
    width={width}
    ariaLabel="Lottie"
    ariaRole="present"
    options={{
      animationData: animationData || animation,
    }}
    speed={speed}
  />
);

export default LottieAnimation;
