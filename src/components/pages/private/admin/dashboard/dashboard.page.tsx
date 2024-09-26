import { Box, Chip, Typography } from "@mui/material";
import DashboardCardsMUI from "./components/AdminCards";
import { TableAdmin } from "./components/table/table-admin.component";
import { IReport } from "../../../../../models/interfaces/reports.interface";
import { useEffect, useState } from "react";
import { ReportsService } from "../../../../../services/Reports/reports.service";
import { personnelType } from "../../../../../models/enums/perssonelType.enum";
import { ReportStatus } from "../../../../../models/enums/status.enum";
import { Loader } from "../../../../utilities/components/loader.utility";
import DynamicIcon from "../../../../utilities/DynamicIcon";


export default function Dashboard() {
  const emptyReport: IReport = {
    id: 0,
    name: "",
    description: "",
    isEvent: false,
    image: '',          
    topicId: 0,
    topicName: personnelType.OTHER,
    status: ReportStatus.PENDING,    
    theDate: new Date(),              
    spaceId: 0,
    spaceName: "",
    objectId: 0,        
    objectName: ''       
};

  const [reports, setReports] = useState<IReport[]>([emptyReport]);
  const [loader, setLoader] = useState(false)
  async function getAllReports(){
    setLoader(true)
    const reports = await ReportsService.getAll()
    setReports(reports)
    setLoader(false)
  }

  useEffect(() => {
    getAllReports()
  }, [])

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

  const columns = [
    {id: "name", label: "Nombre", width: "20%", filter: "String"},
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
        icon={<DynamicIcon iconName={getIconByPersonnelType(reports[0].topicName)} />}
        label={reports[0].topicName}
        sx={{
          backgroundColor: "#E0F7FA",
          color: "#006064",
          fontWeight: "bold"
        }}
      />
      ),
    }
  ]
  return (
    <div style={{ padding: "20px", backgroundColor: "#EEEFEF", width: "100%"}}>
      <Loader isLoading={loader} />
      <DashboardCardsMUI/>
      <Typography variant="h2" sx={{fontSize: '30px', marginTop: "20px", marginBottom: "20px"}}>Ultimos Reportes</Typography>
      <Box sx={{ border: "1px solid rgb(107, 92, 255)", borderRadius: "10px"}}>
        <TableAdmin rows={reports} columns={columns} limit={5}></TableAdmin>
      </Box>
    </div>
  )
}
