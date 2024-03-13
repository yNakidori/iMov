import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../icons/PdvOJKhMLX.json";

const Gear = () => {

    const [isAnimationActive, setIsAnimationActive] = useState(true);
    const [isMouseOver, setIsMouseOver] = useState(false);
  
    const defaultOptions = {
      loop: true,
      autoplay: true,
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
          height={200}
          width={200}
          style={{ fill: 'white' }}
        />
      </div>
    );

}

export default Gear;