import cx from 'classnames';
import * as dates from 'date-fns';
import type { ColumnDef } from '@tanstack/react-table';
import { Day } from '@/utils/fp';
import { SchedulerRow } from './rows';

export namespace SchedulerColumn {
  export const create = (days: Date[]): ColumnDef<SchedulerRow>[] => [
    {
      id: 'time',
      cell: ({ row }) => dates.format(row.original[0], 'HH:mm'),
    },
    ...days.map(createColumn),
  ];

  const createColumn = (day: Date, index: number): ColumnDef<SchedulerRow> => ({
    id: `day-${index}`,
    accessorFn: (row) => row[index],
    cell: () => null,
    header: createSchedulerDayCell(day),
  });

  const createSchedulerDayCell = (day: Date) => () =>
    (
      <>
        <span className={cx('uppercase', { ['text-blue-500']: dates.isToday(day) })}>{Day.short(day)}</span>
        <div
          className={cx('transition-all rounded-full mx-4 cursor-pointer', {
            ['text-white bg-blue-500 hover:bg-blue-600']: dates.isToday(day),
            ['hover:bg-slate-200']: !dates.isToday(day),
          })}>
          {Day.num(day)}
        </div>
      </>
    );
}
