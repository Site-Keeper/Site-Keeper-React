import { Paper, Typography } from '@mui/material';
import { ITask } from '../../../../../../models/interfaces/task.interface';

// Interfaz para las propiedades del componente
interface IProp {
  task: ITask;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  colorMap: Record<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday', string>;
}

export default function RoutineColumn({ task, day, colorMap }: IProp) {
  return (
    <Paper
      key={task.id}
      elevation={2}
      sx={{
        p: 1,
        mb: 1,
        bgcolor: `${colorMap[day]}.main`,
        color: 'white',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: `${colorMap[day]}.dark`,
        },
      }}
    >
      <Typography variant="subtitle1" mb={'5px'}>{task.title}</Typography>
      <Typography variant="body2">
        {`${task.description}`}
      </Typography>
      <br />
      <Typography variant="body2">
        {`Espacio: ${task.spaceName}`}
      </Typography>
    </Paper>
  );
}
