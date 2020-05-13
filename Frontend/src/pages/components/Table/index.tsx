import React, { useEffect } from 'react';
import { usePagination, useTable, Column } from 'react-table';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  Table as MaUTable,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core';

import './styles.css';

interface TableProps {
  columns: Column<object>[];
  data: any[] | null | undefined;
  fetchData?: Function;
  pagination?: boolean;
}

const Table: React.FC<TableProps> = (props: TableProps): React.ReactElement => {
  const { columns, data, fetchData, pagination } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: data || [],
      initialState: { pageIndex: 0 },
      manualPagination: true,
    },
    usePagination
  );

  useEffect(() => {
    if (pagination && fetchData) {
      fetchData({ pageIndex });
    }
  }, [pageIndex]);

  return (
    <div className="table-container">
      <MaUTable stickyHeader aria-label="sticky table" {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow
              {...headerGroup.getHeaderGroupProps()}
              key={String(headerGroup.id)}
            >
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()} key={String(column.id)}>
                  <span>{column.render('Header')}</span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={String(row.id)}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      {...cell.getCellProps()}
                      key={String(cell.column?.id)}
                    >
                      <span>{cell.render('Cell')}</span>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
      {pagination && (
        <div className="pagination">
          <button onClick={() => previousPage()}>
            <FiChevronLeft size={16} color="#52575C" />
          </button>

          <button onClick={() => nextPage()}>
            <FiChevronRight size={16} color="#52575C" />
          </button>
        </div>
      )}
    </div>
  );
};

Table.defaultProps = {
  data: [],
};

export default Table;
