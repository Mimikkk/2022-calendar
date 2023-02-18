import { SchedulerBody } from './components/body';
import { SchedulerHeader } from './components/header';
import { SchedulerProvider, schedulerStore } from './SchedulerContext';

export const Scheduler = () => (
  <section
    className="flex flex-col gap-2 h-full w-full rounded bg-white py-8 px-4"
    onPointerLeave={() => {
      schedulerStore.state.pending?.root?.unmount();
      schedulerStore.effect({ pending: null });
      document.body.style.cursor = '';
    }}>
    <SchedulerProvider>
      <SchedulerHeader />
      <SchedulerBody />
    </SchedulerProvider>
  </section>
);
