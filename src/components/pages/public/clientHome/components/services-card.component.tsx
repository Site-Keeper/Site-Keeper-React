import CardContent from '@mui/joy/CardContent';
import { Box, Typography } from '@mui/material';

interface IProps {
  cardInfo: {
    title: string
    description: string
    icon: JSX.Element
  }
}

export default function ServicesCard({ cardInfo }: IProps) {
  return (
    <Box sx={{ width: '100%', height: '200px'}}>
      <CardContent sx={{ alignItems: 'center', textAlign: 'center', height:'100%', gap:'15px' }}>
        {cardInfo.icon}
        <Typography variant='subtitle2' fontWeight={'900'}>{cardInfo.title}</Typography>
        <Typography variant='body2' sx={{ maxWidth: '24ch' }}>
          {cardInfo.description}
        </Typography>
      </CardContent>
    </Box>
  );
}