import DescriptionHeader from './components/description-header.component'
import AttechedCards from './components/atteched-cards.component'
import { IObject, ISpace } from '../../../../../models/interfaces';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SpacesService } from '../../../../../services/spaces/spaces.service';
import { Loader } from '../../../../utilities/components/loader.utility';
import { Box, Button, Typography } from '@mui/material';


const emptyObject: IObject = {
  id: 0,
  name: "",
  description: "",
  image: "",
  quantity: 0,
  space_id: 0
};

const emptySpace: ISpace = {
  id: 0,
  name: "",
  location: "",
  description: "",
  image: "",
  objects: [emptyObject] // Lista vacía de objetos
};

export default function Space() {
  const [loader, setLoader] = useState(false)
  const { id } = useParams<{ id: string }>();
  const [space, setSpace] = useState<ISpace>(emptySpace);

  async function getSpace(id: string | undefined) {
    setLoader(true)
    const spacesreps = await SpacesService.getOne(id);
    setSpace(spacesreps);
    setLoader(false)
  }
  
  useEffect(() => {
    getSpace(id);
  }, [id]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', with: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Loader isLoading={loader} />
      <DescriptionHeader space={space} />
      <AttechedCards object={space.objects} />
      <Box sx={{display: 'flex',width: 'calc(100% - 80px)', paddingLeft: '40px', gap: '10px'}}>
        <Button variant="contained" sx={{backgroundColor:"secondary.main", padding: '10px 20px', borderRadius: '40px'}}><Typography variant="h3">Agregar Objeto Perdido</Typography></Button>
        <Button variant="outlined" sx={{color: "secondary.main", borderColor:"secondary.main", padding: '10px 20px', borderRadius: '40px'}}><Typography variant="h3">Reportar Espacio</Typography></Button>
      </Box>
    </Box>
  )
}
