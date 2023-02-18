import cx from 'classnames';
import * as dates from 'date-fns';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { Day } from '@/utils/fp';
import type { SchedulerRow } from './rows';
import type { PointerEvent } from 'react';
import { schedulerStore } from '@/components/Scheduler/SchedulerContext';
import { SchedulerDragContainer } from '@/components/Scheduler/components/drag';

export type PointerColumnDef<T> = ColumnDef<T> & {
  onCellPointerEnter?: (event: PointerEvent<HTMLTableCellElement>, context: CellContext<T, unknown>) => void;
  onCellPointerDown?: (event: PointerEvent<HTMLTableCellElement>, context: CellContext<T, unknown>) => void;
  onCellPointerUp?: (event: PointerEvent<HTMLTableCellElement>, context: CellContext<T, unknown>) => void;
};

export namespace SchedulerColumn {
  export const create = (days: Date[]): ColumnDef<SchedulerRow>[] => [
    { id: 'time', cell: ({ row }) => (row.index % 4 === 0 ? dates.format(row.original[0], 'HH:mm') : '') },
    ...days.map(createDayColumn),
  ];

  const createDayColumn = (day: Date, index: number): PointerColumnDef<SchedulerRow> => ({
    id: `day-${index}`,
    accessorFn: (row) => row[index],
    cell: () => <DayCell day={day} />,
    header: () => <DayHeader day={day} />,
    onCellPointerUp: (event, cell) => {
      if (!schedulerStore.state.current) return;
      const start = schedulerStore.state.current.start!;
      const end = dates.setDay(cell.getValue<Date>(), start.getDay());

      schedulerStore.mutate({ current: { end } });
      SchedulerDragContainer.update({ start, end });

      schedulerStore.mutate({ current: null });
      SchedulerDragContainer.clear();
    },
    onCellPointerDown: (event, cell) => {
      const start = cell.getValue<Date>();

      schedulerStore.mutate({ current: { start } });
      SchedulerDragContainer.update({ start });
    },
    onCellPointerEnter: (event, cell) => {
      if (!schedulerStore.state.current) return;
      const start = schedulerStore.state.current.start!;
      const end = dates.setDay(cell.getValue<Date>(), start.getDay());

      schedulerStore.mutate({ current: { end } });
      SchedulerDragContainer.update({ start, end });
    },
  });

  const DayHeader = ({ day }: { day: Date }) => (
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
  const DayCell = ({ day }: { day: Date }) => <div>{day.getDay()}</div>;
}
