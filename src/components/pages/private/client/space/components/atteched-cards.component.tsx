import { IObject } from "../../../../../../models/interfaces";
import ItemBox from "./item-box.component";

interface IProps {
  object: IObject[]
}


export default function AttachedCards({ object }: IProps) {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridGap: '20px',
    padding: '20px',
    margin: "50px 50px",
    border: "1px solid #ccc",
    borderRadius: "25px"
  };

  return (
    <div style={containerStyle}>
      {object.map(obj => <ItemBox key={obj.id} object={obj} />)}
    </div>
  );
}
