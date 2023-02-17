import { schedulerStore, useScheduler } from '@/components/Scheduler/SchedulerContext';
import s from './SchedulerBody.module.scss';
import { flexRender } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTable } from '@/hooks/useTable';
import { SchedulerRow } from './rows';
import { type ListenerColumnDef, SchedulerColumn } from './columns';

export const SchedulerBody = () => {
  const { week } = useScheduler();
  const { days } = week;
  const rows = useMemo(() => SchedulerRow.create(days), [week]);
  const columns = useMemo(() => SchedulerColumn.create(days), [week]);
  const { getHeaderGroups, getRowModel } = useTable({ data: rows, columns });

  return (
    <div className={s.scrollable}>
      <table className={s.scheduler} ref={schedulerStore.attach}>
        <thead>
          {getHeaderGroups().map(({ headers, id }) => (
            <tr key={id}>
              {headers.map(({ column, getContext, id, isPlaceholder }) => (
                <th key={id}>{isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map(({ getVisibleCells, id }) => (
            <tr key={id}>
              {getVisibleCells().map(({ column: { columnDef }, getContext, id }) => {
                const def = columnDef as ListenerColumnDef<SchedulerRow>;
                const context = getContext();

                return (
                  <td
                    key={id}
                    onMouseEnter={
                      def.onCellMouseEnter
                        ? (event) => {
                            event.preventDefault();
                            def.onCellMouseEnter?.(event, context);
                          }
                        : undefined
                    }
                    onMouseDown={
                      def.onCellMouseDown
                        ? (event) => {
                            event.preventDefault();
                            def.onCellMouseDown?.(event, context);
                          }
                        : undefined
                    }
                    onMouseUp={
                      def.onCellMouseUp
                        ? (event) => {
                            event.preventDefault();
                            def.onCellMouseUp?.(event, context);
                          }
                        : undefined
                    }>
                    {flexRender(def.cell, context)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
