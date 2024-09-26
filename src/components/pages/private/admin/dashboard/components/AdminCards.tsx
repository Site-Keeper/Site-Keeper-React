import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Box, Grid2 } from '@mui/material';
import DynamicIcon from '../../../../../utilities/DynamicIcon';
import { USersService } from '../../../../../../services/users/users.service';
import { TasksService } from '../../../../../../services/task/task.service';
import { ReportsService } from '../../../../../../services/Reports/reports.service';
import { LostObjectsService } from '../../../../../../services/lostObjects/lost-objects.service';
import { IStatsTask, IStatsUser } from '../../../../../../models/interfaces/stats.interface';
import { IGetSummaryReportsResp } from '../../../../../../models/services/reports.interface';
import { IGetLostObjectSummaryResp } from '../../../../../../models/services/lost-object.interfaces';
import { Loader } from '../../../../../utilities/components/loader.utility';

interface StatCardProps {
    title: string;
    total: number;
    icon: React.ReactNode;
    stats: { label: string; value: number }[];
}

const StatCard: React.FC<StatCardProps> = ({ title, total, icon, stats }) => (
    <Card sx={{
        width: 260,
        height: 160,
        border: 2,
        borderTop: 15,
        borderColor: 'secondary.main',
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
                <Typography variant="h3" component="div">
                    {title}
                </Typography>
            }
            action={icon}
        />
        <CardContent>
            <Typography variant="subtitle1" component="div" gutterBottom>
                Total {total.toLocaleString()}
            </Typography>
            <hr style={{ color: '#E5E7EB', margin: "0", width: '100%' }}></hr>
            <Grid2 container spacing={2} justifyContent="space-between">
                {stats.map((stat, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="body1" >
                            {stat.label}
                        </Typography>
                        <Typography variant="body1" >
                            {stat.value.toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </Grid2>
        </CardContent>
    </Card>
);



export default function DashboardCardsMUI() {
    const [statsUser, setStatsUser] = useState<IStatsUser>({ total: 0, admin: 0, perssonel: 0, employed: 0 });
    const [statsTask, setStatsTask] = useState<IStatsTask>({ total: 0, completed: 0, cancelled: 0 });
    const [summaryReports, setSummaryReports] = useState<IGetSummaryReportsResp>({ total: 0, approvedTotal: 0, rejectedTotal: 0 });
    const [summaryLostObject, setSummaryLostObject] = useState<IGetLostObjectSummaryResp>({ total: 0, claimedTotal: 0, lostTotal: 0 });
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const getAllStatistics = async () => {
            setLoader(true);
            try {
                const [userStats, taskStats, summaryReports, summaryLostObject] = await Promise.all([
                    USersService.getStats(),
                    TasksService.getStats(),
                    ReportsService.getSummary(),
                    LostObjectsService.get_summary()
                ]);
    
                setStatsUser(userStats.data);
                setStatsTask(taskStats.data);
                setSummaryReports(summaryReports);
                setSummaryLostObject(summaryLostObject);
            } catch (error) {
                console.error("Error al obtener estadísticas:", error);
            }
            setLoader(false)
        };
    
        getAllStatistics();
    }, []);
    

    const info = [
        { title: 'Usuarios', Total: statsUser.total, icon: 'PeopleAltOutlinedIcon', stats: [{ label: 'Admin', value: statsUser.admin }, { label: 'Personnel', value: statsUser.perssonel }, { label: 'Employed', value: statsUser.employed }] },
        { title: 'Objetos Perdidos', Total: summaryLostObject.total, icon: 'Inventory2OutlinedIcon', stats: [{ label: 'Recuperados', value: summaryLostObject.claimedTotal }, { label: 'No Encontrados', value: summaryLostObject.lostTotal }] },
        { title: 'Reportes', Total: summaryReports.total, icon: 'DescriptionOutlinedIcon', stats: [{ label: 'Completados', value: summaryReports.approvedTotal }, { label: 'Cancelados', value: summaryReports.rejectedTotal }] },
        { title: 'Tareas', Total: statsTask.total, icon: 'AssignmentOutlinedIcon', stats: [{ label: 'Completados', value: statsTask.completed }, { label: 'Cancelados', value: statsTask.cancelled }] },
    ]
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <Loader isLoading={loader} />
            {info.map((info, index) => (
                <StatCard
                    key={index}
                    title={info.title}
                    total={info.Total}
                    icon={<DynamicIcon iconName={info.icon} sx={{ color: 'secondary.main' }} />}
                    stats={info.stats}
                />
            ))}
        </Box>
    );
}