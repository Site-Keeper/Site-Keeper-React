import React from 'react';

interface Column<T> {
  id: number | string;
  label: string;
  renderCell?: (value: T) => React.ReactNode;
}

const defaultRenderCell = (value: unknown) => {
  return String(value);
};

const booleanRenderCell = (value: boolean) => {
  return value ? 'Yes' : 'No';
};

const dateRenderCell = (value: Date) => {
  return value.toLocaleDateString();
};

const numberRenderCell = (value: number) => {
  return value.toFixed(2);
};

const getRenderCell = <T,>(column: Column<T>): ((value: T | T[keyof T] | string) => React.ReactNode) => {

  const columnType = typeof column.id;

  switch (columnType) {
    case 'boolean':
      return booleanRenderCell as (value: T | T[keyof T] | string) => React.ReactNode;
    case 'number':
      return numberRenderCell as (value: T | T[keyof T] | string) => React.ReactNode;
    case 'object':
      if (column.id) {
        return dateRenderCell as (value: T | T[keyof T] | string) => React.ReactNode;
      }
      break;
    default:
      return defaultRenderCell;
  }

  
  return defaultRenderCell;
};

export default getRenderCell;
