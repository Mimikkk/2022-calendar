import cx from 'classnames';
import { ButtonHTMLAttributes, Children, FC, PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import { Icon, IconType } from '@/components/containers/Icon';
import { Button } from '@/components/buttons/Button';
import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import * as dates from 'date-fns';

namespace Dates {
  export const asWeek = (date: Date) => dates.format(date, "yyyy-'W'ww", { weekStartsOn: 1 });
  export const fromWeek = (week: Date) => dates.sub(week, { days: 1 });
}

const useDate = (initial: Date = new Date()) => {
  const [date, set] = useState(initial);
  const forward = useCallback((duration: Duration = { days: 1 }) => set((value) => dates.add(value, duration)), []);
  const backward = useCallback((duration: Duration = { days: 1 }) => set((value) => dates.sub(value, duration)), []);

  return {
    date,
    forward,
    backward,
    set,
    get week() {
      return Dates.asWeek(date);
    },
  };
};

export const SchedulerHeader = () => {
  const { forward, backward, set, week } = useDate(dates.startOfWeek(new Date(), { weekStartsOn: 1 }));

  return (
    <div className="w-full flex justify-end px-2">
      <div className="flex gap-1">
        <Button>
          <Icon name="Calendar" onClick={() => set(new Date())}></Icon>
          Today
        </Button>
        <ButtonIcon variant="text" icon="ChevronLeft" onClick={() => backward({ weeks: 1 })} />
        <ButtonIcon variant="text" icon="ChevronRight" onClick={() => forward({ weeks: 1 })} />
        <input type="week" value={week} onChange={(event) => set(Dates.fromWeek(event.target.valueAsDate!))} />
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
