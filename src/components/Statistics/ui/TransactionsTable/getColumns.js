import { RxCross2 } from 'react-icons/rx';
import { TfiCalendar } from 'react-icons/tfi';
import { DropDown, IconButton, Text } from 'shared';
import { getDate } from 'helpers/getDate';
import cls from './TransactionsTable.module.scss';

const typeOfTransactionFilterOptions = [
  { value: 'all', label: 'all' },
  { value: 'cash', label: 'cash' },
  { value: 'POS', label: 'POS' },
  { value: 'online', label: 'online' },
];

const typeOfUserFilterOptions = [
  { value: 'all', label: 'all' },
  { value: 'customer', label: 'customer' },
  { value: 'waiter', label: 'waiter' },
  { value: 'admin', label: 'admin' },
];

export const getColumns = (
  date,
  isClear,
  pageIndex,
  pageSize,
  onClickCalendar,
  setTransactionTypeOptions,
  setPagination,
  setDate,
  setCreatedByTypeOptions,
  defaultValues
) => [
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
              defaultValue={defaultValues.transactionType}
              clear={isClear}
            />
          </span>
        ),
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
              defaultValue={defaultValues.userType}
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
];
