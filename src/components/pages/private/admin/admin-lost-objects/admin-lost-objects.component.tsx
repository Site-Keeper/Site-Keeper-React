import { Box, Button, IconButton, Typography } from "@mui/material";
import { Column, TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { LostObjectsService } from "../../../../../services/lostObjects/lost-objects.service";
import { ILostObject } from "../../../../../models/interfaces/lost-object.interface";

export function AdminLostObjects() {
  const [ lostObjects, setLostObjects ] = useState<ILostObject[]>([])

  const columns: Column<ILostObject>[] = [
    { id: "name", label: "Name", width: "20%", filter: "String" },
    { id: "description", label: "Descripción", width: "20%", filter: "String" },
    { id: "spaceName", label: "Space", width: "20%", filter: "String" },
    {
      id: "status",
      label: "Estados",
      width: "20%",
      filter: "String",
    },
    {
      id: "actions",
      label: "Actions",
      width: "170px",
      filter: "string",
      renderCell: (value) => {
        if (!(typeof value === 'object' && 'id' in value)) {
          return null;
        }
        return(
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
      )},
    },
  ];

  async function getAllLostObjects(){
    const lostObjects = await LostObjectsService.get_all()
    setLostObjects(lostObjects)
  }

  useEffect(() => {
    getAllLostObjects()
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
            height: "40px",
            width: "220px",
            backgroundColor: "success.main",
            borderRadius: "50px",
            gap: '10px'
          }}
        >
          <AddCircleOutlineIcon sx={{width: '25px', height: '25px'}}/>  
          <Typography variant="subtitle2">Crear Usuarios</Typography>
        </Button>
        <TableAdmin rows={lostObjects} columns={columns} limit={5}></TableAdmin>
      </Box>
    </div>
  );
}
