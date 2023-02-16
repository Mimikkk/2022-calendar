import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { useScheduler } from './SchedulerContext';

export const SchedulerHeader = () => {
  const {
    week: { forward, backward, set, week },
  } = useScheduler();

  return (
    <div className="w-full flex justify-end px-2 gap-1">
      <ButtonIcon icon="Calendar" onClick={() => set(new Date())}>
        Dzisiaj
      </ButtonIcon>
      <ButtonIcon variant="text" icon="ChevronLeft" onClick={backward} />
      <ButtonIcon variant="text" icon="ChevronRight" onClick={forward} />
      <input className="min-w-[12rem]" type="week" value={week} onChange={(event) => set(event.target.valueAsDate!)} />
    </div>
  );
};
