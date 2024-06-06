import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CustomDashboardCard from './CustomDashboardCard';
import { getDatabase, ref, get } from 'firebase/database';

const Dashboard = () => {
  const [totalImoveis, setTotalImoveis] = useState(0);
  const [precoMedio, setPrecoMedio] = useState(0);
  const [vendasMensais, setVendasMensais] = useState({ labels: [], values: [] });
  const [totalVendidos, setTotalVendidos] = useState(0);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const db = getDatabase();
        const imoveisSnapshot = await get(ref(db, 'addresses'));
        const vendidosSnapshot = await get(ref(db, 'vendidos'));
        if (imoveisSnapshot.exists()) {
          const imoveis = Object.values(imoveisSnapshot.val());
          setTotalImoveis(imoveis.length);

          const totalPreco = imoveis.reduce((acc, imovel) => acc + imovel.preco, 0);
          const mediaPreco = totalPreco / imoveis.length;
          setPrecoMedio(mediaPreco);
        }
        if (vendidosSnapshot.exists()) {
          const vendidos = Object.values(vendidosSnapshot.val());
          setTotalVendidos(vendidos.length);

          const vendasMensaisData = Array.from({ length: 12 }, () => 0);
          vendidos.forEach((vendido) => {
            const mesVenda = new Date(vendido.dataVenda).getMonth();
            vendasMensaisData[mesVenda] += 1;
          });

          const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
          const vendasMensaisFormatadas = meses.map((mes, index) => ({
            mes,
            vendas: vendasMensaisData[index],
          }));

          setVendasMensais({
            labels: vendasMensaisFormatadas.map((v) => v.mes),
            values: vendasMensaisFormatadas.map((v) => v.vendas),
          });
        }
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
      }
    };

    fetchImoveis();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6}>
        <CustomDashboardCard title="Total de Imóveis" value={totalImoveis} />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CustomDashboardCard title="Total de Vendidos" value={totalVendidos} />
      </Grid>
      <Grid item xs={12}>
        <CustomDashboardCard title="Vendas Mensais" chartData={vendasMensais} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
