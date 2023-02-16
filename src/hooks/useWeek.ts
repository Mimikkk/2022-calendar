import * as dates from 'date-fns';
import { useCallback, useState } from 'react';
import { useDate } from '@/hooks/useDate';

namespace Dates {
  export const asWeek = (date: Date) => dates.format(date, "yyyy-'W'ww", { weekStartsOn: 1 });
  export const fromWeek = (week: Date) => dates.sub(week, { days: 1 });
}

export const useWeek = (initial: Date = dates.startOfWeek(new Date(), { weekStartsOn: 1 })) => {
  const { date, str, ...original } = useDate(initial);
  const forward = useCallback((weeks?: any) => original.forward({ weeks: typeof weeks === 'number' ? weeks : 1 }), []);
  const backward = useCallback(
    (weeks?: any) => original.backward({ weeks: typeof weeks === 'number' ? weeks : 1 }),
    [],
  );
  const set = useCallback((week: Date) => original.set(Dates.fromWeek(week)), []);

  return {
    date,
    str,
    forward,
    backward,
    set,
    get week() {
      return Dates.asWeek(date);
    },
  };
};
