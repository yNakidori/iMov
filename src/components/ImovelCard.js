import React, { useState } from "react";
import {
  Card,
  CardMedia,
  Box,
  Typography,
  Chip,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import {
  InfoRounded,
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  Delete as DeleteIcon,
  AcUnit,
  CurrencyExchange,
} from "@mui/icons-material";
import {
  getDatabase,
  ref as databaseRef,
  remove,
  set,
  get,
} from "firebase/database";

const ImovelCard = ({
  id,
  city,
  neighborhood,
  price,
  imageUrls = [],
  saleOrRent,
  propertyType,
  bedrooms,
  bathrooms,
  petsAllowed,
  furnished,
  garageSpaces,
  description,
  onImovelVendido,
  origin,
  area,
  nomeProprietario,
  emailProprietario,
  observacao,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isPaused, setIsPaused] = useState(origin === "paused");

  const coverImage =
    imageUrls.length > 0
      ? imageUrls[0]
      : "https://source.unsplash.com/random?wallpapers";

  const handleDelete = async () => {
    try {
      const db = getDatabase();

      if (origin === "available") {
        await remove(databaseRef(db, `addresses/${id}`));
      } else if (origin === "sold") {
        await remove(databaseRef(db, `vendidos/${id}`));
      } else if (origin === "paused") {
        await remove(databaseRef(db, `pausados/${id}`));
      }

      console.log(`Registro com o ID ${id} foi excluído com sucesso.`);
    } catch (error) {
      console.error("Erro ao excluir o registro:", error);
    }
    window.location.reload();
  };

  const handleMarkAsSold = () => {
    setOpenDialog(true);
  };

  const handleConfirmSold = async () => {
    try {
      const db = getDatabase();
      const addressRef = databaseRef(db, `addresses/${id}`);
      const soldRef = databaseRef(db, `vendidos/${id}`);

      const snapshot = await get(addressRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataVenda = new Date().toISOString();
        await set(soldRef, {
          ...data,
          vendido: true,
          dataVenda,
        });
        await remove(addressRef);
      }
      onImovelVendido(id);
    } catch (error) {
      console.error("Erro ao marcar o imóvel como vendido:", error);
    }
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePauseImovel = async () => {
    try {
      const db = getDatabase();
      const addressRef = databaseRef(db, `addresses/${id}`);
      const pausedRef = databaseRef(db, `pausados/${id}`);

      if (isPaused) {
        const pausedSnapshot = await get(pausedRef);
        if (pausedSnapshot.exists()) {
          const data = pausedSnapshot.val();
          await set(addressRef, {
            ...data,
            pausado: false,
          });
          await remove(pausedRef);
          setIsPaused(false);
        }
      } else {
        const snapshot = await get(addressRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          await set(pausedRef, {
            ...data,
            pausado: true,
          });
          await remove(addressRef);
          setIsPaused(true);
        }
      }
    } catch (error) {
      console.error("Erro ao pausar/reativar o imóvel:", error);
    }
  };

  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true);
  };

  const handleDetailsDialogClose = () => {
    setOpenDetailsDialog(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{ p: 2, zIndex: 1, borderRadius: "16px", boxShadow: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box>
              <Typography fontWeight="bold" noWrap gutterBottom variant="h6">
                {city}, {neighborhood}
              </Typography>
              {origin === "available" && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Preço: R$ {price.toLocaleString("pt-BR")}
                </Typography>
              )}
              <Chip
                size="small"
                variant="outlined"
                icon={<InfoRounded />}
                label={`ID: ${id}`}
                sx={{
                  ".MuiChip-icon": {
                    fontSize: 16,
                    ml: "4px",
                    color: "success.500",
                  },
                  bgcolor: "success.50",
                  borderColor: "success.100",
                  color: "success.900",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                <Tooltip title="Excluir">
                  <IconButton onClick={handleDelete} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                {origin === "available" && (
                  <Tooltip title="Marcar como vendido">
                    <IconButton
                      onClick={handleMarkAsSold}
                      aria-label="mark as sold"
                    >
                      <CurrencyExchange />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title={isPaused ? "Reativar" : "Pausar"}>
                  <IconButton
                    onClick={handlePauseImovel}
                    aria-label={isPaused ? "reactivate" : "pause"}
                  >
                    {isPaused ? <PlayArrowIcon /> : <AcUnit />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ver Detalhes">
                  <IconButton
                    onClick={handleOpenDetailsDialog}
                    aria-label="details"
                  >
                    <InfoRounded />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            alt={`${city} ${neighborhood} cover`}
            src={coverImage}
            sx={{
              borderRadius: "8px",
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Marcar Imóvel como Vendido</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja marcar este imóvel como vendido?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error">
            Cancelar
          </Button>
          <Button onClick={handleConfirmSold} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDetailsDialog} onClose={handleDetailsDialogClose}>
        <DialogTitle>Detalhes do Imóvel</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>Área:</strong> {area} (m²)
          </Typography>
          <Typography>
            <strong>Nome do Proprietário:</strong> {nomeProprietario}
          </Typography>
          <Typography>
            <strong>Email do Proprietário:</strong> {emailProprietario}
          </Typography>
          <Typography>
            <strong>Observação:</strong> {observacao}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsDialogClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ImovelCard;
