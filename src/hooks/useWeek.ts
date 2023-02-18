import * as dates from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useDate } from '@/hooks/useDate';

namespace Dates {
  export const asWeek = (date: Date) => {
    return dates.format(dates.subWeeks(date, 1), "yyyy-'W'ww");
  };
}

export const useWeek = (initial: Date = dates.startOfWeek(new Date())) => {
  const { date, str, ...original } = useDate(initial);
  const forward = useCallback((weeks?: any) => original.forward({ weeks: typeof weeks === 'number' ? weeks : 1 }), []);
  const backward = useCallback(
    (weeks?: any) => original.backward({ weeks: typeof weeks === 'number' ? weeks : 1 }),
    [],
  );
  const set = useCallback((date: Date) => original.set(dates.startOfWeek(date, { weekStartsOn: 1 })), []);

  return useMemo(
    () => ({
      date,
      str,
      forward,
      backward,
      set,
      get week() {
        return Dates.asWeek(date);
      },
      get days() {
        return dates.eachDayOfInterval({
          start: dates.startOfWeek(date, { weekStartsOn: 1 }),
          end: dates.endOfWeek(date, { weekStartsOn: 1 }),
        });
      },
    }),
    [date],
  );
};
