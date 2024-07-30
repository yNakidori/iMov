import React, { useState } from "react";
import MenuAppBar from "../components/MenuAppBar";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Modal,
  Box,
  Tooltip,
} from "@mui/material";
import { FaShare } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  KingBed as BedIcon,
  Bathtub as BathtubIcon,
  DirectionsCar as CarIcon,
  Pets as PetsIcon,
  CheckBox as CheckBoxIcon,
} from "@mui/icons-material";

const VisualizationPage = () => {
  const location = useLocation();
  const { imovel } = location.state || {};

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);

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

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 2000);
    });
  };

  const fontStyle = {
    fontFamily: "OpenSans-Italic, sans-serif",
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <MenuAppBar />
      <Container maxWidth="lg" style={{ marginTop: "20px", ...fontStyle }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom style={fontStyle}>
              {imovel.bairro}, {imovel.cidade}
            </Typography>
            <Typography variant="h6" color="textSecondary" style={fontStyle}>
              Preço: R$ {imovel.valor}
            </Typography>
            <div style={{ marginTop: "20px" }}>
              <Grid container spacing={2}>
                {imovel.imageUrls.map((image, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Card
                      onClick={() => handleOpen(image)}
                      style={{
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                        transition: "transform 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <CardMedia
                        component="img"
                        image={image}
                        alt={`Imagem ${index + 1}`}
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card
              style={{
                padding: "20px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                borderRadius: "8px",
              }}
            >
              <CardContent style={fontStyle}>
                <Typography variant="h6" gutterBottom>
                  Vídeo do Imóvel
                </Typography>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  <video
                    controls
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  >
                    <source src={imovel.videoUrl} type="video/mp4" />
                    Seu navegador não suporta vídeo HTML5.
                  </video>
                </div>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginTop: "20px" }}
                >
                  Descrição:
                </Typography>
                <Typography variant="body1" gutterBottom style={fontStyle}>
                  {imovel.descricao}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {imovel.detalhes}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Detalhes do Imóvel
                </Typography>
                <Grid container spacing={2} style={{ marginTop: "10px" }}>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <HomeIcon style={{ marginRight: "4px" }} />
                      <Typography variant="body2" color="textSecondary">
                        Área: {imovel.area || "Não informado"} m²
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <BedIcon style={{ marginRight: "4px" }} />
                      <Typography variant="body2" color="textSecondary">
                        Quartos: {imovel.quartos || "Não informado"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <BathtubIcon style={{ marginRight: "4px" }} />
                      <Typography variant="body2" color="textSecondary">
                        Banheiros: {imovel.banheiros || "Não informado"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <CarIcon style={{ marginRight: "4px" }} />
                      <Typography variant="body2" color="textSecondary">
                        Vagas: {imovel.garagem || "Não informado"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <PetsIcon style={{ marginRight: "4px" }} />
                      <Typography variant="body2" color="textSecondary">
                        Aceita Pets: {imovel.pets ? "Sim" : "Não"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box display="flex" alignItems="center">
                      <CheckBoxIcon style={{ marginRight: "4px" }} />
                      <Typography variant="body2" color="textSecondary">
                        Mobiliado: {imovel.mobiliado ? "Sim" : "Não"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Tooltip
                    title="Link copiado!"
                    open={tooltipOpen}
                    arrow
                    disableHoverListener
                  >
                    <IconButton onClick={handleShare}>
                      <FaShare />
                    </IconButton>
                  </Tooltip>
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
          style={{ transform: "translate(-50%, -50%)" }}
          width="90%"
          maxWidth="800px"
          maxHeight="80vh"
          overflow="auto"
          bgcolor="background.paper"
          boxShadow={24}
          p={4}
        >
          <img
            src={selectedImage}
            alt="Imagem Ampliada"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "75vh",
              borderRadius: "8px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default VisualizationPage;
