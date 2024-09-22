import { CSSProperties } from "react";
import { IObject } from "../../../../../../models/interfaces";

interface IProps {
    object: IObject;
}

export default function ItemBox({ object }: IProps) {
    const boxStyle: CSSProperties = {
        border: "1px solid #ccc",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "25px",
    }
    const imageStyle = {
        width: "150px",
        height: "100px",
    };
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
            <img src={object.image} alt={object.name} style={imageStyle} />
            <h3>{object.name}</h3>
            <p>Cantidad: {object.quantity}</p>
            <button onClick={() => console.log("Reportar", object.id)} style={buttonStyle}>
                Reportar
            </button>
        </div>
    );
};


