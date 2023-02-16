import { Icon } from '@/components/containers/Icon';
import { Button } from '@/components/buttons/Button';
import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { useWeek } from '@/hooks/useWeek';

export const SchedulerHeader = () => {
  const { forward, backward, set, week } = useWeek();

  return (
    <div className="w-full flex justify-end px-2">
      <div className="flex gap-1">
        <Button>
          <Icon name="Calendar" onClick={() => set(new Date())}></Icon>
          Today
        </Button>
        <ButtonIcon variant="text" icon="ChevronLeft" onClick={backward} />
        <ButtonIcon variant="text" icon="ChevronRight" onClick={forward} />
        <input type="week" value={week} onChange={(event) => set(event.target.valueAsDate!)} />
      </div>
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
      <SchedulerHeader />
      <SchedulerBody />
      <SchedulerFooter />
    </section>
  );
};
