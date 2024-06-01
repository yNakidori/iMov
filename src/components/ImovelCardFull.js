import React, { useState } from 'react';
import { FaEye, FaPlus, FaShare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal, IconButton, TextField, Button, Typography, Card, CardContent, Grid, CardMedia } from '@mui/material';
import { getDatabase, ref, push } from 'firebase/database';
import './ImovelCardFull.css';

const ImovelCardFull = ({ id, cidade, bairro, valor, imageUrls, videoUrl, descricao, quartos, banheiros, detalhes }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleOpenVideo = () => setIsVideoOpen(true);
  const handleCloseVideo = () => setIsVideoOpen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: false });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(formData).forEach(key => !formData[key] && (errors[key] = true));
    setFormErrors(errors);
    if (!Object.keys(errors).length) {
      try {
        const db = getDatabase();
        const messagesRef = ref(db, 'messages');
        await push(messagesRef, formData);
        setIsFormOpen(false);
        alert('Formulário enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        alert('Erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
      }
    }
  };

  const handleViewDetails = () => {
    navigate('/visualization', { state: { imovel: { id, cidade, bairro, valor, imageUrls, videoUrl, descricao, quartos, banheiros, detalhes } } });
  };

  return (
    <Card
      className={`animated-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ maxWidth: '300px', margin: '10px' }}
    >
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
        <img
          src={imageUrls.length > 0 ? imageUrls[0] : 'https://source.unsplash.com/random?wallpapers'}
          alt="Capa do Card"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <CardContent style={{ padding: '10px' }}>
        <Typography variant="h6" style={{ color: '#000', fontWeight: 'bold' }}>
          {bairro}
        </Typography>
        <Typography variant="body2" style={{ color: '#000', fontWeight: 'bold' }}>
          {cidade}
        </Typography>
        <Typography variant="h6" style={{ color: '#000', marginTop: '10px' }}>
          R$ {valor}
        </Typography>
        <Grid container spacing={1} style={{ marginTop: '10px' }}>
          {imageUrls.slice(1, 4).map((imageUrl, index) => (
            <Grid item xs={4} key={index}>
              <CardMedia
                component="img"
                image={imageUrl}
                alt={`Imagem ${index}`}
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </Grid>
          ))}
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <IconButton onClick={handleOpenVideo} style={{ padding: '5px' }}>
            <FaEye size={20} />
          </IconButton>
          <IconButton onClick={handleViewDetails} style={{ padding: '5px' }}>
            <FaPlus size={20} />
          </IconButton>
          <IconButton onClick={() => setIsFormOpen(true)} style={{ padding: '5px' }}>
            <FaShare size={20} />
          </IconButton>
        </div>
      </CardContent>
      <Modal open={isVideoOpen} onClose={handleCloseVideo}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
          <video controls style={{ maxWidth: '100%', height: 'auto' }}>
            <source src={videoUrl} type="video/mp4" />
            Seu navegador não suporta vídeo HTML5.
          </video>
        </div>
      </Modal>
      <Modal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '400px' }}>
          <Typography variant="subtitle1" style={{ marginBottom: '20px', textAlign: 'center' }}>Mande uma mensagem direta</Typography>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <TextField
                fullWidth
                label="Seu Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                error={formErrors.nome}
                helperText={formErrors.nome ? 'Campo obrigatório' : ''}
                variant="standard"
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                label="Seu Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                helperText={formErrors.email ? 'Campo obrigatório' : ''}
                variant="standard"
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                label="Seu Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                error={formErrors.telefone}
                helperText={formErrors.telefone ? 'Campo obrigatório' : ''}
                variant="standard"
              />
            </div>
            <div className="mb-5">
              <TextField
                fullWidth
                label="Mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                error={formErrors.mensagem}
                multiline
                rows={4}
                variant="standard"
              />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>Enviar</Button>
          </form>
        </div>
      </Modal>
    </Card>
  );
};

export default ImovelCardFull;
