import { Box, Chip, Typography } from "@mui/material";
import DashboardCardsMUI from "./components/AdminCards";
import { TableAdmin } from "./components/table/table-admin.component";
import { IReport } from "../../../../../models/interfaces/reports.interface";
import { useEffect, useState } from "react";
import { ReportsService } from "../../../../../services/Reports/reports.service";


export default function Dashboard() {
  const [reports, setReports] = useState<IReport[]>([]);
  
  async function getAllReports(){
    const reports = await ReportsService.getAll()
    setReports(reports)
  }

  useEffect(() => {
    getAllReports()
  }, [])

  const columns = [
    {id: "name", label: "name", width: "20%", filter: "String"},
    {id: "description", label: "Descripción", width: "20%", filter: "String"},
    {id: "status", label: "Estado", width: "20%", filter: "String"},
    {id: "spaceName", label: "Espacio", width: "20%", filter: "String"},
    {id: "theDate", label: "Fecha", width: "20%", filter: "Date"},
    {
      id: "ss",
      label: "Tema",
      width: "20%",
      filter: "String",
      renderCell: () => (
        <Chip
          sx={{
            backgroundColor: "#E0F7FA", 
            color: "#006064", 
            fontWeight: "bold",
          }}
        />
      ),
    }
  ]
  return (
    <div style={{ padding: "20px", backgroundColor: "#EEEFEF", width: "100%"}}>
      <DashboardCardsMUI></DashboardCardsMUI>
      <Typography variant="h2" sx={{fontSize: '30px', marginTop: "20px", marginBottom: "20px"}}>Ultimos Reportes</Typography>
      <Box sx={{ border: "1px solid rgb(107, 92, 255)", borderRadius: "10px"}}>
        <TableAdmin rows={reports} columns={columns} limit={5}></TableAdmin>
      </Box>
    </div>
  )
}
