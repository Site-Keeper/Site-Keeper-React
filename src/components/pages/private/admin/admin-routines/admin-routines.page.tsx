import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { IRoutine } from "../../../../../models/interfaces/routines.interface";
import { RoutinesService } from "../../../../../services/routines/routines.service";


const columns = [
  { id: "name", label: "name", width: "20%", filter: "String" },
  { id: "start_time", label: "Hora de Inicio", width: "20%", filter: "String" },
  { id: "end_time", label: "Hora de Fin", width: "20%", filter: "String" },
  {
    id: "day",
    label: "frecuencia",
    width: "20%",
    filter: "String",
    renderCell: (value: IRoutine) => (
      <Box
  sx={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px", }}
>
  {value.days.map((day: string) => (
    <div
      key={`${value.id} + ${day}`}
      style={{
        backgroundColor: "#8c8c8c", 
        width: "20px", 
        height: "20px",    
        display: "flex", 
        borderRadius: "50%",
        alignItems: "center", 
        justifyContent: "center", 
        fontSize: "10px", 
        color: "#fff", 
      }}
    >
      {day.charAt(0).toUpperCase()}
    </div>
  ))}
</Box>)
  },
  { id: "assignedTo", label: "Encargado", width: "20%", filter: "String" },
  {
    id: "actions",
    label: "Actions",
    width: "170px",
    filter: "string",
    renderCell: (value: IRoutine) => (
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
          key={`edit-${value.id}`}
          aria-label="delete"
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

export function RoutineAdmin() {
  const [ routines, setRoutines ] = useState<IRoutine[]>([])

  async function getAllRoutine(){
    const routinesReq = await RoutinesService.getAll()
    const routines = routinesReq.data
    setRoutines(routines)
  }

  useEffect(() => {
    getAllRoutine()
  }, [])
  

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
            height: "60px",
            width: "250px",
            backgroundColor: "success.main",
            borderRadius: "50px",
            gap: '10px'
          }}
        >
          <AddCircleOutlineIcon sx={{width: '25px', height: '25px'}}/>  
          <Typography variant="h3">Crear Rutinas</Typography>
        </Button>
        <TableAdmin rows={routines} columns={columns} limit={5}></TableAdmin>
      </Box>
    </div>
  );
}
