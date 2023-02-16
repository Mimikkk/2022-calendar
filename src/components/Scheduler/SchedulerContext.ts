import { createContext } from '@/hooks/createContext';

export const [useScheduler, SchedulerProvider] = createContext(() => {
  return {};
});
