interface CellProps<T> {
  value: T | T[keyof T] | string ;  
  renderCell: (value: T | T[keyof T ] | string) => React.ReactNode;  
  width: string;
} 

export const Cell = <T,>({ value, renderCell, width }: CellProps<T>) => {
  return (
    <div style={{ width: width, padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {renderCell(value)}
    </div>
  );
};
