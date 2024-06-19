import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CustomDashboardCard = ({ title, value, chartData }) => {
    return (
        <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
            <Typography variant="h6">{title}</Typography>
            {chartData ? (
                <Bar data={chartData} />
            ) : (
                <Typography variant="h4" style={{ marginTop: '16px' }}>
                    {value}
                </Typography>
            )}
        </Paper>
    );
};

export default CustomDashboardCard;
