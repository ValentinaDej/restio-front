import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { getDate } from 'helpers/getDate';
import { useGetTransactions } from 'api/transactions';
import { useParams } from 'react-router-dom';
import cls from './TransactionsTable.module.scss';
import { IconButton } from 'shared/IconButton/IconButton';
import {
  TfiAngleDoubleLeft,
  TfiAngleDoubleRight,
  TfiAngleLeft,
  TfiAngleRight,
  TfiCalendar,
} from 'react-icons/tfi';
import { RxCross2 } from 'react-icons/rx';
import { TbMoodSearch } from 'react-icons/tb';
import Text from 'shared/Text/Text';
import Loader from 'shared/Loader/Loader';
import { DropDown } from 'shared/DropDown/DropDown';
import Title from 'shared/Title/Title';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import { Calendar } from 'shared/Calendar/Calendar';
import Modal from 'shared/Modal/Modal';
import Button from 'shared/Button/Button';

const typeOfTransactionFilterOptions = [
  { value: 'all', label: 'All' },
  { value: 'cash', label: 'Cash' },
  { value: 'POS', label: 'POS' },
  { value: 'online', label: 'Online' },
];

const typeOfUserFilterOptions = [
  { value: 'all', label: 'All' },
  { value: 'customer', label: 'Customer' },
  { value: 'waiter', label: 'Waiter' },
  { value: 'admin', label: 'Admin' },
];

const numberOfTransactionsOptions = [
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
];

export const TransactionsTable = () => {
  const { restId } = useParams();
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [isTodayTransactions, setIsTodayTransactions] = useState(false);
  const [createdByTypeOptions, setCreatedByTypeOptions] = useState('all');
  const [transactionTypeOptions, setTransactionTypeOptions] = useState('all');
  const [isClear, setIsClear] = useState(false);

  const onClickCalendar = () => {
    setCalendarIsOpen((prev) => !prev);
  };

  const onChangeDate = (newDate) => {
    setDate(newDate);
  };

  const onClickClearFilters = () => {
    setIsClear(true);
    setCreatedByTypeOptions('all');
    setTransactionTypeOptions('all');
    setDate(undefined);
    setIsTodayTransactions(false);
    setPagination({ pageIndex: 0, pageSize: 20 });
  };

  useEffect(() => {
    if (isClear) {
      setIsClear(false);
    }
  }, [isClear]);

  const columns = useMemo(
    () => [
      {
        header: 'Transaction',
        footer: (props) => props.column._id,
        columns: [
          {
            id: '№',
            accessorFn: (row, rowIndex) => {
              return pageIndex * pageSize + (rowIndex + 1);
            },
            cell: (info) => info.getValue(),
            footer: (props) => props.column.totalCount,
          },
          {
            accessorFn: (row) => row.paymentAmount,
            id: 'paymnetAmount',
            cell: (info) => info.getValue(),
            header: () => <span className={cls.span}>Amount $</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.type,
            id: 'typeTransaction',
            cell: (info) => info.getValue(),
            header: () => (
              <span className={cls.span}>
                Type
                <DropDown
                  options={typeOfTransactionFilterOptions}
                  onSelect={(e) => {
                    setTransactionTypeOptions(e.value);
                    setPagination({ pageIndex: 0, pageSize });
                  }}
                  defaultValue="All"
                  clear={isClear}
                />
              </span>
            ),
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.restaurantOrders_id,
            id: 'restaurantOrders_id',
            cell: (info) => {
              const orders = info.getValue().length;
              return <span className={cls.span}>{orders}</span>;
            },
            header: () => <span className={cls.span}>Orders paid</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.createdAt,
            id: 'createdAt',
            cell: (info) => {
              const date = info.getValue();
              return <span className={cls.span}>{getDate(date)}</span>;
            },
            header: () => (
              <span className={cls.span}>
                Created at
                <div className={cls.calendarBox}>
                  <IconButton
                    size={24}
                    onClick={onClickCalendar}
                    Svg={TfiCalendar}
                    className={cls.dateIcon}
                  />
                  {date && (
                    <Text classname={cls.calendarValue} fontSize={12}>
                      {date?.getDate()}
                    </Text>
                  )}
                </div>
                <IconButton
                  size={20}
                  onClick={() => setDate(undefined)}
                  Svg={RxCross2}
                  className={cls.dateIcon}
                />
              </span>
            ),
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
            header: () => (
              <span className={cls.span}>
                Type
                <DropDown
                  options={typeOfUserFilterOptions}
                  onSelect={(e) => {
                    setCreatedByTypeOptions(e.value);
                    setPagination({ pageIndex: 0, pageSize });
                  }}
                  defaultValue="All"
                  clear={isClear}
                />
              </span>
            ),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'createdByName',
            header: () => <span className={cls.span}>Name</span>,
            cell: (info) => {
              const name = info.getValue();
              return <span className={cls.span}>{name ? name : '-'}</span>;
            },
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    [date, isClear, pageIndex, pageSize]
  );

  const fetchDataOptions = {
    pageIndex,
    pageSize,
    today: isTodayTransactions,
    userType: createdByTypeOptions,
    transactionType: transactionTypeOptions,
    date,
  };

  const { data: resp, refetch, isFetching } = useGetTransactions(restId, fetchDataOptions);

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    refetch();
  }, [
    pageIndex,
    pageSize,
    isTodayTransactions,
    createdByTypeOptions,
    transactionTypeOptions,
    date,
    refetch,
  ]);

  const table = useReactTable({
    data: resp?.data?.tableTransactions.transactions ?? defaultData,
    columns,
    pageCount: resp?.data?.tableTransactions.pageCount ?? -1,
    state: {
      pagination: {
        ...pagination,
        pageIndex: Number(resp?.data?.tableTransactions.currentPageIndex) ?? Number(pageIndex),
      },
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className={cls.box}>
      <Modal isModalOpen={calendarIsOpen} setIsModalOpen={onClickCalendar}>
        <Calendar isOpen={onClickCalendar} onChange={onChangeDate} />
      </Modal>
      <Title fontSize={22}>Table</Title>
      <div className={cls.btnsBox}>
        <div className={cls.paginationBox}>
          <IconButton
            size={25}
            mode={'filled'}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            Svg={TfiAngleDoubleLeft}
          />
          <IconButton
            size={25}
            mode={'outlined'}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            Svg={TfiAngleLeft}
          />
          <IconButton
            mode={'outlined'}
            size={25}
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            Svg={TfiAngleRight}
          />
          <IconButton
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            size={25}
            mode={'filled'}
            Svg={TfiAngleDoubleRight}
          />
          <Button size="sm" onClick={onClickClearFilters}>
            Clear filters
          </Button>
        </div>
        <div className={cls.inputSelectBox}>
          <div className={cls.inputBox}>
            <Text classname={cls.text}>Page</Text>
            <Text classname={cls.text}>
              {resp?.data?.tableTransactions.pageCount === 0
                ? 0
                : table.getState().pagination.pageIndex + 1}{' '}
              of {table.getPageCount()}
            </Text>
            <Text classname={cls.text}> Go to page:</Text>
            <input
              min={1}
              type="number"
              defaultValue={
                isNaN(resp?.data?.tableTransactions.currentPageIndex)
                  ? 1
                  : resp?.data?.tableTransactions.currentPageIndex
              }
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className={cls.input}
            />
            <div className={cls.loader}>{isFetching && <Loader size="xs" />}</div>
          </div>
          <div className={cls.select}>
            <Text classname={cls.text}>Show</Text>
            <DropDown
              defaultValue="20"
              options={numberOfTransactionsOptions}
              onSelect={(e) => {
                table.setPageSize(e.value);
              }}
              clear={isClear}
            />
            <CheckBox
              label="Today transactions"
              onChange={(e) => {
                setIsTodayTransactions(e.target.checked);
                setPagination({ pageIndex: 0, pageSize });
                setDate(undefined);
              }}
              checked={isTodayTransactions}
            />
          </div>
        </div>
      </div>
      <table className={cls.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={cls.tr} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className={cls.th}>
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
                    <td key={cell.id} className={cls.td}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!resp?.data?.tableTransactions.transactions.length && (
        <div className={cls.emptyBox}>
          <TbMoodSearch size={200} className={cls.icon} />
          <Title mode={'h3'} fontSize={20} classname={cls.text}>
            There are no transactions by this query.
          </Title>
        </div>
      )}
    </div>
  );
};
