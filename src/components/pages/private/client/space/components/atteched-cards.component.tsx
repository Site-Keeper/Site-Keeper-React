import { Typography } from "@mui/material";
import { IObject } from "../../../../../../models/interfaces";
import ItemBox from "./item-box.component";

interface IProps {
  object: IObject[]
}


export default function AttachedCards({ object }: IProps) {

  return (
    <div style={{display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      padding: '40px',
      margin: "20px 20px",
      border: "1px solid #ccc",
      width: "calc(100% - 80px)",
      minHeight: "100px",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "25px"}}>
      {object[0] ? object.map(obj => <ItemBox key={obj.id} object={obj} />) : <Typography variant="subtitle1">No hay objetos anexados</Typography>}
    </div>
  );
}
