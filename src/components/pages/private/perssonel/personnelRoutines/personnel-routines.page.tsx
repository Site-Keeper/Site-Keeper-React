import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Modal
} from '@mui/material';
import { IRoutine } from '../../../../../models/interfaces/routines.interface';
import { RoutinesService } from '../../../../../services/routines/routines.service';

const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const colorMap: Record<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday', string> = {
  'Monday': 'primary',
  'Tuesday': 'secondary',
  'Wednesday': 'success',
  'Thursday': 'warning',
  'Friday': 'error',
};

export const PersonnelRoutines = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<IRoutine | null>(null);
  const [routines, setRoutines] = useState<IRoutine[]>();

  const getRoutines = async () => {
    let user;
    if (sessionStorage.getItem("user") != null && sessionStorage.getItem("token")) {
      user = JSON.parse(sessionStorage.getItem("user") ?? "");
    }
    const response = await RoutinesService.getById(user.id)
    setRoutines(response.data)
  }

  useEffect(() => {
    getRoutines()
  }, [])

  const handleRoutineClick = (routine: IRoutine) => {
    setSelectedRoutine(routine);
  };

  const handleCloseModal = () => {
    setSelectedRoutine(null);
  };

  return (
    <>
      <Box sx={{ width: '100%', p: 2, bgcolor: 'background.default' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Weekly Routine Calendar
        </Typography>
        <Grid container spacing={2}>
          {days.map((day) => (
            <Grid item xs={12} sm={6} md={2.4} key={day}>
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
                <Typography variant="h6" gutterBottom align="center" color={`${colorMap[day]}.dark`}>
                  {day}
                </Typography>
                {routines &&
                  routines.filter(routine => routine.days.includes(day)).map((routine) => (
                    <Paper
                      key={routine.id}
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
                      onClick={() => handleRoutineClick(routine)}
                    >
                      <Typography variant="subtitle2">{routine.name}</Typography>
                      <Typography variant="caption">
                        {new Date(routine.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                        {new Date(routine.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Paper>
                  ))
                }
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal
        open={!!selectedRoutine}
        onClose={handleCloseModal}
        aria-labelledby="routine-modal-title"
        aria-describedby="routine-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          {selectedRoutine && (
            <>
              <Typography id="routine-modal-title" variant="h6" component="h2" gutterBottom color="primary">
                {selectedRoutine.name}
              </Typography>
              <Typography id="routine-modal-description" color="text.secondary">
                Start Time: {new Date(selectedRoutine.start_time).toLocaleTimeString()}
                <br />
                End Time: {new Date(selectedRoutine.end_time).toLocaleTimeString()}
                <br />
                Days: {selectedRoutine.days.join(', ')}
                <br />
                Assigned to: {selectedRoutine.assigned_to}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
