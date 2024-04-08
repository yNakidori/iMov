import React, { useState } from 'react';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const CadForm = () => {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [cep, setCep] = useState('');
  const [video, setVideo] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleNeighborhoodChange = (event) => {
    setNeighborhood(event.target.value);
  };

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const handleVideoChange = (event) => {
    if (event.target.files[0]) {
      setVideo(event.target.files[0]);
    }
  };

  const handleImage1Change = (event) => {
    if (event.target.files[0]) {
      setImage1(event.target.files[0]);
    }
  };

  const handleImage2Change = (event) => {
    if (event.target.files[0]) {
      setImage2(event.target.files[0]);
    }
  };

  const handleImage3Change = (event) => {
    if (event.target.files[0]) {
      setImage3(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se todos os arquivos foram selecionados
    if (!video || !image1 || !image2 || !image3) {
      alert('Selecione todos os arquivos antes de enviar o formulário.');
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
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        imageUrls.push(imageUrl);
        console.log("URL da imagem:", imageUrl);
        return imageUrl; // Retorna a URL da imagem
      };

      // Faz o upload das imagens
      const uploadedImageUrls = await Promise.all([
        uploadImage(image1),
        uploadImage(image2),
        uploadImage(image3)
      ]);

      // Upload do vídeo
      const videoReference = storageRef(storage, `videos/${video.name}`);
      const videoUploadTask = uploadBytesResumable(videoReference, video);
      const videoURL = await getDownloadURL(videoUploadTask.snapshot.ref);

      // Adiciona os dados do formulário e os URLs das imagens e do vídeo à coleção 'addresses'
      await push(databaseRef(db, 'addresses'), {
        address,
        number,
        neighborhood,
        cep,
        videoURL,
        imageUrls: uploadedImageUrls, // Usa os URLs retornados do upload
      });

      // Limpa os campos do formulário após o envio bem-sucedido
      setAddress('');
      setNumber('');
      setNeighborhood('');
      setCep('');
      setVideo(null);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setProgress(0);
      setUploading(false);

      // Armazena os URLs das imagens no localStorage
      localStorage.setItem('uploadedImageUrls', JSON.stringify(uploadedImageUrls));

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

  // Verifica se todos os arquivos estão prontos para upload
  const allFilesReady = video && image1 && image2 && image3 && !uploading;

  return (
    <div className="max-h-screen flex flex-col items-center justify-center rounded-md">
      <Box sx={{ backgroundColor: 'white', borderRadius: '16px' }}>
        <div className="p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-8 ">
          <form onSubmit={handleSubmit}>

            {/* Form - Line 1-2 */}
            <div className="grid grid-cols-2 gap-4">

              <div className="w-full">
                <TextField
                  label="Endereço"
                  color='secondary'
                  id="outlined-size-small"
                  defaultValue="Small"
                  size="small"
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 w-full border rounded-md">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Endereço
                  </label>
                </TextField>
              </div>

              <div className="w-full">
                <TextField
                  label="Número"
                  color='secondary'
                  id="outlined-size-small"
                  defaultValue="Small"
                  size="small"
                  type="text"
                  name="number"
                  value={number}
                  onChange={handleNumberChange}
                  className="mt-1 p-2 w-full border rounded-md">
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                    Número
                  </label>
                </TextField>
              </div>

            </div>
            {/* Form - Line 1-2 */}

            {/* Form - Line 3 */}
            <div className="mt-4">
              <TextField
                label="Bairro"
                color='secondary'
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                type="text"
                name="neighborhood"
                value={neighborhood}
                onChange={handleNeighborhoodChange}
                className="mt-1 p-2 w-full border rounded-md">
                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                  Bairro
                </label>
              </TextField>
            </div>
            {/* Form - Line 3 */}

            {/* Form - Line 4 */}
            <div className="mt-4">
              <TextField
                label="CEP"
                color='secondary'
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                type="text"
                name="cep"
                value={cep}
                onChange={handleCepChange}
                className="mt-1 p-2 w-full border rounded-md">
                <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
              </TextField>
            </div>
            {/* Form - Line 4 */}

            <div className="mt-4">
              <label htmlFor="video" className="block text-sm font-medium text-gray-700">
                Vídeo (MP4)
              </label>
              <input
                type="file"
                id="video"
                name="video"
                accept="video/mp4"
                onChange={handleVideoChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {progress > 0 && (
                <div className="mt-2">
                  <LinearProgress color='primary' size="lg" variant="determinate" value={progress} />
                  <Typography variant='6'>
                    <p className="text-center text-gray-700 text-sm">{`Enviando... ${progress}%`}</p>
                  </Typography>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="image1" className="block text-sm font-medium text-gray-700">
                Imagem 1
              </label>
              <input
                type="file"
                id="image1"
                name="image1"
                accept="image/*"
                onChange={handleImage1Change}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="image2" className="block text-sm font-medium text-gray-700">
                Imagem 2
              </label>
              <input
                type="file"
                id="image2"
                name="image2"
                accept="image/*"
                onChange={handleImage2Change}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="image3" className="block text-sm font-medium text-gray-700">
                Imagem 3
              </label>
              <input
                type="file"
                id="image3"
                name="image3"
                accept="image/*"
                onChange={handleImage3Change}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <Button type='submit' variant='contained' endIcon={<SendIcon />} disabled={!allFilesReady}>
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
