import React from 'react';
import {
  TfiAngleDoubleLeft,
  TfiAngleDoubleRight,
  TfiAngleLeft,
  TfiAngleRight,
} from 'react-icons/tfi';

import cls from './TableBtns.module.scss';
import { Button, CheckBox, DropDown, Loader, IconButton, Text } from 'shared';
import { DebouncedInput } from '../DebounceInput/DebounceInput';

const numberOfTransactionsOptions = [
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
];

export const TableBtns = ({
  onClickClearFilters,
  table,
  data,
  isFetching,
  isClear,
  isTodayTransactions,
  setIsTodayTransactions,
  setPagination,
  setDate,
  pageSize,
}) => {
  const pageNumber = Number(data?.currentPageIndex) + 1;
  return (
    <div className={cls.btnsBox}>
      <Button size="sm" onClick={onClickClearFilters}>
        Clear filters
      </Button>
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
        <div className={cls.inputBox}>
          <Text classname={cls.text} fontWeight={600}>
            Page
          </Text>
          <Text classname={cls.text} fontWeight={600}>
            {data?.pageCount === 0 ? 0 : table.getState().pagination?.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </Text>
          <DebouncedInput
            min={1}
            type="number"
            value={isNaN(data?.currentPageIndex) ? 1 : pageNumber}
            onChange={(value) => {
              const page = value ? Number(value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className={cls.navigateInput}
          />
          {isFetching && (
            <div className={cls.loader}>
              <Loader size="xs" />
            </div>
          )}
        </div>
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
      </div>
      <div className={cls.inputSelectBox}>
        <div className={cls.select}>
          <Text classname={cls.text} fontWeight={600}>
            Show
          </Text>
          <DropDown
            defaultValue={pageSize}
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
  );
};
