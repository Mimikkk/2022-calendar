import cx from 'classnames';
import * as dates from 'date-fns';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { Day } from '@/utils/fp';
import type { SchedulerRow } from './rows';
import type { MouseEvent } from 'react';

export type ListenerColumnDef<T> = ColumnDef<T> & {
  onCellMouseEnter?: (event: MouseEvent<HTMLTableCellElement>, context: CellContext<T, unknown>) => void;
  onCellMouseDown?: (event: MouseEvent<HTMLTableCellElement>, context: CellContext<T, unknown>) => void;
  onCellMouseUp?: (event: MouseEvent<HTMLTableCellElement>, context: CellContext<T, unknown>) => void;
};

export namespace SchedulerColumn {
  export const create = (days: Date[]): ColumnDef<SchedulerRow>[] => [
    {
      id: 'time',
      cell: ({ row }) => {
        return +row.id % 4 === 0 ? dates.format(row.original[0], 'HH:mm') : '';
      },
    },
    ...days.map(createColumn),
  ];

  const createColumn = (day: Date, index: number): ListenerColumnDef<SchedulerRow> => ({
    id: `day-${index}`,
    accessorFn: (row) => row[index],
    cell: () => null,
    header: createSchedulerDayCell(day),
    onCellMouseUp: (event, { row }) => {
      console.log('up', row);
    },
    onCellMouseDown: (event, { row }) => {
      console.log('down', row);
    },
    onCellMouseEnter: (event, { row }) => {},
  });

  const createSchedulerDayCell = (day: Date) => () =>
    (
      <div>
        <span className={cx('uppercase', { ['text-blue-500']: dates.isToday(day) })}>{Day.asShort(day)}</span>
        <div
          className={cx('transition-all rounded-full mx-4 cursor-pointer', {
            ['text-white bg-blue-500 hover:bg-blue-600']: dates.isToday(day),
            ['hover:bg-slate-200']: !dates.isToday(day),
          })}>
          {Day.asNum(day)}
        </div>
      </div>
    );
}
