import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CustomDashboardCard from './CustomDashboardCard';
import { getDatabase, ref, get } from 'firebase/database';

const Dashboard = () => {
  const [totalImoveis, setTotalImoveis] = useState(0);
  const [precoMedio, setPrecoMedio] = useState(0);
  const [vendasMensais, setVendasMensais] = useState({ labels: [], datasets: [] });
  const [totalVendidos, setTotalVendidos] = useState(0);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const db = getDatabase();
        const imoveisSnapshot = await get(ref(db, 'addresses'));
        const vendidosSnapshot = await get(ref(db, 'vendidos'));

        let imoveis = [];
        let vendidos = [];

        if (imoveisSnapshot.exists()) {
          imoveis = Object.values(imoveisSnapshot.val());
          setTotalImoveis(imoveis.length);
        }

        if (vendidosSnapshot.exists()) {
          vendidos = Object.values(vendidosSnapshot.val());
          setTotalVendidos(vendidos.length);
        }

        const totalImoveisList = [...imoveis, ...vendidos];

        if (totalImoveisList.length > 0) {
          const totalPreco = totalImoveisList.reduce((acc, imovel) => acc + parseFloat(imovel.price || 0), 0);
          const mediaPreco = totalPreco / totalImoveisList.length;
          setPrecoMedio(mediaPreco);
        }

        const vendasMensaisData = Array.from({ length: 12 }, () => 0);
        vendidos.forEach((vendido) => {
          const dataVenda = vendido.dataVenda ? new Date(vendido.dataVenda) : new Date();

          if (!isNaN(dataVenda)) {
            const mesVenda = dataVenda.getMonth();
            vendasMensaisData[mesVenda] += 1;
          } else {
            console.warn('Data de Venda inválida:', vendido.dataVenda);
          }
        });

        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const chartData = {
          labels: meses,
          datasets: [
            {
              label: 'Vendas Mensais',
              data: vendasMensaisData,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        };

        setVendasMensais(chartData);
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
