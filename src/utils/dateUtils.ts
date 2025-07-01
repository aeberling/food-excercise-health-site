/**
 * Convert a Date object to a local date string (YYYY-MM-DD)
 * This avoids timezone issues when using toISOString()
 */
export function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get today's date as a local date string
 */
export function getTodayString(): string {
  return toLocalDateString(new Date());
}