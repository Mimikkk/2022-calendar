import * as dates from 'date-fns';
const asDayFormatter = Intl.DateTimeFormat(undefined, { weekday: 'short' });
const asNumFormatter = Intl.DateTimeFormat(undefined, { day: 'numeric' });

export namespace Day {
  export const asShort = (day: Date) => asDayFormatter.format(day);
  export const asNum = (day: Date) => asNumFormatter.format(day);
  export const stepEvery15Minutes = (day: Date) =>
    dates.eachMinuteOfInterval({ start: dates.startOfDay(day), end: dates.endOfDay(day) }, { step: 15 });
}

export const transpose = <T>(a: T[][]) => a[0].map((_, c) => a.map((r) => r[c]));
