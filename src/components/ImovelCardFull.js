import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ícone de olho
import Collapse from '@mui/material/Collapse';
import PetsIcon from '@mui/icons-material/Pets';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HotelIcon from '@mui/icons-material/Hotel';

const ImovelCardFull = ({ id, nome, descricao, endereco, numero, cep, quartos, banheiros, pets, imageUrls, onViewDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleViewDetails = () => {
    onViewDetails(); // Chama a função onViewDetails quando o botão é clicado
    setExpanded(!expanded); // Altera o estado de expansão apenas para o card clicado
  };

  const coverImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : 'https://source.unsplash.com/random?wallpapers';

  return (
    <Card>
      <CardMedia
        component="img"
        alt={`${nome} cover`}
        src={coverImage}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {nome}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {descricao}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Endereço: {endereco}, Número: {numero}, CEP: {cep}
        </Typography>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <IconButton
          onClick={handleViewDetails}
          aria-label="view details"
        >
          <VisibilityIcon />
        </IconButton>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <HotelIcon /> Quartos: {quartos}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <BathtubIcon /> Banheiros: {banheiros}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <PetsIcon /> Permite Pets: {pets ? 'Sim' : 'Não'}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ImovelCardFull;
