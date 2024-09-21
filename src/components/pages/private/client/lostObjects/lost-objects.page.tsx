import { Box } from "@mui/material";
import LostObjectHeader from "./components/lost-object-header.component";
import LostObjectsGrid from "./components/lost-object-grid.component";

export default function LostObject() {
  return (
    <>
        <Box padding={"20px"}>
            <LostObjectHeader/>
            <LostObjectsGrid/>
        </Box>
    </>
  )
}
