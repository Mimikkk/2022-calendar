import { createContext } from '@/hooks/createContext';
import { useWeek } from '@/hooks/useWeek';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { merge } from 'lodash';
import { Root } from 'react-dom/client';

export const [useScheduler, SchedulerProvider] = createContext(() => {
  const week = useWeek(new Date());

  return { week };
});
interface Interval {
  start: Date;
  end: Date;
}
interface SchedulerState {
  containers: Interval[];
  pending: Partial<Interval & { root: Root }> | null;
  selected: Date | null;
  table: HTMLTableElement;
  cellByIsoDate: Record<string, HTMLTableCellElement>;
}

export const useSchedulerStore = create<SchedulerState>()(
  subscribeWithSelector((_) => ({
    containers: [],
    cellByIsoDate: {},
    selected: null,
    pending: null,
    table: null as never,
  })),
);

export const schedulerStore = {
  get state() {
    return useSchedulerStore.getState();
  },
  mutate: (state: Partial<SchedulerState>) => useSchedulerStore.setState(merge(schedulerStore.state, state)),
  attach: (container: HTMLTableElement) => schedulerStore.mutate({ table: container }),
  effect: useSchedulerStore.setState,
};
