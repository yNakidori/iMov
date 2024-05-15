import React, { useState } from 'react';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CadForm = () => {
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [price, setPrice] = useState('');
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState(new Array(6).fill(null));
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saleOrRent, setSaleOrRent] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [garageSpaces, setGarageSpaces] = useState('');
  const [description, setDescription] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleNeighborhoodChange = (event) => {
    setNeighborhood(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleVideoChange = (event) => {
    if (event.target.files[0]) {
      setVideo(event.target.files[0]);
    }
  };

  const handleImageChange = (index) => (event) => {
    if (event.target.files[0]) {
      const newImages = [...images];
      newImages[index] = event.target.files[0];
      setImages(newImages);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Verifica se pelo menos um campo de imagem está preenchido
    if (!images.some(image => image)) {
      alert('Selecione pelo menos uma imagem.');
      return;
    }

    try {
      setUploading(true);

      // Atraso simulado de 3 segundos antes do envio do formulário
      const delay = 3000;
      const interval = 100;
      const steps = delay / interval;

      for (let i = 0; i <= steps; i++) {
        await new Promise((resolve) => setTimeout(resolve, interval));
        const newProgress = Math.round((i / steps) * 100);
        setProgress(newProgress);
      }

      // Conecta-se ao Realtime Database
      const db = getDatabase();

      // Conecta-se ao Firebase Storage
      const storage = getStorage();

      // Array para armazenar os URLs das imagens
      const imageUrls = [];

      // Função para fazer o upload de cada imagem
      const uploadImage = async (image) => {
        if (!image) return null;
        const imageRef = storageRef(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(imageRef, image);
        const snapshot = await uploadTask;
        const imageUrl = await getDownloadURL(snapshot.ref);
        imageUrls.push(imageUrl);
        return imageUrl; // Retorna a URL da imagem
      };

      // Faz o upload das imagens
      const uploadedImageUrls = await Promise.all(images.map(uploadImage));

      // Upload do vídeo se existir
      let videoURL = '';
      if (video) {
        const videoReference = storageRef(storage, `videos/${video.name}`);
        const videoUploadTask = await uploadBytesResumable(videoReference, video);
        videoURL = await getDownloadURL(videoUploadTask.ref);
      }

      // Adiciona os dados do formulário e os URLs das imagens e do vídeo à coleção 'addresses'
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
        description, // Adicionando a descrição ao objeto enviado para o banco de dados
      });

      // Limpa os campos do formulário após o envio bem-sucedido
      setCity('');
      setNeighborhood('');
      setPrice('');
      setVideo(null);
      setImages(new Array(6).fill(null));
      setProgress(0);
      setUploading(false);
      setDescription(''); // Limpa a descrição

      // Feedback para o usuário de que o envio foi concluído
      alert('Formulário enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      // Feedback para o usuário em caso de erro
      alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      setProgress(0);
      setUploading(false);
    }
    window.location.reload(); // Recarrega a página
  };

  // Verifica se todos os campos estão prontos para upload
  const allFieldsReady = city && neighborhood && price && images.some(image => image) && !uploading;

  return (
    <div className="max-h-screen flex flex-col items-center justify-center rounded-md">
      <Box sx={{ backgroundColor: 'white', borderRadius: '16px' }}>
        <div className="p-4 rounded shadow-md max-w-3xl w-full mx-auto mt-4 ">
          <form onSubmit={handleSubmit}>

            {/* Price */}
            <TextField
              label="Preço"
              color='secondary'
              size="small"
              type="text"
              name="price"
              value={price}
              onChange={handlePriceChange}
              className="mt-1 p-2 border rounded-md w-full"
              InputProps={{
                startAdornment: <Typography>R$</Typography>,
              }}
            />
            {/* Price */}

            {/* City */}
            <TextField
              label="Cidade"
              color='secondary'
              size="small"
              type="text"
              name="city"
              value={city}
              onChange={handleCityChange}
              className="mt-4 p-2 border rounded-md w-full"
            />
            {/* City */}

            {/* Neighborhood */}
            <TextField
              label="Bairro"
              color='secondary'
              size="small"
              type="text"
              name="neighborhood"
              value={neighborhood}
              onChange={handleNeighborhoodChange}
              className="mt-4 p-2 border rounded-md w-full"
            />
            {/* Neighborhood */}

            {/* Description */}
            <TextField
              label="Descrição"
              color='secondary'
              size="small"
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              className="mt-4 p-2 border rounded-md w-full"
              multiline
              rows={4}
            />
            {/* Description */}

            {/* Selectors */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormControl variant="standard">
                <InputLabel id="saleOrRentLabel">Venda ou Aluguel</InputLabel>
                <Select
                  labelId="saleOrRentLabel"
                  value={saleOrRent}
                  onChange={(e) => setSaleOrRent(e.target.value)}
                  label="Venda ou Aluguel"
                  className="w-full"
                >
                  <MenuItem value="venda">Venda</MenuItem>
                  <MenuItem value="aluguel">Aluguel</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard">
                <InputLabel id="propertyTypeLabel">Tipo de Propriedade</InputLabel>
                <Select
                  labelId="propertyTypeLabel"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  label="Tipo de Propriedade"
                  className="w-full"
                >
                  <MenuItem value="casa">Casa</MenuItem>
                  <MenuItem value="apartamento">Apartamento</MenuItem>
                  <MenuItem value="condominio">Condomínio</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* Selectors */}

            {/* Form - Row 3 */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <TextField
                label="Número de Quartos"
                color='secondary'
                size="small"
                type="number"
                name="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="mt-1 p-2 border rounded-md"
              />
              <TextField
                label="Número de Banheiros"
                color='secondary'
                size="small"
                type="number"
                name="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="mt-1 p-2 border rounded-md"
              />
              <TextField
                label="Vagas de Garagem"
                color='secondary'
                size="small"
                type="number"
                name="garageSpaces"
                value={garageSpaces}
                onChange={(e) => setGarageSpaces(e.target.value)}
                className="mt-1 p-2 border rounded-md"
              />
            </div>
            {/* Form - Row 3 */}

            {/* File Inputs */}
            <div className="mt-4">
              <TextField
                label="Vídeo (MP4)"
                color='secondary'
                size="small"
                type="file"
                id="video"
                name="video"
                accept="video/mp4"
                onChange={handleVideoChange}
                className="mt-1 p-2 border rounded-md w-full"
                InputProps={{
                  startAdornment: <CloudUploadIcon />,
                }}
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
            {/* File Inputs */}

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button type='submit' variant='contained' endIcon={<SendIcon />} disabled={!allFieldsReady}>
                Enviar
              </Button>
            </div>
            {/* Submit Button */}
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CadForm;
