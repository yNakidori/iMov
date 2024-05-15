import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { getDatabase, ref, get } from 'firebase/database';
import './FrameComponent.css'; // Importe o arquivo CSS com os estilos

const FrameComponent = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [otherImageUrls, setOtherImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const db = getDatabase();
        const addressesRef = ref(db, 'addresses');
        const snapshot = await get(addressesRef);
        const data = [];
        snapshot.forEach((childSnapshot) => {
          const urls = childSnapshot.val().imageUrls;
          data.push(...urls);
        });
        setImageUrls(data);
        if (data.length > 0) {
          setMainImageUrl(data[0]);
          setOtherImageUrls(data.slice(1));
        }
      } catch (error) {
        console.error('Erro ao buscar URLs das imagens:', error);
      }
    };

    fetchImageUrls();
  }, []);

  const handleImageClick = (imageUrl) => {
    setMainImageUrl(imageUrl);
  };

  return (
    <div className="frame-container">
      <div className="frame-images-container">
        <div className="frame-main-image-container">
          <img
            className="frame-main-image"
            loading="lazy"
            alt="Imagem principal"
            src={mainImageUrl}
          />
        </div>
        <div className="frame-other-images-container">
          {otherImageUrls.map((imageUrl, index) => (
            <img
              key={index}
              className="frame-other-image"
              loading="lazy"
              alt={`Imagem ${index + 1}`}
              src={imageUrl}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))}
        </div>
      </div>
      <Button
        className="frame-see-more-button"
        disableElevation={true}
        variant="contained"
      >
        Ver mais fotos
      </Button>
    </div>
  );
};

export default FrameComponent;
