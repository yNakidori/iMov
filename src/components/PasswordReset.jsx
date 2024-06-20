import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Paper,
    Box,
    Typography,
    Link as MuiLink,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { getRandomImage } from "../unsplashService";

function PasswordReset() {
    const [email, setEmail] = useState("");
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [error, setError] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");

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

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setResetEmailSent(true);
            setError("");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError("Usuário não encontrado. Verifique o endereço de e-mail e tente novamente.");
            } else {
                setError("Não foi possível enviar o e-mail de redefinição de senha. Tente novamente mais tarde.");
            }
        }
    };

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Redefinir Senha
                        </Typography>
                        <Box component="form" noValidate onSubmit={resetPassword} sx={{ mt: 3 }}>
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
                            {resetEmailSent && (
                                <Typography variant="body1" color="success">
                                    Um e-mail de redefinição de senha foi enviado para o endereço fornecido.
                                </Typography>
                            )}
                            {error && (
                                <Typography variant="body1" color="error">
                                    {error}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Redefinir Senha
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <MuiLink component={Link} to="/login" variant="body2">
                                        Voltar para o login
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

export default PasswordReset;
