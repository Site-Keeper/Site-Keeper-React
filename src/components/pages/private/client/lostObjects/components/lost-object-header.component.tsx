import { Box, Typography } from "@mui/material";

export default function LostObjectHeader() {
  return (
    <>
        <Typography variant="h1" >Objetos Perdidos</Typography>
        <Box marginBottom={'30px'} padding={"10px"} sx={{border: '3px solid', borderColor: 'secondary.main', borderRadius: '15px' }}>
            <Typography variant="body1">En esta área, puedes visualizar objetos perdidos de la siguiente manera: Si identificas un objeto como tuyo, por favor dirígete a la recepción para proceder con la reclamación. En caso de encontrar un objeto, te solicitamos llenar un reporte de objeto perdido y entregarlo en recepción; si no has completado el reporte, informa al personal de recepción sobre el hallazgo. Para realizar un reporte, debes ingresar al espacio donde fue encontrado el objeto.</Typography>
        </Box>
    </>
  )
}
