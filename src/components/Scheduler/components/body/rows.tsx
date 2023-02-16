import { transpose } from '@/utils/fp';
import { Day } from '@/utils/fp';

export type SchedulerRow = Date[];

export namespace SchedulerRow {
  export const create = (days: Date[]): SchedulerRow[] => transpose(days.map(Day.stepEvery15Minutes));
}
