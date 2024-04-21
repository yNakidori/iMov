import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PetsIcon from '@mui/icons-material/Pets';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HotelIcon from '@mui/icons-material/Hotel';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ExpandMore = (props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
};

const ImovelCardFull = ({ nome, descricao, endereco, numero, cep, quartos, banheiros, pets, imageUrls, videoUrl }) => {
  const [expanded, setExpanded] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div class="card">
      <Card sx={{
        maxWidth: 345,
        bgcolor: 'rgba(23, 23, 23, 0.9)', // Fundo escuro com transparência
        color: '#fff', // Texto branco
        borderRadius: '10px', // Cantos arredondados
        border: '2px solid #087E8B',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra
      }}>
        <CardContent>
          <Typography>
            {descricao}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt={`${nome} cover`}
          src={imageUrls && imageUrls.length > 0 ? imageUrls[selectedImageIndex] : 'https://source.unsplash.com/random?wallpapers'}
        />
        <CardContent>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share" sx={{ color: '#fff' }}>
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="view details" onClick={handleOpenPopup} sx={{ color: '#fff' }}>
            <VisibilityIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon sx={{ color: '#fff' }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secondary" component="p" sx={{ color: '#fff' }}>
              <HotelIcon /> Quartos: {quartos}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="p" sx={{ color: '#fff' }}>
              <BathtubIcon /> Banheiros: {banheiros}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="p" sx={{ color: '#fff' }}>
              <PetsIcon /> Permite Pets: {pets ? 'Sim' : 'Não'}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      <Modal
        open={popupOpen}
        onClose={handleClosePopup}
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '52vh',
          bgcolor: 'rgba(23, 23, 23, 0.9)', // Fundo escuro com transparência
          color: '#fff', // Texto branco
          borderRadius: '10px', // Cantos arredondados
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra
          p: 4 // Padding
        }}>
          {videoUrl && (
            <video controls style={{ width: '100%', marginBottom: 10 }}>
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <img
              src={imageUrls[selectedImageIndex]}
              alt={`Imagem ${selectedImageIndex}`}
              style={{ width: '80%', cursor: 'pointer' }}
              onClick={() => handleImageClick(selectedImageIndex)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            {imageUrls && imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Imagem ${index}`}
                style={{
                  width: '20%',
                  cursor: 'pointer',
                  margin: 5,
                  border: index === selectedImageIndex ? '2px solid #fff' : 'none',
                }}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          <Typography variant="h5" id="popup-title" gutterBottom>
            {nome}
          </Typography>
          <Typography variant="body1" id="popup-description" sx={{ color: '#fff' }}>
            {descricao}
          </Typography>
          <Typography variant="body1">
            Endereço: {endereco}, Número: {numero}, CEP: {cep}
          </Typography>
          <Typography variant="body1">
            Quartos: {quartos}
          </Typography>
          <Typography variant="body1">
            Banheiros: {banheiros}
          </Typography>
          <Typography variant="body1">
            Permite Pets: {pets ? 'Sim' : 'Não'}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ImovelCardFull;