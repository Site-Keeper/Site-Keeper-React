import { Box, Typography } from '@mui/material'
import { ISpace } from '../../../../../../models/interfaces/space.interface'
interface IProps {
    space: ISpace
}

export default function DescriptionHeader({space}: IProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',   
            width: 'calc(100% - 80px)',
            marginTop: '10px',
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                borderRadius: '25px',
                height: '380px',
                overflow: 'hidden',
                margin: '0 auto',
            }}>
                <img src={space.image} alt="Imagen del lugar" style={{
                    position: 'absolute',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                }}
                 />
            </div>
            <div  style={{
                padding: '15px 0px',
                textAlign: 'initial',
                marginLeft: '40px',
            }}>
                <Typography variant='h2'>{space.name}</Typography>
                <Typography variant='subtitle2'>{space.description}</Typography>
            </div>
        </Box>
    )
}
