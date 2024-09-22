import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Typography } from '@mui/material';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPreviousPage, onNextPage }) => {
  return (
    <div style={{ textAlign: 'center', display: 'flex',justifyContent:'end', alignItems:'center', height: '5vh', marginRight: '20px' }}>
      <KeyboardArrowLeftIcon onClick={onPreviousPage}/>
      <Typography variant="subtitle2" style={{ display: 'flex', alignItems: "center", gap:'5px' }}>{currentPage}/{totalPages}</Typography>
      <KeyboardArrowRightIcon onClick={onNextPage}/>
    </div>
  );
};

export default Pagination;
