import { SchedulerProvider } from '@/components/Scheduler/SchedulerContext';
import { SchedulerHeader } from '@/components/Scheduler/SchedulerHeader';

export const SchedulerBody = () => {
  return <div>body</div>;
};

export const Scheduler = () => (
  <section className="flex flex-col gap-1 h-full w-full bg-white px-2 py-4">
    <SchedulerProvider>
      <SchedulerHeader />
      <SchedulerBody />
    </SchedulerProvider>
  </section>
);
