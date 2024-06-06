import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import BarChart from './BarChart'; // Importe o componente BarChart

const CustomDashboardCard = ({ title, value, chartData }) => {
    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            {chartData ? <BarChart data={chartData} /> : null}
            <Typography variant="h4" color="primary" sx={{ mt: 2 }}>
                {value}
            </Typography>
        </Paper>
    );
};

export default CustomDashboardCard;
