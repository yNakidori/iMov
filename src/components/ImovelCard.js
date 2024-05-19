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
import { getDatabase, ref as databaseRef, remove, update, set, get } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const ImovelCard = ({ id, nome, descricao, numero, cep, quartos, banheiros, pets, valorVenda, imageUrls, onImovelVendido, origin }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [valorVendaInput, setValorVendaInput] = useState('');

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
        await set(soldRef, {
          ...data,
          vendido: true,
          valorVenda: Number(valorVendaInput),
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
              <Typography variant="body2" color="text.secondary" fontWeight="regular">
                {descricao}
              </Typography>
              <Typography fontWeight="bold" noWrap gutterBottom>
                {nome}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="regular">
                Número: {numero} | CEP: {cep}
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
            alt={`${nome} cover`}
            src={coverImage}
            sx={{ borderRadius: '6px', width: '100%' }}
          />
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Marcar Imóvel como Vendido</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="valor-venda"
            label="Valor da Venda (R$)"
            type="number"
            fullWidth
            value={valorVendaInput}
            onChange={(e) => setValorVendaInput(e.target.value)}
          />
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
