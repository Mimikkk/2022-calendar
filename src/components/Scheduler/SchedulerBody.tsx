import { useScheduler } from '@/components/Scheduler/SchedulerContext';
import * as dates from 'date-fns';
import cx from 'classnames';
import s from './Scheduler.module.scss';
const asDay = Intl.DateTimeFormat(undefined, { weekday: 'short' });
const asNum = Intl.DateTimeFormat(undefined, { day: 'numeric' });
const transpose = <T,>(a: T[][]) => a[0].map((_, c) => a.map((r) => r[c]));
const stepEvery15Minutes = (day: Date) =>
  dates.eachMinuteOfInterval(
    { start: dates.startOfDay(day), end: dates.addMinutes(dates.endOfDay(day), 1) },
    { step: 15 },
  );

export const SchedulerBody = () => {
  const {
    week: { days },
  } = useScheduler();
  const rows = transpose([new Date(), ...days].map(stepEvery15Minutes));

  return (
    <table className={s.scheduler}>
      <thead>
        <tr>
          <th />
          {days.map((day, index) => (
            <th className="uppercase" key={index}>
              <span>{asDay.format(day)}</span>
              <div
                className={cx('transition-all rounded-full mx-4 cursor-pointer', {
                  ['text-white bg-blue-500 hover:bg-blue-600']: dates.isToday(day),
                  ['hover:bg-slate-200']: !dates.isToday(day),
                })}>
                {asNum.format(day)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, index) => {
              if (index === 0) return <td key={index}>{dates.format(cell, 'HH:mm')}</td>;
              return <td key={index} />;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
