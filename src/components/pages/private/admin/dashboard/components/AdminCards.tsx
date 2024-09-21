import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box, Grid2 } from '@mui/material';
import { People as PeopleIcon, Inventory as InventoryIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#8B5CF6', // Purple color from the image
        },
    },
});

interface StatCardProps {
    title: string;
    total: number;
    icon: React.ReactNode;
    stats: { label: string; value: number }[];
}

const StatCard: React.FC<StatCardProps> = ({ title, total, icon, stats }) => (
    <Card sx={{
        width: 300,
        border: 2,
        borderTop: 15,  
        borderColor: 'primary.main',
        borderRadius: 2,
        '& .MuiCardHeader-root': {
            paddingBottom: 0,
        },
        '& .MuiCardContent-root': {
            paddingTop: 1,
        },
        
    }}>
        <CardHeader
            title={
                <Typography variant="subtitle1" component="div">
                    {title}
                </Typography>
            }
            action={icon}
        />
        <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
                Total {total.toLocaleString()}
            </Typography>
            <Grid2 container spacing={2} justifyContent="space-between">
                {stats.map((stat, index) => (
                    <Grid2 key={index}>
                        <Typography variant="body2" color="text.secondary">
                            {stat.label}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {stat.value.toLocaleString()}
                        </Typography>
                    </Grid2>
                ))}
            </Grid2>
        </CardContent>
    </Card>
);

export default function DashboardCardsMUI() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <StatCard 
                    title="Usuarios"
                    total={1500}
                    icon={<PeopleIcon color="primary" />}
                    stats={[
                        { label: "Admin", value: 1 },
                        { label: "Personnel", value: 49 },
                        { label: "Employed", value: 1000 },
                    ]}
                />
                <StatCard
                    title="Objetos Perdidos"
                    total={55}
                    icon={<InventoryIcon color="primary" />}
                    stats={[
                        { label: "Recuperados", value: 5 },
                        { label: "No Encontrados", value: 50 },
                    ]}
                />
            </Box>
        </ThemeProvider>
    );
}