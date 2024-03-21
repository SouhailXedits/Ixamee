import { format, getTime, formatDistanceToNow } from 'date-fns';

type DateLike = Date | string | number;

function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function formatDate(date: DateLike, formatString: string = 'dd MMM yyyy'): string {
  if (!date) return '';
  if (isDate(date)) return format(date, formatString);
  return format(new Date(date), formatString);
}

export function formatDateTime(date: DateLike, formatString: string = 'dd MMM yyyy hh:mm:ss a'): string {
  if (!date) return '';
  if (isDate(date)) return format(date, formatString);
  return format(new Date(date), formatString);
}

export function getTimestamp(date: DateLike): number {
  if (!date) return 0;
  if (isDate(date)) return getTime(date);
  return getTime(new Date(date));
}

export function formatToNow(date: DateLike): string {
  if (!date) return '';
  if (isDate(date)) return formatDistanceToNow(date, { addSuffix: true });
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
