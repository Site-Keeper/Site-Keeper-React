import { CSSProperties } from "react";
import { IObject } from "../../../../../../models/interfaces";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

interface IProps {
    object: IObject;
}

export default function ItemBox({ object }: IProps) {
    const boxStyle: CSSProperties = {
        border: "1px solid #ccc",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "25px",
        gap: "10px",
        width: "300px",
    }
    const buttonStyle = {
        marginTop: "10px",
        backgroundColor: "#6B5CFF",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    }
    
    return (
        <div style={boxStyle}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={object.image} alt={object.name} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
                <Typography variant="subtitle1">{object.name}</Typography>
            </Box>
            <Typography variant="body1">Cantidad: {object.quantity}</Typography>
            <Typography variant="body1">{object.description}</Typography>
            <button onClick={() => console.log("Reportar", object.id)} style={buttonStyle}>
                Reportar
            </button>
        </div>
    );
};


