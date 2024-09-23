import { useEffect, useState } from "react";
import { ISpace } from "../../../../../models/interfaces";
import { SpacesService } from "../../../../../services/spaces/spaces.service";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Column, TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import { ModalMoreInformationSpaces } from "./components/modal-more-information-spaces.component";

export function AdminSpaces() {
    const [spaces, setSpaces] = useState<ISpace[]>([])
    const [openInfo, setOpenInfo] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
  
    async function getAllSpaces() {
      const spacesReq = await SpacesService.getAll()
      setSpaces(spacesReq)
    }
  
    useEffect(() => {
      getAllSpaces()
    }, [])
  
    const handleOpen = (id: number) => {
      setSelectedId(id); // Establece el ID seleccionado
      setOpenInfo(true);
    };
    const handleClose = () => setOpenInfo(false);
  
  
    
  
    const columns : Column<ISpace>[] = [
      { id: "name", label: "name", width: "25%", filter: "String" },
      { id: "location", label: "Ubicación", width: "25%", filter: "String" },
      { id: "description", label: "Descripción", width: "25%", filter: "String" },
      {
        id: "actions",
        label: "Actions",
        width: "25%",
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
              key={`See-${value.id}`}
              aria-label="see"
              onClick={() => handleOpen(value.id)}
            > 
              <VisibilityOutlined sx={{ color: "#fff" }} />
            </IconButton>
            <ModalMoreInformationSpaces id={selectedId} open={openInfo} handleClose={handleClose} />
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
        )},
      },
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
            <Typography variant="subtitle2">Crear Espacio</Typography>
          </Button>
          <TableAdmin rows={spaces} columns={columns} limit={5}></TableAdmin>
        </Box>
      </div>
    );
  }