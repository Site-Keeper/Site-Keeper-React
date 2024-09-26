import { Box, Typography } from '@mui/material'
import TaskCard from './routine-card.component'
import { IRoutine } from '../../../../../../models/interfaces/routines.interface';
import { useEffect, useState } from 'react';
import { RoutinesService } from '../../../../../../services/routines/routines.service';
import { Loader } from '../../../../../utilities/components/loader.utility';
import Void from '../../../../../utilities/components/void.utility';

const emptyRoutine: IRoutine = {
  id: 0,
  name: 'Tu Rutina de Hoy',
  start_time: new Date(),
  end_time: new Date(),
  days: [],
  assigned_to: '',
  tasks: []
};

export default function RoutineBoard() {
  const [routine, setRoutine] = useState<IRoutine>(emptyRoutine)
  const [changeTrigger, setChangeTrigger] = useState(false)
  const [loader, setLoader] = useState(false)

  const getRoutine = async () => {
    setLoader(true)
    try {
      const response = await RoutinesService.getTodayRoutine();
      setRoutine(response.data.todayRoutines);
    } catch (error) {
      console.log(error);
    }
    setLoader(false)
  }

  useEffect(() => {
    getRoutine();
  }, [changeTrigger]);

  return (
    <Box height={'100%'} width={'50%'} gap={'30px'} padding={'30px'}>
      <Loader isLoading={loader} />
        <Box width={'100%'} display={'flex'} alignItems={'center'} height={'100px'} mb={'20px'}>
          <Box>
            <Typography variant="subtitle1"> Tu Rutina de Hoy</Typography>
            <Typography variant="h2">{routine ? routine.name : ''}</Typography>
          </Box>
        </Box>
      {routine ?
        routine.tasks
          .sort((a, b) => a.id - b.id)
          .map((task) => (
            <TaskCard key={task.id} task={task} setChangeTrigger={setChangeTrigger} changeTrigger={changeTrigger} />
          )):
          <Void/>
      }
    </Box>
  )
}
