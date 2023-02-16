import { Icon } from '@/components/containers/Icon';
import { Button } from '@/components/buttons/Button';
import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { SchedulerProvider, useScheduler } from '@/components/Scheduler/SchedulerContext';
import * as dates from 'date-fns';

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

export const SchedulerBody = () => {
  return <div>body</div>;
};

export const SchedulerFooter = () => {
  return <div className="mt-auto">footer</div>;
};

export const Scheduler = () => {
  return (
    <section className="flex flex-col gap-1 h-full w-full bg-white px-2 py-4">
      <SchedulerProvider>
        <SchedulerHeader />
        <SchedulerBody />
      </SchedulerProvider>
    </section>
  );
};
