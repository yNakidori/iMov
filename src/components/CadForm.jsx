import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  Button, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel,
  Grid, Checkbox, FormControlLabel, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

const cidades = {
  'São Paulo': ['Centro', 'Zona Sul', 'Zona Oeste', 'Zona Norte', 'Zona Leste'],
  'Rio de Janeiro': ['Centro', 'Zona Sul', 'Zona Oeste', 'Zona Norte'],
  'Belo Horizonte': ['Centro-Sul', 'Leste', 'Oeste', 'Noroeste', 'Pampulha']
};

const CadForm = () => {
  const [formData, setFormData] = useState({
    city: '',
    neighborhood: '',
    price: '',
    consultPrice: false,
    video: null,
    images: [],
    saleOrRent: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    petsAllowed: false,
    furnished: false,
    garageSpaces: '',
    description: '',
    area: '',
    nomeProprietario: '',
    emailProprietario: '',
    observacao: ''
  });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
      }));
    } else if (files) {
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

  const onDrop = useCallback((acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...acceptedFiles]
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 6,
    multiple: true
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { city, neighborhood, price, consultPrice, video, images, saleOrRent, propertyType, bedrooms, bathrooms, petsAllowed, furnished, garageSpaces, description, area, nomeProprietario, emailProprietario, observacao } = formData;

    if (images.length === 0) {
      setAlert({ open: true, severity: 'error', message: 'Selecione pelo menos uma imagem.' });
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
        price: consultPrice ? 'Consulte com um corretor' : price,
        videoURL,
        imageUrls,
        saleOrRent,
        propertyType,
        bedrooms,
        bathrooms,
        petsAllowed,
        furnished,
        garageSpaces,
        description,
        area,
        nomeProprietario,
        emailProprietario,
        observacao
      });

      setFormData({
        city: '',
        neighborhood: '',
        price: '',
        consultPrice: false,
        video: null,
        images: [],
        saleOrRent: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        petsAllowed: false,
        furnished: false,
        garageSpaces: '',
        description: '',
        area: '',
        nomeProprietario: '',
        emailProprietario: '',
        observacao: ''
      });
      setProgress(0);
      setUploading(false);
      setAlert({ open: true, severity: 'success', message: 'Formulário enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setAlert({ open: true, severity: 'error', message: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.' });
      setProgress(0);
      setUploading(false);
    }
  };

  const { city, neighborhood, price, consultPrice, video, images, saleOrRent, propertyType, bedrooms, bathrooms, petsAllowed, furnished, garageSpaces, description, area, nomeProprietario, emailProprietario, observacao } = formData;
  const allFieldsReady = city && neighborhood && (price || consultPrice) && images.length > 0 && !uploading;

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '16px', backgroundColor: 'white', borderRadius: '16px', boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Adicionar um imóvel
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <FormControlLabel
                control={<Checkbox checked={consultPrice} onChange={(e) => setFormData({ ...formData, consultPrice: e.target.checked, price: '' })} />}
                label="Consulte com um corretor"
              />
              {!consultPrice && (
                <NumericFormat
                  value={price}
                  onValueChange={(values) => {
                    const { formattedValue } = values;
                    handleChange({ target: { name: 'price', value: formattedValue } });
                  }}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  customInput={TextField}
                  label="Preço"
                  fullWidth
                  variant="outlined"
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Cidade</InputLabel>
              <Select
                name="city"
                value={city}
                onChange={handleChange}
                label="Cidade"
              >
                {Object.keys(cidades).map((cidade) => (
                  <MenuItem key={cidade} value={cidade}>{cidade}</MenuItem>
                ))}
              </Select>
              <TextField
                label="Ou digite a cidade"
                variant="outlined"
                fullWidth
                name="city"
                value={city}
                onChange={handleChange}
                sx={{ marginTop: '8px' }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Bairro</InputLabel>
              <Select
                name="neighborhood"
                value={neighborhood}
                onChange={handleChange}
                label="Bairro"
                disabled={!city}
              >
                {city && cidades[city]?.map((bairro) => (
                  <MenuItem key={bairro} value={bairro}>{bairro}</MenuItem>
                ))}
              </Select>
              <TextField
                label="Ou digite o bairro"
                variant="outlined"
                fullWidth
                name="neighborhood"
                value={neighborhood}
                onChange={handleChange}
                sx={{ marginTop: '8px' }}
                disabled={!city}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box {...getRootProps()} sx={{ border: '2px dashed #cccccc', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
              <input {...getInputProps()} />
              <CloudUploadIcon fontSize="large" />
              <Typography>Arraste e solte as imagens aqui, ou clique para selecionar</Typography>
              <Typography variant="body2">Máximo de 6 imagens</Typography>
            </Box>
            {images.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                {images.map((image, index) => (
                  <Box key={index} sx={{ width: '80px', height: '80px', mr: 1, mb: 1, position: 'relative' }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ width: '100%' }}
            >
              Carregar Vídeo
              <input
                type="file"
                hidden
                name="video"
                accept="video/*"
                onChange={handleChange}
              />
            </Button>
            {video && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">{video.name}</Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Tipo de Imóvel</InputLabel>
              <Select
                name="propertyType"
                value={propertyType}
                onChange={handleChange}
                label="Tipo de Imóvel"
              >
                <MenuItem value="apartamento">Apartamento</MenuItem>
                <MenuItem value="casa">Casa</MenuItem>
                <MenuItem value="comercial">Comercial</MenuItem>
                <MenuItem value="terreno">Terreno</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quartos"
              variant="outlined"
              fullWidth
              name="bedrooms"
              value={bedrooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Banheiros"
              variant="outlined"
              fullWidth
              name="bathrooms"
              value={bathrooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Garagem"
              variant="outlined"
              fullWidth
              name="garageSpaces"
              value={garageSpaces}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Área (m²)"
              variant="outlined"
              fullWidth
              name="area"
              value={area}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nome do Proprietário"
              variant="outlined"
              fullWidth
              name="nomeProprietario"
              value={nomeProprietario}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email do Proprietário"
              variant="outlined"
              fullWidth
              name="emailProprietario"
              value={emailProprietario}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observação"
              variant="outlined"
              fullWidth
              name="observacao"
              value={observacao}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={petsAllowed} onChange={handleChange} name="petsAllowed" />}
              label="Permite Pets"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={furnished} onChange={handleChange} name="furnished" />}
              label="Mobiliado"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Venda ou Aluguel</InputLabel>
              <Select
                name="saleOrRent"
                value={saleOrRent}
                onChange={handleChange}
                label="Venda ou Aluguel"
              >
                <MenuItem value="venda">Venda</MenuItem>
                <MenuItem value="aluguel">Aluguel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ position: 'relative' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!allFieldsReady}
                fullWidth
                sx={{ mt: 2 }}
              >
                Enviar
              </Button>
              {uploading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CadForm;
