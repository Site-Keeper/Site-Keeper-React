import { Box, Button, IconButton, Typography } from "@mui/material";
import { TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { ModalMoreInformationRoutines } from "./components/modal-more-information-routines.components";
import { ReportsService } from "../../../../../services/Reports/reports.service";
import { IReport } from "../../../../../models/interfaces/reports.interface";

export function ReportsAdmin() {
  const [reports, setReports] = useState<IReport[]>([])
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  async function getAllReports() {
    const response = await ReportsService.getAll()
    const reports = response
    setReports(reports)
  }

  useEffect(() => {
    getAllReports()
  }, [])

  const handleOpen = (id: number) => {
    setSelectedId(id);
    setOpenInfo(true);
  };
  const handleClose = () => setOpenInfo(false);

  const columns = [
    { id: "name", label: "Nombre", width: "20%", filter: "String" },
    { id: "space", label: "Espacio", width: "20%", filter: "String" },
    { id: "date", label: "Hora", width: "20%", filter: "String" },
    {
      id: "topic",
      label: "Asunto",
      width: "20%",
      filter: "String"
    },
    { id: "stuatus", label: "Estado", width: "20%", filter: "String" },
    {
      id: "actions",
      label: "Actions",
      width: "170px",
      filter: "String",
      renderCell: (value: IReport) => (
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
      ),
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
          <Typography variant="subtitle2">Crear Rutinas</Typography>
        </Button>
        <TableAdmin rows={reports} columns={columns} limit={5}></TableAdmin>
      </Box>
    </div>
  );
}
