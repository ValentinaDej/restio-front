import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { TbMoodSearch } from 'react-icons/tb';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

import cls from './TransactionsTable.module.scss';
import { useGetTransactions } from 'api/transactions';
import { Calendar, Modal, Title } from 'shared';
import { errorMessage } from 'helpers/errorMessage';
import { TableBtns } from './TableBtns/TableBtns';
import { getColumns } from './getColumns';

export const TransactionsTable = ({ timestamp }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { restId } = useParams();
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState(searchParams.get('nameFilter') || '');
  const [date, setDate] = useState(
    (searchParams.get('date') && new Date(searchParams.get('date'))) || undefined
  );
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: searchParams.get('pageIndex') || 0,
    pageSize: searchParams.get('pageSize') || 20,
  });
  const [isTodayTransactions, setIsTodayTransactions] = useState(
    Boolean(searchParams.get('today')) || false
  );
  const [createdByTypeOptions, setCreatedByTypeOptions] = useState(
    searchParams.get('userType') || 'all'
  );
  const [transactionTypeOptions, setTransactionTypeOptions] = useState(
    searchParams.get('transactionType') || 'all'
  );
  const [transactionSortTypeOptions, setTransactionSortTypeOptions] = useState(
    searchParams.get('transactionSortType') || 'newest'
  );
  const [isClear, setIsClear] = useState(false);
  const [fetchDataOptions, setFetchDataOptions] = useState({
    pageIndex,
    pageSize,
    today: isTodayTransactions,
    userType: createdByTypeOptions,
    transactionType: transactionTypeOptions,
    date,
    nameFilter,
    transactionSortType: transactionSortTypeOptions,
  });

  const onClickCalendar = () => {
    setCalendarIsOpen((prev) => !prev);
  };

  const onChangeDate = (newDate) => {
    setDate(newDate);
    setPagination({ pageIndex: 0, pageSize });
    setIsTodayTransactions(false);
  };

  const onClickClearFilters = () => {
    setIsClear(true);
    setCreatedByTypeOptions('all');
    setTransactionTypeOptions('all');
    setTransactionSortTypeOptions('newest');
    setNameFilter('');
    setDate(undefined);
    setIsTodayTransactions(false);
    setPagination({ pageIndex: 0, pageSize: 20 });
  };

  useEffect(() => {
    if (isClear) {
      setIsClear(false);
    }
  }, [isClear]);

  const defaultValues = useMemo(() => {
    return {
      userType: createdByTypeOptions,
      transactionType: transactionTypeOptions,
      transactionSortType: transactionSortTypeOptions,
      pageSize,
    };
  }, [createdByTypeOptions, pageSize, transactionSortTypeOptions, transactionTypeOptions]);
  const columns = useMemo(
    () =>
      getColumns(
        date,
        isClear,
        pageIndex,
        pageSize,
        onClickCalendar,
        setTransactionTypeOptions,
        setPagination,
        setDate,
        setCreatedByTypeOptions,
        nameFilter,
        setNameFilter,
        setTransactionSortTypeOptions,
        defaultValues
      ),
    [date, isClear, pageIndex, pageSize, nameFilter, defaultValues]
  );

  const {
    data: resp,
    refetch,
    isFetching,
    isLoading,
    isError,
    error,
  } = useGetTransactions(restId, fetchDataOptions);

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    let params = {};
    params.pageIndex = pageIndex;
    params.pageSize = pageSize;
    params.userType = createdByTypeOptions;
    params.transactionType = transactionTypeOptions;
    params.nameFilter = nameFilter;
    params.transactionSortType = transactionSortTypeOptions;

    if (isTodayTransactions) {
      params.today = isTodayTransactions;
    }
    if (date) {
      params.date = date;
    }

    setSearchParams({ timestamp, ...params });
    setFetchDataOptions(params);
  }, [
    createdByTypeOptions,
    date,
    isTodayTransactions,
    nameFilter,
    pageIndex,
    pageSize,
    refetch,
    searchParams,
    setSearchParams,
    timestamp,
    transactionSortTypeOptions,
    transactionTypeOptions,
  ]);

  useEffect(() => {
    refetch();
  }, [fetchDataOptions, refetch]);

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

  useEffect(() => {
    if (isError) {
      errorMessage(error?.response.data.message);
    }
  }, [error?.response.data.message, isError]);

  return (
    !isLoading && (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cls.box}
        >
          <Modal isModalOpen={calendarIsOpen} setIsModalOpen={onClickCalendar}>
            <Calendar onChange={onChangeDate} newDate={date} />
          </Modal>
          <TableBtns
            onClickClearFilters={onClickClearFilters}
            table={table}
            data={resp?.data?.tableTransactions}
            isFetching={isFetching}
            isClear={isClear}
            isTodayTransactions={isTodayTransactions}
            setIsTodayTransactions={setIsTodayTransactions}
            setPagination={setPagination}
            setDate={setDate}
            pageSize={pageSize}
          />
          <table className={cls.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <motion.tr className={cls.tr} key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <motion.th key={header.id} colSpan={header.colSpan} className={cls.th}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                        )}
                      </motion.th>
                    );
                  })}
                </motion.tr>
              ))}
            </thead>
            <tbody>
              <AnimatePresence>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <motion.tr
                      layout
                      key={row.id}
                      exit={{ opacity: 0, height: 0 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <motion.td layout key={cell.id} className={cls.td}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </motion.td>
                        );
                      })}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
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
        </motion.div>
      </AnimatePresence>
    )
  );
};
