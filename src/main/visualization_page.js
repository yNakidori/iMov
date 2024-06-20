import React, { useState } from 'react';
import MenuAppBar from '../components/MenuAppBar';
import { Container, Grid, Typography, Card, CardMedia, CardContent, IconButton, Modal, Box } from '@mui/material';
import { FaHeart, FaShare } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import {
    Home as HomeIcon,
    KingBed as BedIcon,
    Bathtub as BathtubIcon,
    DirectionsCar as CarIcon,
    Pets as PetsIcon,
    CheckBox as CheckBoxIcon,
    Elevator as ElevatorIcon,
    Balcony as BalconyIcon
} from '@mui/icons-material';

const VisualizationPage = () => {
    const location = useLocation();
    const { imovel } = location.state || {};

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    if (!imovel) {
        return <Typography variant="h6">Imóvel não encontrado.</Typography>;
    }

    const handleOpen = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const fontStyle = {
        fontFamily: 'OpenSans-Italic, sans-serif'
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <>
                <MenuAppBar />
                <Container maxWidth="lg" style={{ marginTop: '20px', ...fontStyle }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7}>
                            <Typography variant="h4" gutterBottom style={fontStyle}>
                                {imovel.bairro}, {imovel.cidade}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" style={fontStyle}>
                                Preço: R$ {imovel.valor}
                            </Typography>
                            <div style={{ marginTop: '20px' }}>
                                <Grid container spacing={2}>
                                    {imovel.imageUrls.map((image, index) => (
                                        <Grid item xs={12} sm={4} key={index}>
                                            <Card onClick={() => handleOpen(image)} style={{ cursor: 'pointer', border: '1px solid #ccc', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
                                                <CardMedia component="img" image={image} alt={`Imagem ${index + 1}`} />
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Card>
                                <CardContent style={fontStyle}>
                                    <Typography variant="h6" gutterBottom>
                                        Vídeo do Imóvel
                                    </Typography>
                                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                                        <video controls style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                                            <source src={imovel.videoUrl} type="video/mp4" />
                                            Seu navegador não suporta vídeo HTML5.
                                        </video>
                                    </div>
                                    <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                                        Descrição:
                                    </Typography>
                                    <Typography variant="h6" gutterBottom style={fontStyle}>
                                        {imovel.descricao}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {imovel.detalhes}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Detalhes do Imóvel
                                    </Typography>
                                    <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                        <Grid item xs={6} sm={4}>
                                            <Box display="flex" alignItems="center">
                                                <HomeIcon style={{ marginRight: '4px' }} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Área: {imovel.area || 'Não informado'} m²
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4}>
                                            <Box display="flex" alignItems="center">
                                                <BedIcon style={{ marginRight: '4px' }} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Quartos: {imovel.quartos || 'Não informado'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4}>
                                            <Box display="flex" alignItems="center">
                                                <BathtubIcon style={{ marginRight: '4px' }} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Banheiros: {imovel.banheiros || 'Não informado'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4}>
                                            <Box display="flex" alignItems="center">
                                                <CarIcon style={{ marginRight: '4px' }} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Vagas: {imovel.garagem || 'Não informado'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4}>
                                            <Box display="flex" alignItems="center">
                                                <PetsIcon style={{ marginRight: '4px' }} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Aceita Pets: {imovel.pets ? 'Sim' : 'Não'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4}>
                                            <Box display="flex" alignItems="center">
                                                <CheckBoxIcon style={{ marginRight: '4px' }} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Mobiliado: {imovel.mobiliado ? 'Sim' : 'Não'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4}>
                                            <Box display="flex" alignItems="center">
                                                <ElevatorIcon style={{ marginRight: '4px' }} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Andar: {imovel.andar || 'Não informado'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={4}>
                                            <Box display="flex" alignItems="center">
                                                <BalconyIcon style={{ marginRight: '4px' }} />
                                                <Typography variant="body2" color="textSecondary">
                                                    Sacada: {imovel.sacada ? 'Sim' : 'Não'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                        <IconButton>
                                            <FaHeart />
                                        </IconButton>
                                        <IconButton>
                                            <FaShare />
                                        </IconButton>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>

                <Modal open={modalOpen} onClose={handleClose}>
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        style={{ transform: 'translate(-50%, -50%)' }}
                        width="90%"
                        maxWidth="800px"
                        maxHeight="80vh"
                        overflow="auto"
                        bgcolor="background.paper"
                        boxShadow={24}
                        p={4}
                    >
                        <img src={selectedImage} alt="Imagem Ampliada" style={{ width: '100%', height: 'auto', maxHeight: '75vh', borderRadius: '8px', boxShadow: '2px 2px 10px rgba(0,0,0,0.3)' }} />
                    </Box>
                </Modal>
            </>
        </div>
    );
};

export default VisualizationPage;
