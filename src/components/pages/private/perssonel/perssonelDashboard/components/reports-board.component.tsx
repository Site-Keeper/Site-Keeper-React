import { Box, Typography } from '@mui/material'
import DynamicIcon from '../../../../../utilities/DynamicIcon'
import ReportsCard from './reports-card.component';
import { IReport } from '../../../../../../models/interfaces/reports.interface';
import { ReportStatus } from '../../../../../../models/enums/status.enum';

const reports: IReport[] = [
  {
    id: 1,
    name: "Revisión de Mantenimiento",
    description: "Revisión mensual del sistema de climatización.",
    spaceName: "Oficina 101",
    theDate: new Date("2024-10-05"),
    topic: {
      id: 1,
      name: "Mantenimiento",
      icon: "herramienta",
    },
    status: ReportStatus.COMPLETED,
  },
  {
    id: 2,
    name: "Inspección de Seguridad",
    description: "Revisión de extintores y sistema de seguridad.",
    spaceName: "Bodega 3",
    theDate: new Date("2024-10-12"),
    topic: {
      id: 2,
      name: "Seguridad",
      icon: "escudo",
    },
    status: ReportStatus.PENDING,
  },
  {
    id: 3,
    name: "Informe de Satisfacción",
    description: "Encuesta sobre la satisfacción de los empleados con el espacio de trabajo.",
    spaceName: "Oficina Principal",
    theDate: new Date("2024-09-20"),
    topic: {
      id: 3,
      name: "Feedback",
      icon: "comentario",
    },
    status: ReportStatus.IN_PROGRESS,
  },
  {
    id: 4,
    name: "Auditoría de Limpieza",
    description: "Revisión trimestral del estado de limpieza.",
    spaceName: "Pasillo 2",
    theDate: new Date("2024-09-30"),
    topic: {
      id: 4,
      name: "Limpieza",
      icon: "escoba",
    },
    status: ReportStatus.CANCELLED,
  },
  {
    id: 5,
    name: "Evaluación Técnica",
    description: "Evaluación de las condiciones técnicas del equipo de TI.",
    spaceName: "Sala de Servidores",
    theDate: new Date("2024-10-10"),
    topic: {
      id: 5,
      name: "Tecnología",
      icon: "ordenador",
    },
    status: ReportStatus.COMPLETED,
  },
  {
    id: 6,
    name: "Evaluación Técnica",
    description: "Evaluación de las condiciones técnicas del equipo de TI.",
    spaceName: "Sala de Servidores",
    theDate: new Date("2024-10-10"),
    topic: {
      id: 5,
      name: "Tecnología",
      icon: "ordenador",
    },
    status: ReportStatus.COMPLETED,
  },
];


export default function ReportsBoard() {
  return (
    <Box height={'100%'} width={'50%'} gap={'30px'} padding={'30px'}>
      <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} height={'100px'}>
        <Typography variant="h2"> Reportes</Typography>
        <Box width={'25%'} height={'40%'} padding={'5px 10px'} display={'flex'} bgcolor={'#E0F7FA'} borderRadius={'20px'} justifyContent={'space-around'} alignItems={'center'}>
          <DynamicIcon iconName={'CleanHandsIcon'} />
          <Typography variant="h3">Limpieza</Typography>
        </Box>
      </Box>
        {reports.map((report) => (
              <ReportsCard key={report.id} item={report}/>
            ))}
    </Box>
  )
}
