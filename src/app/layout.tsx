import type { ReactNode } from 'react';
import './global.scss';

export default ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head />
    <body>{children}</body>
  </html>
);
