import React from 'react';
import { FaEye, FaPlus, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ImovelCardFull = ({ cidade, bairro, valor, imageUrls, videoUrl }) => {
  return (
    <Card sx={{ maxWidth: 360, boxShadow: 4, display: 'flex', flexDirection: 'column' }}>
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
              <div style={{ border: '2px solid #CCCCFF', borderRadius: '50%', padding: '8px' }}>
                <FaEye size={15} />
              </div>
              <Link to="/visualization">
                <div style={{ border: '2px solid #CCCCFF', borderRadius: '50%', padding: '8px' }}>
                  <FaPlus size={15} />
                </div>
              </Link>
              <div style={{ border: '2px solid #CCCCFF', borderRadius: '50%', padding: '8px' }}>
                <FaShare size={15} />
              </div>
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
    </Card>
  );
};

export default ImovelCardFull;
