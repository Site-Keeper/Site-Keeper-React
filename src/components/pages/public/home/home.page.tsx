import { Box } from '@mui/material';
import { Slider3d } from './components/slider.components';
import { ISpace } from '../../../../models/interfaces';
import hero from "../../../../assets/img/redd-f-5U_28ojjgms-unsplash.jpg"
import { SearchInput } from './components/search.components';
import { useEffect, useState } from 'react';
import { SpacesService } from '../../../../services/spaces/spaces.service';




export function Home() {
  const [spaces, setSpaces ]  = useState<ISpace[]>([])
  const [search, setSearch] = useState<string>("")
  async function getSpaces(){
    const spacesRes = await SpacesService.getAll()
    setSpaces(spacesRes)
  }

  
  useEffect(() => {
    getSpaces()
  },[search])  

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: 'column', alignItems: 'center'}} >
      <Box sx={{ height: '400px', width: '100vw', position: 'relative'}}><img src={hero} style={{ position: "absolute", objectFit: 'cover',height: '100%', width: '100%'}}/></Box>
      <Box sx={{ height: "90px", width: "74%", alignContent: 'center'}}>
            <SearchInput setSearch={setSearch}></SearchInput>
      </Box>
      <Slider3d Spaces={spaces}></Slider3d>
    </Box>
);}
