'use client';
import * as dates from 'date-fns';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Scheduler = dynamic(() => import('@/components/Scheduler').then((mod) => mod.Scheduler), { ssr: false });

export default () => {
  useEffect(() => {
    dates.setDefaultOptions({ weekStartsOn: 1 });
  }, []);

  return (
    <main className="w-full h-full bg-stone-900">
      <div className="h-full w-full p-24 rounded flex justify-center items-center">
        <div className="p-8 h-full w-full bg-black rounded bg-stone-500 border-stone-700 transition-all border hover:border-amber-500">
          <Scheduler />
        </div>
      </div>
    </main>
  );
};
