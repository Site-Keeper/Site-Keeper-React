import { Box, Chip, Typography } from '@mui/material'
import DynamicIcon from '../../../../../utilities/DynamicIcon'
import ReportsCard from './reports-card.component';
import { ReportsService } from '../../../../../../services/Reports/reports.service';
import { useEffect, useState } from 'react';
import { IReport } from '../../../../../../models/interfaces/reports.interface';
import Void from '../../../../../utilities/components/void.utility';
import { IUser } from '../../../../../../models/interfaces';
import { Loader } from '../../../../../utilities/components/loader.utility';
import { personnelType } from '../../../../../../models/enums/perssonelType.enum';
// import { IReport } from '../../../../../../models/interfaces/reports.interface';
// import { ReportStatus } from '../../../../../../models/enums/status.enum';

// const reports: IReport[] = [
//   {
//     id: 1,
//     name: "Revisión de Mantenimiento",
//     description: "Revisión mensual del sistema de climatización.",
//     spaceName: "Oficina 101",
//     theDate: new Date("2024-10-05"),
//     topic: {
//       id: 1,
//       name: "Mantenimiento",
//       icon: "herramienta",
//     },
//     status: ReportStatus.COMPLETED,
//   },
//   {
//     id: 2,
//     name: "Inspección de Seguridad",
//     description: "Revisión de extintores y sistema de seguridad.",
//     spaceName: "Bodega 3",
//     theDate: new Date("2024-10-12"),
//     topic: {
//       id: 2,
//       name: "Seguridad",
//       icon: "escudo",
//     },
//     status: ReportStatus.PENDING,
//   },
//   {
//     id: 3,
//     name: "Informe de Satisfacción",
//     description: "Encuesta sobre la satisfacción de los empleados con el espacio de trabajo.",
//     spaceName: "Oficina Principal",
//     theDate: new Date("2024-09-20"),
//     topic: {
//       id: 3,
//       name: "Feedback",
//       icon: "comentario",
//     },
//     status: ReportStatus.IN_PROGRESS,
//   },
//   {
//     id: 4,
//     name: "Auditoría de Limpieza",
//     description: "Revisión trimestral del estado de limpieza.",
//     spaceName: "Pasillo 2",
//     theDate: new Date("2024-09-30"),
//     topic: {
//       id: 4,
//       name: "Limpieza",
//       icon: "escoba",
//     },
//     status: ReportStatus.CANCELLED,
//   },
//   {
//     id: 5,
//     name: "Evaluación Técnica",
//     description: "Evaluación de las condiciones técnicas del equipo de TI.",
//     spaceName: "Sala de Servidores",
//     theDate: new Date("2024-10-10"),
//     topic: {
//       id: 5,
//       name: "Tecnología",
//       icon: "ordenador",
//     },
//     status: ReportStatus.COMPLETED,
//   },
//   {
//     id: 6,
//     name: "Evaluación Técnica",
//     description: "Evaluación de las condiciones técnicas del equipo de TI.",
//     spaceName: "Sala de Servidores",
//     theDate: new Date("2024-10-10"),
//     topic: {
//       id: 5,
//       name: "Tecnología",
//       icon: "ordenador",
//     },
//     status: ReportStatus.COMPLETED,
//   },
// ];

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

export default function ReportsBoard() {
  const [reports, setReports] = useState<IReport[]>([])
  const [changeTrigger, setChangeTrigger] = useState(false)
  const [loader, setLoader] = useState(false)

  const getReports = async () => {
    setLoader(true)
    let personnel_type_id = 0
    let user
    if (sessionStorage.getItem("user") != null && sessionStorage.getItem("token")) {
      user = JSON.parse(sessionStorage.getItem("user") ?? "") as IUser;
    }
    console.log(user);

    switch (user?.personnelType) {
      case 'Maintenance':
        personnel_type_id = 1
        break;

      case 'Janitorial':
        personnel_type_id = 2
        break;

      case 'Security':
        personnel_type_id = 3
        break;

      case 'Other':
        personnel_type_id = 4
        break;

      default:
        console.warn('No tiene personnel type');
        break;
    }
    if (personnel_type_id != 0) {
      const response = await ReportsService.getByTopic({ id: personnel_type_id });
      const sortedResponse = response.sort((a, b) => a.id - b.id);
      setReports(sortedResponse);
    }
    setLoader(false)
  }
  useEffect(() => {
    getReports()
  }, [changeTrigger])

  return (
    <Box height={'100%'} width={'50%'} gap={'30px'} padding={'30px'}>
      <Loader isLoading={loader} />
      <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} height={'100px'}>
        <Typography variant="h2"> Reportes</Typography>
        {reports.length > 0 &&
        <Chip
          icon={<DynamicIcon iconName={getIconByPersonnelType(reports[0].topicName)} />}
          label={reports[0].topicName}
          sx={{
            backgroundColor: "#E0F7FA",
            color: "#006064",
            fontWeight: "bold",
            fontSize: "25px",
            width: "35%",
            height: '50%',
            borderRadius: "50px"
          }}
        />}
      </Box>
      {reports.length > 0 ?
        reports.map((report) => (
          <ReportsCard key={report.id} item={report} changeTrigger={changeTrigger} setChangeTrigger={setChangeTrigger} />
        )) : <Void />}
    </Box>
  )
}
