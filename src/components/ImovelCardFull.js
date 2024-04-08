import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ImovelCardFull = ({ nome, descricao, imageUrls, onViewDetails }) => {
  // Verifica se há URLs de imagens disponíveis
  const coverImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : 'https://source.unsplash.com/random?wallpapers';

  return (
    <Card>
      <CardMedia
        component="img"
        alt={`${nome} cover`}
        src={coverImage}
      />
      <div style={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          {nome}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {descricao}
        </Typography>
        <Button onClick={onViewDetails} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Ver Detalhes
        </Button>
      </div>
    </Card>
  );
};

export default ImovelCardFull;
