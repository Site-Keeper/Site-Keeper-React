import { Box,  Chip, IconButton } from "@mui/material";
import { Column, TableAdmin } from "../../../../utilities/components/table/table-admin.component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react"
import { ReportsService } from "../../../../../services/Reports/reports.service";
import { IReport } from "../../../../../models/interfaces/reports.interface";
import DynamicIcon from "../../../../utilities/DynamicIcon";
import { personnelType } from "../../../../../models/enums/perssonelType.enum";

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
    { id: "spaceName", label: "Espacio", width: "20%", filter: "String" },
    { id: "theDate", label: "Hora", width: "20%", filter: "String" },
    { id: "status", label: "Estado", width: "20%", filter: "String" },
    {
      id: "ss",
      label: "Tema",
      width: "20%",
      filter: "String",
      renderCell: (value) => {
        if (!(typeof value === 'object' && 'id' in value)) {
          return null;
        }

        function getIconByPersonnelType(type: personnelType) {
          switch (type) {
            case personnelType.MAINTENANCE:
              return 'EngineeringIcon';
            case personnelType.JANITORIAL:
              return 'CleanHandsIcon' ;
            case personnelType.SECURITY:
              return 'AdminPanelSettingsIcon';
            default:
              return 'MoreHorizIcon';
          }
        }

        return(
          <Chip
          icon={<DynamicIcon iconName={getIconByPersonnelType(reports[0].topicName)} />}
          label={reports[0].topicName}
          sx={{
            backgroundColor: "#E0F7FA",
            color: "#006064",
            fontWeight: "bold"
          }}
        />
      )}
    },
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
        <TableAdmin rows={reports} columns={columns} limit={5}></TableAdmin>
      </Box>
    </div>
  );
}
