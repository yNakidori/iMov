import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import { Container, Grid, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { FaHeart, FaShare } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const VisualizationPage = () => {
    const location = useLocation();
    const { imovel } = location.state || {};

    if (!imovel) {
        return <Typography variant="h6">Imóvel não encontrado.</Typography>;
    }

    const {
        area = 'Não informado',
        vagas = 'Não informado',
        aceitaPet = 'Não informado',
        mobiliado = 'Não informado'
    } = imovel.detalhes || {};

    return (
        <>
            <MenuAppBar />
            <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h4" gutterBottom>
                            {imovel.bairro}, {imovel.cidade}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            Preço: R$ {imovel.valor}
                        </Typography>
                        <div style={{ marginTop: '20px' }}>
                            <Grid container spacing={2}>
                                {imovel.imageUrls.map((image, index) => (
                                    <Grid item xs={12} sm={4} key={index}>
                                        <Card>
                                            <CardMedia component="img" image={image} alt={`Imagem ${index + 1}`} />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Card>
                            <CardContent>
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
                                    Descrição
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {imovel.descricao}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Detalhes do Imóvel
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Quartos: {imovel.quartos}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Banheiros: {imovel.banheiros}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Vagas: {vagas}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Área: {area}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Aceita Pet: {aceitaPet}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Mobiliado: {mobiliado}
                                </Typography>
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
                <Typography variant="body1" style={{ marginTop: '20px' }}>
                    {imovel.descricao}
                </Typography>
            </Container>
        </>

    );
};

export default VisualizationPage;
