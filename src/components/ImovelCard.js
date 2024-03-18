import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import InfoRounded from '@mui/icons-material/InfoRounded';
import Grid from '@mui/material/Grid';

const ImovelCard = ({ id, nome, descricao, imageUrls }) => {
  // Verifica se há URLs de imagens disponíveis
  const coverImage = 'https://source.unsplash.com/random?wallpapers';

  return (
    <Card variant="outlined" sx={{ p: 2, zIndex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <Box>
              <Typography variant="body2" color="text.secondary" fontWeight="regular">
                {descricao}
              </Typography>
              <Typography fontWeight="bold" noWrap gutterBottom>
                {nome}
              </Typography>
            </Box>
            <Box>
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
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
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
