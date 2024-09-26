import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IUserToRows } from "../../../../../models/interfaces/user-to-rows.interface";
import { USersService } from "../../../../../services/users/users.service";
import { Column, TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import { usersToRows } from "./adapters/user-to-row.adpters";
import { ModalFormCreateUsers } from "./components/create-users-form.components";
import { ModalFormUpdateUsers } from "./components/update-users-form.components";
import { Loader } from "../../../../utilities/components/loader.utility";

export function UserAdmin() {
  const [users, setUsers] = useState<IUserToRows[]>([])
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpen = () => setOpenModalCreate(true);
  const [userEdit, setUserEdit] = useState<IUserToRows>({} as IUserToRows)
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [loader, setLoader] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setTrigger((prevTrigger) => !prevTrigger);
  };
  
  const handleClose = () => {
    setOpenModalCreate(false);
    setTrigger((prevTrigger) => !prevTrigger); 
  };

  const deleteUser = async (id: number) => {
    setLoader(true)
    try {
      await USersService.delete(id)
      setTrigger(!trigger)
    } catch (error) {
      console.log('Error al eliminar usuario:', error);
    }
    setLoader(false)
  }

  function handleOpenEdit(user: IUserToRows) {
    setOpenEdit(true);
    setUserEdit(user);
  }

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
              onClick={() => handleOpenEdit(value)}
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
              onClick={() => deleteUser(value.id)}
            >
              <DeleteIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
        )
      }
    },
  ];

  async function getAllUser() {
    setLoader(true)
    const usersReq = await USersService.getAll()
    const user = usersToRows(usersReq.data)
    setUsers(user)
    setLoader(false)
  }

  useEffect(() => {
    getAllUser()
  }, [trigger])


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
      <Loader isLoading={loader} />
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
          <AddCircleOutlineIcon sx={{ width: '25px', height: '25px' }} />
          <Typography variant="subtitle2">Crear Usuarios</Typography>
        </Button>
        <ModalFormCreateUsers handleClose={handleClose} open={openModalCreate} setLoader={setLoader} setTrigger={setTrigger} trigger/>
        <TableAdmin rows={users} columns={columns} limit={5}></TableAdmin>
        <ModalFormUpdateUsers user={userEdit} handleClose={handleCloseEdit} open={openEdit} setLoader={setLoader} setTrigger={setTrigger} trigger />
      </Box>
    </div>
  );
}
