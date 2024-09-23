import { Box, Button, IconButton, Typography } from "@mui/material";
import { Column, TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react"
import { ReportsService } from "../../../../../services/Reports/reports.service";
import { IReport } from "../../../../../models/interfaces/reports.interface";

export function ReportsAdmin() {
  const [reports, setReports] = useState<IReport[]>([])

  async function getAllReports() {
    const response = await ReportsService.getAll()
    const reports = response
    setReports(reports)
  }

  useEffect(() => {
    getAllReports()
  }, [])

  const columns: Column<IReport>[] = [
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
