import { createContext } from '@/hooks/createContext';
import { useWeek } from '@/hooks/useWeek';

export const [useScheduler, SchedulerProvider] = createContext(() => {
  const week = useWeek(new Date());

  return { week };
});
