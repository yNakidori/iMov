import React, { useState } from 'react';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  Button, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel,
  Grid, Checkbox, FormControlLabel, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

// Lista de cidades e bairros (exemplo)
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
    images: Array(6).fill(null),
    saleOrRent: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    petsAllowed: false,
    furnished: false,
    garageSpaces: '',
    description: ''
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

  const handleImageChange = (index) => (e) => {
    if (e.target.files[0]) {
      const newImages = [...formData.images];
      newImages[index] = e.target.files[0];
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { city, neighborhood, price, consultPrice, video, images, saleOrRent, propertyType, bedrooms, bathrooms, petsAllowed, furnished, garageSpaces, description } = formData;

    if (!images.some(image => image)) {
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
        description
      });

      setFormData({
        city: '',
        neighborhood: '',
        price: '',
        consultPrice: false,
        video: null,
        images: Array(6).fill(null),
        saleOrRent: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        petsAllowed: false,
        furnished: false,
        garageSpaces: '',
        description: ''
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

  const { city, neighborhood, price, consultPrice, video, images, saleOrRent, propertyType, bedrooms, bathrooms, petsAllowed, furnished, garageSpaces, description } = formData;
  const allFieldsReady = city && neighborhood && (price || consultPrice) && images.some(image => image) && !uploading;

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
            <TextField
              label="Bairro"
              variant="outlined"
              fullWidth
              name="neighborhood"
              value={neighborhood}
              onChange={handleChange}
            />
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Tipo de Propriedade</InputLabel>
              <Select
                name="propertyType"
                value={propertyType}
                onChange={handleChange}
                label="Tipo de Propriedade"
              >
                <MenuItem value="casa">Casa</MenuItem>
                <MenuItem value="apartamento">Apartamento</MenuItem>
                <MenuItem value="condominio">Condomínio</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Quartos"
              variant="outlined"
              fullWidth
              type="number"
              name="bedrooms"
              value={bedrooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Banheiros"
              variant="outlined"
              fullWidth
              type="number"
              name="bathrooms"
              value={bathrooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Vagas de Garagem"
              variant="outlined"
              fullWidth
              type="number"
              name="garageSpaces"
              value={garageSpaces}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={petsAllowed} onChange={handleChange} name="petsAllowed" />}
              label="Aceita Pets"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={furnished} onChange={handleChange} name="furnished" />}
              label="Mobiliado"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload Vídeo (MP4)
              <input
                type="file"
                hidden
                name="video"
                accept="video/mp4"
                onChange={handleChange}
              />
            </Button>
            {video && (
              <Typography variant="body2" sx={{ marginTop: '8px' }}>
                {video.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Imagens</Typography>
            <Grid container spacing={2}>
              {images.map((_, index) => (
                <Grid item xs={4} key={index}>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                  >
                    Imagem {index + 1}
                    <input
                      type="file"
                      hidden
                      name={`image${index + 1}`}
                      accept="image/*"
                      onChange={handleImageChange(index)}
                    />
                  </Button>
                  {images[index] && (
                    <Typography variant="body2" sx={{ marginTop: '8px' }}>
                      {images[index].name}
                    </Typography>
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" color="secondary" onClick={() => window.location.reload()}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={!allFieldsReady}>
              Enviar
            </Button>
          </Grid>
        </Grid>
        {uploading && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <CircularProgress variant="determinate" value={progress} />
            <Typography variant="body2" sx={{ marginLeft: '8px' }}>{progress}%</Typography>
          </Box>
        )}
      </form>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CadForm;
