import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import InfoRounded from '@mui/icons-material/InfoRounded';

const ImovelCard = ({ id, nome, descricao, imageUrls }) => {
  // Verifica se há URLs de imagens disponíveis
  const coverImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : null;

  return (
    <Card variant="outlined" sx={{ p: 2, display: 'flex', flexWrap: 'wrap', zIndex: 1 }}>
      <CardMedia
        component="img"
        width="100"
        height="100"
        alt={`${nome} cover`}
        src={coverImage} // Define a URL da primeira imagem como a capa do card
        sx={{ borderRadius: '6px', width: { xs: '100%', sm: 100 } }}
      />
      <Box sx={{ alignSelf: 'center', ml: 2 }}>
        <Typography variant="body2" color="text.secondary" fontWeight="regular">
          {descricao}
        </Typography>
        <Typography fontWeight="bold" noWrap gutterBottom>
          {nome}
        </Typography>
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
    </Card>
  );
};

export default ImovelCard;
