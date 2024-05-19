import React, { useState } from 'react';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Send as SendIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const CadForm = () => {
  const [formData, setFormData] = useState({
    city: '',
    neighborhood: '',
    price: '',
    video: null,
    images: Array(6).fill(null),
    saleOrRent: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    petsAllowed: false,
    garageSpaces: '',
    description: ''
  });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0]
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleImageChange = (index) => (e) => {
    if (e.target.files[0]) {
      const newImages = [...formData.images];
      newImages[index] = e.target.files[0];
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { city, neighborhood, price, video, images, saleOrRent, propertyType, bedrooms, bathrooms, petsAllowed, garageSpaces, description } = formData;

    if (!images.some(image => image)) {
      alert('Selecione pelo menos uma imagem.');
      return;
    }

    try {
      setUploading(true);
      const delay = 3000;
      const interval = 100;
      const steps = delay / interval;

      for (let i = 0; i <= steps; i++) {
        await new Promise((resolve) => setTimeout(resolve, interval));
        setProgress(Math.round((i / steps) * 100));
      }

      const db = getDatabase();
      const storage = getStorage();
      const imageUrls = await Promise.all(images.map(async (image) => {
        if (!image) return null;
        const imageRef = storageRef(storage, `images/${image.name}`);
        await uploadBytesResumable(imageRef, image);
        return await getDownloadURL(imageRef);
      }));

      let videoURL = '';
      if (video) {
        const videoRef = storageRef(storage, `videos/${video.name}`);
        await uploadBytesResumable(videoRef, video);
        videoURL = await getDownloadURL(videoRef);
      }

      await push(databaseRef(db, 'addresses'), {
        city,
        neighborhood,
        price,
        videoURL,
        imageUrls,
        saleOrRent,
        propertyType,
        bedrooms,
        bathrooms,
        petsAllowed,
        garageSpaces,
        description
      });

      setFormData({
        city: '',
        neighborhood: '',
        price: '',
        video: null,
        images: Array(6).fill(null),
        saleOrRent: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        petsAllowed: false,
        garageSpaces: '',
        description: ''
      });
      setProgress(0);
      setUploading(false);
      alert('Formulário enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      setProgress(0);
      setUploading(false);
    }
    window.location.reload();
  };

  const { city, neighborhood, price, video, images, saleOrRent, propertyType, bedrooms, bathrooms, petsAllowed, garageSpaces, description } = formData;
  const allFieldsReady = city && neighborhood && price && images.some(image => image) && !uploading;

  return (
    <div className="max-h-screen flex flex-col items-center justify-center rounded-md">
      <Box sx={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px' }}>
        <div className="p-4 rounded shadow-md max-w-3xl w-full mx-auto mt-4">
          <form onSubmit={handleSubmit}>

            <TextField
              label="Preço"
              color='secondary'
              size="small"
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              style={{ marginBottom: '16px' }}
              InputProps={{ startAdornment: <Typography>R$</Typography> }}
            />

            <TextField
              label="Cidade"
              color='secondary'
              size="small"
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
              className="mt-4 p-2 border rounded-md w-full"
              style={{ marginBottom: '16px' }}
            />

            <TextField
              label="Bairro"
              color='secondary'
              size="small"
              type="text"
              name="neighborhood"
              value={neighborhood}
              onChange={handleChange}
              className="mt-4 p-2 border rounded-md w-full"
              style={{ marginBottom: '16px' }}
            />

            <TextField
              label="Descrição"
              color='secondary'
              size="small"
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              className="mt-4 p-2 border rounded-md w-full"
              multiline
              rows={4}
              style={{ marginBottom: '16px' }}
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormControl variant="standard" style={{ marginBottom: '16px' }}>
                <InputLabel id="saleOrRentLabel">Venda ou Aluguel</InputLabel>
                <Select
                  labelId="saleOrRentLabel"
                  name="saleOrRent"
                  value={saleOrRent}
                  onChange={handleChange}
                  className="w-full"
                >
                  <MenuItem value="venda">Venda</MenuItem>
                  <MenuItem value="aluguel">Aluguel</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" style={{ marginBottom: '16px' }}>
                <InputLabel id="propertyTypeLabel">Tipo de Propriedade</InputLabel>
                <Select
                  labelId="propertyTypeLabel"
                  name="propertyType"
                  value={propertyType}
                  onChange={handleChange}
                  className="w-full"
                >
                  <MenuItem value="casa">Casa</MenuItem>
                  <MenuItem value="apartamento">Apartamento</MenuItem>
                  <MenuItem value="condominio">Condomínio</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <TextField
                label="Número de Quartos"
                color='secondary'
                size="small"
                type="number"
                name="bedrooms"
                value={bedrooms}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="Número de Banheiros"
                color='secondary'
                size="small"
                type="number"
                name="bathrooms"
                value={bathrooms}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="Vagas de Garagem"
                color='secondary'
                size="small"
                type="number"
                name="garageSpaces"
                value={garageSpaces}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
                style={{ marginBottom: '16px' }}
              />
            </div>

            <div className="mt-4">
              <TextField
                label="Vídeo (MP4)"
                color='secondary'
                size="small"
                type="file"
                name="video"
                accept="video/mp4"
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                InputProps={{ startAdornment: <CloudUploadIcon /> }}
                style={{ marginBottom: '16px' }}
              />
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((_, index) => (
                  <div key={index}>
                    <label htmlFor={`image${index + 1}`}>
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Imagem {index + 1}
                      </Button>
                      <input
                        type="file"
                        id={`image${index + 1}`}
                        name={`image${index + 1}`}
                        accept="image/*"
                        onChange={handleImageChange(index)}
                        className="hidden"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button type='submit' variant='contained' endIcon={<SendIcon />} disabled={!allFieldsReady}>
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CadForm;
