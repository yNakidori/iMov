import React, { useState } from 'react';
import Lottie from "lottie-react";
import animationData from '../icons/Animation - 1710182516018.json';

const Upload = () => {

  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

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
    <div
      onClick={toggleAnimation}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <Lottie
        options={{
          ...defaultOptions,
          autoplay: isAnimationActive || isMouseOver
        }}
        height={50}
        width={50}
        style={{ fill: 'red' }}
      />
    </div>
  );
};

export default Upload;