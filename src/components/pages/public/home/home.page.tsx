import { Box } from '@mui/material';
import { Slider3d } from './components/slider.components';
import { ISpace } from '../../../../models/interfaces';
import hero from "../../../../assets/img/redd-f-5U_28ojjgms-unsplash.jpg"
import { SearchInput } from './components/search.components';
import { useEffect, useState } from 'react';
import { SpacesService } from '../../../../services/spaces/spaces.service';

const spacesQ: ISpace[] = [
  {
    id: 1,
    name: "Parque Central",
    location: "Ciudad Vieja",
    description: "Un hermoso parque en el corazón de la ciudad.",
    image: "https://plus.unsplash.com/premium_photo-1721654789105-43ff4bb0a486?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    objects: [
      {
        name: "Bancos",
        description: "Bancos para sentarse y disfrutar del paisaje.",
        image: "https://source.unsplash.com/featured/?bench"
      },
      {
        name: "Luz de Calle",
        description: "Iluminación ambiental para paseos nocturnos.",
        image: "https://source.unsplash.com/featured/?street-light"
      }
    ]
  },
  {
    id: 2,
    name: "Biblioteca Nacional",
    location: "Centro",
    description: "Una biblioteca con una amplia colección de libros.",
    image: "https://plus.unsplash.com/premium_photo-1721654789105-43ff4bb0a486?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    objects: [
      {
        name: "Libros",
        description: "Colección variada de libros.",
        image: "https://source.unsplash.com/featured/?book"
      },
      {
        name: "Computadoras",
        description: "Computadoras para el uso de los visitantes.",
        image: "https://source.unsplash.com/featured/?computer"
      }
    ]
  },
  {
    id: 3,
    name: "Museo de Arte Moderno",
    location: "Barrio Antiguo",
    description: "Exposiciones de arte contemporáneo.",
    image: "https://plus.unsplash.com/premium_photo-1721654789105-43ff4bb0a486?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    objects: [
      {
        name: "Cuadros",
        description: "Obras de artistas contemporáneos.",
        image: "https://source.unsplash.com/featured/?art"
      },
      {
        name: "Esculturas",
        description: "Esculturas modernas que desafían la percepción.",
        image: "https://source.unsplash.com/featured/?sculpture"
      }
    ]
  },
  {
    id: 4,
    name: "Playa del Sol",
    location: "Costanera",
    description: "Una hermosa playa para relajarse y disfrutar del sol.",
    image: "https://plus.unsplash.com/premium_photo-1721654789105-43ff4bb0a486?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    objects: [
      {
        name: "Sombrillas",
        description: "Sombrillas para protegerse del sol.",
        image: "https://source.unsplash.com/featured/?umbrella"
      },
      {
        name: "Tumbonas",
        description: "Tumbonas para descansar junto al mar.",
        image: "https://source.unsplash.com/featured/?lounge-chair"
      }
    ]
  },
  {
    id: 5,
    name: "Jardín Botánico",
    location: "Suburbio",
    description: "Un jardín lleno de diversas especies de plantas.",
    image: "https://plus.unsplash.com/premium_photo-1721654789105-43ff4bb0a486?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    objects: [
      {
        name: "Plantas",
        description: "Diferentes tipos de plantas nativas.",
        image: "https://source.unsplash.com/featured/?plant"
      },
      {
        name: "Caminos",
        description: "Caminos diseñados para disfrutar de la naturaleza.",
        image: "https://source.unsplash.com/featured/?path"
      }
    ]
  }
];




export function Home() {
  const [spaces, setSpaces ]  = useState<ISpace[]>(spacesQ)
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
