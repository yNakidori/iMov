import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { getDatabase, ref as databaseRef, push } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  Button,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import watermark from "watermarkjs";

const CadForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    neighborhood: "",
    price: "",
    consultPrice: false,
    video: null,
    images: [],
    saleOrRent: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    petsAllowed: false,
    furnished: false,
    garageSpaces: "",
    description: "",
    area: "",
    nomeProprietario: "",
    emailProprietario: "",
    observacao: "",
  });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...acceptedFiles],
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 6,
    multiple: true,
  });

  const applyWatermark = async (file) => {
    const image = await watermark([file]).image(
      watermark.text.lowerRight("©Filó Imobiliaria ", "58px Arial", "#FFF", 0.5)
    );
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type);
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      city,
      neighborhood,
      price,
      consultPrice,
      video,
      images,
      saleOrRent,
      propertyType,
      bedrooms,
      bathrooms,
      petsAllowed,
      furnished,
      garageSpaces,
      description,
      area,
      nomeProprietario,
      emailProprietario,
      observacao,
    } = formData;

    if (images.length === 0) {
      setAlert({
        open: true,
        severity: "error",
        message: "Selecione pelo menos uma imagem.",
      });
      return;
    }

    try {
      setUploading(true);
      const delay = 3000;
      const interval = 100;
      const steps = delay / interval;

      for (let i = 0; i <= steps; i++) {
        await new Promise((resolve) => setTimeout(resolve, interval));
        setProgress(Math.round((i / steps) * 100));
      }

      const db = getDatabase();
      const storage = getStorage();
      const watermarkedImages = await Promise.all(
        images.map(async (image) => {
          const watermarkedImage = await applyWatermark(image);
          return watermarkedImage;
        })
      );

      const imageUrls = await Promise.all(
        watermarkedImages.map(async (image) => {
          const imageRef = storageRef(storage, `images/${image.name}`);
          await uploadBytesResumable(imageRef, image);
          return await getDownloadURL(imageRef);
        })
      );

      let videoURL = "";
      if (video) {
        const videoRef = storageRef(storage, `videos/${video.name}`);
        await uploadBytesResumable(videoRef, video);
        videoURL = await getDownloadURL(videoRef);
      }

      await push(databaseRef(db, "addresses"), {
        city,
        neighborhood,
        price: consultPrice ? "Consulte com um corretor" : price,
        videoURL,
        imageUrls,
        saleOrRent,
        propertyType,
        bedrooms,
        bathrooms,
        petsAllowed,
        furnished,
        garageSpaces,
        description,
        area,
        nomeProprietario,
        emailProprietario,
        observacao,
      });

      setFormData({
        city: "",
        neighborhood: "",
        price: "",
        consultPrice: false,
        video: null,
        images: [],
        saleOrRent: "",
        propertyType: "",
        bedrooms: "",
        bathrooms: "",
        petsAllowed: false,
        furnished: false,
        garageSpaces: "",
        description: "",
        area: "",
        nomeProprietario: "",
        emailProprietario: "",
        observacao: "",
      });
      setProgress(0);
      setUploading(false);
      setAlert({
        open: true,
        severity: "success",
        message: "Formulário enviado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      setAlert({
        open: true,
        severity: "error",
        message:
          "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
      });
      setProgress(0);
      setUploading(false);
    }
  };

  const {
    city,
    neighborhood,
    price,
    consultPrice,
    video,
    images,
    saleOrRent,
    propertyType,
    bedrooms,
    bathrooms,
    petsAllowed,
    furnished,
    garageSpaces,
    description,
    area,
    nomeProprietario,
    emailProprietario,
    observacao,
  } = formData;
  const allFieldsReady =
    city &&
    neighborhood &&
    (price || consultPrice) &&
    images.length > 0 &&
    !uploading;

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: "16px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: 3,
        height: "80vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Adicionar um imóvel
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={consultPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        consultPrice: e.target.checked,
                        price: "",
                      })
                    }
                  />
                }
                label="Consulte com um corretor"
              />
              {!consultPrice && (
                <NumericFormat
                  value={price}
                  onValueChange={(values) => {
                    const { formattedValue } = values;
                    handleChange({
                      target: { name: "price", value: formattedValue },
                    });
                  }}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  customInput={TextField}
                  label="Preço"
                  fullWidth
                  variant="outlined"
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                name="city"
                value={city}
                onChange={handleChange}
                label="Cidade"
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                name="neighborhood"
                value={neighborhood}
                onChange={handleChange}
                label="Bairro"
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Venda ou Aluguel</InputLabel>
              <Select
                name="saleOrRent"
                value={saleOrRent}
                onChange={handleChange}
                label="Venda ou Aluguel"
              >
                <MenuItem value="sale">Venda</MenuItem>
                <MenuItem value="rent">Aluguel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Tipo de Imóvel</InputLabel>
              <Select
                name="propertyType"
                value={propertyType}
                onChange={handleChange}
                label="Tipo de Imóvel"
              >
                <MenuItem value="house">Casa</MenuItem>
                <MenuItem value="apartment">Apartamento</MenuItem>
                <MenuItem value="commercial">Comercial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="bedrooms"
              value={bedrooms}
              onChange={handleChange}
              label="Quartos"
              fullWidth
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="bathrooms"
              value={bathrooms}
              onChange={handleChange}
              label="Banheiros"
              fullWidth
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="garageSpaces"
              value={garageSpaces}
              onChange={handleChange}
              label="Vagas na garagem"
              fullWidth
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="area"
              value={area}
              onChange={handleChange}
              label="Área em m²"
              fullWidth
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                name="description"
                value={description}
                onChange={handleChange}
                label="Descrição"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Imagens do imóvel
            </Typography>
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed grey",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body2">
                Arraste e solte as imagens aqui, ou clique para selecionar
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    margin: "8px",
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Vídeo do imóvel (opcional)
            </Typography>
            <Box>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleChange}
                  name="video"
                />
              </Button>
              {video && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {video.name}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={petsAllowed}
                  onChange={handleChange}
                  name="petsAllowed"
                />
              }
              label="Aceita animais"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={furnished}
                  onChange={handleChange}
                  name="furnished"
                />
              }
              label="Mobiliado"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="nomeProprietario"
              value={nomeProprietario}
              onChange={handleChange}
              label="Nome do Proprietário"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="emailProprietario"
              value={emailProprietario}
              onChange={handleChange}
              label="Email do Proprietário"
              fullWidth
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="observacao"
              value={observacao}
              onChange={handleChange}
              label="Observação"
              fullWidth
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!allFieldsReady}
              >
                {uploading ? <CircularProgress size={24} /> : "Enviar"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CadForm;
