import type { FC } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { SchedulerReservation } from '@/components/Scheduler/components/drag/SchedulerReservation';
import { schedulerStore } from '@/components/Scheduler/SchedulerContext';

interface SchedulerDragContainerFC extends FC {
  root: Root;
  element: HTMLElement;
  update: (props: { start: Date; end?: Date }) => void;
  clear: () => void;
}

export const SchedulerDragContainer: SchedulerDragContainerFC = () => <div id={SchedulerDragContainer.name} />;
SchedulerDragContainer.element = undefined as never;
SchedulerDragContainer.root = undefined as never;
SchedulerDragContainer.update = ({ start, end = start }) =>
  SchedulerDragContainer.root.render(<SchedulerReservation start={start} end={end} />);
SchedulerDragContainer.clear = () => SchedulerDragContainer.root.render(null);

let element: HTMLElement | null = null;
let reference: Root | null = null;
Object.defineProperty(SchedulerDragContainer, 'element', {
  get() {
    if (!element) element = document.getElementById(SchedulerDragContainer.name);
    return element;
  },
});
Object.defineProperty(SchedulerDragContainer, 'root', {
  get() {
    if (!reference) reference = createRoot(SchedulerDragContainer.element);
    return reference;
  },
});
