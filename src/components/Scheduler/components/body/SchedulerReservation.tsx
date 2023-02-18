import { schedulerStore, useSchedulerStore } from '@/components/Scheduler/SchedulerContext';
import type { FC } from 'react';
import * as dates from 'date-fns';
import cx from 'classnames';
import { differenceInMinutes, isEqual } from 'date-fns';
import { useMemo, useRef } from 'react';
import s from './SchedulerReservation.module.scss';
import { Icon } from '@/components/containers/Icon';
import { shallow } from 'zustand/shallow';

interface SchedulerReservationProps {
  start: Date;
  end?: Date;
}

export const SchedulerReservation: FC<SchedulerReservationProps> = ({ start, end = start }) => {
  const [cellByIsoDate, pending, selected] = useSchedulerStore(
    (s) => [s.cellByIsoDate, s.pending, s.selected],
    shallow,
  );
  const isSelected = selected && isEqual(selected, start);
  const isPending = pending?.start && isEqual(pending.start, start);
  const hasPending = !!pending;
  const select = () => schedulerStore.effect({ selected: start });
  const ref = useRef<HTMLDivElement | null>(null);

  const height = useMemo(
    () =>
      Math.round(differenceInMinutes(end, start) / 15 + 1) *
      (cellByIsoDate[start.toISOString()]?.getBoundingClientRect()?.height ?? 16),
    [start, end, cellByIsoDate],
  );

  return (
    <div
      ref={(e) => (ref.current = e)}
      className={cx(s.element, {
        [s['is-pending']]: isPending,
        [s['has-pending']]: hasPending,
        [s['is-selected']]: isSelected,
      })}
      style={{ height }}
      onClick={select}>
      <div className={s.content}>
        {start === end ? (
          <span className={s.single}>{`${dates.format(start, 'HH:mm')}`}</span>
        ) : (
          <span>{`${dates.format(start, 'HH:mm')} - ${dates.format(end, 'HH:mm')}`}</span>
        )}
        {isSelected && (
          <Icon
            onClick={() =>
              schedulerStore.effect((s) => ({
                containers: s.containers.filter((c) => c.start !== start),
                selected: null,
              }))
            }
            name="Trash"
            className="text-blue-600 w-4 h-4 rounded hover:bg-blue-300 cursor-pointer hover:text-blue-700"
          />
        )}
      </div>
    </div>
  );
};
