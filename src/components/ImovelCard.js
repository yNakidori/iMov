import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import InfoRounded from '@mui/icons-material/InfoRounded';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getDatabase, ref as databaseRef, remove, set, get } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ImovelCard = ({ id, city, neighborhood, price, imageUrls, onImovelVendido, origin }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const coverImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : 'https://source.unsplash.com/random?wallpapers';

  const handleDelete = async () => {
    try {
      const db = getDatabase();
      const storage = getStorage();

      if (origin === 'available') {
        await remove(databaseRef(db, `addresses/${id}`));
      } else if (origin === 'sold') {
        await remove(databaseRef(db, `vendidos/${id}`));
      }

      for (const imageUrl of imageUrls) {
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
        const dataVenda = new Date().toISOString(); // ISO string da data e hora atual
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

  return (
    <Card variant="outlined" sx={{ p: 2, zIndex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
              <Typography fontWeight="bold" noWrap gutterBottom>
                {city}, {neighborhood}
              </Typography>
              {origin === 'available' && (
                <Typography variant="body2" color="text.secondary" fontWeight="bold">
                  Preço: R$ {price}
                </Typography>
              )}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Chip
                size="small"
                variant="outlined"
                icon={<InfoRounded />}
                label={`ID: ${id}`}
                sx={(theme) => ({
                  '.MuiChip-icon': { fontSize: 16, ml: '4px', color: 'success.500' },
                  bgcolor: 'success.50',
                  borderColor: 'success.100',
                  color: 'success.900',
                })}
              />
              <IconButton onClick={handleDelete} aria-label="delete">
                <DeleteIcon />
              </IconButton>
              {origin === 'available' && (
                <Button onClick={handleMarkAsSold} variant="outlined" color="primary">
                  Marcar como vendido
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            alt={`${city} ${neighborhood} cover`}
            src={coverImage}
            sx={{ borderRadius: '6px', width: '100%' }}
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
    </Card>
  );
};

export default ImovelCard;
