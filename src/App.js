import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Gear from "./components/Lottie/Gear";
import Footer from "./components/Footer";
import { auth } from "./firebase/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Button, CssBaseline, TextField, Grid, Paper, Box, Typography, Link as MuiLink, ThemeProvider, createTheme } from "@mui/material";
import { getRandomImage } from "./unsplashService";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getRandomImage('wallpapers');
        setBackgroundImage(image.urls.full);
      } catch (error) {
        console.error("Error fetching the background image:", error);
      }
    };

    fetchImage();
  }, []);

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setSuccessMessage("Conta criada com sucesso! Um e-mail de verificação foi enviado para o seu endereço de e-mail.");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Gear />
            <Typography component="h1" variant="h5">
              Registro de perfil
            </Typography>
            <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirme a Senha"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <Typography color="error">{error}</Typography>}
              {successMessage && <Typography color="success">{successMessage}</Typography>}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Registrar
              </Button>
              <Grid container>
                <Grid item>
                  <MuiLink component={Link} to="/login" variant="body2">
                    Já tem uma conta? Faça login
                  </MuiLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
