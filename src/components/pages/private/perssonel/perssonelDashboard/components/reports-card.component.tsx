import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

interface IProp {
    item: {
        name: string,
        location: string,
        description: string,
        status: string
    }
}

enum statusColors {
    'Pendiente' = 'warning',
    'En progreso' = 'info',
    'Completado' = 'success',
    'Cancelado' = 'error',
};

export default function ReportsCard({ item }: IProp) {
    return (
        <Card sx={{ mb: 1 }}>
            <CardContent sx={{ py: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Chip
                        label={item.status}
                        color={statusColors[item.status]}
                        size="small"
                    />
                </Box>
                <Typography variant="body2" color="text.secondary">{item.location}</Typography>
                <Typography variant="body2">{item.description}</Typography>
            </CardContent>
        </Card>
    )
}
