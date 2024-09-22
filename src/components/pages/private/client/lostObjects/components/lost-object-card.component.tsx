import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import { Box, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { ILostObject } from '../../../../../../models/interfaces/lost-object.interface';
import NotFoundImage from '../../../../../../assets/img/not-found-image.png'

interface IProp {
    lostObject: ILostObject
}

export default function LostObjectCard({ lostObject }: IProp) {
    return (
        <Card variant="outlined" sx={{ width: '100%', overflow: 'hidden', height: '415px' }}>
            <CardOverflow>
                <AspectRatio ratio="4/3" maxHeight={'260px'}>
                    <img
                        src={lostObject.image ? lostObject.image : NotFoundImage}
                        loading="lazy"
                        alt={lostObject.description}
                    />
                </AspectRatio>
            </CardOverflow>
            {
                lostObject.status === 'ENCONTRADO' && (
                    <Box margin={"0px"} color='primary.main' height={"40px"} width={'280px'} display={'flex'} position={'absolute'} top={'40px'} right={'-80px'} justifyContent={'center'} alignItems={'center'} sx={{ backgroundColor: 'secondary.main', transform: 'rotate(45deg)' }}>
                        <Typography variant="h3" color='white'> Reclamado </Typography>
                    </Box>
                )
            }
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box gap={'5px'} display={'flex'} flexDirection={'column'}>
                    <Typography variant='h3'>{lostObject.name}</Typography>
                    <Typography variant='body1'>{lostObject.description.length <= 100 ? lostObject.description : lostObject.description.substring(0, 99) + '...'}</Typography>
                </Box>
                <Box display={'flex'} gap={'5px'}>
                    <LocationOnOutlinedIcon color='secondary' />
                    <Typography variant='subtitle2'>{lostObject.spaceId}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}