import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../icons/system-regular-40-add-card.json';

const AnimatedIcon = () => {
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const toggleAnimation = () => {
    setIsAnimationActive(!isAnimationActive);
  };

  return (
    <div onClick={toggleAnimation}>
      <Lottie
        options={{
          ...defaultOptions,
          autoplay: isAnimationActive
        }}
        height={50}
        width={50}
        style={{ fill: 'red' }}
      />
    </div>
  );
};

export default AnimatedIcon;
