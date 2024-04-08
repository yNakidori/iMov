import React, { useEffect } from 'react';
import L from 'leaflet';

const MapComponent = () => {
  useEffect(() => {
    // Coordenadas do endereço
    const latitude = -23.48576155971415;
    const longitude = -46.42960053068033;


    // Inicialize o mapa com as coordenadas fornecidas
    const map = L.map('map').setView([latitude, longitude], 13);

    // Adicione uma camada de azulejos do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adicione um marcador ao mapa nas coordenadas fornecidas
    L.marker([latitude, longitude]).addTo(map);
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '600px' }}></div>
  );
};

export default MapComponent;
