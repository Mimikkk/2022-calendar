import cx from 'classnames';
import * as dates from 'date-fns';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { Day } from '@/utils/fp';
import { SchedulerRow } from './rows';
import { DragEvent } from 'react';

export type DraggableColumnDef<T> = ColumnDef<T> & {
  onDragEnter?: (event: DragEvent<HTMLTableCellElement>, context: CellContext<T, unknown>) => void;
  onDragStart?: (event: DragEvent<HTMLTableCellElement>, context: CellContext<T, unknown>) => void;
  onDragEnd?: (event: DragEvent<HTMLTableCellElement>, context: CellContext<T, unknown>) => void;
};

export namespace SchedulerColumn {
  export const create = (days: Date[]): ColumnDef<SchedulerRow>[] => [
    {
      id: 'time',
      cell: ({ row }) => dates.format(row.original[0], 'HH:mm'),
    },
    ...days.map(createColumn),
  ];

  const createColumn = (day: Date, index: number): DraggableColumnDef<SchedulerRow> => ({
    id: `day-${index}`,
    accessorFn: (row) => row[index],
    cell: () => null,
    header: createSchedulerDayCell(day),
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
