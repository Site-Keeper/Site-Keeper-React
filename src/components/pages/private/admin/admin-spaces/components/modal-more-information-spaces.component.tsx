import { useEffect, useState } from "react";
import { IObject } from "../../../../../../models/interfaces";
import { ObjectsService } from "../../../../../../services/objects/obejcts.service";
import { Box } from "@mui/system";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCircleOutlineOutlined, Close } from "@mui/icons-material";
import { TableAdmin } from "../../../../../utilities/components/table/table-admin.component";

interface IModalMoreInformation {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    id: number
  }

  const objectsQ: IObject[] = [
    {
      id: 1,
      name: "Laptop HP",
      description: "Laptop HP con pantalla de 15 pulgadas",
      image: "https://example.com/laptop-hp.jpg",
      quantity: 1,
      space_id: 101
    },
    {
      id: 2,
      name: "Mouse Inalámbrico",
      description: "Mouse inalámbrico color negro",
      image: "https://example.com/mouse.jpg",
      quantity: 10,
      space_id: 102
    },
    {
      id: 3,
      name: "Teclado Mecánico",
      description: "Teclado mecánico RGB",
      image: "https://example.com/teclado-mecanico.jpg",
      quantity: 5,
      space_id: 103
    },
    {
      id: 4,
      name: "Monitor Samsung",
      description: "Monitor Samsung 24 pulgadas Full HD",
      image: "https://example.com/monitor-samsung.jpg",
      quantity: 2,
      space_id: 104
    },
    {
      id: 5,
      name: "Proyector Epson",
      description: "Proyector Epson con resolución 4K",
      image: "https://example.com/proyector-epson.jpg",
      quantity: 3,
      space_id: 105
    },
    {
      id: 6,
      name: "Auriculares Bluetooth",
      description: "Auriculares Bluetooth color azul",
      image: "https://example.com/auriculares.jpg",
      quantity: 20,
      space_id: 106
    },
    {
      id: 7,
      name: "Silla Ergonómica",
      description: "Silla ergonómica con soporte lumbar",
      image: "https://example.com/silla-ergonomica.jpg",
      quantity: 15,
      space_id: 107
    },
    {
      id: 8,
      name: "Impresora Láser",
      description: "Impresora láser multifuncional",
      image: "https://example.com/impresora-laser.jpg",
      quantity: 4,
      space_id: 108
    },
    {
      id: 9,
      name: "Cámara de Seguridad",
      description: "Cámara de seguridad con visión nocturna",
      image: "https://example.com/camara-seguridad.jpg",
      quantity: 8,
      space_id: 109
    },
    {
      id: 10,
      name: "Mesa de Reuniones",
      description: "Mesa de reuniones con capacidad para 10 personas",
      image: "https://example.com/mesa-reuniones.jpg",
      quantity: 1,
      space_id: 110
    },
    {
      id: 11,
      name: "Proyector Portátil",
      description: "Proyector portátil de alta definición",
      image: "https://example.com/proyector-portatil.jpg",
      quantity: 3,
      space_id: 111
    },
    {
      id: 12,
      name: "Pantalla Interactiva",
      description: "Pantalla interactiva táctil de 50 pulgadas",
      image: "https://example.com/pantalla-interactiva.jpg",
      quantity: 1,
      space_id: 112
    },
    {
      id: 13,
      name: "Router WiFi",
      description: "Router WiFi de última generación",
      image: "https://example.com/router-wifi.jpg",
      quantity: 5,
      space_id: 113
    },
    {
      id: 14,
      name: "Cable HDMI",
      description: "Cable HDMI de 2 metros",
      image: "https://example.com/cable-hdmi.jpg",
      quantity: 50,
      space_id: 114
    },
    {
      id: 15,
      name: "Teléfono IP",
      description: "Teléfono IP con pantalla táctil",
      image: "https://example.com/telefono-ip.jpg",
      quantity: 12,
      space_id: 115
    },
    {
      id: 16,
      name: "Micrófono Inalámbrico",
      description: "Micrófono inalámbrico de alta calidad",
      image: "https://example.com/microfono.jpg",
      quantity: 6,
      space_id: 116
    },
    {
      id: 17,
      name: "Control Remoto",
      description: "Control remoto para proyector",
      image: "https://example.com/control-remoto.jpg",
      quantity: 15,
      space_id: 117
    },
    {
      id: 18,
      name: "Grabadora de Voz",
      description: "Grabadora de voz digital",
      image: "https://example.com/grabadora-voz.jpg",
      quantity: 5,
      space_id: 118
    },
    {
      id: 19,
      name: "Tablet Samsung",
      description: "Tablet Samsung de 10 pulgadas",
      image: "https://example.com/tablet-samsung.jpg",
      quantity: 8,
      space_id: 119
    },
    {
      id: 20,
      name: "Disco Duro Externo",
      description: "Disco duro externo de 1TB",
      image: "https://example.com/disco-duro.jpg",
      quantity: 10,
      space_id: 120
    }
  ];

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


export function ModalMoreInformationSpaces({ open, handleClose, id }: IModalMoreInformation) {
    const [objects, setObjects] = useState<IObject[]>(objectsQ)
    async function getAllObjects() {
      const Obojetsresp = await ObjectsService.getAll()
      setObjects(Obojetsresp)
    }
  
    useEffect(() => {
      getAllObjects()
    }, [id])
  
    const columns = [
      { id: "name", label: "Nombre", width: "20%", filter: "String" },
      { id: "description", label: "Descripción", width: "20%", filter: "String" },
      { id: "quantity", label: "Cantidad", width: "20%", filter: "String" },
      { id: "space_id", label: "Espacio", width: "20%", filter: "String" },
      {
        id: "actions",
        label: "Actions",
        width: "170px",
        filter: "string",
        renderCell: (value: IObject) => (
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