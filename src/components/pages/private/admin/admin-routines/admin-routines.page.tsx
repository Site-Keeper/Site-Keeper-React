import { Box, Button, IconButton, Typography } from "@mui/material";
import { TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { USersService } from "../../../../../services/users/users.service";
import { IUserToRows } from "../../../../../models/interfaces/user-to-rows.interface";



const columns = [
  { id: "name", label: "name", width: "20%", filter: "String" },
  { id: "email", label: "Email", width: "20%", filter: "String" },
  { id: "doc_number", label: "Documento", width: "20%", filter: "String" },
  {
    id: "perssonel_type",
    label: "Tipo De Personal",
    width: "20%",
    filter: "String",
  },
  { id: "role", label: "Role", width: "20%", filter: "String" },
  {
    id: "actions",
    label: "Actions",
    width: "170px",
    filter: "string",
    renderCell: (value: IUserToRows) => (
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
          key={value.id}
          aria-label="delete"
        >
          <EditIcon sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "#EF4444",
            ":hover": { backgroundColor: "#E04040" },
          }}
          key={value.id}
          aria-label="delete"
        >
          <DeleteIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
    ),
  },
];

export function UserAdmin() {
  const [ users, setUsers ] = useState<IUserToRows[]>([])

  async function getAllUser(){
    const usersReq = await USersService.getAll()
    setUsers(user)
  }

  useEffect(() => {
    getAllUser()
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
        <TableAdmin rows={users} columns={columns} limit={5}></TableAdmin>
      </Box>
    </div>
  );
}
