import React from 'react';
import getRenderCell from './getRenderCell';
import { Typography } from '@mui/material';
import Header from './header-table.component';
import Cell from './cell.table.component';
import ItemsPerPage from './items-per-page.component';
import Pagination from './Pagination.component';

export interface Column<T> {
  id: number | string; 
  label: string;
  width: string;
  filter?: string;
  renderCell?: (value: T) => React.ReactNode;
}

interface DataGridProps<T> {
  columns: Column<T>[];
  rows: T[];
  limit: number;
}

export const TableAdmin = <T,>({ columns, rows, limit }: DataGridProps<T>) => {
  const [columnOrder, setColumnOrder] = React.useState<(number | string)[]>(columns.map(col => col.id));
  const [filters, setFilters] = React.useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [sortConfig, setSortConfig] = React.useState<{ columnId: string | number; direction: 'asc' | 'desc' } | null>(null);
  const [columInMoment, setColumInMoment] = React.useState<Column<T> | null>(null)
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(limit);
  React.useEffect(() => {
    setColumnOrder(columns.map(col => col.id));
  }, [columns]);

  const handleSortChange = (columnId: string | number) => {
    setSortConfig(prevState => {
        return {
          columnId,
          direction: prevState?.direction === 'asc' ? 'desc' : 'asc',
        };
    });
  };

  const handleFilterChange = (columnId: number | string, value: string) => {
    setFilters({
      ...filters,
      [String(columnId)]: value.trim().toLowerCase(),
    });
    // console.log(filters)
  };

  const filteredData = rows.filter(row =>
    columnOrder.every(columnId => {
      const cellValue = row[columnId as keyof T];
      const filterValue = filters[String(columnId)];
      if (!filterValue) return true;
      // console.log(cellValue, filterValue)
      if (cellValue instanceof Date) {
        return cellValue.toLocaleDateString().toLowerCase().includes(filterValue);
      }

      if (typeof cellValue === 'string' || typeof cellValue === 'number' || typeof cellValue === 'boolean') {
        return cellValue.toString().toLowerCase().includes(filterValue);
      }

      return false;
    })
  );

  const sortedData = sortConfig
    ? filteredData.sort((a, b) => {
        const aValue = a[sortConfig.columnId as keyof T];
        const bValue = b[sortConfig.columnId as keyof T];

        if (aValue instanceof Date && bValue instanceof Date) {
          return sortConfig.direction === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
        }

        if (typeof aValue === 'string' || typeof aValue === 'number' || typeof aValue === 'boolean') {
          return sortConfig.direction === 'asc' ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) : (bValue < aValue ? -1 : bValue > aValue ? 1 : 0);
        }

        return 0;
      })
    : filteredData;

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div style={{borderRadius: '8px', color: '#828282' }}>
      <Header
        columns={columns}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        sortConfig={sortConfig}
        columInMoment={columInMoment}
        setColumInMoment={setColumInMoment}
      />

      {!rows[0] ? <div style={{height: '60px',display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Typography variant='subtitle2'>No hay datos</Typography></div> :paginatedData.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'flex',
            borderTop: '1px solid #ddd',
            backgroundColor: '#fff',
            alignItems: 'center',
            color: '#000'
          }}
        >
          {columnOrder.map((columnId) => {
            const column = columns.find(col => col.id === columnId);
            if (!column) return null;
            const renderCell = column.renderCell || getRenderCell<T>(column);
            const cellValueOp = column.renderCell? row : 'NUll';
            return (
              <Cell
                key={String(columnId)}
                value={row[columnId as keyof T] || cellValueOp }
                renderCell={renderCell}
                width={column.width}
              />
            );
          })}
        </div>
      )) }

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(107, 92, 255, 0.1)', height: '60px', borderEndStartRadius: '10px', borderEndEndRadius: '10px'}}>
        <div style={{marginLeft: "20px"}}>
          <Typography variant='subtitle2'>1-{itemsPerPage} of {totalItems}</Typography>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '40px'}}>
          <ItemsPerPage itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPreviousPage={handlePreviousPage} onNextPage={handleNextPage}/>
        </div>
      </div>
    </div>
  );
};
