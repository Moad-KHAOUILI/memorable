const LOCALE = 'en-GB';

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// yyyy-mm-dd in local time, used as a stable key for a day.
export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Monday of the week the date is in.
export function startOfWeek(date: Date): Date {
  const mondayOffset = (date.getDay() + 6) % 7;
  return addDays(new Date(date.getFullYear(), date.getMonth(), date.getDate()), -mondayOffset);
}

// "TUESDAY, 10 NOVEMBER"
export function formatHeaderDate(date: Date): string {
  const weekday = date.toLocaleDateString(LOCALE, { weekday: 'long' });
  const dayMonth = date.toLocaleDateString(LOCALE, { day: 'numeric', month: 'long' });
  return `${weekday}, ${dayMonth}`.toUpperCase();
}

// "Tuesday, 10 November 2026"
export function formatLongDate(date: Date): string {
  const weekday = date.toLocaleDateString(LOCALE, { weekday: 'long' });
  const rest = date.toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' });
  return `${weekday}, ${rest}`;
}

// "November 2026"
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString(LOCALE, { month: 'long', year: 'numeric' });
}

// "M", "T", "W", ...
export function formatWeekdayLetter(date: Date): string {
  return date.toLocaleDateString(LOCALE, { weekday: 'narrow' });
}

// "10:04"
export function formatTime(date: Date): string {
  return date.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' });
}
