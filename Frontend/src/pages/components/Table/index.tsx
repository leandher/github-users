import React, { useEffect } from 'react';
import { usePagination, useTable, Column } from 'react-table';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './styles.css';

interface TableProps {
  columns: Column<object>[];
  data: any[];
  fetchData: Function;
}

const Table: React.FC<TableProps> = (props: TableProps): React.ReactElement => {
  const { columns, data, fetchData } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
    },
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={String(headerGroup.id)}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={String(column.id)}>
                  <span>{column.render('Header')}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={String(row.id)}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} key={String(cell.column?.id)}>
                      <span>{cell.render('Cell')}</span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <FiChevronLeft size={16} color="#52575C" />
        </button>

        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <FiChevronRight size={16} color="#52575C" />
        </button>
      </div>
    </div>
  );
};

export default Table;
