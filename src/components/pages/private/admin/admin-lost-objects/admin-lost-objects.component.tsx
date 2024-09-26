import { Box, Button, IconButton, Typography } from "@mui/material";
import { Column, TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { LostObjectsService } from "../../../../../services/lostObjects/lost-objects.service";
import { ILostObject } from "../../../../../models/interfaces/lost-object.interface";
import { Loader } from "../../../../utilities/components/loader.utility";
import { AddCircleOutline } from "@mui/icons-material";
import { ModalFormCreateObjectWithSpaces } from "./components/create-lost-objects-form.components";
import { ModalFormUpdateLostObject } from "./components/update-lost-objects-form.component";

export function AdminLostObjects() {
  const [ lostObjects, setLostObjects ] = useState<ILostObject[]>([])
  const [ lostObject, setLostObject] = useState<ILostObject>({} as ILostObject)
  const [loader, setLoader] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0);
  const [openCreate,  setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpenUpdate = (id: number) => {
    setSelectedId(id);
    setLostObject(lostObjects.find((lostObject) => lostObject.id === id) as ILostObject);
    setOpenUpdate(true);
  }


  const deleteLostObject = async(id:number) => {
    setLoader(true)
    try {
      await LostObjectsService.delete({id: `${id}`})
      setTrigger(!trigger)
    } catch (error) {
      console.log('Error al eliminar el objeto perdido', error);
      
    }
    setLoader(false)
  }

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
            aria-label="edit"
            onClick={() => handleOpenUpdate(value.id)}
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
            onClick={() => deleteLostObject(value.id)}
          >
            <DeleteIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      )},
    },
  ];

  async function getAllLostObjects(){
    setLoader(true)
    const lostObjects = await LostObjectsService.get_all()
    setLostObjects(lostObjects)
    setLoader(false)
  }

  useEffect(() => {
    getAllLostObjects()
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
        onClick={handleOpenCreate}
        sx={{
          height: "40px",
          width: "220px",
          backgroundColor: "success.main",
          borderRadius: "50px",
          gap: '10px'
        }}
      >
        <AddCircleOutline sx={{ width: '25px', height: '25px' }} />
        <Typography variant="subtitle2">Crear Objeto</Typography>
      </Button>
        <TableAdmin rows={lostObjects} columns={columns} limit={5}></TableAdmin>
          <ModalFormCreateObjectWithSpaces open={openCreate} handleClose={handleCloseCreate} />
          <ModalFormUpdateLostObject handleClose={handleCloseUpdate} open={openUpdate} object={lostObject} id={selectedId}/>
      </Box>
    </div>
  );
}
