import React from 'react';

interface CellProps {
  value: unknown;
  renderCell: (value: unknown) => React.ReactNode;
  width: string;
} 

const Cell: React.FC<CellProps> = ({ value, renderCell, width }) => {
  return (
    <div style={{ width: width, padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {renderCell(value)}
    </div>
  );
};

export default Cell;
