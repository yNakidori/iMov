import React, { useEffect, useState } from 'react';
import { Button, Grid } from "@mui/material";
import { getDatabase, ref, get } from 'firebase/database';
import 'tailwindcss/tailwind.css'; // Certifique-se de importar o Tailwind CSS

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
        if (data.length >= 6) {
          setImageUrls(data.slice(0, 6));
          setMainImageUrl(data[0]);
          setOtherImageUrls(data.slice(1, 6));
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
    <div className="w-full">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <img
            className="w-full h-auto md:h-full object-cover"
            loading="lazy"
            alt="Imagem principal"
            src={mainImageUrl}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {otherImageUrls.map((imageUrl, index) => (
              <Grid item xs={4} key={index}>
                <img
                  className="w-full h-auto cursor-pointer"
                  loading="lazy"
                  alt={`Imagem ${index + 1}`}
                  src={imageUrl}
                  onClick={() => handleImageClick(imageUrl)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default FrameComponent;
