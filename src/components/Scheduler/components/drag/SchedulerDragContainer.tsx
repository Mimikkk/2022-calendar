import type { FC } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { SchedulerReservation } from '@/components/Scheduler/components/drag/SchedulerReservation';

interface SchedulerDragContainerFC extends FC {
  root: Root;
  element: HTMLElement;
  update: () => void;
  clear: () => void;
}

export const SchedulerDragContainer: SchedulerDragContainerFC = () => <div id={SchedulerDragContainer.name} />;
SchedulerDragContainer.element = undefined as never;
SchedulerDragContainer.root = undefined as never;
SchedulerDragContainer.update = () => SchedulerDragContainer.root.render(<SchedulerReservation />);
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
