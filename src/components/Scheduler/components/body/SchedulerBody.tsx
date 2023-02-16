import { useScheduler } from '@/components/Scheduler/SchedulerContext';
import s from './Scheduler.module.scss';
import { flexRender } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTable } from '@/hooks/useTable';
import { SchedulerRow } from './rows';
import { SchedulerColumn } from './columns';

export const SchedulerBody = () => {
  const { week } = useScheduler();
  const { days } = week;

  const rows = useMemo(() => SchedulerRow.create(days), [week]);
  const columns = useMemo(() => SchedulerColumn.create(days), [week]);
  const table = useTable({ data: rows, columns });

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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
