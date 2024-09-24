import { Box, Button, IconButton, Typography } from "@mui/material";
import { Column, TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { IRoutine } from "../../../../../models/interfaces/routines.interface";
import { RoutinesService } from "../../../../../services/routines/routines.service";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { ModalMoreInformationRoutines } from "./components/modal-more-information-routines.components";

export function RoutineAdmin() {
  const [routines, setRoutines] = useState<IRoutine[]>([])
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  async function getAllRoutine() {
    const routinesReq = await RoutinesService.getAll()
    const routines = routinesReq.data
    setRoutines(routines)
  }

  useEffect(() => {
    getAllRoutine()
  }, [])

  const handleOpen = (id: number) => {
    setSelectedId(id); // Establece el ID seleccionado
    setOpenInfo(true);
  };
  const handleClose = () => setOpenInfo(false);


  

  const columns: Column<IRoutine>[] = [
    { id: "name", label: "name", width: "20%", filter: "String" },
    { id: "start_time", label: "Hora de Inicio", width: "20%", filter: "String" },
    { id: "end_time", label: "Hora de Fin", width: "20%", filter: "String" },
    {
      id: "day",
      label: "frecuencia",
      width: "20%",
      filter: "String",
      renderCell: (value) => {
        if (typeof value === 'object' && 'days' in value) {
          const routine = value as IRoutine;
          return (
            <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              {routine.days.map((day: string) => (
                <div key={`${routine.id} + ${day}`} style={{ backgroundColor: "#8c8c8c", width: "20px", height: "20px", display: "flex", borderRadius: "50%", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#fff" }}>
                  {day.charAt(0).toUpperCase()}
                </div>
              ))}
            </Box>
          );
        }
        return null;
      }
    },
    { id: "assigned_to", label: "Encargado", width: "20%", filter: "String" },
    {
      id: "actions",
      label: "Actions",
      width: "170px",
      filter: "string",
      renderCell: (value) => {
        // Verifica si 'value' es un objeto y tiene la propiedad 'id'
        if (!(typeof value === 'object' && 'id' in value)) {
          return null;
        }
    
        return (
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
                backgroundColor: "#3B82F6",
                ":hover": { backgroundColor: "#3269C2" },
              }}
              key={`See-${value.id}`}
              aria-label="see"
              onClick={() => handleOpen(value.id)}
            >
              <VisibilityOutlinedIcon sx={{ color: "#fff" }} />
            </IconButton>
            <ModalMoreInformationRoutines id={selectedId} open={openInfo} handleClose={handleClose} />
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
        );
      },
    }    
  ];
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#EEEFEF",
        padding: "30px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          background: "#fff",
          borderRadius: "15px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            height: "40px",
            width: "220px",
            backgroundColor: "success.main",
            borderRadius: "50px",
            gap: '10px'
          }}
        >
          <AddCircleOutlineIcon sx={{ width: '25px', height: '25px' }} />
          <Typography variant="subtitle2">Crear Rutinas</Typography>
        </Button>
        <TableAdmin rows={routines} columns={columns} limit={5}></TableAdmin>
      </Box>
    </div>
  );
}
