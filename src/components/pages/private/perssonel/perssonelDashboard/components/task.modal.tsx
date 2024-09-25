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

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task: ITask;
}

const onStateChange = (newState: ReportStatus) => {
  console.log('newStatus:', newState);
  
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, task }) => {
  const handleStateChange = (event: SelectChangeEvent<ReportStatus>) => {
    onStateChange(event.target.value as ReportStatus);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: "10px"
      }}>
        <Typography variant="h2">
          {task.title}
        </Typography>
        <Typography variant="subtitle1">
          {task.description}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Espacio: {task.spaceName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Asunto: {task.topic.name}
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Select
            value={task.state}
            sx={{ bgcolor: `${statusColors[task.state as keyof typeof statusColors]}.main`, height: '35px', borderRadius: 15 }}
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
        </FormControl>
      </Box>
    </Modal>
  );
};

export default TaskModal;