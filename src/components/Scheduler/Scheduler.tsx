import { SchedulerProvider } from '@/components/Scheduler/SchedulerContext';
import { SchedulerHeader } from '@/components/Scheduler/SchedulerHeader';
import { SchedulerBody } from '@/components/Scheduler/SchedulerBody';

export const Scheduler = () => (
  <section className="flex flex-col gap-2 h-full w-full rounded bg-white py-8 px-4">
    <SchedulerProvider>
      <SchedulerHeader />
      <SchedulerBody />
    </SchedulerProvider>
  </section>
);
