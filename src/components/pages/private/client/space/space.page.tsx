import DescriptionHeader from './components/description-header.component'
import AttechedCards from './components/atteched-cards.component'
import { IObject, ISpace } from '../../../../../models/interfaces';

const objectsInSpace: IObject[] = [
  {
      id: 1,
      name: "Mesa de conferencias",
      description: "Una gran mesa de madera para reuniones y conferencias, con capacidad para 10 personas.",
      image: "https://cdn.pixabay.com/photo/2023/10/24/05/08/dog-8337394_1280.jpg",
      quantity: 5
  },
  {
      id: 2,
      name: "Pizarra digital",
      description: "Pizarra interactiva digital con conexión a Internet y herramientas para presentaciones en vivo.",
      image: "https://example.com/images/pizarra-digital.jpg",
      quantity: 2
  },
  {
      id: 3,
      name: "Proyector",
      description: "Proyector de alta definición para presentaciones y proyecciones de video.",
      image: "https://example.com/images/proyector.jpg",
      quantity: 3
  }
];


// Ejemplo de un espacio
const mainConferenceRoom: ISpace = {
    name: "Sala de Conferencias Principal ",
    location: "Edificio Central, Planta 2, Sala 5B",
    description: "Esta sala está equipada con tecnología de punta para facilitar conferencias y reuniones efectivas.",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    objects: objectsInSpace
};
export default function Space() {
  return (
    <>
      <DescriptionHeader space={mainConferenceRoom} />
      <AttechedCards object={objectsInSpace} />
    </>
  )
}
