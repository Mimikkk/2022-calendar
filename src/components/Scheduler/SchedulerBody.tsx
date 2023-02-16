import { useScheduler } from '@/components/Scheduler/SchedulerContext';
import * as dates from 'date-fns';
import cx from 'classnames';
import s from './Scheduler.module.scss';
import { ColumnDef, flexRender, getCoreRowModel, TableOptions, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
const asDay = Intl.DateTimeFormat(undefined, { weekday: 'short' });
const asNum = Intl.DateTimeFormat(undefined, { day: 'numeric' });
const transpose = <T,>(a: T[][]) => a[0].map((_, c) => a.map((r) => r[c]));
const stepEvery15Minutes = (day: Date) =>
  dates.eachMinuteOfInterval({ start: dates.startOfDay(day), end: dates.endOfDay(day) }, { step: 15 });

type SchedulerRow = Date[];

namespace SchedulerRow {
  export const create = (days: Date[]): SchedulerRow[] => transpose(days.map(stepEvery15Minutes));
}

export const useTable = <T,>(options: Omit<TableOptions<T>, 'getCoreRowModel'>) =>
  useReactTable({
    getCoreRowModel: getCoreRowModel(),
    ...options,
  });

export const SchedulerBody = () => {
  const { week } = useScheduler();
  const { days } = week;
  const rows = useMemo(() => SchedulerRow.create(days), [week]);
  const columns = useMemo(
    (): ColumnDef<SchedulerRow>[] => [
      {
        id: 'time',
        cell: ({ row }) => dates.format(row.original[0] as Date, 'HH:mm'),
      },
      ...days.map(
        (day, index): ColumnDef<SchedulerRow> => ({
          id: day.toString(),
          accessorFn: (row) => row[index],
          cell: () => null,
          header: () => (
            <>
              <span className={cx('uppercase', { ['text-blue-500']: dates.isToday(day) })}>{asDay.format(day)}</span>
              <div
                className={cx('transition-all rounded-full mx-4 cursor-pointer', {
                  ['text-white bg-blue-500 hover:bg-blue-600']: dates.isToday(day),
                  ['hover:bg-slate-200']: !dates.isToday(day),
                })}>
                {asNum.format(day)}
              </div>
            </>
          ),
        }),
      ),
    ],
    [week],
  );
  const table = useTable({ data: rows, columns, enableColumnResizing: true });
  console.count();

  return (
    <div className={s.scrollable}>
      <table className={s.scheduler}>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
