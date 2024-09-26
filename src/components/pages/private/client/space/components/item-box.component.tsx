import { CSSProperties, useState } from "react";
import { IObject } from "../../../../../../models/interfaces";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import DynamicIcon from "../../../../../utilities/DynamicIcon";
import { ModalFormCreateReportsByObjects } from "./form-create-report";

interface IProps {
    object: IObject;
    spaceID:number
}

export default function ItemBox({ object, spaceID }: IProps) {
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
        padding: "5px 20px",
        border: "none",
        borderRadius: "33px",
        cursor: "pointer",
    }

    const [open,setOpen] = useState(false)

    const handleClose = () => setOpen(false);
    
    return (
        <div style={boxStyle}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <DynamicIcon iconName={object.image} sx={{ width: "30px", height: "30px" }} />
                <Typography variant="h3">{object.name}</Typography>
            </Box>
            <Typography variant="body1">Cantidad: {object.quantity}</Typography>
            <Typography variant="body1">{object.description}</Typography>
            <button onClick={() => setOpen(true)} style={buttonStyle}>
                <Typography variant="subtitle1">Reportar</Typography>
            </button>
            <ModalFormCreateReportsByObjects open={open} handleClose={handleClose} objectId={object.id} objectName={object.name} id={spaceID} />
        </div>
    );
};


