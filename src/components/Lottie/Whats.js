import React, { useState } from 'react';
import Lottie from "react-lottie";
import animationData from '../icons/Animation - 1710174324735.json';

const Whats = () => {

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
        height={75}
        width={75}
        style={{ fill: 'red' }}
      />
    </div>
  );
};

export default Whats;