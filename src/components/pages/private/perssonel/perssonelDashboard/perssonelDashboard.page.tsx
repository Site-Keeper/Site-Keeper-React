import { Box } from "@mui/material";
import RoutineBoard from "./components/routine-board.components";
import ReportsBoard from "./components/reports-board.component";
export function PersonnelDashboard() {
  return (
    <Box display={'flex'} justifyContent={'space-around'} width={'100%'}>
      <RoutineBoard/>
      <ReportsBoard/>
    </Box>
  )
}
