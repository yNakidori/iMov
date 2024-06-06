import React, { useState } from 'react';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

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
    furnished: false,
    garageSpaces: '',
    description: ''
  });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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
    const { city, neighborhood, price, video, images, saleOrRent, propertyType, bedrooms, bathrooms, petsAllowed, furnished, garageSpaces, description } = formData;

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
        furnished,
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
        furnished: false,
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

  const { city, neighborhood, price, video, images, saleOrRent, propertyType, bedrooms, bathrooms, petsAllowed, furnished, garageSpaces, description } = formData;
  const allFieldsReady = city && neighborhood && price && images.some(image => image) && !uploading;

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '16px', backgroundColor: 'white', borderRadius: '16px', boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Adicionar um imóvel
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              value={price}
              onChange={handleChange}
              InputProps={{ startAdornment: <Typography>R$</Typography> }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              name="city"
              value={city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Neighborhood"
              variant="outlined"
              fullWidth
              name="neighborhood"
              value={neighborhood}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
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
              <InputLabel>Sale or Rent</InputLabel>
              <Select
                name="saleOrRent"
                value={saleOrRent}
                onChange={handleChange}
                label="Sale or Rent"
              >
                <MenuItem value="venda">Venda</MenuItem>
                <MenuItem value="aluguel">Aluguel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                name="propertyType"
                value={propertyType}
                onChange={handleChange}
                label="Property Type"
              >
                <MenuItem value="casa">Casa</MenuItem>
                <MenuItem value="apartamento">Apartamento</MenuItem>
                <MenuItem value="condominio">Condomínio</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Bedrooms"
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
              label="Bathrooms"
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
              label="Garage Spaces"
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
            <TextField
              label="Video (MP4)"
              variant="outlined"
              fullWidth
              type="file"
              name="video"
              accept="video/mp4"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Images</Typography>
            <Grid container spacing={2}>
              {images.map((_, index) => (
                <Grid item xs={4} key={index}>
                  <label htmlFor={`image${index + 1}`}>
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                    >
                      Image {index + 1}
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
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={!allFieldsReady}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CadForm;
