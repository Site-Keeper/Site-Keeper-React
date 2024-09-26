import DescriptionHeader from './components/description-header.component'
import AttechedCards from './components/atteched-cards.component'
import { IObject, ISpace } from '../../../../../models/interfaces';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SpacesService } from '../../../../../services/spaces/spaces.service';
import { Loader } from '../../../../utilities/components/loader.utility';


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
    <>
      <Loader isLoading={loader} />
      <DescriptionHeader space={space} />
      <AttechedCards object={space.objects} />
    </>
  )
}
