import { Box, Chip, Typography } from "@mui/material";
import DashboardCardsMUI from "./components/AdminCards";
import { TableAdmin } from "./components/table/table-admin.component";
import DynamicIcon from "../../../../utilities/DynamicIcon";
import { IReport } from "../../../../../models/interfaces/reports.interface";
import { useEffect, useState } from "react";
import { ReportsService } from "../../../../../services/Reports/reports.service";

const reportsQ: IReport[] = [
  {
    id: 1,
    name: "Report 1",
    description: "Description for report 1",
    spaceName: "Space 1",
    date: new Date("2024-09-01"),
    topic: { id: 1, name: "Maintenance", icon: "EngineeringIcon" },
    status: "Pending"
  },
  {
    id: 2,
    name: "Report 2",
    description: "Description for report 2",
    spaceName: "Space 2",
    date: new Date("2024-09-02"),
    topic: { id: 2, name: "Janitorial", icon: "CleanHandsIcon" },
    status: "In Progress"
  },
  {
    id: 3,
    name: "Report 3",
    description: "Description for report 3",
    spaceName: "Space 3",
    date: new Date("2024-09-03"),
    topic: { id: 3, name: "Security", icon: "AdminPanelSettingsIcon" },
    status: "Completed"
  },
  {
    id: 4,
    name: "Report 4",
    description: "Description for report 4",
    spaceName: "Space 4",
    date: new Date("2024-09-04"),
    topic: { id: 4, name: "Other", icon: "MoreHorizIcon" },
    status: "Pending"
  },
  {
    id: 5,
    name: "Report 5",
    description: "Description for report 5",
    spaceName: "Space 5",
    date: new Date("2024-09-05"),
    topic: { id: 1, name: "Maintenance", icon: "EngineeringIcon" },
    status: "In Progress"
  }
];

export default function Dashboard() {
  const [reports, setReports] = useState<IReport[]>(reportsQ);
  
  async function getAllReports(){
    // const reports = await ReportsService.getAll()
    // setReports(reports)
  }

  useEffect(() => {
    getAllReports()
  }, [])

  const columns = [
    {id: "name", label: "name", width: "20%", filter: "String"},
    {id: "description", label: "Descripción", width: "20%", filter: "String"},
    {id: "status", label: "Estado", width: "20%", filter: "String"},
    {id: "spaceName", label: "Espacio", width: "20%", filter: "String"},
    {id: "date", label: "Fecha", width: "20%", filter: "Date"},
    {
      id: "ss",
      label: "Tema",
      width: "20%",
      filter: "String",
      renderCell: (value: IReport) => (
        <Chip
          icon={<DynamicIcon iconName={value.topic.icon} />}
          label={value.topic.name} 
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
