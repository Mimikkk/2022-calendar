import cx from 'classnames';
import { ButtonHTMLAttributes, Children, FC, PropsWithChildren, ReactNode, useState } from 'react';
import { Icon, IconType } from '@/components/containers/Icon';
import { Button } from '@/components/buttons/Button';
import { ButtonIcon } from '@/components/buttons/ButtonIcon';

export const SchedulerHeader = () => {
  const [current, setCurrent] = useState(new Date());

  return (
    <div className="w-full flex justify-end px-2">
      <div className="flex gap-1">
        <Button>
          <Icon name="Calendar"></Icon>
          Today
        </Button>
        <ButtonIcon variant="text" icon="ChevronLeft" />
        <ButtonIcon variant="text" icon="ChevronRight" />
        <input type="date" value={`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`} />
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
