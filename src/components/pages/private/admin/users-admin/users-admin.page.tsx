import { Box, Button, IconButton, Typography } from "@mui/material";
import { Column, TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { USersService } from "../../../../../services/users/users.service";
import { usersToRows } from "./adapters/user-to-row.adpters";
import { IUserToRows } from "../../../../../models/interfaces/user-to-rows.interface";
import { ModalFormCreateUsers } from "./components/create-users-form.components";

export function UserAdmin() {
  const [ users, setUsers ] = useState<IUserToRows[]>([])
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpen = () => setOpenModalCreate(true);
  const handleClose = () => setOpenModalCreate(false);

  const columns: Column<IUserToRows>[] = [
    { id: "name", label: "Name", width: "20%", filter: "String" },
    { id: "email", label: "Email", width: "20%", filter: "String" },
    { id: "doc_number", label: "Documento", width: "20%", filter: "String" },
    {
      id: "personnel_type",
      label: "Tipo De Personal",
      width: "20%",
      filter: "String",
    },
    { id: "rol", label: "Role", width: "20%", filter: "String" },
    {
      id: "actions",
      label: "Actions",
      width: "170px",
      filter: "string",
      renderCell: (value) => {
        if (!(typeof value === "object" && "id" in value)) {
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
      )}
    },
  ];

  async function getAllUser(){
    const usersReq = await USersService.getAll()
    const user = usersToRows(usersReq.data)
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
            height: "40px",
            width: "220px",
            backgroundColor: "success.main",
            borderRadius: "50px",
            gap: '10px'
          }}
          onClick={handleOpen}
        >
          <AddCircleOutlineIcon sx={{width: '25px', height: '25px'}}/>  
          <Typography variant="subtitle2">Crear Usuarios</Typography>
        </Button>
        <ModalFormCreateUsers handleClose={handleClose} open={openModalCreate} />
        <TableAdmin rows={users} columns={columns} limit={5}></TableAdmin>
      </Box>
    </div>
  );
}
