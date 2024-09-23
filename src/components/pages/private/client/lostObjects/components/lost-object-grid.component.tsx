import { Box } from '@mui/material';
import LostObjectCard from './lost-object-card.component'
import { ILostObject } from '../../../../../../models/interfaces/lost-object.interface';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { LostObjectsService } from '../../../../../../services/lostObjects/lost-objects.service';
import Void from '../../../../../utilities/components/void.utility';

export default function LostObjectsGrid() {

  const [lostObjects, setLostObjects] = useState<ILostObject[]>([])

  async function getAll() {
    try {
      const response = await LostObjectsService.get_all()
      setLostObjects(response)
    } catch (error) {
      console.log(error);
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
