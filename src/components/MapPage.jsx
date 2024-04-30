import React from 'react';
import { Container, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import MapComponent from '../components/MapComponent';
import MenuAppBar from './MenuAppBar';

const MapPage = () => {
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, backgroundColor: '#36393F', borderRadius: 4, boxShadow: 4 }}>
              <Typography variant="h4" align="center" sx={{ mb: 4, color: 'white' }}>Entre em contato</Typography>
              <form action="#" className="space-y-4">
                <TextField
                  id="name"
                  label="Seu nome"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    style: { color: 'white' },
                    className: 'discord-textfield'
                  }}
                  sx={{ '& label': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                />
                <TextField
                  id="email"
                  label="Seu email"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    style: { color: 'white' },
                    className: 'discord-textfield'
                  }}
                  sx={{ '& label': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                />
                <TextField
                  id="message"
                  label="Sua mensagem"
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    style: { color: 'white' },
                    className: 'discord-textfield'
                  }}
                  sx={{ '& label': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, backgroundColor: '#7289DA' }}
                  className="discord-button"
                >
                  Enviar mensagem
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, backgroundColor: '#5c6bc0', opacity: 0.8, borderRadius: 4, boxShadow: 4 }}>
            <Typography variant="h4" align="center" sx={{ mb: 2 }}>Venha fazer uma visita!!!</Typography>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>Estamos nesse endereço: R. Santa Rosa de Lima, 520 - Parque Paulistano</Typography>
            <MapComponent />
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default MapPage;
