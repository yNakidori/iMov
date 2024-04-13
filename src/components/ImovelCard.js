import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import InfoRounded from '@mui/icons-material/InfoRounded';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getDatabase, ref as databaseRef, remove } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';

const ImovelCard = ({ id, nome, descricao, numero, cep, quartos, banheiros, pets, imageUrls }) => {
  // Verifica se há URLs de imagens disponíveis
  const coverImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : 'https://source.unsplash.com/random?wallpapers';

  // Função para lidar com a exclusão do registro
  const handleDelete = async () => {
    try {
      const db = getDatabase();
      const storage = getStorage();

      // Remover dados do Realtime Database
      await remove(databaseRef(db, `addresses/${id}`));

      // Remover imagens do Firebase Storage
      for (const imageUrl of imageUrls) {
        const imageRef = storageRef(storage, imageUrl);
        await deleteObject(imageRef);
      }

      console.log(`Registro com o ID ${id} foi excluído com sucesso.`);
    } catch (error) {
      console.error('Erro ao excluir o registro:', error);
    }
    window.location.reload(); // Recarrega a página
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
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            alt={`${nome} cover`}
            src={coverImage} // Define a URL da primeira imagem como a capa do card
            sx={{ borderRadius: '6px', width: '100%' }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ImovelCard;
