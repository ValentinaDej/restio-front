import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TbMoodSearch } from 'react-icons/tb';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

import cls from './TransactionsTable.module.scss';
import { useGetTransactions } from 'api/transactions';
import { Calendar, Modal, Title } from 'shared';
import { errorMessage } from 'helpers/errorMessage';
import { TableBtns } from './TableBtns/TableBtns';
import { getColumns } from './getColumns';

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
    setPagination({ pageIndex: 0, pageSize });
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
        setCreatedByTypeOptions
      ),
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
    if (isError) {
      errorMessage(error?.response.data.message);
    }
  }, [error?.response.data.message, isError]);

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
          <Title fontSize={22}>Table</Title>
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
