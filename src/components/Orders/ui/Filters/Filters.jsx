import cls from './Filters.module.scss';
import { Text, DropDown } from 'shared';

const sortOptions = [
  { value: 'None', label: 'Newest' },
  { value: 'Open', label: 'Open' },
  { value: 'Paid', label: 'Paid' },
];

export const Filters = ({ setSortOrderBy }) => {
  return (
    <div>
      <div className={cls.sort}>
        <Text>Sort by</Text>
        <DropDown
          className={cls.select}
          options={sortOptions}
          defaultValue="Newest"
          onSelect={(e) => setSortOrderBy(e.value)}
        />
      </div>
    </div>
  );
};
