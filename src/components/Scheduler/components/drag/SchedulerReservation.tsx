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
    const { start: { ref: start } = {}, end: { ref: end } = {} } = schedulerStore.state.current!;

    const [top, bottom] = [start, end].map((x) => x!.getBoundingClientRect()).sort((a, b) => a.top - b.top);

    const table = schedulerStore.state.table.tBodies[0].getBoundingClientRect();
    const scrolls = {
      height: schedulerStore.state.table.parentElement!.scrollHeight,
      top: schedulerStore.state.table.parentElement!.scrollTop,
      left: schedulerStore.state.table.parentElement!.scrollLeft,
      width: schedulerStore.state.table.parentElement!.scrollWidth,
    };
    const parent = schedulerStore.state.table.parentElement!.getBoundingClientRect();
    const head = schedulerStore.state.table.tHead!.getBoundingClientRect();
    const self = ref.current!;
    const styling = self.style;

    console.log(scrolls, table, parent, top, bottom);

    const isFullyOutside = parent.top + parent.height <= top.top || parent.top >= bottom.top + bottom.height;

    if (isFullyOutside) {
      styling.display = 'none';
      return;
    }
    styling.display = '';

    const hasHeadOverflow = parent.top + head.height >= top.top;
    const hasBottomOverflow = parent.top + parent.height <= bottom.top + bottom.height;
    styling.width = `${Math.round(top.width)}px`;
    styling.left = `${Math.round(top.left)}px`;
    styling.top = `${Math.round(hasHeadOverflow ? parent.top + head.height : top.top)}px`;
    styling.height = `${Math.round(
      hasBottomOverflow
        ? parent.top + parent.height - self.getBoundingClientRect().top
        : bottom.top + bottom.height - self.getBoundingClientRect().top,
    )}px`;
  }, []);
  useLayoutEffect(() => {
    resize();

    document.addEventListener('scroll', resize, { capture: true });
    return () => document.removeEventListener('scroll', resize, { capture: true });
  });

  return (
    <div
      ref={(e) => (ref.current = e)}
      className="text-white bg-blue-400 font-bold absolute flex flex-col pointer-events-none ">
      <div>
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
    </div>
  );
};
