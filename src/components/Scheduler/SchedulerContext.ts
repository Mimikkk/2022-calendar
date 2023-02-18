import { createContext } from '@/hooks/createContext';
import { useWeek } from '@/hooks/useWeek';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { merge } from 'lodash';
import { CellContext } from '@tanstack/react-table';
import { SchedulerRow } from '@/components/Scheduler/components/body/rows';

export const [useScheduler, SchedulerProvider] = createContext(() => {
  const week = useWeek(new Date());

  return { week };
});

interface SchedulerState {
  containers: Interval[];
  current: {
    start?: Date;
    end?: Date;
  } | null;
  table: HTMLTableElement;
  cellByIsoDate: Record<string, HTMLTableCellElement>;
  contextByIsoDate: Record<string, CellContext<SchedulerRow, unknown>>;
}

export const useSchedulerStore = create<SchedulerState>()(
  subscribeWithSelector((set, get) => ({
    containers: [],
    cellByIsoDate: {},
    contextByIsoDate: {},
    current: null,
    table: null as never,
  })),
);

export const schedulerStore = {
  get state() {
    return useSchedulerStore.getState();
  },
  mutate: (state: Partial<SchedulerState>) => useSchedulerStore.setState(merge(schedulerStore.state, state)),
  attach: (container: HTMLTableElement) => schedulerStore.mutate({ table: container }),
};
