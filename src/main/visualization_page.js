import React from 'react';
import { Container, Grid, Typography, Button, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { FaHeart, FaShare } from 'react-icons/fa';

const VisualizationPage = () => {
    // Exemplo de dados do imóvel (substitua pelos dados reais)
    const imovel = {
        titulo: "Apartamento para alugar com 56m², 2 quartos e 1 vaga",
        total: 4931,
        aluguel: 4150,
        condominio: 621,
        iptu: 0,
        seguroIncendio: 53,
        taxaServico: 107,
        endereco: "Rua Bueno de Andrade, Aclimação - São Paulo",
        descricao: "Imóvel aconchegante para alugar com 2 quartos, sendo 1 suíte, e 2 banheiros no total...",
        imagens: [
            "https://via.placeholder.com/800x600",
            "https://via.placeholder.com/800x600",
            "https://via.placeholder.com/800x600"
        ],
        detalhes: {
            area: "56 m²",
            quartos: "2 quartos (1 suíte)",
            banheiros: "2 banheiros",
            vagas: "1 vaga",
            andar: "4º a 7º andar",
            aceitaPet: "Aceita pet",
            mobiliado: "Sem mobília",
            proximidade: "Não próximo"
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h4" gutterBottom>
                        {imovel.titulo}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Total R$ {imovel.total}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Aluguel R$ {imovel.aluguel}
                    </Typography>
                    <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                        Agendar visita
                    </Button>
                    <Button variant="outlined" color="primary">
                        Fazer proposta
                    </Button>
                    <div style={{ marginTop: '20px' }}>
                        <Grid container spacing={2}>
                            {imovel.imagens.map((image, index) => (
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
                                Endereço
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                {imovel.endereco}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Preços e taxas
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Aluguel: R$ {imovel.aluguel}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Condomínio: R$ {imovel.condominio}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                IPTU: R$ {imovel.iptu}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Seguro Incêndio: R$ {imovel.seguroIncendio}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Taxa de Serviço: R$ {imovel.taxaServico}
                            </Typography>
                            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                                Detalhes
                            </Typography>
                            {Object.keys(imovel.detalhes).map((key) => (
                                <Typography variant="body2" color="textSecondary" key={key}>
                                    {imovel.detalhes[key]}
                                </Typography>
                            ))}
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
    );
};

export default VisualizationPage;
