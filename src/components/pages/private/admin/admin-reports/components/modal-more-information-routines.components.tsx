import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { ITask } from "../../../../../../models/interfaces/task.interface";
import { TasksService } from "../../../../../../services/task/task.service";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableAdmin } from "../../../../../utilities/components/table/table-admin.component";
import DynamicIcon from "../../../../../utilities/DynamicIcon";

interface IModalMoreInformation {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  id: number
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "980px",
  bgcolor: 'background.paper',
  boxShadow: 'none',
  borderRadius: "20px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};


export function ModalMoreInformationRoutines({ open, handleClose, id }: IModalMoreInformation) {
  const [task, setTask] = useState<ITask[]>([])
  async function getTaskByRoutines() {
    console.log(id)
    const tasksReq = await TasksService.getTaskByRoutines(id)
    const tasks = tasksReq.data
    setTask(tasks)
  }

  useEffect(() => {
    getTaskByRoutines()
  }, [id])

  const columns = [
    { id: "title", label: "Título", width: "20%", filter: "String" },
    { id: "description", label: "Descripción", width: "20%", filter: "String" },
    { id: "spaceName", label: "Space", width: "20%", filter: "String" },
    { id: "state", label: "Estado", width: "20%", filter: "String" },
    { id: "object_id", label: "Objetos", width: "20%", filter: "String" },
    {
      id: "ss",
      label: "Temas",
      width: "20%",
      filter: "String",
      renderCell: (value: ITask) => (
        <Chip
          icon={<DynamicIcon iconName={value.topic.icon} />}
          label={value.topic.name}
          sx={{
            backgroundColor: "#E0F7FA",
            color: "#006064",
            fontWeight: "bold",
          }}
        />
      ),
    },
    {
      id: "actions",
      label: "Actions",
      width: "170px",
      filter: "string",
      renderCell: (value: ITask) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#FBBF24",
              ":hover": { backgroundColor: "#EEB31C" },
            }}
            key={`edit-${value.id}`}
            aria-label="edit"
          >
            <EditIcon sx={{ color: "#fff" }} />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#EF4444",
              ":hover": { backgroundColor: "#E04040" },
            }}
            key={`delete-${value.id}`}
            aria-label="delete"
          >
            <DeleteIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 0.08)' } // Ajusta la opacidad (0.2 es más clara)
      }}
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={() => handleClose(false)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'secondary.main',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography id="keep-mounted-modal-title" variant="h2" component="h2">
          Rutina {id}
        </Typography>
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column", gap: "20px", border: '1px solid #B3B3B3', padding: '20px' }}>
          <Typography variant="h2" sx={{ fontSize: "34px" }} >
            Tareas
          </Typography>
          <Button
            variant="contained"
            sx={{
              height: "60px",
              width: "250px",
              backgroundColor: "success.main",
              borderRadius: "50px",
              gap: '10px'
            }}
          >
            <AddCircleOutlineOutlined sx={{ width: '25px', height: '25px' }} />
            <Typography variant="subtitle1">Crear Rutinas</Typography>
          </Button>
          <TableAdmin rows={task} columns={columns} limit={5}></TableAdmin>
        </Box>
      </Box>
    </Modal>
  )
}