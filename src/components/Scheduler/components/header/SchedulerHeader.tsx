import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { useScheduler } from '@/components/Scheduler/SchedulerContext';
import * as dates from 'date-fns';

export const SchedulerHeader = () => {
  const {
    week: { forward, backward, set, week },
  } = useScheduler();

  const handleWeekChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    set(event.target.valueAsDate ? event.target.valueAsDate : new Date());
  }, []);

  return (
    <div className="w-full flex justify-end px-2 gap-1">
      <ButtonIcon icon="Calendar" onClick={() => set(new Date())}>
        Dzisiaj
      </ButtonIcon>
      <ButtonIcon variant="text" icon="ChevronLeft" onClick={backward} />
      <ButtonIcon variant="text" icon="ChevronRight" onClick={forward} />
      <input className="min-w-[12rem]" type="week" value={week} onChange={handleWeekChange} />
    </div>
  );
};
