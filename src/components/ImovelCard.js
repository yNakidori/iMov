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
import EditIcon from '@mui/icons-material/Edit';
import { getDatabase, ref as databaseRef, remove, update, push } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const ImovelCard = ({ id, nome, quartos, banheiros, pets, valorVenda, imageUrls, onImovelVendido, origin, valor }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [valorVendaInput, setValorVendaInput] = useState('');
  const [editedQuartos, setEditedQuartos] = useState(quartos);
  const [editedBanheiros, setEditedBanheiros] = useState(banheiros);
  const [editedPets, setEditedPets] = useState(pets);

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
      await update(databaseRef(db, `addresses/${id}`), {
        vendido: true,
        valorVenda: Number(valorVendaInput),
      });
      console.log(`Imóvel com o ID ${id} foi marcado como vendido com sucesso.`);
      onImovelVendido(id);
    } catch (error) {
      console.error('Erro ao marcar o imóvel como vendido:', error);
    }
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleEdit = () => {
    setOpenDialog(true);
    // Predefinir os valores editados
    setEditedQuartos(quartos);
    setEditedBanheiros(banheiros);
    setEditedPets(pets);
  };

  const handleSaveEdit = async () => {
    try {
      const db = getDatabase();
      await update(databaseRef(db, `addresses/${id}`), {
        quartos: editedQuartos,
        banheiros: editedBanheiros,
        pets: editedPets,
      });
      console.log(`Imóvel com o ID ${id} foi editado com sucesso.`);
    } catch (error) {
      console.error('Erro ao editar o imóvel:', error);
    }
    setOpenDialog(false);
  };

  return (
    <Card variant="outlined" sx={{ p: 2, zIndex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
              <Typography>
                {valor ? `R$ ${valor}` : nome}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="regular">
                Quartos: {quartos} | Banheiros: {banheiros} | Permite Pets: {pets ? 'Sim' : 'Não'}
              </Typography>
              {origin === 'sold' && (
                <Typography variant="body2" color="text.secondary" fontWeight="bold">
                  Valor da Venda: R$ {valorVenda}
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
              <IconButton onClick={handleEdit} aria-label="edit">
                <EditIcon />
              </IconButton>
              <Button onClick={handleMarkAsSold} variant="outlined" color="primary">
                Marcar como vendido
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            alt={`${nome} cover`}
            src={coverImage}
            sx={{ borderRadius: '6px', width: '100%' }}
          />
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Editar Imóvel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="quartos"
            label="Quartos"
            type="number"
            fullWidth
            value={editedQuartos}
            onChange={(e) => setEditedQuartos(e.target.value)}
          />
          <TextField
            margin="dense"
            id="banheiros"
            label="Banheiros"
            type="number"
            fullWidth
            value={editedBanheiros}
            onChange={(e) => setEditedBanheiros(e.target.value)}
          />
          <TextField
            margin="dense"
            id="pets"
            label="Permite Pets (Sim ou Não)"
            fullWidth
            value={editedPets}
            onChange={(e) => setEditedPets(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ImovelCard;
