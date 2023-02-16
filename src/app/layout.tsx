import { ReactNode, Suspense } from 'react';
import './global.scss';

export default ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);
