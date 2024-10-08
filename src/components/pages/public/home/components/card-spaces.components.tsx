 
import { IObject, ISpace } from "../../../../../models/interfaces";
import { Button, Chip, Typography, Box } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useAuth } from "../../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Props {
    space: ISpace
    setId: React.Dispatch<React.SetStateAction<number>>
    setSpaceName: React.Dispatch<React.SetStateAction<string>>
}

export function CardSpaces({space, setId,setSpaceName}: Props){
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        setId(space.id);
        setSpaceName(space.name);
    }

    return(
        <div style={{ width: "400px", height: "550px", background: '#fff',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', display: "flex", flexDirection: 'column', gap: "15px", borderRadius: '20px', justifyContent: 'space-between'}}>
            <Box sx={{display: "flex", flexDirection: 'column',marginTop: '15px', gap: '15px'}}>
                <Typography variant="h3" sx={{marginLeft:"20px"}}>{space.name}</Typography>
                <img src={space.image} style={{width: "100%", height: '210px',}} alt="" />
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "20px", marginRight: "20px", gap: '10px'}}>
                    <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                    <Typography variant="subtitle1">{space.location}</Typography>
                </Box> 
                <Typography variant="body1" sx={{margin: "0 20px", color: '#8A8A8A'}}>{space.description}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: 'column', gap: '15px', marginBottom: '20px'}}>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "20px",gap: '10px', flexWrap: 'wrap', overflow: 'hidden', maxHeight: '80px'}}>
                    {space.objects.map((object: IObject) => <Chip key={object.name} sx={{color : "secondary.main", borderColor: 'secondary.main'}} label={object.name} variant="outlined" />)}
                </Box>
                {isAuthenticated &&<Box sx={{display: "flex", alignItems: "center", justifyContent: 'flex-end', marginRight: "20px", gap: '10px'}}>
                    <Button variant="outlined" onClick={() => navigate(`/space/${space.id}`)} sx={{color: "secondary.main", borderColor:"secondary.main"}}>Ver</Button>
                    <Button onClick={handleClick} variant="contained" sx={{bgcolor: 'secondary.main'}}>Reportar</Button>
                </Box>}
            </Box>
        </div>
    )
}