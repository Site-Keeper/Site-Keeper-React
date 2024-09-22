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
      padding: '20px',
      margin: "20px 20px",
      border: "1px solid #ccc",
      borderRadius: "25px"}}>
      {object.map(obj => <ItemBox key={obj.id} object={obj} />)}
    </div>
  );
}
