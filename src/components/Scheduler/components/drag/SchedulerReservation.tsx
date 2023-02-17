import { schedulerStore, useSchedulerStore } from '@/components/Scheduler/SchedulerContext';
import { useCallback, useLayoutEffect, useRef } from 'react';
import s from './SchedulerReservation.module.scss';
import * as dates from 'date-fns';
import cx from 'classnames';

export const SchedulerReservation = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { start, end } = useSchedulerStore((s) => s.current!);

  const resize = useCallback(() => {
    if (!ref.current) return;
    const { start: { ref: startRef } = {}, end: { ref: endRef } = {} } = schedulerStore.state.current!;

    const [start, end] = [startRef!.getBoundingClientRect(), endRef!.getBoundingClientRect()].sort(
      (a, b) => a.top - b.top,
    );

    ref.current.style.width = `${Math.round(start.width)}px`;
    ref.current.style.left = `${Math.round(start.left)}px`;
    ref.current.style.top = `${Math.round(start.top)}px`;
    ref.current.style.height = `${Math.round(start.height + end.top - start.top)}px`;
  }, []);
  useLayoutEffect(() => {
    resize();

    document.addEventListener('scroll', resize, true);
    return () => document.removeEventListener('scroll', resize, true);
  });

  return (
    <div
      ref={(e) => (ref.current = e)}
      className="text-white rounded bg-blue-500 shadow-neutral-900 shadow font-bold absolute flex flex-col pointer-events-none ">
      {start!.ref === end!.ref ? (
        <span className={cx('place-center text-xs')}>{`${dates.format(start?.cell.cell.getValue(), 'HH:mm')}`}</span>
      ) : (
        <>
          {`${dates.format(start?.cell.cell.getValue(), 'HH:mm')} - ${dates.format(
            end?.cell.cell.getValue(),
            'HH:mm',
          )}`}
        </>
      )}
    </div>
  );
};
