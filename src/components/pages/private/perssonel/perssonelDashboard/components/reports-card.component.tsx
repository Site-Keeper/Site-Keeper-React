import { Box, Card, CardContent, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { IReport } from "../../../../../../models/interfaces/reports.interface";
import { statusColors } from "../../../../../../models/enums/status-colors.enums";
import { ReportStatus } from "../../../../../../models/enums/status.enum";
import { ReportsService } from "../../../../../../services/Reports/reports.service";
import { Loader } from "../../../../../utilities/components/loader.utility";
import { useState } from "react";

interface IProp {
    item: IReport
    setChangeTrigger: React.Dispatch<React.SetStateAction<boolean>>
    changeTrigger: boolean
}

export default function ReportsCard({ item, setChangeTrigger, changeTrigger }: IProp) {
    const [loader, setLoader] = useState(false)

    const onStateChange = async (newState: ReportStatus) => {
        setLoader(true)
        console.log('newStatus:', newState);
        const newTask = { id: item.id, status: newState };
        try {
            await ReportsService.updateStatus(newTask);
            setChangeTrigger(!changeTrigger);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
        setLoader(false)
    };

    const handleStateChange = (event: SelectChangeEvent<ReportStatus>) => {
        onStateChange(event.target.value as ReportStatus);
    };


    return (
        <Card sx={{ mb: 2, borderRadius: '25px' }}>
            <Loader isLoading={loader} />
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Select
                        value={item.status}
                        sx={{ bgcolor: `${statusColors[item.status]}.main`, height: '35px', borderRadius: 15 }}
                        onChange={handleStateChange}
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
