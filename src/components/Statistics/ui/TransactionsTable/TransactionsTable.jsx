import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import './TransactionsTable.module.scss';

import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useMemo, useReducer, useState } from 'react';
import { getDate } from 'helpers/getDate';
import { useGetTransactions } from 'api/transactions';
import { useParams } from 'react-router-dom';

export const TransactionsTable = () => {
  const { restId } = useParams();
  const rerender = useReducer(() => ({}), {})[1];

  const sampleTransaction = {
    id: 123,
    amount: 100.0,
    type: 'Online',
    createdAt: new Date('2023-08-09T10:30:00Z'), // Sample date and time
    typeUser: 'Customer',
    name: 'John Doe',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Transaction',
        footer: (props) => props.column._id,
        columns: [
          {
            accessorKey: '_id',
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.paymentAmount,
            id: 'paymnetAmount',
            cell: (info) => info.getValue(),
            header: () => <span>Amount</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.type,
            id: 'typeTransaction',
            cell: (info) => info.getValue(),
            header: () => <span>Type</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.createdAt,
            id: 'createdAt',
            cell: (info) => {
              const date = info.getValue();
              return <span>{getDate(date)}</span>;
            },
            header: () => <span>Created at</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: 'Created by',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'createdByType',
            header: () => <span>Type</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'createdByName',
            header: 'Name',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const { data: resp } = useGetTransactions(restId);

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const dataQuery = [];

  const table = useReactTable({
    data: resp?.data?.tableTransactions.transactions ?? defaultData,
    columns,
    pageCount: resp?.data?.pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {dataQuery.isFetching ? 'Loading...' : null}
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
    </div>
  );
};
