import DescriptionHeader from './components/description-header.component'
import AttechedCards from './components/atteched-cards.component'
import { IObject, ISpace } from '../../../../../models/interfaces';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SpacesService } from '../../../../../services/spaces/spaces.service';

const objectsInSpace: IObject[] = [
  {
      id: 1,
      name: "Mesa de conferencias",
      description: "Una gran mesa de madera para reuniones y conferencias, con capacidad para 10 personas.",
      image: "TableRestaurantIcon",
      quantity: 5,
      space_id: 1
  },
  {
      id: 2,
      name: "Pizarra digital",
      description: "Pizarra interactiva digital con conexión a Internet y herramientas para presentaciones en vivo.",
      image: "FilterFramesIcon",
      quantity: 2,
      space_id: 1
  },
  {
      id: 3,
      name: "Proyector",
      description: "Proyector de alta definición para presentaciones y proyecciones de video.",
      image: "AirplayIcon",
      quantity: 3,
      space_id: 1
  }
];

const mainConferenceRoom: ISpace = {
    id: 1,
    name: "Sala de Conferencias Principal ",
    location: "Edificio Central, Planta 2, Sala 5B",
    description: "Esta sala está equipada con tecnología de punta para facilitar conferencias y reuniones efectivas.",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    objects: objectsInSpace
};
export default function Space() {
  const { id } = useParams<{ id: string }>();
  const [space, setSpace] = useState<ISpace>(mainConferenceRoom);

  async function getSpace(id: string | undefined) {
    const spacesreps = await SpacesService.getOne(id);
    setSpace(spacesreps);
  }
  
  useEffect(() => {
    getSpace(id);
  }, [id]);

  return (
    <>
      <DescriptionHeader space={space} />
      <AttechedCards object={space.objects} />
    </>
  )
}
