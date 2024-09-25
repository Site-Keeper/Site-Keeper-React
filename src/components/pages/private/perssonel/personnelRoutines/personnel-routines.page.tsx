import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { IRoutine } from '../../../../../models/interfaces/routines.interface';
import { RoutinesService } from '../../../../../services/routines/routines.service';
import { ITask } from '../../../../../models/interfaces/task.interface';
import RoutineColumn from './components/routine-column.component';

const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const colorMap: Record<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday', string> = {
  'Monday': 'primary',
  'Tuesday': 'secondary',
  'Wednesday': 'success',
  'Thursday': 'warning',
  'Friday': 'error',
};


export const PersonnelRoutines = () => {
  const [routines, setRoutines] = useState<IRoutine[]>([]);

  const getRoutines = async () => {
    let user;
    if (sessionStorage.getItem("user") != null && sessionStorage.getItem("token")) {
      user = JSON.parse(sessionStorage.getItem("user") ?? "");
    }
    const response = await RoutinesService.getById(user.id);
    setRoutines(response.data);
  }

  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', p: 2, bgcolor: 'background.default' }}>
        <Typography variant="h4" align="center" color="primary" mb={'20px'}>
          Rutina Semanal
        </Typography>
        <Grid container spacing={2} height={'90%'}>
          {days.map((day) => (
            <Grid item xs={12} sm={6} md={2.4} key={day} height={'100%'}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: `${colorMap[day]}.light`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h3" align="center" color={`${colorMap[day]}.dark`} mb={'15px'}>
                  {day}
                </Typography>
                {routines &&
                  routines
                    .filter(routine => routine.days.includes(day))
                    .flatMap(routine => routine.tasks)
                    .map((task: ITask) => (
                      <RoutineColumn task={task} colorMap={colorMap} day={day} />
                    ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
