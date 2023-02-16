import * as dates from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

export const useDate = (initial: Date = new Date()) => {
  const [date, set] = useState(initial);
  const forward = useCallback((duration: Duration) => set((value) => dates.add(value, duration)), []);
  const backward = useCallback((duration: Duration) => set((value) => dates.sub(value, duration)), []);

  return useMemo(
    () =>
      ({
        date,
        forward,
        backward,
        set,
        get str() {
          return dates.format(date, 'yyyy-MM-dd');
        },
      } as const),
    [date],
  );
};
