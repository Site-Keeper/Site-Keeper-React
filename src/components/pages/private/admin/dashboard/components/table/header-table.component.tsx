import React, { useRef, useEffect } from 'react';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { Column } from './table-admin.component';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface HeaderProps<T> {
  columns: Column<T>[];
  onFilterChange: (columnId: number | string, value: string) => void;
  onSortChange: (columnId: number | string) => void;
  sortConfig: { columnId: number | string; direction: 'asc' | 'desc' } | null;
  columInMoment: Column<T> | null;
  setColumInMoment: (column: Column<T> | null) => void;
}

const Header = <T,>({ columns, onFilterChange, onSortChange, sortConfig, columInMoment, setColumInMoment }: HeaderProps<T>) => {
  const [modalFilter, setModalFilter] = React.useState(false);
  const [filterValues, setFilterValues] = React.useState<{ [key: number | string]: string }>({});
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSort = (columnId: string | number) => {
    onSortChange(columnId);
  };

  const handleFilterChange = (columnId: number | string, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValues(prev => ({ ...prev, [columnId]: value }));
    onFilterChange(columnId, value);
  };

  const handleDateChange = (columnId: number | string, date: Dayjs | null) => {
    if (date) {
      const value = date.format('YYYY-MM-DD');
      setDateValue(date);
      setFilterValues(prev => ({ ...prev, [columnId]: value }));
      onFilterChange(columnId, value);
    }
  };

  const handleColumInMoment = (column: Column<T>) => {
    setColumInMoment(column);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      modalRef.current &&
      !modalRef.current.contains(target) &&
      !target.closest('.MuiPickersPopper-root')
    ) {
      setModalFilter(false);
    }
  };

  const handleClearFilter = (columnId: number | string) => {
    setFilterValues(prev => ({ ...prev, [columnId]: '' }));
    setDateValue(null);
    onFilterChange(columnId, '');
    setModalFilter(false);
  };

  useEffect(() => {
    if (modalFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalFilter]);

  return (
    <div style={{ display: 'flex', backgroundColor: 'rgba(107, 92, 255, 0.1)', height: '60px', padding: '30px 0px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
      {columns.map(column => (
        <div
          key={String(column.id)}
          style={{
            width: column.width,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
            justifyContent: 'center',
          }}
          onClick={() => handleColumInMoment(column)}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: "900" }}>{column.label}</Typography>
            {columInMoment?.id === column.id && column.filter ? (
              <span
                onClick={() => handleSort(column.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  padding: '5px',
                  transition: 'background-color 0.3s',
                }}
              >
                {sortConfig?.direction === 'asc' ? (
                  <NorthIcon
                    sx={{ fontSize: 30 }}
                    style={{
                      borderRadius: '50%',
                      padding: '5px',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  />
                ) : (
                  <SouthIcon
                    sx={{ fontSize: 30 }}
                    style={{
                      borderRadius: '50%',
                      padding: '5px',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  />
                )}
              </span>
            ) : null}
            {columInMoment?.id === column.id && column.filter && (
              <FilterAltIcon
                sx={{ fontSize: 30 }}
                style={{
                  borderRadius: '50%',
                  padding: '5px',
                  transition: 'background-color 0.3s',
                }}
                onClick={() => setModalFilter(!modalFilter)}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              />
            )}
          </span>
          {modalFilter && columInMoment?.id === column.id && (
            <div
              ref={modalRef}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                zIndex: 1,
                width: '100%',
                background: 'white',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                justifyContent: 'space-around',
              }}
              onClick={(e) => e.stopPropagation()} // Stop propagation to prevent clicks inside from closing the modal
            >
              {column.filter === 'Date' ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dateValue}
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '10px',
                      }
                    }}
                    onChange={(date) => handleDateChange(column.id, date)}
                  />
                </LocalizationProvider>
              ) : column.filter === "String"?(
                <input
                  type="text"
                  value={filterValues[column.id] || ''}
                  onChange={(event) => handleFilterChange(column.id, event)}
                  placeholder={`Filtrar por ${column.label}`}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    width: '80%',
                  }}
                />
              ): undefined}
              <CloseIcon
                onClick={() => handleClearFilter(column.id)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '50%',
                  padding: '5px',
                  transition: 'background-color 0.3s',
                  fontSize: '40px'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Header;
