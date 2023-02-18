import { useSchedulerStore } from '@/components/Scheduler/SchedulerContext';
import type { FC } from 'react';
import * as dates from 'date-fns';
import cx from 'classnames';
import { differenceInMinutes } from 'date-fns';
import { useMemo } from 'react';
import s from './SchedulerReservation.module.scss';

interface SchedulerReservationProps {
  start: Date;
  end?: Date;
}

export const SchedulerReservation: FC<SchedulerReservationProps> = ({ start, end = start }) => {
  const cellByIsoDate = useSchedulerStore((x) => x.cellByIsoDate);

  const height = useMemo(
    () =>
      Math.round(differenceInMinutes(end, start) / 15 + 1) *
      cellByIsoDate[start.toISOString()]?.getBoundingClientRect().height,
    [start, end, cellByIsoDate],
  );

  return (
    <div className={cx(s.element, s['is-pending'])} style={{ height }}>
      <div className={s.content}>
        {start === end ? (
          <span className={s.single}>{`${dates.format(start, 'HH:mm')}`}</span>
        ) : (
          <>{`${dates.format(start, 'HH:mm')} - ${dates.format(end, 'HH:mm')}`}</>
        )}
      </div>
    </div>
  );
};
