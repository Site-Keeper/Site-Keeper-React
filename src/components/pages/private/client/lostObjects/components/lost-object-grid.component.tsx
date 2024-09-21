import { Box } from '@mui/material';
import LostObjectCard from './lost-object-card.component'
import { ILostObject } from '../../../../../../models/interfaces/lost-object.interface';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { LostObjectsService } from '../../../../../../services/lostObjects/lost-objects.service';
import Void from '../../../../../utilities/components/void.utility';
import { LostObjectStatus } from '../../../../../../models/enums/lost-object.enum';

export default function LostObjectsGrid() {

  const [lostObjects, setLostObjects] = useState<ILostObject[]>([])

  async function getAll() {
    try {
      const response = await LostObjectsService.get_all()
      setLostObjects(response.data)
    } catch (error) {
      console.log(error);
      setLostObjects([
        {
          id: 1,
          name: "Cartera Negra",
          description: "Cartera de cuero con varios documentos de identidad y tarjetas de crédito.",
          image: "",
          spaceId: 101,
          status: LostObjectStatus.PERDIDO,
        },
        {
          id: 2,
          name: "Teléfono iPhone 12",
          description: "iPhone 12 color blanco, con funda transparente y pantalla rota.",
          image: "",
          spaceId: 203,
          status: LostObjectStatus.PERDIDO,
        },
        {
          id: 3,
          name: "Llaves de Coche",
          description: "Un llavero con una llave de coche Toyota y un llavero en forma de estrella.",
          image: "",
          spaceId: 305,
          status: LostObjectStatus.ENCONTRADO,
        },
        {
          id: 4,
          name: "Reloj de Pulsera",
          description: "Reloj de pulsera marca Casio, color plateado con correa de metal.",
          image: "",
          spaceId: 407,
          status: LostObjectStatus.PERDIDO,
        },
        {
          id: 5,
          name: "Libro: 'El Quijote'",
          description: "Edición de bolsillo de 'Don Quijote de la Mancha', con varias marcas en las páginas.",
          image: "",
          spaceId: 109,
          status: LostObjectStatus.ENCONTRADO,
        }
      ])
    }
  }

  useEffect(() => {
    getAll();
  }, [])

  return (
    <Box width={'100%'}>
      {lostObjects.length > 0 ? (
        <Grid container>
          {lostObjects.map((lostObject: ILostObject) => (
            <Grid
              key={lostObject.id}
              padding={'5px'}
              sx={{
                width: {
                  xs: '100%',
                  sm: '48%',
                  md: '25%',
                },
                minWidth: '200px',
              }}
            >
              <LostObjectCard lostObject={lostObject} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Void />
      )}
    </Box>
  )
}
