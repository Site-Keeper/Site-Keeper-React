// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../style/home.page.css';

// import required modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { ISpace } from '../../../../../models/interfaces';
import { CardSpaces } from './card-spaces.components';

interface Props {
  Spaces: ISpace[]
  setId: React.Dispatch<React.SetStateAction<number>>
  setSpaceName: React.Dispatch<React.SetStateAction<string>>
}


export function Slider3d({Spaces, setId, setSpaceName}: Props ) {
  console.log(Spaces)
  return (
    <Box className="box-container" sx={{width : "100%", height: "650px",}}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        pagination={{clickable: true }}
        modules={[EffectCoverflow, Pagination,Navigation]}
        className="mySwiper"
      >
        {Spaces.map((space:ISpace) =><SwiperSlide key={space.id}>
          <CardSpaces key={space.id} space={space} setId={setId} setSpaceName={setSpaceName}></CardSpaces>
          </SwiperSlide>)}
        <div className="swiper-button-prev">
          <IconButton aria-label="previous">
            <ArrowBack />
          </IconButton>
        </div>
        <div className="swiper-button-next">
          <IconButton aria-label="next">
            <ArrowForward />
          </IconButton>
        </div>
      </Swiper>
    </Box>
);}