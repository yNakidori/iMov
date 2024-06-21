import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import InfoRounded from '@mui/icons-material/InfoRounded';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { getDatabase, ref as databaseRef, remove, set, get } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  Select, MenuItem, FormControl, InputLabel, CircularProgress, Typography as MuiTypography, Tooltip
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Edit as EditIcon, Done as DoneIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

const ImovelCard = ({ id, city, neighborhood, price, imageUrls, saleOrRent, propertyType, bedrooms, bathrooms, petsAllowed, furnished, garageSpaces, description, onImovelVendido, origin }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isPaused, setIsPaused] = useState(origin === 'paused');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    city,
    neighborhood,
    price,
    saleOrRent,
    propertyType,
    bedrooms,
    bathrooms,
    petsAllowed,
    furnished,
    garageSpaces,
    description,
    images: imageUrls || []
  });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const coverImage = formData.images.length > 0 ? formData.images[0] : 'https://source.unsplash.com/random?wallpapers';

  const handleDelete = async () => {
    try {
      const db = getDatabase();
      const storage = getStorage();

      if (origin === 'available') {
        await remove(databaseRef(db, `addresses/${id}`));
      } else if (origin === 'sold') {
        await remove(databaseRef(db, `vendidos/${id}`));
      } else if (origin === 'paused') {
        await remove(databaseRef(db, `pausados/${id}`));
      }

      for (const imageUrl of formData.images) {
        const imageRef = storageRef(storage, imageUrl);
        await deleteObject(imageRef);
      }

      console.log(`Registro com o ID ${id} foi excluído com sucesso.`);
    } catch (error) {
      console.error('Erro ao excluir o registro:', error);
    }
    window.location.reload();
  };

  const handleMarkAsSold = () => {
    setOpenDialog(true);
  };

  const handleConfirmSold = async () => {
    try {
      const db = getDatabase();
      const addressRef = databaseRef(db, `addresses/${id}`);
      const soldRef = databaseRef(db, `vendidos/${id}`);

      const snapshot = await get(addressRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataVenda = new Date().toISOString();
        await set(soldRef, {
          ...data,
          vendido: true,
          dataVenda,
        });
        await remove(addressRef);
      }
      onImovelVendido(id);
    } catch (error) {
      console.error('Erro ao marcar o imóvel como vendido:', error);
    }
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePauseImovel = async () => {
    try {
      const db = getDatabase();
      const addressRef = databaseRef(db, `addresses/${id}`);
      const pausedRef = databaseRef(db, `pausados/${id}`);

      if (isPaused) {
        const pausedSnapshot = await get(pausedRef);
        if (pausedSnapshot.exists()) {
          const data = pausedSnapshot.val();
          await set(addressRef, {
            ...data,
            pausado: false,
          });
          await remove(pausedRef);
          setIsPaused(false);
        }
      } else {
        const snapshot = await get(addressRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          await set(pausedRef, {
            ...data,
            pausado: true,
          });
          await remove(addressRef);
          setIsPaused(true);
        }
      }
    } catch (error) {
      console.error('Erro ao pausar/reativar o imóvel:', error);
    }
  };

  const handleDetailDialogOpen = () => {
    setIsDetailDialogOpen(true);
  };

  const handleDetailDialogClose = () => {
    setIsDetailDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
      }));
    } else if (files) {
      handleImageChange(e, name);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleImageChange = async (e, name) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploading(true);
        const storage = getStorage();
        const imageRef = storageRef(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(imageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        });

        await uploadTask;
        const downloadURL = await getDownloadURL(imageRef);
        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, downloadURL]
        }));
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index)
    }));
  };

  const handleUpdate = async () => {
    try {
      const db = getDatabase();
      const addressRef = databaseRef(db, `addresses/${id}`);
      await set(addressRef, formData);
      alert('Informações atualizadas com sucesso!');
      setIsDetailDialogOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar o imóvel:', error);
      alert('Erro ao atualizar o imóvel. Por favor, tente novamente.');
    }
  };

  return (
    <Card variant="outlined" sx={{ p: 2, zIndex: 1, borderRadius: '16px', boxShadow: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box>
              <Typography fontWeight="bold" noWrap gutterBottom variant="h6">
                {city}, {neighborhood}
              </Typography>
              {origin === 'available' && (
                <Typography variant="body2" color="text.secondary" fontWeight="bold">
                  Preço: R$ {price.toLocaleString('pt-BR')}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Chip
                size="small"
                variant="outlined"
                icon={<InfoRounded />}
                label={`ID: ${id}`}
                sx={{
                  '.MuiChip-icon': { fontSize: 16, ml: '4px', color: 'success.500' },
                  bgcolor: 'success.50',
                  borderColor: 'success.100',
                  color: 'success.900',
                }}
              />
              <Box>
                <Tooltip title="Excluir">
                  <IconButton onClick={handleDelete} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                {origin === 'available' && (
                  <Tooltip title="Marcar como vendido">
                    <IconButton onClick={handleMarkAsSold} aria-label="mark as sold">
                      <DoneIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title={isPaused ? 'Reativar' : 'Pausar'}>
                  <IconButton onClick={handlePauseImovel} aria-label={isPaused ? 'reactivate' : 'pause'}>
                    {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ver detalhes">
                  <IconButton onClick={handleDetailDialogOpen} aria-label="view details">
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            alt={`${city} ${neighborhood} cover`}
            src={coverImage}
            sx={{ borderRadius: '8px', width: '100%', height: '200px', objectFit: 'cover' }}
          />
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Marcar Imóvel como Vendido</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja marcar este imóvel como vendido?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error">
            Cancelar
          </Button>
          <Button onClick={handleConfirmSold} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDetailDialogOpen} onClose={handleDetailDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Detalhes do Imóvel</DialogTitle>
        <DialogContent>
          <TextField
            label="Cidade"
            variant="outlined"
            fullWidth
            margin="normal"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            label="Bairro"
            variant="outlined"
            fullWidth
            margin="normal"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
          />
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            margin="normal"
            name="price"
            value={formData.price}
            onChange={handleChange}
            InputProps={{ startAdornment: <Typography>R$</Typography> }}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Venda ou Aluguel</InputLabel>
            <Select
              name="saleOrRent"
              value={formData.saleOrRent}
              onChange={handleChange}
              label="Venda ou Aluguel"
            >
              <MenuItem value="venda">Venda</MenuItem>
              <MenuItem value="aluguel">Aluguel</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Tipo de Propriedade</InputLabel>
            <Select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              label="Tipo de Propriedade"
            >
              <MenuItem value="casa">Casa</MenuItem>
              <MenuItem value="apartamento">Apartamento</MenuItem>
              <MenuItem value="condominio">Condomínio</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Quartos"
            variant="outlined"
            fullWidth
            margin="normal"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <TextField
            label="Banheiros"
            variant="outlined"
            fullWidth
            margin="normal"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
          <TextField
            label="Vagas de Garagem"
            variant="outlined"
            fullWidth
            margin="normal"
            name="garageSpaces"
            value={formData.garageSpaces}
            onChange={handleChange}
          />
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <MuiTypography variant="subtitle1">Imagens</MuiTypography>
          <Grid container spacing={2}>
            {formData.images.map((imageUrl, index) => (
              <Grid item xs={4} key={index}>
                <Card>
                  <CardMedia component="img" alt={`Imagem ${index + 1}`} image={imageUrl} sx={{ height: 100, objectFit: 'cover' }} />
                  <Button variant="contained" color="error" onClick={() => handleRemoveImage(index)}>
                    Remover Imagem
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Adicionar Imagem
            <input
              type="file"
              hidden
              name="images"
              accept="image/*"
              onChange={handleChange}
            />
          </Button>
          {uploading && (
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
              <CircularProgress variant="determinate" value={progress} />
              <MuiTypography variant="body2" sx={{ marginLeft: '8px' }}>{progress}%</MuiTypography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailDialogClose} color="error">
            Cancelar
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ImovelCard;
