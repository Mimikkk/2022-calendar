import cx from 'classnames';
import * as dates from 'date-fns';
import type { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Day } from '@/utils/fp';
import type { SchedulerRow } from './rows';
import type { PointerEvent } from 'react';
import { schedulerStore, useSchedulerStore } from '@/components/Scheduler/SchedulerContext';
import { SchedulerReservation } from './SchedulerReservation';
import { createRoot } from 'react-dom/client';
import { useMemo } from 'react';
import { isBefore } from 'date-fns';

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
    cell: (props) => <SchedulerDayCell day={day} {...props} />,
    header: (props) => <DayHeader day={day} {...props} />,
    onCellPointerUp: () => {
      if (!schedulerStore.state.pending) return;

      document.body.style.cursor = '';
      schedulerStore.state.pending.root?.unmount();
      schedulerStore.effect((s) => {
        let [start, end] = [s.pending!.start!, s.pending!.end!];
        if (isBefore(end, start)) [start, end] = [end, start];

        return { containers: [...s.containers, { start, end }], pending: null };
      });
    },
    onCellPointerDown: (event, cell) => {
      if (event.currentTarget.hasChildNodes()) return;
      const start = cell.getValue<Date>();

      document.body.style.cursor = 'move';
      const root = createRoot(event.currentTarget);
      schedulerStore.effect({ pending: { start, root } });
      root.render(<SchedulerReservation start={start} />);
    },
    onCellPointerEnter: (event, cell) => {
      if (!schedulerStore.state.pending) return;
      let start = schedulerStore.state.pending.start!;
      let end = dates.setDay(cell.getValue<Date>(), dates.getDay(start));

      schedulerStore.mutate({ pending: { end } });
      schedulerStore.effect({ selected: null });
      schedulerStore.state.pending.root?.render(<SchedulerReservation start={start} end={end} />);
    },
  });

  interface SchedulerDayHeaderProps extends HeaderContext<SchedulerRow, unknown> {
    day: Date;
  }

  const DayHeader = ({ day }: SchedulerDayHeaderProps) => (
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

  interface SchedulerDayCellProps extends CellContext<SchedulerRow, unknown> {
    day: Date;
  }

  const SchedulerDayCell = ({ cell }: SchedulerDayCellProps) => {
    const reservations = useSchedulerStore((s) => s.containers);
    const reservation = useMemo(
      () => reservations.find((reservation) => dates.isEqual(reservation.start, cell.getValue<Date>())),
      [reservations],
    );

    return reservation ? <SchedulerReservation {...reservation} /> : null;
  };
}
export const findEdgesInterval = (cell: CellContext<SchedulerRow, unknown>): Interval => {
  const value = cell.getValue<Date>();
  const { containers } = schedulerStore.state;

  let start = containers.find((c) => dates.isEqual(c.end, value))?.end ?? value;
  let end = containers.find((c) => dates.isEqual(c.start, value))?.start ?? value;

  return { start, end } as Interval;
};
