import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { ITask } from '../../../../../../models/interfaces/task.interface';
import { ReportStatus } from '../../../../../../models/enums/status.enum';
import { statusColors } from '../../../../../../models/enums/status-colors.enums';
import { TasksService } from '../../../../../../services/task/task.service';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task: ITask;
  onlyView?: boolean;
  setChangeTrigger: React.Dispatch<React.SetStateAction<boolean>>
  changeTrigger: boolean
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, task, onlyView, setChangeTrigger, changeTrigger }) => {
  const onStateChange = async (newState: ReportStatus) => {
    console.log('newStatus:', newState);
    const newTask = { id: task.id, state: newState };
    try {
      await TasksService.update(newTask);
      setChangeTrigger(!changeTrigger);
      onClose();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleStateChange = (event: SelectChangeEvent<ReportStatus>) => {
    onStateChange(event.target.value as ReportStatus);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 550,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography variant="h2">{task.title}</Typography>
        <Typography variant="subtitle1">{task.description}</Typography>
        <Typography variant="body1" color="text.secondary">
          Espacio: {task.spaceName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Asunto: {task.topic?.name ?? 'N/A'}
        </Typography>
        {!onlyView && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              defaultValue={task.state}
              sx={{
                bgcolor: `${statusColors[task.state as keyof typeof statusColors]}.main`,
                height: '35px',
                borderRadius: 15,
              }}
              onChange={handleStateChange}
            >
              <MenuItem value={ReportStatus.PENDING}>Pendiente</MenuItem>
              <MenuItem value={ReportStatus.IN_PROGRESS}>En Progreso</MenuItem>
              <MenuItem value={ReportStatus.COMPLETED}>Completada</MenuItem>
              <MenuItem value={ReportStatus.CANCELLED}>Cancelada</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>
    </Modal>
  );
};

export default TaskModal;
