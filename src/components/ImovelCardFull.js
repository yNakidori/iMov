import React, { useState } from 'react';
import { FaEye, FaPlus, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Modal, IconButton, TextField, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { getDatabase, ref, push } from 'firebase/database';
import './ImovelCardFull.css'; // Importando o arquivo CSS para aplicar a animação

const ImovelCardFull = ({ cidade, bairro, valor, imageUrls, videoUrl }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const [formErrors, setFormErrors] = useState({
    nome: false,
    email: false,
    telefone: false,
    mensagem: false
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenVideo = () => {
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        errors[key] = true;
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const db = getDatabase();
        const messagesRef = ref(db, 'messages');
        await push(messagesRef, formData);
        setIsFormOpen(false);
        // Exibir alerta de sucesso
        alert('Formulário enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        // Exibir alerta de erro
        alert('Erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
      }
    }
  };

  return (
    <Card
      className={`animated-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative', width: '100%', height: '50%', overflow: 'hidden', marginTop: '-2px' }}>
        <img
          src={imageUrls && imageUrls.length > 0 ? imageUrls[0] : 'https://source.unsplash.com/random?wallpapers'}
          alt={`Capa do Card`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
        />
      </div>
      <CardContent style={{ flex: 1 }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6" color="#CCCCFF">{cidade}</Typography>
            <Typography variant="body2" color="#CCCCFF">{bairro}</Typography>
          </Grid>
          <Grid item xs={4}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <IconButton onClick={handleOpenVideo} style={{ border: '2px solid #CCCCFF', borderRadius: '50%', padding: '8px' }}>
                <FaEye size={15} />
              </IconButton>
              <Link to="/visualization">
                <div style={{ border: '2px solid #CCCCFF', borderRadius: '50%', padding: '8px' }}>
                  <FaPlus size={15} />
                </div>
              </Link>
              <IconButton onClick={() => setIsFormOpen(true)} style={{ border: '2px solid #CCCCFF', borderRadius: '50%', padding: '8px' }}>
                <FaShare size={15} />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Typography variant="h6" color="#CCCCFF">R$ {valor}</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '5px' }}>
          {imageUrls && imageUrls.slice(1, 4).map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Imagem ${index}`}
              style={{ width: 'calc(32% - 5px)', height: 'auto', borderRadius: '0' }}
            />
          ))}
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
                helperText={formErrors.mensagem ? '' : ''}
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
