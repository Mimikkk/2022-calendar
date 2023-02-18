import { schedulerStore, useSchedulerStore } from '@/components/Scheduler/SchedulerContext';
import { FC, useCallback, useLayoutEffect, useRef } from 'react';
import * as dates from 'date-fns';
import cx from 'classnames';
import { shallow } from 'zustand/shallow';

interface SchedulerReservationProps {
  start: Date;
  end?: Date;
}

export const SchedulerReservation: FC<SchedulerReservationProps> = ({ start, end = start }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [table, cellByIsoDate] = useSchedulerStore((x) => [x.table, x.cellByIsoDate], shallow);

  const resize = useCallback(() => {
    if (!ref.current) return;
    const self = ref.current!;

    const [top, bottom] = [start, end]
      .map((date) => cellByIsoDate[date.toISOString()].getBoundingClientRect())
      .sort((a, b) => a.top - b.top);

    const parent = table.parentElement!.getBoundingClientRect();
    const head = table.tHead!.getBoundingClientRect();

    const isFullyOutside = parent.top + parent.height <= top.top || parent.top >= bottom.top + bottom.height;

    if (isFullyOutside) {
      self.style.display = 'none';
      return;
    }

    self.style.display = '';
    Object.assign(self.style, {
      width: `${Math.round(top.width)}px`,
      left: `${Math.round(top.left)}px`,
      top: `${Math.round(Math.max(parent.top + head.height, top.top))}px`,
      height: `${Math.round(
        parent.top + parent.height <= bottom.top + bottom.height
          ? parent.top + parent.height - self.getBoundingClientRect().top
          : bottom.top + bottom.height - self.getBoundingClientRect().top,
      )}px`,
    });
  }, [start, end]);
  useLayoutEffect(() => {
    resize();

    document.addEventListener('scroll', resize, { capture: true });
    return () => document.removeEventListener('scroll', resize, { capture: true });
  });

  return (
    <div
      ref={(e) => (ref.current = e)}
      className="text-white bg-blue-400 rounded font-bold absolute flex flex-col pointer-events-none ">
      <div className="overflow-hidden">
        {start === end ? (
          <span className={cx('place-center text-xs')}>{`${dates.format(start, 'HH:mm')}`}</span>
        ) : (
          <>{`${dates.format(start, 'HH:mm')} - ${dates.format(end, 'HH:mm')}`}</>
        )}
      </div>
    </div>
  );
};
