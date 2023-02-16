import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { useScheduler } from './SchedulerContext';
import * as dates from 'date-fns';
import { useCallback } from 'react';
import type { ChangeEvent } from 'react';

export const SchedulerHeader = () => {
  const {
    week: { forward, backward, set, week },
  } = useScheduler();

  const handleWeekChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => event.target.valueAsDate && set(event.target.valueAsDate),
    [],
  );
  return (
    <div className="w-full flex justify-end px-2 gap-1">
      <ButtonIcon icon="Calendar" onClick={() => set(dates.addWeeks(dates.endOfWeek(new Date()), 1))}>
        Dzisiaj
      </ButtonIcon>
      <ButtonIcon variant="text" icon="ChevronLeft" onClick={backward} />
      <ButtonIcon variant="text" icon="ChevronRight" onClick={forward} />
      <input className="min-w-[12rem]" type="week" value={week} onChange={handleWeekChange} />
    </div>
  );
};
