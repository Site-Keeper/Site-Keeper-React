import React from 'react';
import { Typography } from '@mui/material';
import SelectAutoWidth from './select-table.component';

interface itemsPerPageProps {
    itemsPerPage: number;
    setItemsPerPage: (itemsPerPage: number) => void 
}

const ItemsPerPage: React.FC<itemsPerPageProps> = ({  itemsPerPage, setItemsPerPage }) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', height: "100%", gap: '5px'}}>   
            <Typography variant='subtitle2'>Filas por página:</Typography>
            <SelectAutoWidth itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}/>
    </div>
  );
};

export default ItemsPerPage;
