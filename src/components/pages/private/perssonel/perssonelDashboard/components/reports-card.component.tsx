import { Box, Card, CardContent, MenuItem, Select, Typography } from "@mui/material";
import { IReport } from "../../../../../../models/interfaces/reports.interface";
import { statusColors } from "../../../../../../models/enums/status-colors.enums";

interface IProp {
    item: IReport
    setChangeTrigger: React.Dispatch<React.SetStateAction<boolean>>
    changeTrigger: boolean
}

export default function ReportsCard({ item }: IProp) {
    return (
        <Card sx={{ mb: 2, borderRadius: '25px' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Select
                        value={item.status}
                        sx={{ bgcolor: `${statusColors[item.status]}.main`, height: '35px', borderRadius: 15 }}
                    >
                        <MenuItem value="PENDING">
                            Pendiente
                        </MenuItem>
                        <MenuItem value="IN_PROGRESS">
                            En Progreso
                        </MenuItem>
                        <MenuItem value="COMPLETED">
                            Completada
                        </MenuItem>
                        <MenuItem value="CANCELLED">
                            Cancelada
                        </MenuItem>
                    </Select>
                </Box>
                <Typography variant="body1" color="text.secondary">{item.spaceName}</Typography>
                <Typography variant="body1">{item.description}</Typography>
            </CardContent>
        </Card>
    )
}
