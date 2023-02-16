import * as dates from 'date-fns';
import { useCallback, useState } from 'react';

export const useDate = (initial: Date = new Date()) => {
  const [date, set] = useState(initial);
  const forward = useCallback((duration: Duration = { days: 1 }) => set((value) => dates.add(value, duration)), []);
  const backward = useCallback((duration: Duration = { days: 1 }) => set((value) => dates.sub(value, duration)), []);

  return {
    date,
    forward,
    backward,
    set,
    get str() {
      return dates.format(date, 'yyyy-MM-dd');
    },
  } as const;
};
