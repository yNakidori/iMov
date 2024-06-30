import React, { useState } from 'react';
import Lottie from "lottie-react";
import animationData from '../icons/Animation - 1710174324735.json';

const Whats = () => {

  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const phoneNumber = '11972570368';
  const message = "Olá, gostaria de mais informações sobre um imóvel.";

  const handleWhatsAppRedirect = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

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
      <button onClick={handleWhatsAppRedirect} style={{ cursor: 'pointer', padding: '10px', fontSize: '16px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '5px' }}>
        Iniciar Conversa no WhatsApp
      </button>
    </div>
  );
};

export default Whats;