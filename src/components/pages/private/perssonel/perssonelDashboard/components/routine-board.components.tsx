import { Box, Typography } from '@mui/material'
import DynamicIcon from '../../../../../utilities/DynamicIcon'
import TaskCard from './routine-card.component'
import { IRoutine } from '../../../../../../models/interfaces/routines.interface';
import { ReportStatus } from '../../../../../../models/enums/status.enum';

export default function RoutineBoard() {
  const routine: IRoutine = {
    id: 1,
    name: "Mantenimiento Diario",
    start_time: new Date("2024-09-25T08:00:00"),
    end_time: new Date("2024-09-25T17:00:00"),
    days: ["Wednesday"],
    assigned_to: "Juan Pérez",
    tasks: [
      {
        id: 101,
        title: "Limpieza de Baños",
        description: "Limpieza profunda de todos los baños del 5to piso.",
        state: ReportStatus.PENDING,
        spaceName: 'Review 2do Piso',
        object_id: 2001,
        topic: {
          id: 1,
          name: "Limpieza",
          icon: "cleaning_services",
        },
      },
      {
        id: 102,
        title: "Revisión de Aires Acondicionados",
        description: "Verificar el buen funcionamiento de los aires acondicionados en el área de oficinas.",
        state: ReportStatus.IN_PROGRESS,
        spaceName: 'Review 2do Piso',
        object_id: 2002,
        topic: {
          id: 2,
          name: "Mantenimiento",
          icon: "air",
        },
      },
      {
        id: 103,
        title: "Reparación de Fugas",
        description: "Reparar las fugas reportadas en las tuberías de la cocina del 3er piso.",
        state: ReportStatus.COMPLETED,
        spaceName: 'Review 2do Piso',
        object_id: 2003,
        topic: {
          id: 3,
          name: "Plomería",
          icon: "plumbing",
        },
      },
      {
        id: 104,
        title: "Inspección de Luces",
        description: "Revisar y reemplazar las luces dañadas en el pasillo principal.",
        state: ReportStatus.PENDING,
        spaceName: 'Review 2do Piso',
        object_id: 2004,
        topic: {
          id: 4,
          name: "Electricidad",
          icon: "lightbulb",
        },
      },
      {
        id: 105,
        title: "Desinfección de Áreas Comunes",
        description: "Desinfección de todas las áreas comunes siguiendo los protocolos de bioseguridad.",
        state:  ReportStatus.CANCELLED,
        spaceName: 'Review 2do Piso',
        object_id: 2005,
        topic: {
          id: 5,
          name: "Bioseguridad",
          icon: "medical_services",
        },
      },
    ],
  };

  return (
    <Box height={'100%'} width={'50%'} gap={'30px'} padding={'30px'}>
      <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} height={'100px'} mb={'20px'}>
        <Box>
          <Typography variant="subtitle1"> Tu Rutina de Hoy</Typography>
          <Typography variant="h2">{routine.name}</Typography>
        </Box>
        <Box width={'25%'} height={'40%'} padding={'5px 10px'} display={'flex'} bgcolor={'#E0F7FA'} borderRadius={'20px'} justifyContent={'space-around'} alignItems={'center'}>
          <DynamicIcon iconName={'CleanHandsIcon'} />
          <Typography variant="h3">Limpieza</Typography>
        </Box>
      </Box>
      {
        routine.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      }
    </Box>
  )
}
