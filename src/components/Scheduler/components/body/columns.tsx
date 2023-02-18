import cx from 'classnames';
import * as dates from 'date-fns';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { Day } from '@/utils/fp';
import type { SchedulerRow } from './rows';
import type { PointerEvent } from 'react';
import { render } from 'react-dom';
import { schedulerStore } from '@/components/Scheduler/SchedulerContext';
import { SchedulerReservation } from './SchedulerReservation';

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
    cell: () => <SchedulerDayCell day={day} />,
    header: () => <DayHeader day={day} />,
    onCellPointerUp: (event, cell) => {
      if (!schedulerStore.state.current?.start) return;
      const start = schedulerStore.state.current.start!;
      const container = schedulerStore.state.cellByIsoDate[start.toISOString()];

      schedulerStore.mutate({ current: null });
      container.replaceChildren('');
    },
    onCellPointerDown: (event, cell) => {
      const start = cell.getValue<Date>();
      const container = event.target as HTMLElement;

      schedulerStore.mutate({ current: { start } });
      render(<SchedulerReservation start={start} />, container);
    },
    onCellPointerEnter: (event, cell) => {
      if (!schedulerStore.state.current?.start) return;
      const start = schedulerStore.state.current.start!;
      const container = schedulerStore.state.cellByIsoDate[start.toISOString()];
      const end = dates.setDay(cell.getValue<Date>(), dates.getDay(start));

      schedulerStore.mutate({ current: { end } });
      render(<SchedulerReservation start={start} end={end} />, container);
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
  const SchedulerDayCell = ({ day }: { day: Date }) => null;
}
