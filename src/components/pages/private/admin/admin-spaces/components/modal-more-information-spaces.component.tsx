
import { IObject } from "../../../../../../models/interfaces";
import { Box } from "@mui/system";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCircleOutlineOutlined, Close } from "@mui/icons-material";
import { Column, TableAdmin } from "../../../../../utilities/components/table/table-admin.component";

interface IModalMoreInformation {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    id: number
    objects: IObject[]
  }

  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "980px",
    bgcolor: '#fff',
    boxShadow: 'none',
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };


export function ModalMoreInformationSpaces({ open, handleClose, id, objects }: IModalMoreInformation) {
    const columns : Column<IObject>[] = [
      { id: "name", label: "Nombre", width: "25%", filter: "String" },
      { id: "description", label: "Descripción", width: "25%", filter: "String" },
      { id: "spaceName", label: "Espacio", width: "25%", filter: "String" },
      {
        id: "actions",
        label: "Actions",
        width: "25%",
        filter: "string",
        renderCell: (value) => {
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
            <Close />
          </IconButton>

          <Typography id="keep-mounted-modal-title" variant="h2" component="h2">
            Espacio {id}
          </Typography>
          <Box sx={{ display: "flex", width: "100%", flexDirection: "column", gap: "20px", border: '1px solid #B3B3B3', padding: '20px' }}>
            <Typography variant="h2" sx={{ fontSize: "34px" }} >
              Objetos
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
              <Typography variant="subtitle1">Crear objeto</Typography>
            </Button>
            <TableAdmin rows={objects} columns={columns} limit={5}></TableAdmin>
          </Box>
        </Box>
      </Modal>
    )
  }