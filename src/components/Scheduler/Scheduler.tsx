import { SchedulerDragContainer } from './components/drag';
import { SchedulerBody } from './components/body';
import { SchedulerHeader } from './components/header';
import { SchedulerProvider } from './SchedulerContext';

export const Scheduler = () => (
  <section className="flex flex-col gap-2 h-full w-full rounded bg-white py-8 px-4">
    <SchedulerProvider>
      <SchedulerHeader />
      <SchedulerBody />
      <SchedulerDragContainer />
    </SchedulerProvider>
  </section>
);
