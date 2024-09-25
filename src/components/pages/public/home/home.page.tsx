import { Box, Typography } from '@mui/material';
import { Slider3d } from './components/slider.components';
import { ISpace } from '../../../../models/interfaces';
import hero from "../../../../assets/img/Home_export_p.png";
import { SearchInput } from './components/search.components';
import { useEffect, useState } from 'react';
import { SpacesService } from '../../../../services/spaces/spaces.service';
import { ModalFormCreateReports } from './components/form-create-report';

export function Home() {
  const [spaces, setSpaces] = useState<ISpace[]>([])
  const [search, setSearch] = useState<string>("")
  const [openmodalcreateReport, setOpenModalCreateReport] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)
  const [spaceName, setSpaceName] = useState<string>("")

  const handleClose = () => setOpenModalCreateReport(false);

  async function getSpaces() {
    const spacesRes = await SpacesService.getAll()
    setSpaces(spacesRes)
  }

  useEffect(() => {
    if (id > 0) {
      setOpenModalCreateReport(true)
    }
  }, [id])

  useEffect(() => {
    getSpaces()
  }, [search])

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: 'center', gap: '20px' }} >
      <Box sx={{ height: '450px', width: '100vw', position: 'relative' }}>
        <img src={hero} style={{ position: "absolute", objectFit: 'cover', height: '100%', width: '100%' }} />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            textAlign: 'center',
            padding: '20px',
            '@media (min-width: 700px)': {
              padding: '200px'
            }
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>Espacios Limpios, Ambientes Saludables</Typography>
          <Typography variant="h6">Con tu ayuda, podemos mantener nuestros espacios impecables. Reporta cualquier novedad para asegurar un entorno seguro y agradable para todos.</Typography>
        </Box>
      </Box>
      <ModalFormCreateReports spacesName={spaceName} open={openmodalcreateReport} handleClose={handleClose} id={id} setId={setId}></ModalFormCreateReports>
      <Box sx={{ height: "90px", width: "74%", alignContent: 'center' }}>
        <SearchInput setSearch={setSearch}></SearchInput>
      </Box>
      <Slider3d setSpaceName={setSpaceName} Spaces={spaces} setId={setId}></Slider3d>
    </Box>
  );
}
